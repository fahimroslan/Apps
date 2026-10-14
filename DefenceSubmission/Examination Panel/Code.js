const PANEL_CONFIG = {
  SPREADSHEET_ID: '1ammiqUyr03FoeLzpTTTUnlM_BMA1uLj6C-m1mYr4m-U',
  CASE_SHEET: 'Defence Cases',
  DIRECTORY_SHEET: 'Panel Directory',
  LOG_SHEET: 'Panel Report Log',
  SUPERVISION_SHEET: 'Supervision Logs',
  PROGRESS_SHEET: 'Progress Reports',
  STUDENT_MASTER_SHEET: 'Student Master',
  TEMPLATE_FILE_ID: '1GG2A1wvJULIx0LZzEBu_CH7Bm1akhiWi',
  HEADER_ROW: 3,
  MAX_FILE_BYTES: 8 * 1024 * 1024,
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
};

function doGet(e) {
  const template = HtmlService.createTemplateFromFile('Panel');
  template.directCase = (e && e.parameter) ? String(e.parameter.case || e.parameter.caseId || '').trim() : '';
  template.directToken = (e && e.parameter) ? String(e.parameter.token || '').trim() : '';
  template.directSlot = (e && e.parameter) ? String(e.parameter.slot || '').trim() : '';
  return template.evaluate()
    .setTitle('Research Management System — Supervisory & Examination Panel')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function generateExaminerDirectToken_(caseId, email, slot) {
  const salt = 'IUC_EXTERNAL_EXAMINER_SECURE_TOKEN_2026';
  const cleanId = String(caseId || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanSlot = String(slot || '').trim().toLowerCase();
  return wfHash_(cleanId + '|' + cleanEmail + '|' + cleanSlot + '|' + salt).substring(0, 32);
}

function getDirectExaminerContext(caseId, token, slotParam) {
  try {
    const cleanCaseId = String(caseId || '').trim();
    const cleanToken = String(token || '').trim();
    if (!cleanCaseId || !cleanToken) {
      return { ok: false, message: 'Invalid or missing examination link parameter.' };
    }

    const data = getCaseData_();
    const rowIndex = findCaseRow_(data, cleanCaseId);
    if (rowIndex < 0) {
      return { ok: false, message: 'The specified examination case (' + cleanCaseId + ') was not found.' };
    }

    const row = data.rows[rowIndex];
    if (isClosedCase_(data.col.caseStatus === undefined ? '' : row[data.col.caseStatus])) {
      return { ok: false, message: 'This examination case is officially closed.' };
    }

    const ex1Name = String(row[data.col.examiner1] || '').trim();
    const ex1Email = String(data.col.examiner1Email >= 0 ? row[data.col.examiner1Email] : '').trim();
    const ex1Role = String(data.col.examiner1Role >= 0 ? row[data.col.examiner1Role] : 'Examiner 1').trim() || 'Examiner 1';

    const ex2Name = String(row[data.col.examiner2] || '').trim();
    const ex2Email = String(data.col.examiner2Email >= 0 ? row[data.col.examiner2Email] : '').trim();
    const ex2Role = String(data.col.examiner2Role >= 0 ? row[data.col.examiner2Role] : 'Examiner 2').trim() || 'Examiner 2';

    let matchedSlot = null;
    let matchedName = '';
    let matchedEmail = '';
    let matchedRole = '';

    const token1 = ex1Email ? generateExaminerDirectToken_(cleanCaseId, ex1Email, 'examiner 1') : '';
    const token2 = ex2Email ? generateExaminerDirectToken_(cleanCaseId, ex2Email, 'examiner 2') : '';

    const slotStr = String(slotParam || '').trim().toLowerCase();
    if (slotStr === '1' || slotStr === 'examiner 1') {
      if (token1 && cleanToken === token1) matchedSlot = 'Examiner 1';
    } else if (slotStr === '2' || slotStr === 'examiner 2') {
      if (token2 && cleanToken === token2) matchedSlot = 'Examiner 2';
    } else {
      if (token1 && cleanToken === token1) matchedSlot = 'Examiner 1';
      else if (token2 && cleanToken === token2) matchedSlot = 'Examiner 2';
    }

    if (!matchedSlot) {
      return { ok: false, message: 'Access link expired or invalid for this examination case. Please contact the Secretariat for a fresh link.' };
    }

    if (matchedSlot === 'Examiner 1') {
      matchedName = ex1Name;
      matchedEmail = ex1Email;
      matchedRole = ex1Role;
    } else {
      matchedName = ex2Name;
      matchedEmail = ex2Email;
      matchedRole = ex2Role;
    }

    const sessionToken = Utilities.getUuid() + Utilities.getUuid();
    const cache = CacheService.getScriptCache();
    cache.put('FACULTY_SESSION_' + wfHash_(sessionToken), JSON.stringify({
      name: matchedName,
      email: wfNorm_(matchedEmail),
      slot: matchedSlot,
      caseId: cleanCaseId,
      expires: Date.now() + 21600000,
      isExternalDirect: true
    }), 21600);

    let formLink = '';
    try {
      formLink = ensureExaminerReportForm_(data, row, rowIndex, matchedSlot, matchedName);
    } catch (eForm) {
      console.warn('ensureExaminerReportForm_ warning: ' + eForm);
    }

    const isEx1 = matchedSlot === 'Examiner 1';
    const statusVal = String(row[isEx1 ? data.col.examiner1ReportStatus : data.col.examiner2ReportStatus] || '').trim();
    const linkVal = String(row[isEx1 ? data.col.examiner1ReportLink : data.col.examiner2ReportLink] || '').trim();
    const legacyRaw = String(row[data.col.legacyReport] || '').trim();
    let currentLink = linkVal;
    if (!currentLink && legacyRaw && legacyRaw.indexOf(matchedSlot) >= 0) {
      const m = legacyRaw.match(new RegExp(matchedSlot + ':[^\\n\\r]*?(https?:\\/\\/[^\\s\\n\\r]+)', 'i'));
      if (m) currentLink = m[1];
    }
    const isSubmitted = isReportSubmittedCheck_(statusVal, currentLink);

    const sDate = formatSheetValue_(row[data.col.sessionDate], 'yyyy-MM-dd');
    const sTime = data.col.startTime >= 0 ? formatSheetTime_(row[data.col.startTime]) : '';
    const eTime = data.col.endTime >= 0 ? formatSheetTime_(row[data.col.endTime]) : '';
    const defTypeStr = String(row[data.col.defenceType] || 'Proposal Defence');

    return {
      ok: true,
      sessionToken: sessionToken,
      isExternalDirect: true,
      caseId: cleanCaseId,
      studentName: String(row[data.col.studentName] || ''),
      studentKey: String(data.col.studentKey >= 0 ? row[data.col.studentKey] : cleanCaseId),
      programme: data.col.programme >= 0 ? String(row[data.col.programme] || '') : '',
      defenceType: defTypeStr,
      sessionDate: sDate,
      startTime: sTime,
      endTime: eTime,
      venue: data.col.venue >= 0 ? String(row[data.col.venue] || '') : '',
      googleMeetLink: data.col.googleMeetLink >= 0 ? String(row[data.col.googleMeetLink] || '') : '',
      researchTitle: String(row[data.col.researchTitle] || ''),
      studentDraftLink: String(row[data.col.studentDraftLink] || '').trim(),
      examinerName: matchedName,
      examinerEmail: matchedEmail,
      examinerRole: matchedRole,
      examinerSlot: matchedSlot,
      reportStatus: isSubmitted ? 'Submitted' : (statusVal || 'Not submitted'),
      reportSubmitted: Boolean(isSubmitted),
      reportFileUrl: currentLink,
      reportUpdatedAt: (data.col.panelReportUpdatedAt >= 0 && row[data.col.panelReportUpdatedAt])
        ? formatSheetValue_(row[data.col.panelReportUpdatedAt], 'dd MMM yyyy, h:mm a')
        : '',
      reportFormAvailable: Boolean(formLink)
    };
  } catch (err) {
    return { ok: false, message: err.message || String(err) };
  }
}


let _panelSs = null;
function getPanelSpreadsheet_() {
  if (!_panelSs) _panelSs = SpreadsheetApp.openById(PANEL_CONFIG.SPREADSHEET_ID);
  return _panelSs;
}

function getPanelNameSuggestions(query) {
  const q = normalise_(query || '');
  if (!q) return [];
  try {
    const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.DIRECTORY_SHEET);
    if (!sheet) return [];
    const dirRows = sheet.getDataRange().getDisplayValues();
    const suggestions = [];
    for (let i = 1; i < dirRows.length; i++) {
      const name = String(dirRows[i][0] || '').trim();
      const status = normalise_(dirRows[i][4]);
      if (name && status === 'active' && normalise_(name).indexOf(q) !== -1) {
        if (suggestions.indexOf(name) === -1) suggestions.push(name);
      }
    }
    return suggestions.sort().slice(0, 10);
  } catch (e) {
    return [];
  }
}

function panelContextByIdentity_(panelName, email) {
  try {
    const cleanName = String(panelName || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      return { ok: false, message: 'Please enter both your registered academic name and registered email address.' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { ok: false, message: 'Please enter a valid registered email address.' };
    }

    const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.DIRECTORY_SHEET);
    if (!sheet) throw new Error('Panel Directory sheet was not found.');
    const dirRows = sheet.getDataRange().getDisplayValues();
    const nameNorm = normalise_(cleanName);
    let matchedPanel = null;

    for (let i = 1; i < dirRows.length; i++) {
      const rowName = String(dirRows[i][0] || '').trim();
      const rowNorm = normalise_(rowName);
      const rowStatus = normalise_(dirRows[i][4]);
      const primary = String(dirRows[i][2] || '').trim().toLowerCase();
      const alternate = String(dirRows[i][3] || '').trim().toLowerCase();

      if (rowNorm === nameNorm) {
        if (primary === cleanEmail || alternate === cleanEmail) {
          if (rowStatus !== 'active') {
            return { ok: false, message: 'Your faculty profile is currently marked as ' + (dirRows[i][4] || 'Inactive') + '. Please contact the postgraduate administration office.' };
          }
          matchedPanel = {
            name: rowName,
            role: String(dirRows[i][1] || 'Academic Faculty').trim(),
            primaryEmail: primary,
            alternateEmail: alternate
          };
          break;
        }
      }
    }

    if (!matchedPanel) {
      return { ok: false, message: 'The provided name and email address do not match any active faculty member or examiner in the university directory.' };
    }

    const data = getCaseData_();
    const key = normalise_(matchedPanel.name);
    const assignedCases = [];
    const calendarEvents = [];
    const superviseesMap = {};

    const activeDir = getActivePanelDirectory_();
    function resolveEmail_(name, cellVal) {
      const c = String(cellVal || '').trim();
      if (c && c.indexOf('@') >= 0) return c;
      const k = normalise_(name);
      if (k && activeDir[k] && activeDir[k].email) return activeDir[k].email;
      return '';
    }

    // 1. Process Defence Cases for Examiner & Supervisor roles
    data.rows.forEach(function(row) {
      if (!row[data.col.caseId] || isClosedCase_(data.col.caseStatus === undefined ? '' : row[data.col.caseStatus])) return;
      
      const isEx1 = normalise_(row[data.col.examiner1]) === key;
      const isEx2 = normalise_(row[data.col.examiner2]) === key;
      const isChair = data.col.chairperson >= 0 && normalise_(row[data.col.chairperson]) === key;
      const isSupervisor = data.col.supervisor >= 0 && normalise_(row[data.col.supervisor]) === key;

      const caseIdStr = String(row[data.col.caseId]);
      const studentNameStr = String(row[data.col.studentName] || '');
      const progStr = data.col.programme >= 0 ? String(row[data.col.programme] || '').trim() : '';
      const sDate = formatSheetValue_(row[data.col.sessionDate], 'yyyy-MM-dd');
      const sTime = data.col.startTime >= 0 ? formatSheetTime_(row[data.col.startTime]) : '';
      const eTime = data.col.endTime >= 0 ? formatSheetTime_(row[data.col.endTime]) : '';
      const venueStr = data.col.venue >= 0 ? String(row[data.col.venue] || '').trim() : '';
      const meetLink = data.col.googleMeetLink >= 0 ? String(row[data.col.googleMeetLink] || '').trim() : '';
      const resTitle = String(row[data.col.researchTitle] || '');
      const supStr = data.col.supervisor >= 0 ? String(row[data.col.supervisor] || '').trim() : '';
      const chairStr = data.col.chairperson >= 0 ? String(row[data.col.chairperson] || '').trim() : '';
      const defTypeStr = String(row[data.col.defenceType] || '');
      const sessStatus = String(row[data.col.sessionStatus] || '');

      const chairEmailStr = resolveEmail_(chairStr, data.col.chairEmail >= 0 ? row[data.col.chairEmail] : '');
      const ex1Name = String(row[data.col.examiner1] || '').trim();
      const ex1Role = String(row[data.col.examiner1Role] || 'Examiner 1').trim();
      const ex1EmailStr = resolveEmail_(ex1Name, data.col.examiner1Email >= 0 ? row[data.col.examiner1Email] : '');

      const ex2Name = String(row[data.col.examiner2] || '').trim();
      const ex2Role = String(row[data.col.examiner2Role] || 'Examiner 2').trim();
      const ex2EmailStr = resolveEmail_(ex2Name, data.col.examiner2Email >= 0 ? row[data.col.examiner2Email] : '');

      const supEmailStr = resolveEmail_(supStr, data.col.supervisorEmail >= 0 ? row[data.col.supervisorEmail] : '');
      const stuEmailStr = data.col.studentEmail >= 0 ? String(row[data.col.studentEmail] || '').trim() : '';

      const status1 = String(row[data.col.examiner1ReportStatus] || '').trim();
      const status2 = String(row[data.col.examiner2ReportStatus] || '').trim();
      const link1 = String(row[data.col.examiner1ReportLink] || '').trim();
      const link2 = String(row[data.col.examiner2ReportLink] || '').trim();
      const legacyFile = String(row[data.col.legacyReport] || '').trim();

      let ex1ReportUrl = link1;
      let ex2ReportUrl = link2;
      if (!ex1ReportUrl && legacyFile && legacyFile.indexOf('Examiner 1') >= 0) {
        const m = legacyFile.match(/Examiner 1:[^\n\r]*?(https?:\/\/[^\s\n\r]+)/i);
        if (m) ex1ReportUrl = m[1];
      }
      if (!ex2ReportUrl && legacyFile && legacyFile.indexOf('Examiner 2') >= 0) {
        const m = legacyFile.match(/Examiner 2:[^\n\r]*?(https?:\/\/[^\s\n\r]+)/i);
        if (m) ex2ReportUrl = m[1];
      }

      // Accurate submission verification (avoids false-positives on 'Not submitted')
      const isEx1Submitted = isReportSubmittedCheck_(status1, ex1ReportUrl);
      const isEx2Submitted = isReportSubmittedCheck_(status2, ex2ReportUrl);
      let isSubmitted = isEx1 && isEx2 ? (isEx1Submitted && isEx2Submitted) : (isEx1 ? isEx1Submitted : (isEx2 ? isEx2Submitted : false));

      let myReportLink = isEx1 ? ex1ReportUrl : (isEx2 ? ex2ReportUrl : '');

      const reportUpdatedAt = (data.col.panelReportUpdatedAt >= 0 && row[data.col.panelReportUpdatedAt])
        ? formatSheetValue_(row[data.col.panelReportUpdatedAt], 'dd MMM yyyy, h:mm a')
        : '';

      const st1Display = isEx1Submitted ? (status1 || 'Submitted') : (status1 || 'Not submitted');
      const st2Display = isEx2Submitted ? (status2 || 'Submitted') : (status2 || 'Not submitted');
      const reportStatus = isEx1 && isEx2 
        ? (isEx1Submitted === isEx2Submitted ? (isEx1Submitted ? 'Submitted' : 'Not submitted') : 'Examiner 1: ' + st1Display + ' · Examiner 2: ' + st2Display) 
        : (isEx1 ? st1Display : (isEx2 ? st2Display : 'Not applicable'));
      const formLink = String((isEx1 ? row[data.col.examiner1FormLink] : (isEx2 ? row[data.col.examiner2FormLink] : '')) || '').trim();

      const resultScaleStr = (data.col.resultScale >= 0 && row[data.col.resultScale]) ? String(row[data.col.resultScale]).trim() : '';
      const resultStatusStr = (data.col.resultStatus >= 0 && row[data.col.resultStatus]) ? String(row[data.col.resultStatus]).trim() : '';
      const proofLinkStr = (data.col.sessionProofLink >= 0 && row[data.col.sessionProofLink]) ? String(row[data.col.sessionProofLink]).trim() : '';
      const notesStr = (data.col.notes >= 0 && row[data.col.notes]) ? String(row[data.col.notes]).trim() : '';
      const hasValidScale = Boolean(resultScaleStr && normalise_(resultScaleStr) !== 'not recorded');
      const isSessionCompleted = hasValidScale && (normalise_(sessStatus) === 'completed' || normalise_(resultStatusStr) === 'decided' || normalise_(resultStatusStr) === 'completed');

      // Check Examiner Appointment
      if (isEx1 || isEx2 || isChair) {
        const slot = isEx1 && isEx2 ? 'Examiner 1 and Examiner 2' : (isEx1 ? 'Examiner 1' : (isEx2 ? 'Examiner 2' : 'Chairperson'));
        const roles = [];
        if (isEx1) roles.push(String(row[data.col.examiner1Role] || matchedPanel.role || 'Examiner 1'));
        if (isEx2) {
          const role2 = String(row[data.col.examiner2Role] || matchedPanel.role || 'Examiner 2');
          if (roles.indexOf(role2) === -1) roles.push(role2);
        }
        if (isChair && roles.indexOf('Chairperson') === -1) roles.push('Chairperson');
        const roleLabel = roles.join(' / ');
        const isChairOnly = Boolean(isChair && !isEx1 && !isEx2);

        assignedCases.push({
          caseId: caseIdStr,
          studentName: studentNameStr,
          studentEmail: stuEmailStr,
          programme: progStr,
          defenceType: defTypeStr,
          sessionDate: sDate,
          startTime: sTime,
          endTime: eTime,
          venue: venueStr,
          googleMeetLink: meetLink,
          sessionStatus: sessStatus,
          slot: slot,
          role: roleLabel,
          isChair: Boolean(isChair),
          isExaminer: Boolean(isEx1 || isEx2),
          isChairOnly: isChairOnly,
          isSupervisorOnly: false,
          examiner1Name: ex1Name,
          examiner1Role: ex1Role,
          examiner1Email: ex1EmailStr,
          examiner1ReportStatus: st1Display,
          examiner1ReportLink: ex1ReportUrl,
          examiner1Submitted: Boolean(isEx1Submitted),
          examiner2Name: ex2Name,
          examiner2Role: ex2Role,
          examiner2Email: ex2EmailStr,
          examiner2ReportStatus: st2Display,
          examiner2ReportLink: ex2ReportUrl,
          examiner2Submitted: Boolean(isEx2Submitted),
          reportStatus: String(reportStatus),
          reportSubmitted: Boolean(isSubmitted),
          reportFileUrl: myReportLink,
          reportUpdatedAt: reportUpdatedAt,
          hasFolder: Boolean(row[data.col.folderId]),
          hasDraft: Boolean(row[data.col.studentDraftLink]),
          studentDraftLink: String(row[data.col.studentDraftLink] || '').trim(),
          researchTitle: resTitle,
          supervisor: supStr,
          supervisorEmail: supEmailStr,
          chairperson: chairStr,
          chairpersonEmail: chairEmailStr,
          reportFormAvailable: Boolean(formLink || (row[data.col.folderId] && row[data.col.studentDraftLink])),
          resultScale: resultScaleStr,
          resultStatus: resultStatusStr,
          sessionProofLink: proofLinkStr,
          notes: notesStr,
          correctionsDeadline: (data.col.correctionsDeadline >= 0) ? formatSheetValue_(row[data.col.correctionsDeadline], 'yyyy-MM-dd') : '',
          isSessionCompleted: isSessionCompleted
        });

        if (sDate) {
          calendarEvents.push({
            id: caseIdStr,
            caseId: caseIdStr,
            studentName: studentNameStr,
            studentEmail: stuEmailStr,
            programme: progStr,
            researchTitle: resTitle,
            type: (defTypeStr.toLowerCase().indexOf('viva') >= 0) ? 'viva' : 'proposal',
            defenceType: defTypeStr,
            date: sDate,
            startTime: sTime,
            endTime: eTime,
            venue: venueStr,
            googleMeetLink: meetLink,
            slot: slot,
            role: roleLabel,
            isChair: Boolean(isChair),
            isExaminer: Boolean(isEx1 || isEx2),
            isChairOnly: isChairOnly,
            isSupervisorOnly: false,
            examiner1Name: ex1Name,
            examiner1Role: ex1Role,
            examiner1Email: ex1EmailStr,
            examiner1ReportStatus: st1Display,
            examiner1ReportLink: ex1ReportUrl,
            examiner1Submitted: Boolean(isEx1Submitted),
            examiner2Name: ex2Name,
            examiner2Role: ex2Role,
            examiner2Email: ex2EmailStr,
            examiner2ReportStatus: st2Display,
            examiner2ReportLink: ex2ReportUrl,
            examiner2Submitted: Boolean(isEx2Submitted),
            reportStatus: String(reportStatus),
            reportSubmitted: Boolean(isSubmitted),
            reportFileUrl: myReportLink,
            reportUpdatedAt: reportUpdatedAt,
            sessionStatus: sessStatus,
            resultScale: resultScaleStr,
            resultStatus: resultStatusStr,
            sessionProofLink: proofLinkStr,
            isSessionCompleted: isSessionCompleted,
            supervisor: supStr,
            supervisorEmail: supEmailStr,
            chairperson: chairStr,
            chairpersonEmail: chairEmailStr
          });
        }
      } else if (isSupervisor) {
        // Appointed as Supervisor for this defence case
        assignedCases.push({
          caseId: caseIdStr,
          studentName: studentNameStr,
          studentEmail: stuEmailStr,
          programme: progStr,
          defenceType: defTypeStr,
          sessionDate: sDate,
          startTime: sTime,
          endTime: eTime,
          venue: venueStr,
          googleMeetLink: meetLink,
          sessionStatus: sessStatus,
          slot: 'Supervisor',
          role: 'Main Supervisor',
          isChair: false,
          isExaminer: false,
          isChairOnly: false,
          isSupervisorOnly: true,
          examiner1Name: ex1Name,
          examiner1Role: ex1Role,
          examiner1Email: ex1EmailStr,
          examiner1ReportStatus: st1Display,
          examiner1ReportLink: ex1ReportUrl,
          examiner1Submitted: Boolean(isEx1Submitted),
          examiner2Name: ex2Name,
          examiner2Role: ex2Role,
          examiner2Email: ex2EmailStr,
          examiner2ReportStatus: st2Display,
          examiner2ReportLink: ex2ReportUrl,
          examiner2Submitted: Boolean(isEx2Submitted),
          reportStatus: String(reportStatus),
          reportSubmitted: Boolean(isSubmitted),
          reportFileUrl: '',
          reportUpdatedAt: reportUpdatedAt,
          hasFolder: Boolean(row[data.col.folderId]),
          hasDraft: Boolean(row[data.col.studentDraftLink]),
          studentDraftLink: String(row[data.col.studentDraftLink] || '').trim(),
          researchTitle: resTitle,
          supervisor: supStr,
          supervisorEmail: supEmailStr,
          chairperson: chairStr,
          chairpersonEmail: chairEmailStr,
          reportFormAvailable: false
        });
      }

      // Check Supervisor Assignment for Supervisees Tab
      if (isSupervisor) {
        const studentNorm = normalise_(studentNameStr);
        if (studentNorm && !superviseesMap[studentNorm]) {
          superviseesMap[studentNorm] = {
            studentKey: caseIdStr,
            caseId: caseIdStr,
            studentName: studentNameStr,
            programme: progStr,
            researchTitle: resTitle,
            stage: defTypeStr || 'Proposal Defence',
            folderId: String(row[data.col.folderId] || '').trim(),
            hasFolder: Boolean(row[data.col.folderId]),
            studentDraftLink: String(row[data.col.studentDraftLink] || '').trim(),
            sessionDate: sDate,
            sessionStatus: sessStatus
          };
        }
      }
    });

    // Also check Student Master sheet for supervisees if exists
    try {
      const masterSheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.STUDENT_MASTER_SHEET);
      if (masterSheet && masterSheet.getLastRow() > 1) {
        const mHeaders = masterSheet.getRange(1, 1, 1, masterSheet.getLastColumn()).getDisplayValues()[0];
        const mIdx = {};
        mHeaders.forEach(function(h, i) { mIdx[String(h).trim()] = i; });
        if (mIdx['Student Name'] !== undefined && mIdx['Supervisor'] !== undefined) {
          const mRows = masterSheet.getRange(2, 1, masterSheet.getLastRow() - 1, masterSheet.getLastColumn()).getDisplayValues();
          mRows.forEach(function(mRow) {
            const sName = String(mRow[mIdx['Student Name']] || '').trim();
            const supName = String(mRow[mIdx['Supervisor']] || '').trim();
            if (sName && normalise_(supName) === key) {
              const sNorm = normalise_(sName);
              if (!superviseesMap[sNorm]) {
                const sKey = mIdx['Student Key'] !== undefined ? String(mRow[mIdx['Student Key']] || '') : '';
                const prog = mIdx['Programme'] !== undefined ? String(mRow[mIdx['Programme']] || '') : '';
                const title = mIdx['Research Title'] !== undefined ? String(mRow[mIdx['Research Title']] || '') : '';
                const stage = mIdx['Current Stage'] !== undefined ? String(mRow[mIdx['Current Stage']] || '') : 'Research Candidature';
                const folder = mIdx['Folder ID'] !== undefined ? String(mRow[mIdx['Folder ID']] || '') : '';
                superviseesMap[sNorm] = {
                  studentKey: sKey,
                  caseId: sKey,
                  studentName: sName,
                  programme: prog,
                  researchTitle: title,
                  stage: stage,
                  folderId: folder,
                  hasFolder: Boolean(folder),
                  studentDraftLink: '',
                  sessionDate: '',
                  sessionStatus: ''
                };
              }
            }
          });
        }
      }
    } catch (ignored) {}

    const superviseesList = Object.keys(superviseesMap).map(function(k) { return superviseesMap[k]; });
    superviseesList.sort(function(a, b) { return a.studentName.localeCompare(b.studentName); });

    // 2. Fetch Supervision Logs
    const supervisionLogs = getSupervisionLogsForSupervisor_(key, superviseesList);

    // 3. Fetch Progress Reports
    const progressReports = getProgressReportsForSupervisor_(key, superviseesList);

    assignedCases.sort(function(a, b) {
      return String(b.sessionDate).localeCompare(String(a.sessionDate)) || a.studentName.localeCompare(b.studentName);
    });

    calendarEvents.sort(function(a, b) {
      return String(a.date).localeCompare(String(b.date)) || String(a.startTime).localeCompare(String(b.startTime));
    });

    const isSupervisor = superviseesList.length > 0;
    const isExaminer = assignedCases.length > 0;

    let pendingReportsCount = 0;
    let submittedReportsCount = 0;
    assignedCases.forEach(function(c) {
      if (c.isChairOnly || c.isSupervisorOnly) {
        // Appointed Chairperson and Supervisors do not submit individual examiner reports
        return;
      }
      if (c.reportSubmitted) {
        submittedReportsCount++;
      } else {
        pendingReportsCount++;
      }
    });

    let pendingProgressCount = 0;
    progressReports.forEach(function(p) {
      const st = String(p.status || '').toLowerCase();
      if (st.indexOf('under review') >= 0 || st.indexOf('submitted') >= 0 || !p.supervisorRemarks) {
        pendingProgressCount++;
      }
    });

    const todayStr = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd');
    const upcomingEvents = calendarEvents.filter(function(ev) { return ev.date >= todayStr; });
    const nextSession = upcomingEvents.length ? upcomingEvents[0] : (calendarEvents.length ? calendarEvents[calendarEvents.length - 1] : null);

    return {
      ok: true,
      panel: matchedPanel,
      isSupervisor: isSupervisor,
      isExaminer: isExaminer,
      cases: assignedCases,
      calendarEvents: calendarEvents,
      supervisees: superviseesList,
      supervisionLogs: supervisionLogs,
      progressReports: progressReports,
      metrics: {
        totalCases: assignedCases.length,
        pendingReports: pendingReportsCount,
        submittedReports: submittedReportsCount,
        nextSessionDate: nextSession ? (nextSession.date + (nextSession.startTime ? ' (' + nextSession.startTime + ')' : '')) : 'No scheduled sessions',
        nextSessionCandidate: nextSession ? nextSession.studentName : '-',
        totalSupervisees: superviseesList.length,
        totalSupervisionLogs: supervisionLogs.length,
        pendingProgressReports: pendingProgressCount
      }
    };
  } catch (error) {
    return { ok: false, message: error.message || String(error) };
  }
}

