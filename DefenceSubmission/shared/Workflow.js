/** Shared, read-only projection of defence records. Copy unchanged to each Apps Script project. */
const WF_NOTICE_SHEET = 'Defence Notice Log';
const WF_EVENT_SHEET = 'Defence Workflow Log';
const WF_HEADERS = ['Event ID','Case ID','Student Key','Type','Actor','Recorded At','Payload','Previous Hash','Event Hash'];
let wfLedgerCache_ = {};

function wfText_(v) { return String(v == null ? '' : v).trim(); }
function wfNorm_(v) { return wfText_(v).toLowerCase().replace(/\s+/g, ' '); }

function wfParseDateValue_(val) {
  if (!val) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  const s = String(val).trim();
  if (!s) return null;
  let m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  const parsed = new Date(s);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function wfIsDatePassed_(dateVal, timeVal) {
  const d = wfParseDateValue_(dateVal);
  if (!d) return false;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (dateOnly < today) return true;
  if (dateOnly > today) return false;
  if (!timeVal) return false;
  const timeText = String(timeVal).trim();
  const m = timeText.match(/^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i);
  if (!m) return false;
  let hour = Number(m[1]);
  let minute = Number(m[2]);
  const meridiem = String(m[3] || '').toUpperCase();
  if (meridiem) {
    if (hour === 12) hour = 0;
    if (meridiem === 'PM') hour += 12;
  }
  const sessionTarget = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute, 0, 0);
  return sessionTarget <= now;
}