function getSupervisionLogsForSupervisor_(supervisorKey, supervisees) {
  try {
    const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.SUPERVISION_SHEET);
    if (!sheet || sheet.getLastRow() < 2) return [];

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getDisplayValues();
    const superviseeNames = {};
    supervisees.forEach(function(s) { superviseeNames[normalise_(s.studentName)] = true; });

    const logs = [];
    values.forEach(function(row, idx) {
      const rowSup = normalise_(row[4]);
      const rowName = normalise_(row[3]);
      const isMatch = (rowSup && rowSup === supervisorKey) || superviseeNames[rowName];

      if (isMatch) {
        logs.push({
          rowIndex: idx + 2,
          logId: row[0] || ('SUP-' + (idx + 1)),
          timestamp: row[1],
          studentKey: row[2],
          studentName: row[3],
          supervisor: row[4],
          meetingDate: row[5],
          meetingMode: row[6] || 'Online (Google Meet)',
          topics: row[7] || '',
          actions: row[8] || '',
          nextMeetingDate: row[9] || '',
          recordedBy: row[10] || 'Candidate',
          endorsementStatus: row[11] || 'Pending Verification',
          supervisorRemarks: row[12] || '',
          endorsedAt: row[13] || ''
        });
      }
    });

    return logs.reverse();
  } catch (e) {
    return [];
  }
}

function getProgressReportsForSupervisor_(supervisorKey, supervisees) {
  try {
    const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.PROGRESS_SHEET);
    if (!sheet || sheet.getLastRow() < 2) return [];

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getDisplayValues();
    const superviseeNames = {};
    supervisees.forEach(function(s) { superviseeNames[normalise_(s.studentName)] = true; });

    const reports = [];
    values.forEach(function(row, idx) {
      const rowSup = normalise_(row[5]);
      const rowName = normalise_(row[3]);
      const isMatch = (rowSup && rowSup === supervisorKey) || superviseeNames[rowName];

      if (isMatch) {
        reports.push({
          rowIndex: idx + 2,
          reportId: row[0] || ('PROG-' + (idx + 1)),
          timestamp: row[1],
          studentKey: row[2],
          studentName: row[3],
          programme: row[4],
          supervisor: row[5],
          period: row[6],
          milestones: row[7],
          challenges: row[8],
          nextPlan: row[9],
          attachmentUrl: row[10],
          status: row[11] || 'Submitted — Under Review',
          supervisorRemarks: row[12] || '',
          supervisorRating: row[13] || '',
          endorsedAt: row[14] || ''
        });
      }
    });

    return reports.reverse();
  } catch (e) {
    return [];
  }
}

function endorseSupervisionLog(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    panelAuthorize_(payload);
    if (!payload || !payload.logId) throw new Error('Meeting Log ID is required.');
    const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.SUPERVISION_SHEET);
    if (!sheet || sheet.getLastRow() < 2) throw new Error('Supervision logs sheet not found.');

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.max(14, sheet.getLastColumn())).getDisplayValues();
    let targetRow = -1;
    for (let i = 0; i < values.length; i++) {
      if (String(values[i][0]).trim() === String(payload.logId).trim()) {
        targetRow = i + 2;
        break;
      }
    }

    if (targetRow < 0) throw new Error('Meeting log record not found: ' + payload.logId);

    panelAssertSupervisor_(String(values[targetRow-2][2]||'').trim(),payload.panelName);
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
    const status = payload.endorsementStatus || 'Verified by Supervisor';
    const remarks = payload.supervisorRemarks || '';

    sheet.getRange(targetRow, 12).setValue(status);
    sheet.getRange(targetRow, 13).setValue(remarks);
    sheet.getRange(targetRow, 14).setValue(nowStr);
    SpreadsheetApp.flush();

    return {
      ok: true,
      logId: payload.logId,
      endorsementStatus: status,
      supervisorRemarks: remarks,
      endorsedAt: nowStr
    };
  } finally {
    lock.releaseLock();
  }
}