function wfIsOutcomeSent_(d) {
  const status = wfNorm_(d['Result Email Status']);
  const sentAt = wfText_(d['Result Email Sent At']);
  const letterLink = wfText_(d['Result Confirmation Letter Link']) || wfText_(d['Result Letter Link']);
  const isSentStatus = Boolean(status && status.indexOf('sent') >= 0 && status.indexOf('not') < 0 && status.indexOf('ready') < 0);
  return Boolean(isSentStatus || sentAt || letterLink);
}
function wfHash_(v) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(v), Utilities.Charset.UTF_8)
    .map(function(b) { return ('0' + ((b + 256) % 256).toString(16)).slice(-2); }).join('');
}
function wfSpreadsheet_() {
  const id = typeof ADMIN_CONFIG !== 'undefined' ? ADMIN_CONFIG.SPREADSHEET_ID :
    typeof WEBAPP_CONFIG !== 'undefined' ? WEBAPP_CONFIG.SPREADSHEET_ID : PANEL_CONFIG.SPREADSHEET_ID;
  return SpreadsheetApp.openById(id);
}
function wfRevision_(record) {
  const values = record.sheet.getRange(record.row,1,1,record.sheet.getLastColumn()).getValues()[0];
  const headers = record.sheet.getRange(3,1,1,record.sheet.getLastColumn()).getDisplayValues()[0];
  const caseId = record.caseId || (record.map && record.map['Case ID'] ? String(values[record.map['Case ID']-1] || '').trim() : '');
  let ledgerHead = '';
  if (caseId) {
    try {
      const events = wfLedger_(WF_EVENT_SHEET);
      for (let i = events.length - 1; i >= 0; i--) {
        if (events[i].caseId === caseId) { ledgerHead = events[i].hash; break; }
      }
    } catch (e) {}
  }
  return wfHash_(JSON.stringify([headers,values.map(function(v) { return v instanceof Date ? v.toISOString() : v; }),ledgerHead]));
}
function wfAssertRevision_(record, expected) {
  if (!expected || expected !== wfRevision_(record)) throw new Error('This record has changed. Refresh and review the latest data before trying again. No changes were saved.');
}
function wfRaw_(record) {
  const values = record.sheet.getRange(record.row,1,1,record.sheet.getLastColumn()).getDisplayValues()[0];
  const data = {};
  Object.keys(record.map).forEach(function(h) { data[h] = values[record.map[h]-1] || ''; });
  return data;
}
function wfLedger_(name) {
  if (wfLedgerCache_[name]) return wfLedgerCache_[name];
  const sheet = wfSpreadsheet_().getSheetByName(name);
  if (!sheet) return (wfLedgerCache_[name] = []);
  const headers = sheet.getRange(1,1,1,WF_HEADERS.length).getDisplayValues()[0];
  if (JSON.stringify(headers) !== JSON.stringify(WF_HEADERS)) throw new Error(name + ' schema does not match. No records were changed.');
  const rows = sheet.getLastRow() > 1 ? sheet.getRange(2,1,sheet.getLastRow()-1,WF_HEADERS.length).getDisplayValues() : [];
  let previous = '';
  const ids = {};
  const events = rows.map(function(r) {
    if (!r[0] || ids[r[0]] || r[7] !== previous || r[8] !== wfHash_(JSON.stringify(r.slice(0,8)))) {
      throw new Error(name + ' integrity check failed. Stop and ask the administrator to inspect the log.');
    }
    ids[r[0]] = true;
    previous = r[8];
    let payload;
    try { payload = JSON.parse(r[6]); } catch (e) { throw new Error(name + ' contains an invalid event payload.'); }
    return {id:r[0],caseId:r[1],studentKey:r[2],type:r[3],actor:r[4],at:r[5],payload:payload,hash:r[8]};
  });
  return (wfLedgerCache_[name] = events);
}
/** Call only while holding the writer project's lock. Never creates a sheet on a read. */
function wfAppend_(name, caseId, studentKey, type, actor, payload) {
  delete wfLedgerCache_[name];
  let sheet = wfSpreadsheet_().getSheetByName(name);
  if (!sheet) {
    sheet = wfSpreadsheet_().insertSheet(name);
    sheet.getRange(1,1,1,WF_HEADERS.length).setValues([WF_HEADERS]);
    sheet.setFrozenRows(1);
  }

  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      delete wfLedgerCache_[name];
      const events = wfLedger_(name);
      const lastRow = sheet.getLastRow();
      let prevHash = '';
      if (lastRow > 1) {
        const lastRowValues = sheet.getRange(lastRow, 1, 1, WF_HEADERS.length).getDisplayValues()[0];
        prevHash = lastRowValues[8] || (events.length ? events[events.length - 1].hash : '');
      }
      const id = Utilities.getUuid();
      const at = new Date().toISOString();
      const row = [id, caseId, studentKey, type, actor, at, JSON.stringify(payload), prevHash];
      row.push(wfHash_(JSON.stringify(row)));
      const targetRow = lastRow + 1;
      sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
      SpreadsheetApp.flush();

      const writtenId = sheet.getRange(targetRow, 1).getDisplayValues()[0][0];
      if (writtenId === id) {
        delete wfLedgerCache_[name];
        return { id: id, caseId: caseId, studentKey: studentKey, type: type, actor: actor, at: at, payload: payload, hash: row[8] };
      }
      if (typeof Utilities.sleep === 'function') Utilities.sleep(50 * (attempt + 1));
    } catch (e) {
      lastErr = e;
      if (typeof Utilities.sleep === 'function') Utilities.sleep(50 * (attempt + 1));
    }
  }
  delete wfLedgerCache_[name];
  if (lastErr) throw lastErr;
  throw new Error('Concurrent append conflict in ' + name + '. Please retry.');
}
function wfEvidence_(d) {
  return wfHash_(JSON.stringify(['Student Key','Defence Type','Student Draft Link','Draft File Name','Result Scale','Result Status','Examiner 1 Report Link',
    'Examiner 2 Report Link','Examiner Report File','Final Thesis Link','Correction Matrix Link','Final Submission Received','Result Email Sent At','Panel Report Updated At']
    .map(function(h) { return wfText_(d[h]); })));
}
function wfDecision_(d) {
  const status = wfNorm_(d['Result Status']);
  const scale = wfText_(d['Result Scale']);
  const negative = ['not passed','fail','failed','re-examination','re examination','cancelled','deferred','withdrawn'];
  if (negative.indexOf(status) >= 0) return {code:status==='fail'||status==='failed'?'FAIL':status==='re-examination'||status==='re examination'?'REEXAM':'NO_PASS',pass:false,corrections:false,known:true};
  const codes = {
    'unconditional pass':'PASS','pass':'PASS','passed':'PASS',
    'conditional pass with minor corrections':'MINOR','conditional pass with major corrections':'MAJOR',
    'pass with minor corrections':'MINOR','pass with major corrections':'MAJOR',
    'minor corrections':'MINOR','major corrections':'MAJOR',
    'conditional pass':'MINOR'
  };
  const scaleCodes = {'Scale 1':'PASS','Scale 2':'MINOR','Scale 3':'MAJOR','Scale 4':'REEXAM','Scale 5':'FAIL'};
  const code = codes[status] || scaleCodes[scale] || 'UNKNOWN';
  // Conflicting legacy text and scale must be reviewed, not guessed.
  if (codes[status] && scaleCodes[scale] && codes[status] !== scaleCodes[scale]) return {code:'UNKNOWN',scale:scale,pass:false,corrections:false,known:false};
  // Unknown non-placeholder text does not get overridden by a scale.
  if (status && !codes[status] && status !== 'not recorded' && status !== 'pending' && status !== 'decided') return {code:'UNKNOWN',scale:scale,pass:false,corrections:false,known:false};
  return {code:code,scale:scale,pass:['PASS','MINOR','MAJOR'].indexOf(code)>=0,corrections:['MINOR','MAJOR'].indexOf(code)>=0,known:code!=='UNKNOWN'};
}
function wfNotice_(caseId, stage) {
  const notices = wfLedger_(WF_NOTICE_SHEET).filter(function(e) { return e.caseId===caseId && e.type==='NOTICE_SUBMITTED' && e.payload.stage===stage; });
  const notice = notices.length ? notices[notices.length-1] : null;
  if (!notice) return null;
  const reviews = wfLedger_(WF_EVENT_SHEET).filter(function(e) { return e.type==='NOTICE_REVIEWED' && e.payload.noticeId===notice.id; });
  const review = reviews.length ? reviews[reviews.length-1] : null;
  return {id:notice.id,stage:stage,at:notice.at,remarks:notice.payload.remarks||'',
    researchTitle:notice.payload.researchTitle||'',abstract:notice.payload.abstract||'',
    status:review?review.payload.decision:'Pending',
    reviewNote:review?review.payload.note:'',reviewedBy:review?review.actor:'',reviewedAt:review?review.at:''};
}
function wfModel_(d) {
  const id = wfText_(d['Case ID']), type = wfText_(d['Defence Type']);
  const events = wfLedger_(WF_EVENT_SHEET).filter(function(e) { return e.caseId===id; });
  const reopenIndex = events.reduce(function(n,e,i) { return (e.type==='REOPENED'||e.type==='OUTCOME_RESET')?i:n; },-1);
  const activeEvents = events.slice(reopenIndex+1);
  const decision = wfDecision_(d);
  const evidence = wfEvidence_(d);
  const deposits=wfLedger_(WF_NOTICE_SHEET).filter(function(e){return e.caseId===id&&e.type==='FINAL_DEPOSIT_SUBMITTED';});
  const deposit=deposits.length?deposits[deposits.length-1]:null;
  const verified = activeEvents.some(function(e) { return e.type==='VERIFIED' && e.payload.evidence===evidence; });
  const finalDeposit = activeEvents.some(function(e) { return e.type==='FINAL_DEPOSIT' && e.payload.evidence===evidence && (!deposit||e.payload.depositId===deposit.id); });
  const senate = activeEvents.find(function(e) { return e.type==='SENATE_APPROVED' && e.payload.evidence===evidence; });
  const complete = activeEvents.some(function(e) { return e.type==='PROGRAMME_COMPLETED' && e.payload.evidence===evidence; });
  const closed = wfNorm_(d['Case Status'])==='closed';
  const report = function(slot) {
    const link = wfText_(d[slot+' Report Link']);
    const status = wfNorm_(d[slot+' Report Status']);
    const hasDirectLink = Boolean(link && /^https?:\/\//i.test(link));
    const isSubmittedStatus = ['submitted','received','uploaded','complete','completed','verified'].indexOf(status) >= 0;
    const isPendingStatus = ['pending','awaiting submission','not submitted','unsubmitted'].indexOf(status) >= 0;
    const isStatusPending = isPendingStatus;
    if (hasDirectLink && !isPendingStatus) return true;
    if (isSubmittedStatus) return true;

    const panelReport = wfText_(d['Examiner Report File']);
    if (panelReport) {
      if (/Examiner\s*[12]/i.test(panelReport)) {
        const regex = new RegExp(slot + ':[^\\r\\n]*?(https?:\\/\\/[^\\s\\r\\n]+)', 'i');
        const m = panelReport.match(regex);
        if (m && m[1]) return true;
      } else if (/^https?:\/\//i.test(panelReport.trim()) && !isPendingStatus) {
        return true;
      }
    }
    return false;
  };
  const hasExaminer2 = Boolean(wfText_(d['Examiner 2']) || wfText_(d['Examiner 2 Email']));
  const reports = report('Examiner 1') && (hasExaminer2 ? report('Examiner 2') : true);
  const outcomeSent = wfIsOutcomeSent_(d);
  const corrEvents = activeEvents.filter(function(e) { return e.type==='CORRECTIONS_REVIEWED' || e.type==='CORRECTIONS_SUBMITTED'; });
  const latestCorrEvent = corrEvents.length ? corrEvents[corrEvents.length-1] : null;
  const correctionsChangesRequested = Boolean(latestCorrEvent && latestCorrEvent.type==='CORRECTIONS_REVIEWED' && latestCorrEvent.payload && latestCorrEvent.payload.decision==='Changes requested' && (!latestCorrEvent.payload.evidence || latestCorrEvent.payload.evidence === evidence));
  const correctionsReceived = !correctionsChangesRequested && (!!wfText_(d['Final Thesis Link']) || ['completed','endorsed'].indexOf(wfNorm_(d['Final Submission Status']))>=0 || wfNorm_(d['Endorsement Status'])==='endorsed') && (!decision.corrections || !!wfText_(d['Correction Matrix Link']));
  
  const sessNorm = wfNorm_(d['Session Status']);
  const sessionPassed = wfIsDatePassed_(d['Session Date'], d['End Time'] || d['Start Time']);
  const sessionConducted = ['completed','held','passed','conducted'].indexOf(sessNorm) >= 0 || (decision.known && decision.scale !== 'Not recorded' && !!decision.scale) || sessionPassed;
  const hasChair = Boolean(wfText_(d['Chairperson']) && wfText_(d['Chair Email']));
  const hasEx1 = Boolean(wfText_(d['Examiner 1']) && wfText_(d['Examiner 1 Email']));
  const hasEx2Slot = Boolean(wfText_(d['Examiner 2']) || wfText_(d['Examiner 2 Role']));
  const hasEx2 = !hasEx2Slot || Boolean(wfText_(d['Examiner 2']) && wfText_(d['Examiner 2 Email']));
  const panelAppointed = hasChair && hasEx1 && hasEx2;
  const sessionScheduled = Boolean(wfText_(d['Session Date']) && wfText_(d['Start Time']) && wfText_(d['End Time']));

  const missing = [];
  if (!reports) missing.push('required examiner reports');
  if (!decision.known) missing.push('unambiguous academic decision');
  if (!outcomeSent) missing.push('issued outcome notice');
  if (decision.corrections && !correctionsReceived) missing.push('revised document and correction matrix');
  if (decision.pass && !verified) missing.push('explicit verification of the current evidence');
  const stageComplete = closed && decision.pass && reports && outcomeSent && (!decision.corrections || correctionsReceived) && verified;
  const origin=events.find(function(e){return e.type==='STAGE_OPENED';});
  const ownNotice = wfNotice_(id,type) || (origin?wfNotice_(origin.payload.previousCaseId,type):null);
  const vivaNotice = type==='Proposal Defence'?wfNotice_(id,'Viva Voce'):null;
  const hasDraft = !!wfText_(d['Student Draft Link']);
  const requiresNotice=events.some(function(e){return e.type==='REGISTERED';})&&!origin&&!hasDraft;
  const tasks=[];
  function task(key,label,owner,tab,state,due) { tasks.push({key:key,label:label,owner:owner,tab:tab,state:state||'Ready',due:due||''}); }
  if (ownNotice && ownNotice.status==='Pending' && !hasDraft) task('notice_review','Review notice of intention','Administrator','overview');
  if (ownNotice && ownNotice.status==='Changes requested' && !hasDraft) task('notice_changes','Amend notice of intention','Student','overview','Waiting');
  if (!closed) {
    if(ownNotice&&ownNotice.status!=='Approved'&&!hasDraft) { /* The readiness task above comes first. */ }
    else if(requiresNotice&&!ownNotice) task('notice_submit','Submit notice of intention','Student','overview','Waiting');
    else if (!hasDraft) task('draft','Submit '+(type==='Viva Voce'?'thesis':'proposal'),'Student','documents','Waiting');
    else {
    if (!['Chairperson','Chair Email','Examiner 1','Examiner 1 Email'].every(function(h){return !!wfText_(d[h]);})) task('panel','Complete panel assignment','Administrator','session');
    if (!d['Session Date'] || !d['Start Time'] || !d['End Time']) task('schedule','Set session details','Administrator','session');
    else if (!sessionPassed) {
      if (['invitations sent','updated'].indexOf(wfNorm_(d['Calendar Invitation Status']))<0) task('calendar','Create calendar invitation','Administrator','session');
      if (wfNorm_(d['Invitation Email Status'])!=='sent') task('panel_notice','Send panel appointment emails and letters','Administrator','session');
      if (wfNorm_(d['Candidate Notice Status'])!=='sent') task('candidate_notice','Send candidate schedule notice','Administrator','session');
    }
    if (!reports) task('reports','Receive required examiner reports','Examiners','documents','Waiting');
    else if (!decision.known) task('outcome','Record academic decision','Chair / authorised officer','result','Waiting');
    else if (!outcomeSent) task('outcome_notice','Review and send outcome','Administrator','result');
    else if (!correctionsReceived) task('corrections','Submit revised document and correction matrix','Student','result','Waiting',d['Corrections Deadline']);
    else if (decision.pass && !verified) task('verify','Verify corrections and submission','Administrator','result');
    else task('close','Close defence stage','Administrator','result');
    }
  } else if (!stageComplete) task('legacy_review','Review closed-stage completion evidence','Administrator','result');
  if (vivaNotice && vivaNotice.status==='Pending') task('viva_notice_review','Review Viva notice of intention','Administrator','overview');
  if (stageComplete && type==='Viva Voce') {
    if (!finalDeposit) task('deposit',deposit||d['Final Thesis Link']?'Verify final deposit and clearance':'Submit final deposit',deposit||d['Final Thesis Link']?'Administrator':'Student','result',deposit||d['Final Thesis Link']?'Ready':'Waiting');
    else if (!senate) task('senate','Record Senate approval','Administrator','result');
    else if (!complete) task('programme_complete','Confirm programme completion','Administrator','result');
  }
  const adminTasks=tasks.filter(function(t){return t.owner==='Administrator' && t.state==='Ready';});

  let key='awaiting_draft',label='Awaiting submission';
  if(closed){
    key='closed';
    label=stageComplete?'Stage complete':'Closed · evidence review required';
  } else if(requiresNotice&&!ownNotice){
    key='notice_required';
    label='Notice of intention required';
  } else if(ownNotice && ownNotice.status!=='Approved'){
    key='notice_review';
    label=ownNotice.status==='Pending'?'Notice awaiting review':'Notice changes requested';
  } else if(!hasDraft){
    key='awaiting_draft';
    label='Awaiting draft submission';
  } else if(!panelAppointed || !sessionScheduled){
    key='panel_scheduling';
    label='Panel and scheduling';
  } else if(!sessionConducted){
    key='scheduled';
    label=tasks.some(function(t){return ['calendar','panel_notice','candidate_notice'].indexOf(t.key)>=0;})?'Arrangements incomplete':'Defence scheduled';
  } else if(!reports){
    key='awaiting_reports';
    label='Awaiting examiner reports';
  } else if(!outcomeSent){
    key='outcome_pending';
    label='Outcome pending';
  } else if(!correctionsReceived){
    key='corrections';
    label='Corrections in progress';
  } else {
    key='ready_to_close';
    label='Ready to close';
  }
  return {version:1,key:key,label:label,tasks:tasks,nextAdmin:adminTasks[0]||null,decision:decision,ownNotice:ownNotice,vivaNotice:vivaNotice,
    verified:verified,stageComplete:stageComplete,requiresNotice:requiresNotice,depositSubmission:deposit?{id:deposit.id,at:deposit.at,fileUrl:deposit.payload.fileUrl,fileName:deposit.payload.fileName}:null,finalDeposit:finalDeposit,senate:senate?{at:senate.at,actor:senate.actor,date:senate.payload.date,reference:senate.payload.reference}:null,
    programmeComplete:!!complete&&!!senate&&finalDeposit&&stageComplete,
    closeReady:missing.length===0,closeMissing:missing,evidence:evidence,
    canSubmitDraft:!closed && !outcomeSent && !verified && !wfText_(d['Examiner 1 Report Link']) && !wfText_(d['Examiner 2 Report Link']) && ['completed','held','passed'].indexOf(wfNorm_(d['Session Status']))<0 && wfNorm_(d['Submission Enabled'])==='yes' && (hasDraft || (ownNotice?ownNotice.status==='Approved':!requiresNotice)),
    canSubmitCorrections:!closed&&outcomeSent&&!correctionsReceived};
}