function logSupervisorMeetingDirect(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    panelAuthorize_(payload);
    if (!payload) throw new Error('No consultation data received.');
    panelAssertSupervisor_(payload.studentKey,payload.panelName);
    const studentName = String(payload.studentName || '').trim();
    const supervisor = String(payload.supervisor || payload.panelName || '').trim();
    const meetingDate = String(payload.meetingDate || '').trim();
    const meetingMode = String(payload.meetingMode || 'In-Person Consultation').trim();
    const topics = String(payload.topics || '').trim();
    const actions = String(payload.actions || '').trim();
    const nextMeetingDate = String(payload.nextMeetingDate || '').trim();
    const remarks = String(payload.remarks || '').trim();

    if (!studentName) throw new Error('Student name is required.');
    if (!meetingDate) throw new Error('Meeting date is required.');
    if (!topics) throw new Error('Consultation topics are required.');

    const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.SUPERVISION_SHEET);
    if (!sheet) throw new Error('Supervision logs sheet not found.');

    const now = new Date();
    const timestamp = Utilities.formatDate(now, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
    const logId = 'SUP-' + Utilities.formatDate(now, 'Asia/Kuala_Lumpur', 'yyyyMMdd-HHmmss');

    sheet.appendRow([
      logId,
      timestamp,
      payload.studentKey || '',
      studentName,
      supervisor,
      meetingDate,
      meetingMode,
      topics,
      actions,
      nextMeetingDate,
      'Supervisor',
      'Verified by Supervisor',
      remarks,
      timestamp
    ]);
    SpreadsheetApp.flush();

    return {
      ok: true,
      logId: logId,
      timestamp: timestamp,
      message: 'Consultation session logged and verified successfully.'
    };
  } finally {
    lock.releaseLock();
  }
}

function evaluateProgressReport(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    panelAuthorize_(payload);
    if (!payload || !payload.reportId) throw new Error('Report ID is required.');
    const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.PROGRESS_SHEET);
    if (!sheet || sheet.getLastRow() < 2) throw new Error('Progress Reports sheet not found.');

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.max(15, sheet.getLastColumn())).getDisplayValues();
    let targetRow = -1;
    for (let i = 0; i < values.length; i++) {
      if (String(values[i][0]).trim() === String(payload.reportId).trim()) {
        targetRow = i + 2;
        break;
      }
    }

    if (targetRow < 0) throw new Error('Progress report record not found: ' + payload.reportId);

    panelAssertSupervisor_(String(values[targetRow-2][2]||'').trim(),payload.panelName);
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
    const rating = payload.rating || 'Satisfactory';
    const status = payload.status || ('Endorsed — ' + rating);
    const remarks = payload.remarks || '';

    sheet.getRange(targetRow, 12).setValue(status);
    sheet.getRange(targetRow, 13).setValue(remarks);
    sheet.getRange(targetRow, 14).setValue(rating);
    sheet.getRange(targetRow, 15).setValue(nowStr);
    SpreadsheetApp.flush();

    return {
      ok: true,
      reportId: payload.reportId,
      status: status,
      rating: rating,
      remarks: remarks,
      endorsedAt: nowStr
    };
  } finally {
    lock.releaseLock();
  }
}

function getPanelBootstrap(sessionToken) {
  panelSession_(sessionToken);
  const directory = getActivePanelDirectory_();
  const cases = getCaseData_();
  const assigned = {};
  cases.rows.forEach(function(row) {
    if (!row[cases.col.caseId] || isClosedCase_(cases.col.caseStatus === undefined ? '' : row[cases.col.caseStatus])) return;
    [row[cases.col.examiner1], row[cases.col.examiner2], row[cases.col.supervisor]].forEach(function(name) {
      const key = normalise_(name);
      if (key && directory[key]) assigned[directory[key].name] = true;
    });
  });
  return {
    panels: Object.keys(assigned).sort(function(a, b) { return a.localeCompare(b); }),
    maxFileMb: PANEL_CONFIG.MAX_FILE_BYTES / 1024 / 1024,
    allowedTypes: 'PDF, DOC or DOCX'
  };
}

function getPanelCases(panelName,sessionToken) {
  panelAuthorize_({panelName:panelName,sessionToken:sessionToken});
  const panel = assertActivePanel_(panelName);
  const data = getCaseData_();
  const key = normalise_(panel.name);
  const results = [];
  data.rows.forEach(function(row) {
    if (!row[data.col.caseId] || isClosedCase_(data.col.caseStatus === undefined ? '' : row[data.col.caseStatus])) return;
    const isExaminer1 = normalise_(row[data.col.examiner1]) === key;
    const isExaminer2 = normalise_(row[data.col.examiner2]) === key;
    if (!isExaminer1 && !isExaminer2) return;
    const slot = isExaminer1 && isExaminer2 ? 'Examiner 1 and Examiner 2' : (isExaminer1 ? 'Examiner 1' : 'Examiner 2');
    const roles = [];
    if (isExaminer1) roles.push(String(row[data.col.examiner1Role] || panel.role || 'Examiner 1'));
    if (isExaminer2) {
      const role2 = String(row[data.col.examiner2Role] || panel.role || 'Examiner 2');
      if (roles.indexOf(role2) === -1) roles.push(role2);
    }
    const role = roles.join(' / ');
    const status1 = String(row[data.col.examiner1ReportStatus] || 'Not submitted');
    const status2 = String(row[data.col.examiner2ReportStatus] || 'Not submitted');
    const reportStatus = isExaminer1 && isExaminer2 ? (status1 === status2 ? status1 : 'Examiner 1: ' + status1 + ' · Examiner 2: ' + status2) : (isExaminer1 ? status1 : status2);
    const formLink = String((isExaminer1 ? row[data.col.examiner1FormLink] : row[data.col.examiner2FormLink]) || '').trim();
    results.push({
      caseId: String(row[data.col.caseId]),
      studentName: String(row[data.col.studentName] || ''),
      defenceType: String(row[data.col.defenceType] || ''),
      sessionDate: formatSheetValue_(row[data.col.sessionDate], 'yyyy-MM-dd'),
      sessionStatus: String(row[data.col.sessionStatus] || ''),
      slot: slot,
      role: String(role),
      reportStatus: String(reportStatus),
      hasFolder: Boolean(row[data.col.folderId]),
      reportFormAvailable: Boolean(formLink || (row[data.col.folderId] && row[data.col.studentDraftLink]))
    });
  });
  results.sort(function(a, b) {
    return String(b.sessionDate).localeCompare(String(a.sessionDate)) || a.studentName.localeCompare(b.studentName);
  });
  return { panelName: panel.name, cases: results };
}

function getExaminerReportTemplate(panelName, caseId, sessionToken) {
  panelAuthorize_({panelName:panelName,sessionToken:sessionToken});
  const panel = assertActivePanel_(panelName);
  if (!caseId) throw new Error('Please select a student before downloading the template.');

  const data = getCaseData_();
  const rowIndex = findCaseRow_(data, caseId);
  if (rowIndex < 0) throw new Error('The selected case no longer exists.');

  const row = data.rows[rowIndex];
  const panelKey = normalise_(panel.name);
  const isExaminer1 = normalise_(row[data.col.examiner1]) === panelKey;
  const isExaminer2 = normalise_(row[data.col.examiner2]) === panelKey;
  if (!isExaminer1 && !isExaminer2) throw new Error('This student is not assigned to the selected panel member.');
  if (isClosedCase_(data.col.caseStatus === undefined ? '' : row[data.col.caseStatus])) throw new Error('This case is closed.');

  const slot = isExaminer1 ? 'Examiner 1' : 'Examiner 2';
  const formLink = ensureExaminerReportForm_(data, row, rowIndex, slot, panel.name);
  const fileId = extractDriveFileId_(formLink);
  if (!fileId) throw new Error('The prefilled examiner report form is not available. Please contact administration.');
  const file = DriveApp.getFileById(fileId);
  const blob = file.getBlob();

  return {
    fileName: file.getName(),
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    base64Data: Utilities.base64Encode(blob.getBytes())
  };
}

function ensureExaminerReportForm_(data, row, rowIndex, slot, examinerName) {
  const formColumn = slot === 'Examiner 1' ? data.col.examiner1FormLink : data.col.examiner2FormLink;
  const currentLink = String(row[formColumn] || '').trim();
  const currentId = extractDriveFileId_(currentLink);
  if (currentId) {
    try {
      const existing = DriveApp.getFileById(currentId);
      if (/Report Form v2\.docx$/i.test(existing.getName())) return existing.getUrl();
    } catch (ignored) {}
  }

  const folderId = String(row[data.col.folderId] || '').trim();
  const draftLink = String(row[data.col.studentDraftLink] || '').trim();
  if (!folderId || !draftLink) return '';

  const blob = createPrefilledExaminerReportBlob_(
    String(row[data.col.caseId]),
    String(row[data.col.studentName] || ''),
    String(row[data.col.researchTitle] || ''),
    examinerName || '',
    slot
  );
  const file = DriveApp.getFolderById(folderId).createFile(blob);
  const fileUrl = file.getUrl();
  const sheetRow = PANEL_CONFIG.HEADER_ROW + 1 + rowIndex;
  data.sheet.getRange(sheetRow, formColumn + 1).setValue(fileUrl);
  row[formColumn] = fileUrl;
  return fileUrl;
}

function createPrefilledExaminerReportBlob_(caseId, studentName, researchTitle, examinerName, slot) {
  const template = DriveApp.getFileById(PANEL_CONFIG.TEMPLATE_FILE_ID);
  const templateZip = Utilities.newBlob(template.getBlob().getBytes(), 'application/zip', template.getName());
  const parts = Utilities.unzip(templateZip);
  let documentFound = false;

  parts.forEach(function(part) {
    if (part.getName() !== 'word/document.xml') return;
    documentFound = true;
    let xml = part.getDataAsString('UTF-8');
    xml = fillWordShape_(xml, 'Rectangle 385590028', studentName, 20);
    xml = fillWordShape_(xml, 'Rectangle 385590000', researchTitle, 18);
    xml = fillWordShape_(xml, 'Rectangle 385589997', examinerName || 'To be assigned', 18);
    part.setDataFromString(xml, 'UTF-8');
  });

  if (!documentFound) throw new Error('The examiner report template is not a valid Word document.');
  const fileName = sanitiseFileName_(caseId + ' - ' + studentName + ' - ' + slot + ' Report Form v2') + '.docx';
  return Utilities.zip(parts, fileName).setName(fileName);
}

function fillWordShape_(xml, shapeName, value, fontHalfPoints) {
  const escapedShape = String(shapeName).replace(/[.*+?^$\{}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp('(<wp:docPr\\b(?=[^>]*\\bname="' + escapedShape + '")[^>]*\\/>[\\s\\S]*?<wps:txbx>\\s*<w:txbxContent>)[\\s\\S]*?(<\\/w:txbxContent>)'),
    new RegExp('(<v:(?:rect|shape)\\b(?=[^>]*\\bid="' + escapedShape + '")[^>]*>[\\s\\S]*?<v:textbox\\b[^>]*>\\s*<w:txbxContent>)[\\s\\S]*?(<\\/w:txbxContent>)')
  ];
  let count = 0;
  const escaped = escapeXml_(value || '');
  const content = '<w:p><w:pPr><w:spacing w:before="0" w:after="0"/><w:jc w:val="left"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Arial" w:eastAsia="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:color w:val="000000"/><w:sz w:val="' + fontHalfPoints + '"/><w:szCs w:val="' + fontHalfPoints + '"/></w:rPr><w:t xml:space="preserve">' + escaped + '</w:t></w:r></w:p>';
  patterns.forEach(function(pattern) {
    xml = xml.replace(pattern, function(match, prefix, suffix) {
      count++;
      return prefix + content + suffix;
    });
  });
  if (count !== 2) throw new Error('Template input field was not found correctly: ' + shapeName);
  return xml;
}

function escapeXml_(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function extractDriveFileId_(value) {
  const match = String(value || '').match(/[-\w]{20,}/);
  return match ? match[0] : '';
}

function uploadExaminerReport(payload) {
  const started = new Date();
  let logContext = {
    panelName: payload && payload.panelName,
    caseId: payload && payload.caseId,
    originalName: payload && payload.fileName
  };
  try {
    panelAuthorize_(payload);
    if (!payload) throw new Error('No submission was received.');
    const panel = assertActivePanel_(payload.panelName);
    if (!payload.caseId) throw new Error('Please select a student.');
    if (!payload.fileName || !payload.base64Data || !payload.mimeType) throw new Error('Please attach an examiner report.');
    if (PANEL_CONFIG.ALLOWED_MIME_TYPES.indexOf(payload.mimeType) === -1) throw new Error('Only PDF, DOC and DOCX files are accepted.');

    const throttleKey = 'upload_' + digest_(panel.name + '|' + payload.caseId);
    const cache = CacheService.getScriptCache();
    if (cache.get(throttleKey)) throw new Error('Please wait 30 seconds before submitting another report for this student.');

    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      const data = getCaseData_();
      const rowIndex = findCaseRow_(data, payload.caseId);
      if (rowIndex < 0) throw new Error('The selected case no longer exists.');
      const row = data.rows[rowIndex];
      const panelKey = normalise_(panel.name);
      const isExaminer1 = normalise_(row[data.col.examiner1]) === panelKey;
      const isExaminer2 = normalise_(row[data.col.examiner2]) === panelKey;
      if (!isExaminer1 && !isExaminer2) {
        if (data.col.chairperson >= 0 && normalise_(row[data.col.chairperson]) === panelKey) {
          throw new Error('As the appointed Chairperson, you do not upload an individual evaluation report. You can review the examiners\' submitted reports in the panel review hub.');
        }
        throw new Error('This student is not assigned to the selected panel.');
      }
      if (isClosedCase_(data.col.caseStatus === undefined ? '' : row[data.col.caseStatus])) throw new Error('This case is closed for panel report submission.');

      const st1 = String(row[data.col.examiner1ReportStatus] || '').trim();
      const st2 = String(row[data.col.examiner2ReportStatus] || '').trim();
      const link1 = String(row[data.col.examiner1ReportLink] || '').trim();
      const link2 = String(row[data.col.examiner2ReportLink] || '').trim();
      const legacyRaw = String(row[data.col.legacyReport] || '').trim();
      let currentEx1Link = link1;
      let currentEx2Link = link2;
      if (!currentEx1Link && legacyRaw && legacyRaw.indexOf('Examiner 1') >= 0) {
        const m = legacyRaw.match(/Examiner 1:[^\n\r]*?(https?:\/\/[^\s\n\r]+)/i);
        if (m) currentEx1Link = m[1];
      }
      if (!currentEx2Link && legacyRaw && legacyRaw.indexOf('Examiner 2') >= 0) {
        const m = legacyRaw.match(/Examiner 2:[^\n\r]*?(https?:\/\/[^\s\n\r]+)/i);
        if (m) currentEx2Link = m[1];
      }

      const isEx1Done = isReportSubmittedCheck_(st1, currentEx1Link);
      const isEx2Done = isReportSubmittedCheck_(st2, currentEx2Link);
      const alreadySubmitted = isExaminer1 && isExaminer2
        ? (isEx1Done && isEx2Done)
        : (isExaminer1 ? isEx1Done : isEx2Done);
      if (alreadySubmitted) {
        throw new Error('You have already submitted an evaluation report for this candidate. Report submission is now disabled and locked. Please contact the Secretariat if an amendment is required.');
      }

      const folderId = String(row[data.col.folderId] || '').trim();
      if (!folderId) throw new Error('The student folder has not been created. Please contact the administrator.');

      const bytes = Utilities.base64Decode(payload.base64Data);
      if (!bytes.length) throw new Error('The selected file is empty.');
      if (bytes.length > PANEL_CONFIG.MAX_FILE_BYTES) throw new Error('The file exceeds the 8 MB limit.');

      const safeOriginal = sanitiseFileName_(payload.fileName);
      const extension = extensionFor_(payload.mimeType, safeOriginal);
      const stamp = Utilities.formatDate(started, 'Asia/Kuala_Lumpur', 'yyyyMMdd-HHmmss');
      const slot = isExaminer1 && isExaminer2 ? 'Examiner1-Examiner2' : (isExaminer1 ? 'Examiner1' : 'Examiner2');
      const slotLabel = isExaminer1 && isExaminer2 ? 'Examiner 1 and Examiner 2' : (isExaminer1 ? 'Examiner 1' : 'Examiner 2');
      const savedName = sanitiseFileName_(String(payload.caseId) + '_' + slot + '_' + panel.name + '_' + stamp + extension);
      const blob = Utilities.newBlob(bytes, payload.mimeType, savedName);
      const file = DriveApp.getFolderById(folderId).createFile(blob);
      const fileUrl = file.getUrl();

      const sheetRow = PANEL_CONFIG.HEADER_ROW + 1 + rowIndex;
      if (isExaminer1) {
        data.sheet.getRange(sheetRow, data.col.examiner1ReportLink + 1).setValue(fileUrl);
        data.sheet.getRange(sheetRow, data.col.examiner1ReportStatus + 1).setValue('Submitted');
      }
      if (isExaminer2) {
        data.sheet.getRange(sheetRow, data.col.examiner2ReportLink + 1).setValue(fileUrl);
        data.sheet.getRange(sheetRow, data.col.examiner2ReportStatus + 1).setValue('Submitted');
      }
      data.sheet.getRange(sheetRow, data.col.panelReportUpdatedAt + 1).setValue(started);

      const ex1Link = isExaminer1 ? fileUrl : String(row[data.col.examiner1ReportLink] || '');
      const ex2Link = isExaminer2 ? fileUrl : String(row[data.col.examiner2ReportLink] || '');
      const legacy = [];
      if (ex1Link) legacy.push('Examiner 1: ' + ex1Link);
      if (ex2Link) legacy.push('Examiner 2: ' + ex2Link);
      data.sheet.getRange(sheetRow, data.col.legacyReport + 1).setValue(legacy.join('\n'));

      // If deliberation was already recorded, advance Result Email Status to Ready to Send once all reports are on file
      if (data.col.resultEmailStatus >= 0) {
        const currentResStatus = normalise_(row[data.col.resultStatus]);
        const currentSessStatus = normalise_(row[data.col.sessionStatus]);
        if (currentResStatus === 'decided' || currentSessStatus === 'completed') {
          const ex1Done = isExaminer1 || isReportSubmittedCheck_(row[data.col.examiner1ReportStatus], row[data.col.examiner1ReportLink]);
          const hasEx2Appointed = Boolean(data.col.examiner2 >= 0 && String(row[data.col.examiner2] || '').trim());
          const ex2Done = !hasEx2Appointed || isExaminer2 || isReportSubmittedCheck_(row[data.col.examiner2ReportStatus], row[data.col.examiner2ReportLink]);
          if (ex1Done && ex2Done) {
            const eCell = data.sheet.getRange(sheetRow, data.col.resultEmailStatus + 1);
            try { eCell.clearDataValidations(); } catch (eVal) {}
            eCell.setValue('Ready to Send');
          }
        }
      }

      appendLog_({
        timestamp: started,
        panelName: panel.name,
        panelRole: slotLabel,
        caseId: row[data.col.caseId],
        studentName: row[data.col.studentName],
        defenceType: row[data.col.defenceType],
        originalName: safeOriginal,
        savedName: savedName,
        fileUrl: fileUrl,
        fileId: file.getId(),
        folderId: folderId,
        result: 'Submitted',
        details: slotLabel
      });
      cache.put(throttleKey, '1', 30);
      return {
        ok: true,
        caseId: String(row[data.col.caseId]),
        studentName: String(row[data.col.studentName]),
        panelName: panel.name,
        slot: slotLabel,
        savedName: savedName,
        fileUrl: fileUrl,
        submittedAt: Utilities.formatDate(started, 'Asia/Kuala_Lumpur', 'dd MMM yyyy, h:mm a')
      };
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    try {
      appendLog_({timestamp: started, panelName: logContext.panelName, caseId: logContext.caseId, originalName: logContext.originalName, result: 'Error', details: error.message});
    } catch (ignored) {}
    throw new Error(error.message || 'The report could not be uploaded.');
  }
}

function ensureProofColumn_(sheet, headers, index) {
  let colIndex = index['Session Proof Link'] !== undefined ? index['Session Proof Link'] : 
                 (index['Session Photo Link'] !== undefined ? index['Session Photo Link'] : 
                 (index['Proof of Session'] !== undefined ? index['Proof of Session'] : -1));
  if (colIndex === -1) {
    const lastCol = sheet.getLastColumn() + 1;
    sheet.getRange(PANEL_CONFIG.HEADER_ROW, lastCol).setValue('Session Proof Link');
    colIndex = lastCol - 1;
    index['Session Proof Link'] = colIndex;
  }
  return colIndex;
}

function completeDefenceSession(payload) {
  const started = new Date();
  const logContext = {
    panelName: payload && payload.panelName,
    caseId: payload && payload.caseId,
    originalName: payload && payload.proofFileName
  };

  try {
    panelAuthorize_(payload);
    if (!payload) throw new Error('No deliberation submission was received.');
    const panel = assertActivePanel_(payload.panelName);
    if (!payload.caseId) throw new Error('Please select a candidate case.');
    if (!payload.resultScale) throw new Error('Please select an official recommendation scale (Scale 1 to Scale 5).');

    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      const data = getCaseData_();
      const rowIndex = findCaseRow_(data, payload.caseId);
      if (rowIndex < 0) throw new Error('The selected case no longer exists.');
      const row = data.rows[rowIndex];
      const panelKey = normalise_(panel.name);
      
      const isChair = data.col.chairperson >= 0 && normalise_(row[data.col.chairperson]) === panelKey;
      if (!isChair) {
        throw new Error('Only the appointed Chairperson for this candidate can record session completion.');
      }
      if (isClosedCase_(data.col.caseStatus === undefined ? '' : row[data.col.caseStatus])) {
        throw new Error('This case is closed for deliberations.');
      }

      const folderId = String(row[data.col.folderId] || '').trim();
      let proofUrl = '';

      // Upload session photo proof if provided
      if (payload.proofBase64 && payload.proofFileName) {
        if (!folderId) throw new Error('The student Google Drive folder has not been created.');
        const bytes = Utilities.base64Decode(payload.proofBase64);
        if (bytes.length > 0) {
          if (bytes.length > PANEL_CONFIG.MAX_FILE_BYTES) throw new Error('The proof image exceeds the 8 MB limit.');
          const safeOriginal = sanitiseFileName_(payload.proofFileName);
          const ext = extensionFor_(payload.proofMimeType || 'image/jpeg', safeOriginal) || '.jpg';
          const stamp = Utilities.formatDate(started, 'Asia/Kuala_Lumpur', 'yyyyMMdd-HHmmss');
          const savedName = sanitiseFileName_(String(payload.caseId) + '_SessionProof_' + stamp + ext);
          const blob = Utilities.newBlob(bytes, payload.proofMimeType || 'image/jpeg', savedName);
          const folder = DriveApp.getFolderById(folderId);
          const file = folder.createFile(blob);
          proofUrl = file.getUrl();
        }
      }

      const sheetRow = PANEL_CONFIG.HEADER_ROW + 1 + rowIndex;

      // 1. Update Session Status
      if (data.col.sessionStatus >= 0) {
        data.sheet.getRange(sheetRow, data.col.sessionStatus + 1).setValue('Completed');
      }

      const scaleCode = extractScaleCode_(payload.resultScale);
      const scaleDesc = extractScaleDescription_(payload.resultScale);

      // 2. Update Result Scale (relax/clear validation to prevent cell Z13 data validation error)
      if (data.col.resultScale >= 0) {
        const scaleCell = data.sheet.getRange(sheetRow, data.col.resultScale + 1);
        try {
          scaleCell.clearDataValidations();
        } catch (eClear) {
          console.warn('Could not clear cell data validation: ' + eClear.message);
        }

        // Set the clean scale code (e.g. 'Scale 2')
        scaleCell.setValue(scaleCode || payload.resultScale);

        // Reapply safe non-blocking validation that includes Scale 1 to Scale 5
        try {
          const safeRule = SpreadsheetApp.newDataValidation()
            .requireValueInList(['Not recorded', 'Scale 1', 'Scale 2', 'Scale 3', 'Scale 4', 'Scale 5'], true)
            .setAllowInvalid(true)
            .build();
          scaleCell.setDataValidation(safeRule);
        } catch (eRule) {
          console.warn('Could not reapply safe validation: ' + eRule.message);
        }

        // Also ensure column validation doesn't block future writes
        ensureResultScaleColumnValidation_(data.sheet, data.col.resultScale);
      }

      // 3. Update Result Status with descriptive outcome
      if (data.col.resultStatus >= 0) {
        const statusCell = data.sheet.getRange(sheetRow, data.col.resultStatus + 1);
        try {
          statusCell.clearDataValidations();
        } catch (eStatusClear) {}
        statusCell.setValue(scaleDesc || 'Decided');
      }

      // 4. Update Result Email Status for Admin dispatch
      // Note: Must match sheet dropdown values: ['Not prepared','Prepared – unsent','Ready to Send','Sent','Error','Resend Approved']
      if (data.col.resultEmailStatus >= 0) {
        const emailCell = data.sheet.getRange(sheetRow, data.col.resultEmailStatus + 1);
        try {
          emailCell.clearDataValidations();
        } catch (eEmailClear) {}

        const hasEx1Report = isReportSubmittedCheck_(row[data.col.examiner1ReportStatus], row[data.col.examiner1ReportLink]);
        const hasEx2Appointed = Boolean(data.col.examiner2 >= 0 && String(row[data.col.examiner2] || '').trim());
        const hasEx2Report = hasEx2Appointed ? isReportSubmittedCheck_(row[data.col.examiner2ReportStatus], row[data.col.examiner2ReportLink]) : true;
        
        const emailStatus = (hasEx1Report && hasEx2Report) ? 'Ready to Send' : 'Prepared – unsent';
        emailCell.setValue(emailStatus);
      }

      // 5. Update or create Session Proof Link
      if (proofUrl) {
        let proofCol = data.col.sessionProofLink;
        if (proofCol < 0) {
          proofCol = ensureProofColumn_(data.sheet, data.headers, data.index);
        }
        if (proofCol >= 0) {
          data.sheet.getRange(sheetRow, proofCol + 1).setValue(proofUrl);
        }
      }

      // 6. Update Notes if remarks provided
      if (payload.notes) {
        if (data.col.notes >= 0) {
          const currentNotes = String(row[data.col.notes] || '').trim();
          const chairNote = 'Chairperson Deliberation Remarks: ' + String(payload.notes).trim();
          const updatedNotes = currentNotes ? (currentNotes + '\n' + chairNote) : chairNote;
          data.sheet.getRange(sheetRow, data.col.notes + 1).setValue(updatedNotes);
        }
      }

      // 7. Update Corrections Deadline (and Final Submission Due) set by Chairperson
      if (payload.correctionsDeadline) {
        if (data.col.correctionsDeadline >= 0) {
          const dCell = data.sheet.getRange(sheetRow, data.col.correctionsDeadline + 1);
          try { dCell.clearDataValidations(); } catch (eD) {}
          dCell.setValue(payload.correctionsDeadline);
        }
        if (data.col.finalSubmissionDue >= 0) {
          const fCell = data.sheet.getRange(sheetRow, data.col.finalSubmissionDue + 1);
          try { fCell.clearDataValidations(); } catch (eF) {}
          fCell.setValue(payload.correctionsDeadline);
        }
      }

      if (data.col.panelReportUpdatedAt >= 0) {
        data.sheet.getRange(sheetRow, data.col.panelReportUpdatedAt + 1).setValue(started);
      }

      const completionStamp = Utilities.formatDate(started, 'Asia/Kuala_Lumpur', 'dd MMM yyyy, h:mm a');

      appendLog_({
        timestamp: started,
        panelName: panel.name,
        panelRole: 'Chairperson',
        caseId: payload.caseId,
        studentName: String(row[data.col.studentName] || ''),
        defenceType: String(row[data.col.defenceType] || ''),
        fileUrl: proofUrl,
        result: 'Completed',
        details: 'Deliberation finalized: ' + scaleCode + ' (' + scaleDesc + ')' + (payload.correctionsDeadline ? (' · Deadline: ' + payload.correctionsDeadline) : '') + (proofUrl ? ' (Photo proof uploaded)' : '')
      });

      return {
        success: true,
        caseId: payload.caseId,
        sessionStatus: 'Completed',
        resultScale: scaleCode || payload.resultScale,
        resultScaleFull: payload.resultScale,
        resultStatus: scaleDesc || 'Decided',
        correctionsDeadline: payload.correctionsDeadline || '',
        sessionProofLink: proofUrl || (data.col.sessionProofLink >= 0 ? String(row[data.col.sessionProofLink] || '').trim() : ''),
        completedAt: completionStamp,
        chairperson: panel.name,
        notes: payload.notes || ''
      };
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    try {
      appendLog_({
        timestamp: started,
        panelName: logContext.panelName,
        caseId: logContext.caseId,
        result: 'Error',
        details: 'Session completion error: ' + error.message
      });
    } catch (ignored) {}
    throw new Error(error.message || 'Could not complete the defence session.');
  }
}

function resetDefenceSession(payload) {
  const started = new Date();
  try {
    panelAuthorize_(payload);
    if (!payload || !payload.caseId) throw new Error('Please select a candidate case.');
    const panel = assertActivePanel_(payload.panelName);

    const lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      const data = getCaseData_();
      const rowIndex = findCaseRow_(data, payload.caseId);
      if (rowIndex < 0) throw new Error('The selected case no longer exists.');
      const row = data.rows[rowIndex];
      if(isClosedCase_(data.col.caseStatus===undefined?'':row[data.col.caseStatus]))throw new Error('This stage is closed. Ask the administrator to reopen it explicitly.');
      const panelKey = normalise_(panel.name);

      const isChair = data.col.chairperson >= 0 && normalise_(row[data.col.chairperson]) === panelKey;
      if (!isChair) {
        throw new Error('Only the appointed Chairperson for this candidate can reset deliberation outcomes.');
      }

      const sheetRow = PANEL_CONFIG.HEADER_ROW + 1 + rowIndex;

      // 1. Reset Session Status back to Scheduled
      if (data.col.sessionStatus >= 0) {
        data.sheet.getRange(sheetRow, data.col.sessionStatus + 1).setValue('Scheduled');
      }

      // 2. Reset Result Scale to 'Not recorded'
      if (data.col.resultScale >= 0) {
        const scaleCell = data.sheet.getRange(sheetRow, data.col.resultScale + 1);
        try { scaleCell.clearDataValidations(); } catch (e) {}
        scaleCell.setValue('Not recorded');
        ensureResultScaleColumnValidation_(data.sheet, data.col.resultScale);
      }

      // 3. Reset Result Status
      if (data.col.resultStatus >= 0) {
        data.sheet.getRange(sheetRow, data.col.resultStatus + 1).setValue('');
      }

      // 4. Reset Corrections Deadline & Final Submission Due
      if (data.col.correctionsDeadline >= 0) {
        data.sheet.getRange(sheetRow, data.col.correctionsDeadline + 1).setValue('');
      }
      if (data.col.finalSubmissionDue >= 0) {
        data.sheet.getRange(sheetRow, data.col.finalSubmissionDue + 1).setValue('');
      }

      // 5. Reset Result Email Status back to Not prepared
      if (data.col.resultEmailStatus >= 0) {
        data.sheet.getRange(sheetRow, data.col.resultEmailStatus + 1).setValue('Not prepared');
      }

      appendLog_({
        timestamp: started,
        panelName: panel.name,
        panelRole: 'Chairperson',
        caseId: payload.caseId,
        studentName: String(row[data.col.studentName] || ''),
        defenceType: String(row[data.col.defenceType] || ''),
        result: 'Reset',
        details: 'Deliberation outcome reset to Pending by ' + panel.name
      });

      return {
        success: true,
        caseId: payload.caseId,
        sessionStatus: 'Scheduled',
        resultScale: 'Not recorded',
        resultStatus: '',
        correctionsDeadline: ''
      };
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || String(error)
    };
  }
}

function getCaseData_() {
  const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.CASE_SHEET);
  if (!sheet) throw new Error('Defence Cases sheet was not found.');
  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(PANEL_CONFIG.HEADER_ROW, 1, 1, lastColumn).getDisplayValues()[0];
  const index = {};
  headers.forEach(function(header, i) { index[String(header).trim()] = i; });
  const required = ['Case ID','Student Name','Defence Type','Session Date','Research Title','Student Draft Link','Examiner 1','Examiner 1 Role','Examiner 2','Examiner 2 Role','Examiner Report File','Session Status','Student Folder ID','Examiner 1 Report Link','Examiner 1 Report Status','Examiner 2 Report Link','Examiner 2 Report Status','Panel Report Updated At','Examiner 1 Form Link','Examiner 2 Form Link'];
  required.forEach(function(header) { if (index[header] === undefined) throw new Error('Missing tracker column: ' + header); });
  const count = Math.max(0, sheet.getLastRow() - PANEL_CONFIG.HEADER_ROW);
  return {
    sheet: sheet,
    rows: count ? sheet.getRange(PANEL_CONFIG.HEADER_ROW + 1, 1, count, lastColumn).getValues() : [],
    headers: headers,
    index: index,
    col: {
      caseId: index['Case ID'], studentName: index['Student Name'], defenceType: index['Defence Type'], sessionDate: index['Session Date'], researchTitle: index['Research Title'], studentDraftLink: index['Student Draft Link'],
      examiner1: index['Examiner 1'], examiner1Role: index['Examiner 1 Role'], examiner2: index['Examiner 2'], examiner2Role: index['Examiner 2 Role'],
      legacyReport: index['Examiner Report File'], sessionStatus: index['Session Status'], caseStatus: index['Case Status'], folderId: index['Student Folder ID'],
      examiner1ReportLink: index['Examiner 1 Report Link'], examiner1ReportStatus: index['Examiner 1 Report Status'],
      examiner2ReportLink: index['Examiner 2 Report Link'], examiner2ReportStatus: index['Examiner 2 Report Status'], panelReportUpdatedAt: index['Panel Report Updated At'],
      examiner1FormLink: index['Examiner 1 Form Link'], examiner2FormLink: index['Examiner 2 Form Link'],
      startTime: index['Start Time'] !== undefined ? index['Start Time'] : -1,
      endTime: index['End Time'] !== undefined ? index['End Time'] : -1,
      venue: index['Venue'] !== undefined ? index['Venue'] : -1,
      googleMeetLink: index['Google Meet Link'] !== undefined ? index['Google Meet Link'] : -1,
      programme: index['Programme'] !== undefined ? index['Programme'] : -1,
      supervisor: index['Supervisor'] !== undefined ? index['Supervisor'] : -1,
      chairperson: index['Chairperson'] !== undefined ? index['Chairperson'] : -1,
      chairEmail: index['Chair Email'] !== undefined ? index['Chair Email'] : -1,
      examiner1Email: index['Examiner 1 Email'] !== undefined ? index['Examiner 1 Email'] : -1,
      examiner2Email: index['Examiner 2 Email'] !== undefined ? index['Examiner 2 Email'] : -1,
      supervisorEmail: index['Supervisor Email'] !== undefined ? index['Supervisor Email'] : -1,
      studentEmail: index['Student Email'] !== undefined ? index['Student Email'] : -1,
      resultScale: index['Result Scale'] !== undefined ? index['Result Scale'] : -1,
      resultStatus: index['Result Status'] !== undefined ? index['Result Status'] : -1,
      resultEmailStatus: index['Result Email Status'] !== undefined ? index['Result Email Status'] : -1,
      notes: index['Notes'] !== undefined ? index['Notes'] : -1,
      correctionsDeadline: index['Corrections Deadline'] !== undefined ? index['Corrections Deadline'] : -1,
      finalSubmissionDue: index['Final Submission Due'] !== undefined ? index['Final Submission Due'] : -1,
      sessionProofLink: (index['Session Proof Link'] !== undefined ? index['Session Proof Link'] : (index['Session Photo Link'] !== undefined ? index['Session Photo Link'] : (index['Proof of Session'] !== undefined ? index['Proof of Session'] : -1)))
    }
  };
}

function getActivePanelDirectory_() {
  const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.DIRECTORY_SHEET);
  if (!sheet) throw new Error('Panel Directory sheet was not found.');
  const values = sheet.getDataRange().getDisplayValues();
  const directory = {};
  for (let i = 1; i < values.length; i++) {
    const name = String(values[i][0] || '').trim();
    const status = normalise_(values[i][4]);
    if (name && status === 'active') {
      directory[normalise_(name)] = {
        name: name,
        role: String(values[i][1] || 'Academic Faculty').trim(),
        email: String(values[i][2] || '').trim(),
        alternateEmail: String(values[i][3] || '').trim()
      };
    }
  }
  return directory;
}

function assertActivePanel_(panelName) {
  const directory = getActivePanelDirectory_();
  let panel = directory[normalise_(panelName)];
  if (!panel) {
    const cleanNorm = normalise_(panelName);
    const data = getCaseData_();
    for (let i = 0; i < data.rows.length; i++) {
      const r = data.rows[i];
      if (normalise_(r[data.col.examiner1]) === cleanNorm) {
        return {
          name: panelName,
          role: String(r[data.col.examiner1Role] || 'External Examiner').trim(),
          primaryEmail: String(r[data.col.examiner1Email] || '').trim().toLowerCase()
        };
      }
      if (normalise_(r[data.col.examiner2]) === cleanNorm) {
        return {
          name: panelName,
          role: String(r[data.col.examiner2Role] || 'External Examiner').trim(),
          primaryEmail: String(r[data.col.examiner2Email] || '').trim().toLowerCase()
        };
      }
    }
    throw new Error('Please select an active faculty or examiner member from the directory.');
  }
  return panel;
}

function findCaseRow_(data, caseId) {
  const target = normalise_(caseId);
  for (let i = 0; i < data.rows.length; i++) if (normalise_(data.rows[i][data.col.caseId]) === target) return i;
  return -1;
}

function appendLog_(entry) {
  const sheet = getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.LOG_SHEET);
  if (!sheet) return;
  sheet.appendRow([
    entry.timestamp || new Date(), entry.panelName || '', entry.panelRole || '', entry.caseId || '', entry.studentName || '', entry.defenceType || '',
    entry.originalName || '', entry.savedName || '', entry.fileUrl || '', entry.fileId || '', entry.folderId || '', entry.result || '', entry.details || ''
  ]);
}

function isClosedCase_(value) {
  return normalise_(value) === 'closed';
}

function isReportSubmittedCheck_(statusText, fileLink) {
  const linkStr = String(fileLink || '').trim();
  if (linkStr && /^https?:\/\//i.test(linkStr)) return true;
  const s = String(statusText || '').trim().toLowerCase();
  if (!s) return false;
  if (s.indexOf('not') >= 0 || s.indexOf('pending') >= 0 || s.indexOf('awaiting') >= 0 || s.indexOf('unsubmitted') >= 0) {
    return false;
  }
  return s.indexOf('submitted') >= 0 || s.indexOf('received') >= 0 || s.indexOf('verified') >= 0;
}

function normalise_(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function formatSheetValue_(value, format) {
  if (!value) return '';
  if (value instanceof Date) {
    if (isNaN(value.getTime())) return '';
    return Utilities.formatDate(value, 'Asia/Kuala_Lumpur', format);
  }
  return String(value).trim();
}

function formatSheetTime_(value) {
  if (!value && value !== 0) return '';
  if (value instanceof Date) {
    if (isNaN(value.getTime())) return '';
    var h = value.getHours();
    var m = value.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
  }
  var str = String(value).trim();
  if (!str) return '';
  
  var dateMatch = str.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (/^[A-Za-z]{3}\s+[A-Za-z]{3}\s+\d+\s+1899/i.test(str) && dateMatch) {
    var h = parseInt(dateMatch[1], 10);
    var m = dateMatch[2];
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + m + ' ' + ampm;
  }

  var timeMatch = str.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)?$/i);
  if (timeMatch) {
    var h = parseInt(timeMatch[1], 10);
    var m = timeMatch[2];
    var ampm = timeMatch[3];
    if (!ampm) {
      var suffix = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return h + ':' + m + ' ' + suffix;
    }
    return h + ':' + m + ' ' + ampm.toUpperCase();
  }

  return str;
}

function sanitiseFileName_(name) {
  return String(name || '').replace(/[^a-zA-Z0-9._ -]/g, '_');
}

function extensionFor_(mimeType, originalName) {
  if (mimeType === 'application/pdf') return '.pdf';
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return '.docx';
  if (mimeType === 'application/msword') return '.doc';
  const match = String(originalName || '').match(/\.[a-zA-Z0-9]+$/);
  return match ? match[0] : '';
}

function digest_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value));
  return Utilities.base64Encode(bytes).slice(0, 24);
}

function extractScaleCode_(val) {
  const str = String(val || '').trim();
  const match = str.match(/Scale\s*[1-5]/i);
  if (match) {
    return match[0].replace(/Scale\s*/i, 'Scale ');
  }
  return str;
}

function extractScaleDescription_(val) {
  const str = String(val || '').trim();
  const stripped = str.replace(/^Scale\s*[1-5]\s*[-–—:]*\s*/i, '').trim();
  const scaleMap = {
    'Scale 1': 'Unconditional pass',
    'Scale 2': 'Conditional pass with minor corrections',
    'Scale 3': 'Conditional pass with major corrections',
    'Scale 4': 'Re-examination',
    'Scale 5': 'Fail'
  };
  if (!stripped || stripped === str) {
    const code = extractScaleCode_(str);
    return scaleMap[code] || str || 'Decided';
  }
  return stripped;
}

function ensureResultScaleColumnValidation_(sheet, colIndex) {
  if (!sheet || colIndex === undefined || colIndex < 0) return;
  try {
    const colNum = colIndex + 1;
    const lastRow = Math.max(sheet.getLastRow(), 2);
    const range = sheet.getRange(2, colNum, lastRow - 1, 1);
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Not recorded', 'Scale 1', 'Scale 2', 'Scale 3', 'Scale 4', 'Scale 5'], true)
      .setAllowInvalid(true)
      .build();
    range.setDataValidation(rule);
  } catch (e) {
    console.warn('Could not update resultScale column validation: ' + e.message);
  }
}
