const ADMIN_CONFIG = {
  SPREADSHEET_ID: '1ammiqUyr03FoeLzpTTTUnlM_BMA1uLj6C-m1mYr4m-U',
  CASE_SHEET: 'Defence Cases',
  DELETED_SHEET: 'Deleted Cases',
  ROOT_FOLDER_ID: '1oK7tSUDBNv-aBHluWObt_6CJ0HwieHt3',
  ARCHIVE_FOLDER_NAME: 'Archive - Deleted Students',
  PANEL_SHEET: 'Panel Directory',
  DELETED_PANEL_SHEET: 'Deleted Panel Directory',
  LOG_SHEET: 'Admin Action Log',
  HEADER_ROW: 3,
  ALLOWED_ADMINS: ['fahimroslan.ipgs@innovative.edu.my'],
  PANEL_PORTAL_URL: 'https://script.google.com/macros/s/AKfycbww2UZcF2dDskUv0H_I6vcorINaJGlVk-Zm6PD948MVJ4NWVor8PNvtOEbLhwtMnnCv/exec'
};

const ADMIN_DIRECTORY_ROLES = ['Supervisor','Panel','Admin'];

const ADMIN_HEADERS = ['Case ID','Student Name','Student Email','Programme','Defence Type','Session Date','Start Time','End Time','Venue','Google Meet Link','Research Title','Chairperson','Chair Email','Examiner 1','Examiner 1 Role','Examiner 1 Email','Examiner 2','Examiner 2 Role','Examiner 2 Email','Supervisor','Supervisor Email','Draft File Name','Student Draft Link','Examiner Report File','Session Status','Result Scale','Result Status','Result Email Status','Result Email Sent At','Corrections Deadline','Final Submission Status','Final Submission Due','Final Submission Received','Final Thesis Link','Correction Matrix Link','Endorsed By','Endorsement Status','Final Verification Date','Invitation Email Status','Invitation Email Sent At','Calendar Invitation Status','Notes','Submission Enabled','Submission Token','Submission Portal Link','Student Folder ID','Examiner 1 Report Link','Examiner 1 Report Status','Examiner 2 Report Link','Examiner 2 Report Status','Panel Report Updated At','Examiner 1 Form Link','Examiner 2 Form Link'];

ADMIN_CONFIG.STUDENT_SHEET = 'Student Master';
ADMIN_CONFIG.DELETED_STUDENT_SHEET = 'Deleted Students';
ADMIN_CONFIG.EMAIL_TEMPLATE_SHEET = 'Email Templates';
ADMIN_CONFIG.EMAIL_SENDER_SHEET = 'Email Senders';
ADMIN_CONFIG.SUPERVISION_SHEET = 'Supervision Logs';
ADMIN_CONFIG.PROGRESS_SHEET = 'Progress Reports';
ADMIN_HEADERS.push('Student Key','Progression Route','Stage Attempt','Case Status','Meeting Platform','Chair Appointment Letter Link','Examiner 1 Appointment Letter Link','Examiner 2 Appointment Letter Link',
    'Candidate Notice Sent At','Additional Invitees','Result Confirmation Letter Link','Candidate Notice Status','Candidate Notice Letter Link');
const ADMIN_STUDENT_HEADERS = ['Student Key','Student Name','Student Email','Programme','Research Title','Supervisor','Supervisor Email','Progression Route','Student Status','Student Folder ID','Registered At','Updated At'];

const ADMIN_EMAIL_SENDER_HEADERS = [
  'Sender ID',
  'Display Name',
  'Email / Alias',
  'Reply-To Email',
  'Is Default',
  'Description',
  'Updated At',
  'Updated By'
];

const ADMIN_DEFAULT_EMAIL_SENDERS = [
  {
    id: 'DEFAULT_IPGS',
    name: 'IPGS',
    email: 'instituteofpostgraduate@innovative.edu.my',
    replyTo: 'instituteofpostgraduate@innovative.edu.my',
    isDefault: true,
    description: 'Main administrative sender for candidate notices and examination outcomes'
  },
  {
    id: 'DEFENCE_OFFICE',
    name: 'IUC Defence Administration',
    email: 'defence@innovative.edu.my',
    replyTo: 'instituteofpostgraduate@innovative.edu.my',
    isDefault: false,
    description: 'Defence panel invitations and session scheduling'
  },
  {
    id: 'RESEARCH_MGMT',
    name: 'IUC Research Management',
    email: 'research@innovative.edu.my',
    replyTo: 'instituteofpostgraduate@innovative.edu.my',
    isDefault: false,
    description: 'Supervision logs and periodic progress notifications'
  }
];

const ADMIN_EMAIL_TEMPLATE_HEADERS = [
  'Template Key',
  'Template Name',
  'Subject',
  'Opening Text',
  'Closing Text',
  'Updated At',
  'Updated By'
];

const ADMIN_DEFAULT_EMAIL_TEMPLATES = {
  PANEL_INVITATION: {
    key: 'PANEL_INVITATION',
    name: 'Panel Session Invitation',
    subject: '[IUC] {{DEFENCE_TYPE}} panel invitation - {{STUDENT_NAME}}',
    openingText: 'You are invited to serve as {{PANEL_ROLES}} for the following {{DEFENCE_TYPE}}.',
    closingText: 'Please contact the postgraduate administration team if you require clarification.\n\nRegards,\nInstitute of Postgraduate Studies'
  },
  CANDIDATE_INVITATION: {
    key: 'CANDIDATE_INVITATION',
    name: 'Candidate Examination Notice',
    subject: '[IUC] {{DEFENCE_TYPE}} Examination Notice & Schedule - {{STUDENT_NAME}}',
    openingText: 'Please be informed that your upcoming {{DEFENCE_TYPE}} examination has been officially scheduled as detailed below.',
    closingText: 'Please ensure you join the online meeting link or arrive at the venue at least 10 minutes prior to the scheduled time. Ensure your presentation slides and equipment are tested in advance.\n\nShould you have any inquiries, kindly reach out to the Institute of Postgraduate Studies.\n\nBest wishes,\nInstitute of Postgraduate Studies\nInnovative University College'
  },
  RESULT_OUTCOME: {
    key: 'RESULT_OUTCOME',
    name: 'Student Result Outcome Notice',
    subject: '[IUC] {{DEFENCE_TYPE}} outcome - {{STUDENT_NAME}}',
    openingText: 'The outcome of your {{DEFENCE_TYPE}} is recorded below.',
    closingText: 'Please contact the postgraduate administration team if you need clarification.\n\nRegards,\nInstitute of Postgraduate Studies'
  },
  APPOINTMENT_CHAIRPERSON: {
    key: 'APPOINTMENT_CHAIRPERSON',
    name: 'Chairperson Appointment Letter (PDF)',
    subject: 'APPOINTMENT AS CHAIRPERSON FOR {{DEFENCE_TYPE}}',
    openingText: 'On behalf of Innovative University College (IUC), we are pleased to appoint you as Chairperson for the {{DEFENCE_TYPE}} of the following postgraduate candidate:',
    closingText: 'As Chairperson, you are requested to preside over the examination, introduce the panel, explain the proceedings, and ensure that the candidate receives a fair opportunity to present and respond. Please facilitate questioning and panel deliberations in accordance with the applicable examination procedures.\n\nPlease ensure that the panel\'s recommendation, required corrections, and relevant deadlines are accurately recorded, and submit the completed examination documentation to the Institute of Postgraduate Studies.\n\nPlease treat all examination materials and deliberations as confidential and disclose any actual or potential conflict of interest before accepting this appointment. The research document, assessment forms, and relevant guidelines will be provided separately.\n\nKindly confirm your acceptance and availability via {{ADMIN_EMAIL}}. For clarification, please contact the Institute of Postgraduate Studies.\n\nThank you for contributing your expertise to the postgraduate examination process at IUC.'
  },
  APPOINTMENT_INTERNAL_EXAMINER: {
    key: 'APPOINTMENT_INTERNAL_EXAMINER',
    name: 'Internal Examiner Appointment Letter (PDF)',
    subject: 'APPOINTMENT AS INTERNAL EXAMINER FOR {{DEFENCE_TYPE}}',
    openingText: 'On behalf of Innovative University College (IUC), we are pleased to appoint you as Internal Examiner for the {{DEFENCE_TYPE}} of the following postgraduate candidate:',
    closingText: 'As Internal Examiner, you are requested to independently assess the submitted research, including its objectives, literature review, methodology, findings where applicable, and contribution. Please prepare your written evaluation using the prescribed assessment form prior to the examination date.\n\nYou are also requested to attend the examination, discuss your assessment with the panel, and provide clear recommendations and correction requirements. Where assigned, please verify the candidate\'s subsequent amendments within the agreed timeframe.\n\nPlease treat all examination materials and deliberations as confidential and disclose any actual or potential conflict of interest before accepting this appointment. The research document, assessment forms, and relevant guidelines will be provided separately.\n\nKindly confirm your acceptance and availability via {{ADMIN_EMAIL}}. For clarification, please contact the Institute of Postgraduate Studies.\n\nThank you for contributing your expertise to the postgraduate examination process at IUC.'
  },
  APPOINTMENT_EXTERNAL_EXAMINER: {
    key: 'APPOINTMENT_EXTERNAL_EXAMINER',
    name: 'External Examiner Appointment Letter (PDF)',
    subject: 'APPOINTMENT AS EXTERNAL EXAMINER FOR {{DEFENCE_TYPE}}',
    openingText: 'On behalf of Innovative University College (IUC), we are pleased to appoint you as External Examiner for the {{DEFENCE_TYPE}} of the following postgraduate candidate:',
    closingText: 'This appointment recognises your expertise in the relevant field and your contribution to maintaining the academic quality and integrity of our postgraduate examinations.\n\nAs External Examiner, you are requested to independently evaluate the thesis, considering its originality, research objectives, engagement with the literature, methodological rigour, analysis, and contribution to knowledge. Kindly submit your written assessment using the prescribed examination form prior to the examination date.\n\nYou are also requested to participate in the viva voce examination, discuss your assessment with the examination panel, and provide clear recommendations on the examination outcome and any required corrections. Where assigned, you will be requested to verify whether the candidate\'s subsequent amendments satisfactorily address the examination requirements.\n\nPlease maintain the confidentiality of all research materials, assessment reports, and panel deliberations. Kindly disclose any actual or potential conflict of interest before accepting this appointment. Any communication concerning the examination should be coordinated through the Institute of Postgraduate Studies.\n\nPlease confirm your acceptance and availability via {{ADMIN_EMAIL}}. Upon confirmation, we will provide the thesis, assessment forms, examination guidelines, and details of any applicable honorarium and reimbursement arrangements.\n\nThank you for considering this appointment. We appreciate your expertise and contribution to the postgraduate examination process at IUC.'
  }
};

const ADMIN_DEFAULT_SIGNATORY = {
  name: 'MUHAMMAD AZRI FAHMI BIN MOHD HILMI',
  title: 'Program Coordinator',
  department: 'Institute of Postgraduate Studies',
  institution: 'Innovative University College'
};

const ADMIN_EDITABLE = ADMIN_HEADERS.filter(function(h) {
  return [
    'Case ID','Result Email Sent At','Invitation Email Sent At','Submission Token','Submission Portal Link','Student Folder ID',
    'Examiner 1 Report Link','Examiner 1 Report Status',
    'Examiner 2 Report Link','Examiner 2 Report Status','Panel Report Updated At',
    'Examiner 1 Form Link','Examiner 2 Form Link',
    'Chair Appointment Letter Link','Examiner 1 Appointment Letter Link','Examiner 2 Appointment Letter Link',
    'Candidate Notice Letter Link','Candidate Notice Sent At','Result Confirmation Letter Link',
    'Result Scale','Result Status','Corrections Deadline','Case Status','Student Key','Stage Attempt',
    'Endorsement Status','Endorsed By','Final Verification Date','Final Submission Received',
    'Final Submission Status','Result Email Status','Invitation Email Status','Candidate Notice Status','Calendar Invitation Status','Defence Type','Progression Route'
  ].indexOf(h) === -1;
});
const ADMIN_DATE_FIELDS = ['Session Date','Corrections Deadline','Final Submission Due','Final Submission Received','Final Verification Date'];

function doGet(e) {
  // If requested with ?action=bootstrap, return JSON data for Firebase sync
  if (e && e.parameter && e.parameter.action === 'bootstrap') {
    try {
      const bootstrap = getAdminBootstrap();
      return ContentService.createTextOutput(JSON.stringify(bootstrap))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, message: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  if (e && e.parameter && e.parameter.action === 'setupForms') {
    try {
      const res = setupFormsFolderInDrive_();
      return ContentService.createTextOutput(JSON.stringify(res))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, message: err.message, stack: err.stack }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return HtmlService.createHtmlOutputFromFile('Admin')
    .setTitle('Research Management System â€” Admin Panel')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * HTTP POST Relay for Firebase Web App
 * Receives file uploads from Firebase and saves them directly into Google Drive
 */
function doPost(e) {
  try {
    adminAssert_();
    let payload = null;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No POST data received.');
    }

    // 1. Google Drive Zero-Cost File Upload Action
    if (payload.action === 'uploadDraft') {
      const uploadResult = adminUploadStudentDraft(payload);
      return ContentService.createTextOutput(JSON.stringify(uploadResult))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Outbound Institutional Email Dispatch Relay
    if (payload.action === 'sendEmail') {
      if (!payload.mailOptions) throw new Error('Missing mailOptions payload.');
      
      const specificSenderId = payload.senderId || null;
      adminSendEmail_(payload.mailOptions, specificSenderId);

      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        message: 'Email dispatched successfully via institutional relay.',
        recipient: payload.mailOptions.to,
        subject: payload.mailOptions.subject
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Fetch Configured Senders List
    if (payload.action === 'getEmailSenders') {
      const senders = adminGetEmailSenders_();
      const diagnostics = adminGetSenderDiagnostics_();
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        senders: senders,
        diagnostics: diagnostics
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 5. Export Master Google Sheets Records to Firestore Sync Bridge
    if (payload.action === 'fetchMasterData') {
      const cases = adminListCases_();
      const students = adminListStudents_(cases);
      const directory = adminListDirectory_();
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        cases: cases,
        students: students,
        directory: directory
      })).setMimeType(ContentService.MimeType.JSON);
    }

    throw new Error('Unsupported POST action: ' + payload.action);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      message: error.message || String(error)
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function saveAdminDirectoryPerson(payload) {
  const adminEmail = adminAssert_();
  if (!payload) throw new Error('No directory information was received.');
  const name = adminRequired_(payload.name, 'Name');
  const roles = adminCanonicalDirectoryRoles_(payload.roles || payload.role);
  if (!roles.length) throw new Error('Select at least one role: Supervisor, Panel, or Admin.');
  const role = roles.join(', ');
  const primaryEmail = adminRequired_(payload.primaryEmail, 'Primary email');
  const alternateEmail = String(payload.alternateEmail || '').trim();
  const status = String(payload.status || 'Active').trim();
  if (['Active','Inactive'].indexOf(status) === -1) throw new Error('Select a valid directory status.');
  adminValidateEmail_(primaryEmail, 'Primary email');
  if (alternateEmail) adminValidateEmail_(alternateEmail, 'Alternate email');

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = adminSpreadsheet_().getSheetByName(ADMIN_CONFIG.PANEL_SHEET);
    if (!sheet) throw new Error('Panel Directory sheet was not found.');
    const values = sheet.getDataRange().getDisplayValues();
    const originalKey = normaliseAdmin_(payload.originalName);
    const nameKey = normaliseAdmin_(name);
    let targetRow = 0;
    for (let i = 1; i < values.length; i++) {
      const rowKey = normaliseAdmin_(values[i][0]);
      if (originalKey && rowKey === originalKey) targetRow = i + 1;
      if (rowKey === nameKey && (!originalKey || rowKey !== originalKey)) throw new Error('A directory record already exists for ' + name + '.');
    }
    if (originalKey && !targetRow) throw new Error('The directory record no longer exists. Refresh the list.');
    if (!targetRow) targetRow = Math.max(sheet.getLastRow() + 1, 2);
    sheet.getRange(targetRow, 1, 1, 5).setValues([[name, role, primaryEmail, alternateEmail, status]]);
    SpreadsheetApp.flush();
    adminLog_(adminEmail, originalKey ? 'Updated directory person' : 'Added directory person', '', name, ['Panel Directory'], 'Success', role + '; ' + status);
    return adminDirectoryResponse_(originalKey ? 'Directory record updated.' : 'Directory record added.');
  } finally {
    lock.releaseLock();
  }
}

function deleteAdminDirectoryPerson(originalName, confirmationName) {
  const adminEmail = adminAssert_();
  const expected = String(originalName || '').trim();
  if (!expected || normaliseAdmin_(confirmationName) !== normaliseAdmin_(expected)) throw new Error('The name did not match. The directory record was not deleted.');
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const references = adminOpenDirectoryReferences_(expected);
    if (references.length) throw new Error('Reassign this person in the following open case(s) before deleting: ' + references.join(', '));
    const spreadsheet = adminSpreadsheet_();
    const sheet = spreadsheet.getSheetByName(ADMIN_CONFIG.PANEL_SHEET);
    if (!sheet) throw new Error('Panel Directory sheet was not found.');
    const values = sheet.getDataRange().getValues();
    let rowNumber = 0;
    for (let i = 1; i < values.length; i++) if (normaliseAdmin_(values[i][0]) === normaliseAdmin_(expected)) { rowNumber = i + 1; break; }
    if (!rowNumber) throw new Error('The directory record no longer exists. Refresh the list.');
    let archive = spreadsheet.getSheetByName(ADMIN_CONFIG.DELETED_PANEL_SHEET);
    if (!archive) {
      archive = spreadsheet.insertSheet(ADMIN_CONFIG.DELETED_PANEL_SHEET);
      archive.getRange(1, 1, 1, 7).setValues([['Deleted At','Deleted By','Name','Role','Primary Email','Alternate Email','Status']]);
      archive.setFrozenRows(1);
    }
    archive.appendRow([new Date(), adminEmail].concat(sheet.getRange(rowNumber, 1, 1, 5).getValues()[0]));
    sheet.deleteRow(rowNumber);
    SpreadsheetApp.flush();
    adminLog_(adminEmail, 'Deleted directory person', '', expected, ['Panel Directory'], 'Success', 'Archived in ' + ADMIN_CONFIG.DELETED_PANEL_SHEET);
    return adminDirectoryResponse_('Directory record deleted and archived.');
  } finally {
    lock.releaseLock();
  }
}

function authorizeAdminServices() {
  const email = adminAssert_();
  return {
    adminEmail: email,
    calendar: CalendarApp.getDefaultCalendar().getName(),
    remainingMailQuota: MailApp.getRemainingDailyQuota(),
    rootFolder: DriveApp.getFolderById(ADMIN_CONFIG.ROOT_FOLDER_ID).getName()
  };
}

function getAdminCase(caseId) {
  adminAssert_();
  const record=adminFindCase_(caseId);
  if(!record) throw new Error('The selected case no longer exists. Refresh first.');
  const data=adminCaseObject_(record);
  data._revision=wfRevision_(record);
  data._workflow=wfModel_(wfRaw_(record));
  if(data['Student Folder ID']) data['Student Folder Link']='https://drive.google.com/drive/folders/'+data['Student Folder ID'];
  return data;
}

function adminGetOrCreateStudentFolder(caseId) {
  adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('Case not found');
  const data = adminCaseObject_(record);
  const studentFolder = adminEnsureStudentFolder_(record, data);
  const folderUrl = 'https://drive.google.com/drive/folders/' + studentFolder.getId();
  return { ok: true, folderId: studentFolder.getId(), folderUrl: folderUrl };
}

function deleteAdminCase(caseId, confirmationName) {
  const adminEmail = adminAssert_();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const record = adminFindCase_(caseId);
    if (!record) throw new Error('The selected case no longer exists. Refresh the student list.');
    const data = adminCaseObject_(record);
    const expectedName = String(data['Student Name'] || '').trim();
    if (String(confirmationName || '').trim().toLowerCase() !== expectedName.toLowerCase()) {
      throw new Error('The student name did not match. The record was not deleted.');
    }

    const folderResult = adminArchiveStudentFolder_(data['Student Folder ID']);

    const spreadsheet = adminSpreadsheet_();
    let archive = spreadsheet.getSheetByName(ADMIN_CONFIG.DELETED_SHEET);
    const sourceHeaders = record.sheet.getRange(ADMIN_CONFIG.HEADER_ROW, 1, 1, record.sheet.getLastColumn()).getDisplayValues()[0];
    if (!archive) {
      archive = spreadsheet.insertSheet(ADMIN_CONFIG.DELETED_SHEET);
      if (archive.getMaxColumns() < sourceHeaders.length + 2) archive.insertColumnsAfter(archive.getMaxColumns(), sourceHeaders.length + 2 - archive.getMaxColumns());
      archive.getRange(1, 1, 1, sourceHeaders.length + 2).setValues([['Deleted At','Deleted By'].concat(sourceHeaders)]);
      archive.setFrozenRows(1);
    }
    const archivedValues = record.sheet.getRange(record.row, 1, 1, record.sheet.getLastColumn()).getValues()[0];
    archive.appendRow([new Date(), adminEmail].concat(archivedValues));
    record.sheet.deleteRow(record.row);
    SpreadsheetApp.flush();
    adminLog_(adminEmail, 'Deleted case', caseId, expectedName, [], 'Success', 'Record archived in ' + ADMIN_CONFIG.DELETED_SHEET + '; ' + folderResult.detail + '; calendar event retained');
    return {ok:true, message:'The student record was archived in Deleted Cases. ' + folderResult.detail + ' The calendar event was retained.', cases:adminListCases_()};
  } catch (error) {
    adminLog_(adminEmail, 'Delete failed', String(caseId || ''), String(confirmationName || ''), [], 'Error', error.message || String(error));
    throw new Error(error.message || String(error));
  } finally {
    lock.releaseLock();
  }
}

function adminArchiveStudentFolder_(folderId) {
  const id = String(folderId || '').trim();
  if (!id) return {moved:false, detail:'No student folder ID was recorded, so no Drive folder was moved.'};
  const root = DriveApp.getFolderById(ADMIN_CONFIG.ROOT_FOLDER_ID);
  const matches = root.getFoldersByName(ADMIN_CONFIG.ARCHIVE_FOLDER_NAME);
  const archive = matches.hasNext() ? matches.next() : root.createFolder(ADMIN_CONFIG.ARCHIVE_FOLDER_NAME);
  const studentFolder = DriveApp.getFolderById(id);
  if (studentFolder.getId() === archive.getId() || studentFolder.getId() === root.getId()) throw new Error('The recorded student folder ID points to a protected administration folder. Nothing was deleted.');
  const parents = studentFolder.getParents();
  while (parents.hasNext()) {
    if (parents.next().getId() === archive.getId()) return {moved:false, detail:'The student Drive folder was already in ' + ADMIN_CONFIG.ARCHIVE_FOLDER_NAME + '.'};
  }
  studentFolder.moveTo(archive);
  return {moved:true, detail:'The student Drive folder was moved to ' + ADMIN_CONFIG.ARCHIVE_FOLDER_NAME + '.'};
}

function saveAdminCaseLegacy_(payload,lockHeld) {
  const adminEmail = adminAssert_();
  if (!payload || !payload.values) throw new Error('No case data was received.');
  const values = payload.values;
  values['Meeting Platform']=adminMeetingPlatform_(values);
  if(values['Meeting Platform']==='In person') values['Google Meet Link']='';
  const studentName = adminRequired_(values['Student Name'], 'Student name');
  const studentEmail = adminRequired_(values['Student Email'], 'Student email');
  adminRequired_(values['Programme'], 'Programme');
  const defenceType = adminRequired_(values['Defence Type'], 'Defence type');
  adminRequired_(values['Research Title'], 'Research title');
  adminRequired_(values['Supervisor'], 'Supervisor');
  const supervisorEmail = adminRequired_(values['Supervisor Email'], 'Supervisor email');
  if (['Proposal Defence','Viva Voce'].indexOf(defenceType) === -1) throw new Error('Select a valid defence type.');
  adminValidateEmail_(studentEmail, 'Student Email');
  adminValidateEmail_(supervisorEmail, 'Supervisor Email');
  ['Chair Email','Examiner 1 Email','Examiner 2 Email'].forEach(function(h) {
    if (String(values[h] || '').trim()) adminValidateEmail_(values[h], h);
  });

  const lock = lockHeld ? null : LockService.getScriptLock();
  if(lock) lock.waitLock(30000);
  try {
    const sheet = adminSheet_();
    const map = adminHeaderMap_(sheet);
    const originalId = String(payload.originalCaseId || '').trim();
    let record = originalId ? adminFindCase_(originalId) : null;
    if (originalId && !record) throw new Error('This case was changed or removed. Refresh before saving.');
    if(record) wfAssertRevision_(record,payload.expectedRevision);
    const isNew = !record;
    let row;
    let caseId;
    let oldValues;

    if (isNew) {
      row = Math.max(sheet.getLastRow() + 1, ADMIN_CONFIG.HEADER_ROW + 1);
      caseId = adminGenerateCaseId_(defenceType, values['Session Date'], sheet, map);
      if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 25);
      const templateRow = ADMIN_CONFIG.HEADER_ROW + 1;
      sheet.getRange(templateRow, 1, 1, sheet.getLastColumn()).copyTo(sheet.getRange(row, 1, 1, sheet.getLastColumn()), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).clearContent();
      oldValues = new Array(sheet.getLastColumn()).fill('');
      sheet.getRange(row, map['Case ID']).setValue(caseId);
    } else {
      row = record.row;
      caseId = originalId;
      oldValues = record.values;
    }

    const defaults = {
      'Session Status':'Registered', 'Result Scale':'Not recorded', 'Result Email Status':'Not prepared',
      'Final Submission Status':'Pending result details', 'Endorsement Status':'Not recorded',
      'Invitation Email Status':'Not prepared', 'Calendar Invitation Status':'Not scheduled', 'Submission Enabled':'Yes'
    };
    const changed = [];
    ADMIN_EDITABLE.forEach(function(header) {
      const supplied = Object.prototype.hasOwnProperty.call(values, header);
      let next;
      if (isNew && !supplied && defaults[header]) next = defaults[header];
      else if (!supplied) return;
      else next = String(values[header] == null ? '' : values[header]).trim();
      const old = String(oldValues[map[header] - 1] || '').trim();
      if (next === old) return;
      changed.push(header);
      const cell = sheet.getRange(row, map[header]);
      if (!next) cell.clearContent();
      else if (ADMIN_DATE_FIELDS.indexOf(header) !== -1) cell.setValue(adminDate_(next, header));
      else cell.setValue(next);
    });

    if(isNew){['Student Key','Stage Attempt','Defence Type','Progression Route'].forEach(function(h){if(map[h])sheet.getRange(row,map[h]).setValue(String(values[h]||''));});if(map['Case Status'])sheet.getRange(row,map['Case Status']).setValue('Active');}
    const now = new Date();
    SpreadsheetApp.flush();
    if(isNew)wfAppend_(WF_EVENT_SHEET,caseId,values['Student Key'],'REGISTERED',adminEmail,{stage:values['Defence Type']});
    adminLog_(adminEmail, isNew ? 'Created case' : 'Updated case', caseId, studentName, changed, 'Success', 'Saved from Defence Administration Portal');
    return {ok:true, caseId:caseId, studentName:studentName, created:isNew, changedFields:changed, cases:adminListCases_()};
  } catch (error) {
    adminLog_(adminEmail, 'Save failed', String(payload.originalCaseId || ''), String(values['Student Name'] || ''), [], 'Error', error.message || String(error));
    throw new Error(error.message || String(error));
  } finally {
    if(lock) lock.releaseLock();
  }
}

function scheduleAdminCase(caseId, clientData) {
  const adminEmail = adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  wfAssertRevision_(record,clientData&&clientData._revision);
  if(wfNorm_(wfRaw_(record)['Case Status'])==='closed')throw new Error('Reopen the stage explicitly before modifying arrangements or issuing outcomes.');
  const data = adminCaseObject_(record);



  data['Examiner 1 Role'] = adminResolveExaminerRole_(data, 1);
  data['Examiner 2 Role'] = adminResolveExaminerRole_(data, 2);
  if (record.map['Examiner 1 Role']) record.sheet.getRange(record.row, record.map['Examiner 1 Role']).setValue(data['Examiner 1 Role']);
  if (record.map['Examiner 2 Role']) record.sheet.getRange(record.row, record.map['Examiner 2 Role']).setValue(data['Examiner 2 Role']);
  SpreadsheetApp.flush();

  adminRequireDraft_(data, record);
  const initialCalendar = adminCalendarMeeting_(caseId);
  adminStoreCalendarMeet_(record, data, initialCalendar);
  adminRequireMeetingLink_(data, true);
  const start = adminSessionDateTime_(data['Session Date'], data['Start Time'], 'session start');
  const end = adminSessionDateTime_(data['Session Date'], data['End Time'], 'session end');
  if (end <= start) throw new Error('End time must be later than the start time.');

  const attendees = adminPanelRecipients_(data, true);
  [
    {name:data['Student Name'], email:data['Student Email'], role:'Candidate'},
    {name:data['Supervisor'], email:data['Supervisor Email'], role:'Supervisor'}
  ].forEach(function(person) {
    const email = String(person.email || '').trim().toLowerCase();
    if (email && !attendees.some(function(item) { return item.email === email; })) attendees.push({name:person.name, email:email, roles:[person.role]});
  });

  // Include Additional Invitees on Calendar
  const additionalInvitees = adminParseEmailList_(data['Additional Invitees']);
  additionalInvitees.forEach(function(email) {
    if (!attendees.some(function(item) { return item.email === email; })) {
      attendees.push({name: email, email: email, roles: ['Invitee']});
    }
  });

  const title = data['Defence Type'] + ': ' + data['Student Name'];
  const location = String(data['Google Meet Link'] || data['Venue'] || '').trim();
  const description = adminSessionDescription_(data);
  const guestEmails = attendees.map(function(person) { return person.email; });
  const calendar = adminGetTargetCalendar_();
  const propertyKey = 'ADMIN_CALENDAR_EVENT_' + caseId;
  const properties = PropertiesService.getScriptProperties();
  const existingId = properties.getProperty(propertyKey);
  let event = existingId ? (calendar.getEventById(existingId) || CalendarApp.getDefaultCalendar().getEventById(existingId)) : null;
  let action;

  if (event) {
    event.setTitle(title).setTime(start, end).setDescription(description).setLocation(location);
    const wanted = {};
    guestEmails.forEach(function(email) { wanted[email] = true; });
    event.getGuestList().forEach(function(guest) {
      const email = String(guest.getEmail() || '').toLowerCase();
      if (email && !wanted[email]) event.removeGuest(email);
    });
    const current = {};
    event.getGuestList().forEach(function(guest) { current[String(guest.getEmail() || '').toLowerCase()] = true; });
    guestEmails.forEach(function(email) { if (!current[email]) event.addGuest(email); });
    action = 'Updated calendar event';
  } else {
    event = calendar.createEvent(title, start, end, {
      description: description,
      location: location,
      guests: guestEmails.join(','),
      sendInvites: true
    });
    properties.setProperty(propertyKey, event.getId());
    action = 'Created calendar event';
  }

  const calendarReview=adminCalendarMeeting_(caseId);
  adminStoreCalendarMeet_(record,data,calendarReview);
  const map = record.map;
  const now = new Date();
  record.sheet.getRange(record.row, map['Calendar Invitation Status']).setValue('Invitations sent');
  if (['Passed','Cancelled'].indexOf(data['Session Status']) === -1) record.sheet.getRange(record.row, map['Session Status']).setValue('Scheduled');
  SpreadsheetApp.flush();
  adminLog_(adminEmail, action, caseId, data['Student Name'], ['Calendar Invitation Status','Session Status'], 'Success', guestEmails.length + ' guests invited');
  return {ok:true, message:(action === 'Created calendar event' ? 'Calendar event created' : 'Calendar event updated') + ' and RSVP invitations sent to ' + guestEmails.length + ' participant(s). '+calendarReview.message, calendarReview:calendarReview, caseData:adminCaseObject_(adminFindCase_(caseId)), cases:adminListCases_()};
}

function adminEnsureEmailTemplatesSheet_() {
  const spreadsheet = adminSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(ADMIN_CONFIG.EMAIL_TEMPLATE_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(ADMIN_CONFIG.EMAIL_TEMPLATE_SHEET);
  }
  if (sheet.getMaxColumns() < ADMIN_EMAIL_TEMPLATE_HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), ADMIN_EMAIL_TEMPLATE_HEADERS.length - sheet.getMaxColumns());
  }
  sheet.getRange(1, 1, 1, ADMIN_EMAIL_TEMPLATE_HEADERS.length).setValues([ADMIN_EMAIL_TEMPLATE_HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, ADMIN_EMAIL_TEMPLATE_HEADERS.length).setBackground('#4c1d95').setFontColor('#ffffff').setFontWeight('bold');
  const widths = [180, 220, 320, 360, 320, 160, 220];
  widths.forEach(function(w, i) { sheet.setColumnWidth(i + 1, w); });

  const existingKeys = {};
  if (sheet.getLastRow() > 1) {
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getDisplayValues();
    rows.forEach(function(r) {
      const key = String(r[0] || '').trim();
      if (key) existingKeys[key] = true;
    });
  }

  const now = new Date();
  Object.keys(ADMIN_DEFAULT_EMAIL_TEMPLATES).forEach(function(key) {
    if (!existingKeys[key]) {
      const t = ADMIN_DEFAULT_EMAIL_TEMPLATES[key];
      sheet.appendRow([t.key, t.name, t.subject, t.openingText, t.closingText, now, 'System Default']);
    }
  });
  if (!existingKeys['CONFIG_SIGNATORY']) {
    sheet.appendRow([
      'CONFIG_SIGNATORY',
      'Letter Signatory (Person in Charge)',
      ADMIN_DEFAULT_SIGNATORY.name,
      ADMIN_DEFAULT_SIGNATORY.title,
      ADMIN_DEFAULT_SIGNATORY.department + '||' + ADMIN_DEFAULT_SIGNATORY.institution,
      now,
      'System Default'
    ]);
  }
  return sheet;
}

function adminGetEmailTemplatesCached_() {
  try {
    const cache = CacheService.getScriptCache();
    const cached = cache.get('ADMIN_EMAIL_TEMPLATES');
    if (cached) {
      return JSON.parse(cached);
    }
    const result = adminGetEmailTemplates_();
    try { cache.put('ADMIN_EMAIL_TEMPLATES', JSON.stringify(result), 600); } catch(e) {}
    return result;
  } catch (err) {
    return adminGetEmailTemplates_();
  }
}

function adminGetEmailSendersCached_() {
  try {
    const cache = CacheService.getScriptCache();
    const cached = cache.get('ADMIN_EMAIL_SENDERS');
    if (cached) {
      return JSON.parse(cached);
    }
    const result = adminGetEmailSenders_();
    try { cache.put('ADMIN_EMAIL_SENDERS', JSON.stringify(result), 600); } catch(e) {}
    return result;
  } catch (err) {
    return adminGetEmailSenders_();
  }
}

function adminGetSignatoryCached_() {
  try {
    const cache = CacheService.getScriptCache();
    const cached = cache.get('ADMIN_SIGNATORY');
    if (cached) {
      return JSON.parse(cached);
    }
    const result = adminGetSignatory_();
    try { cache.put('ADMIN_SIGNATORY', JSON.stringify(result), 600); } catch(e) {}
    return result;
  } catch (err) {
    return adminGetSignatory_();
  }
}

function adminGetEmailTemplates_() {
  const sheet = adminEnsureEmailTemplatesSheet_();
  const count = sheet.getLastRow() - 1;
  const templates = {};
  Object.keys(ADMIN_DEFAULT_EMAIL_TEMPLATES).forEach(function(key) {
    templates[key] = Object.assign({}, ADMIN_DEFAULT_EMAIL_TEMPLATES[key]);
  });
  if (count > 0) {
    const rows = sheet.getRange(2, 1, count, ADMIN_EMAIL_TEMPLATE_HEADERS.length).getDisplayValues();
    rows.forEach(function(r) {
      const key = String(r[0] || '').trim();
      if (!key || key === 'CONFIG_SIGNATORY') return;
      const def = ADMIN_DEFAULT_EMAIL_TEMPLATES[key] || {};
      templates[key] = {
        key: key,
        name: String(r[1] || def.name || key).trim(),
        subject: String(r[2] || def.subject || '').trim() || def.subject || '',
        openingText: String(r[3] || def.openingText || '').trim() || def.openingText || '',
        closingText: String(r[4] || def.closingText || '').trim() || def.closingText || '',
        updatedAt: String(r[5] || '').trim(),
        updatedBy: String(r[6] || '').trim()
      };
    });
  }
  return templates;
}

function saveAdminEmailTemplate(payload) {
  const adminEmail = adminAssert_();
  if (!payload || !payload.key) throw new Error('No template information was received.');
  const key = String(payload.key).trim();
  const def = ADMIN_DEFAULT_EMAIL_TEMPLATES[key];
  if (!def) throw new Error('Unknown template key: ' + key);

  const subject = adminRequired_(payload.subject, 'Subject line');
  const openingText = adminRequired_(payload.openingText, 'Opening message');
  const closingText = adminRequired_(payload.closingText, 'Closing message');

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = adminEnsureEmailTemplatesSheet_();
    const count = sheet.getLastRow() - 1;
    let targetRow = 0;
    if (count > 0) {
      const keys = sheet.getRange(2, 1, count, 1).getDisplayValues();
      for (let i = 0; i < keys.length; i++) {
        if (String(keys[i][0] || '').trim() === key) {
          targetRow = i + 2;
          break;
        }
      }
    }
    const values = [key, def.name, subject, openingText, closingText, new Date(), adminEmail];
    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, values.length).setValues([values]);
    } else {
      sheet.appendRow(values);
    }
    SpreadsheetApp.flush();
    try { CacheService.getScriptCache().remove('ADMIN_EMAIL_TEMPLATES'); } catch(e) {}
    adminLog_(adminEmail, 'Updated email template', '', key, ['Subject', 'Opening Text', 'Closing Text'], 'Success', 'Updated generic template for ' + def.name);
    return {
      ok: true,
      message: 'Email settings for "' + def.name + '" saved successfully.',
      templates: adminGetEmailTemplates_()
    };
  } finally {
    lock.releaseLock();
  }
}

function resetAdminEmailTemplate(key) {
  const adminEmail = adminAssert_();
  const cleanKey = String(key || '').trim();
  const def = ADMIN_DEFAULT_EMAIL_TEMPLATES[cleanKey];
  if (!def) throw new Error('Unknown template key: ' + cleanKey);

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = adminEnsureEmailTemplatesSheet_();
    const count = sheet.getLastRow() - 1;
    let targetRow = 0;
    if (count > 0) {
      const keys = sheet.getRange(2, 1, count, 1).getDisplayValues();
      for (let i = 0; i < keys.length; i++) {
        if (String(keys[i][0] || '').trim() === cleanKey) {
          targetRow = i + 2;
          break;
        }
      }
    }
    const values = [cleanKey, def.name, def.subject, def.openingText, def.closingText, new Date(), adminEmail + ' (Reset to Default)'];
    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, values.length).setValues([values]);
    } else {
      sheet.appendRow(values);
    }
    SpreadsheetApp.flush();
    adminLog_(adminEmail, 'Reset email template', '', cleanKey, [], 'Success', 'Reset to default institutional template for ' + def.name);
    return {
      ok: true,
      message: 'Email settings for "' + def.name + '" reset to default.',
      templates: adminGetEmailTemplates_()
    };
  } finally {
    lock.releaseLock();
  }
}

function adminGetSignatory_() {
  try {
    const sheet = adminEnsureEmailTemplatesSheet_();
    const count = sheet.getLastRow() - 1;
    if (count > 0) {
      const rows = sheet.getRange(2, 1, count, ADMIN_EMAIL_TEMPLATE_HEADERS.length).getDisplayValues();
      for (let i = 0; i < rows.length; i++) {
        if (String(rows[i][0] || '').trim() === 'CONFIG_SIGNATORY') {
          const name = String(rows[i][2] || '').trim();
          const title = String(rows[i][3] || '').trim();
          const closing = String(rows[i][4] || '').trim();
          const parts = closing.split('||');
          const department = String(parts[0] || '').trim();
          const institution = String(parts[1] || '').trim();
          return {
            name: name || ADMIN_DEFAULT_SIGNATORY.name,
            title: title || ADMIN_DEFAULT_SIGNATORY.title,
            department: department || ADMIN_DEFAULT_SIGNATORY.department,
            institution: institution || ADMIN_DEFAULT_SIGNATORY.institution,
            updatedAt: String(rows[i][5] || '').trim(),
            updatedBy: String(rows[i][6] || '').trim()
          };
        }
      }
    }
  } catch (err) {
    console.warn('Could not read signatory config: ' + err.message);
  }
  return Object.assign({}, ADMIN_DEFAULT_SIGNATORY);
}

function saveAdminSignatory(payload) {
  const adminEmail = adminAssert_();
  if (!payload) throw new Error('No signatory information was received.');
  const name = adminRequired_(payload.name, 'Signatory name');
  const title = adminRequired_(payload.title, 'Signatory title / designation');
  const department = adminRequired_(payload.department, 'Department / unit');
  const institution = adminRequired_(payload.institution, 'Institution name');

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = adminEnsureEmailTemplatesSheet_();
    const count = sheet.getLastRow() - 1;
    let targetRow = 0;
    if (count > 0) {
      const keys = sheet.getRange(2, 1, count, 1).getDisplayValues();
      for (let i = 0; i < keys.length; i++) {
        if (String(keys[i][0] || '').trim() === 'CONFIG_SIGNATORY') {
          targetRow = i + 2;
          break;
        }
      }
    }
    const closingCombined = department + '||' + institution;
    const values = ['CONFIG_SIGNATORY', 'Letter Signatory (Person in Charge)', name, title, closingCombined, new Date(), adminEmail];
    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, values.length).setValues([values]);
    } else {
      sheet.appendRow(values);
    }
    SpreadsheetApp.flush();
    try { CacheService.getScriptCache().remove('ADMIN_SIGNATORY'); } catch(e) {}
    adminLog_(adminEmail, 'Updated letter signatory (PIC)', '', 'CONFIG_SIGNATORY', ['Signatory Name', 'Signatory Title'], 'Success', name + ' (' + title + ')');
    return {
      ok: true,
      message: 'Signatory details saved: ' + name + ' (' + title + ').',
      signatory: adminGetSignatory_()
    };
  } finally {
    lock.releaseLock();
  }
}

function resetAdminSignatory() {
  const adminEmail = adminAssert_();
  return saveAdminSignatory(Object.assign({}, ADMIN_DEFAULT_SIGNATORY));
}

function adminEnsureEmailSendersSheet_() {
  const spreadsheet = adminSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(ADMIN_CONFIG.EMAIL_SENDER_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(ADMIN_CONFIG.EMAIL_SENDER_SHEET);
  }
  if (sheet.getMaxColumns() < ADMIN_EMAIL_SENDER_HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), ADMIN_EMAIL_SENDER_HEADERS.length - sheet.getMaxColumns());
  }
  sheet.getRange(1, 1, 1, ADMIN_EMAIL_SENDER_HEADERS.length).setValues([ADMIN_EMAIL_SENDER_HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, ADMIN_EMAIL_SENDER_HEADERS.length).setBackground('#4c1d95').setFontColor('#ffffff').setFontWeight('bold');
  const widths = [160, 240, 240, 240, 100, 280, 160, 200];
  widths.forEach(function(w, i) { sheet.setColumnWidth(i + 1, w); });

  if (sheet.getLastRow() <= 1) {
    const now = new Date();
    ADMIN_DEFAULT_EMAIL_SENDERS.forEach(function(s) {
      sheet.appendRow([s.id, s.name, s.email, s.replyTo, s.isDefault ? 'TRUE' : 'FALSE', s.description, now, 'System Default']);
    });
  } else {
    // Ensure DEFAULT_IPGS is updated to latest configuration if already present
    try {
      const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, ADMIN_EMAIL_SENDER_HEADERS.length).getDisplayValues();
      for (let i = 0; i < rows.length; i++) {
        if (String(rows[i][0] || '').trim() === 'DEFAULT_IPGS') {
          sheet.getRange(i + 2, 2).setValue('IPGS');
          sheet.getRange(i + 2, 3).setValue('instituteofpostgraduate@innovative.edu.my');
          sheet.getRange(i + 2, 4).setValue('instituteofpostgraduate@innovative.edu.my');
          sheet.getRange(i + 2, 5).setValue('TRUE');
          break;
        }
      }
    } catch (e) {}
  }
  return sheet;
}

function adminGetEmailSenders_() {
  const hardcodedDefault = {
    id: 'DEFAULT_IPGS',
    name: 'IPGS',
    email: 'instituteofpostgraduate@innovative.edu.my',
    replyTo: 'instituteofpostgraduate@innovative.edu.my',
    isDefault: true,
    description: 'Main administrative sender for candidate notices and examination outcomes'
  };

  try {
    const sheet = adminEnsureEmailSendersSheet_();
    const count = sheet.getLastRow() - 1;
    if (count > 0) {
      const rows = sheet.getRange(2, 1, count, ADMIN_EMAIL_SENDER_HEADERS.length).getDisplayValues();
      const senders = [];
      let hasDefault = false;
      for (let i = 0; i < rows.length; i++) {
        const id = String(rows[i][0] || '').trim();
        if (!id) continue;
        const isDef = String(rows[i][4] || '').trim().toUpperCase() === 'TRUE';
        if (isDef) hasDefault = true;
        senders.push({
          id: id,
          name: String(rows[i][1] || '').trim(),
          email: String(rows[i][2] || '').trim(),
          replyTo: String(rows[i][3] || '').trim(),
          isDefault: isDef,
          description: String(rows[i][5] || '').trim(),
          updatedAt: String(rows[i][6] || '').trim(),
          updatedBy: String(rows[i][7] || '').trim()
        });
      }
      if (senders.length > 0) {
        if (!hasDefault) {
          senders[0].isDefault = true;
        }
        return senders;
      }
    }
  } catch (err) {
    console.warn('Could not read email senders sheet: ' + err.message);
  }
  return [hardcodedDefault];
}

function adminGetDefaultSender_() {
  return {
    id: 'DEFAULT_IPGS',
    name: 'IPGS',
    email: 'instituteofpostgraduate@innovative.edu.my',
    replyTo: 'instituteofpostgraduate@innovative.edu.my',
    isDefault: true,
    description: 'Main administrative sender for candidate notices and examination outcomes'
  };
}

function saveAdminEmailSender(payload) {
  const adminEmail = adminAssert_();
  if (!payload) throw new Error('No sender information was received.');

  const name = adminRequired_(payload.name, 'Sender display name');
  const email = adminRequired_(payload.email, 'Sender email address').toLowerCase();
  const replyTo = String(payload.replyTo || email).trim().toLowerCase();
  const description = String(payload.description || '').trim();
  const isDefault = Boolean(payload.isDefault);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid sender email address.');
  }
  if (replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
    throw new Error('Please enter a valid reply-to email address.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = adminEnsureEmailSendersSheet_();
    const count = sheet.getLastRow() - 1;
    let targetRow = 0;
    let senderId = String(payload.id || '').trim();

    if (count > 0) {
      const ids = sheet.getRange(2, 1, count, 1).getDisplayValues();
      for (let i = 0; i < ids.length; i++) {
        if (senderId && String(ids[i][0] || '').trim() === senderId) {
          targetRow = i + 2;
          break;
        }
      }
    }

    if (!senderId) {
      senderId = 'SENDER_' + Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyyMMdd_HHmmss');
    }

    if (isDefault && count > 0) {
      const defaultCol = 5; // 'Is Default'
      const defValues = [];
      for (let i = 0; i < count; i++) {
        defValues.push(['FALSE']);
      }
      sheet.getRange(2, defaultCol, count, 1).setValues(defValues);
    }

    const now = new Date();
    const values = [senderId, name, email, replyTo, isDefault ? 'TRUE' : 'FALSE', description, now, adminEmail];
    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, values.length).setValues([values]);
    } else {
      sheet.appendRow(values);
    }
    SpreadsheetApp.flush();
    adminLog_(adminEmail, targetRow > 0 ? 'Updated email sender' : 'Added email sender', '', senderId, ['Display Name', 'Email', 'Reply-To', 'Is Default'], 'Success', name + ' <' + email + '> (Default: ' + isDefault + ')');

    return {
      ok: true,
      message: 'Email sender "' + name + '" saved successfully.',
      senders: adminGetEmailSenders_()
    };
  } finally {
    lock.releaseLock();
  }
}

function deleteAdminEmailSender(senderId) {
  const adminEmail = adminAssert_();
  const cleanId = String(senderId || '').trim();
  if (!cleanId) throw new Error('No sender ID provided.');

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = adminEnsureEmailSendersSheet_();
    const count = sheet.getLastRow() - 1;
    if (count <= 1) {
      throw new Error('Cannot delete the only configured email sender. At least one sender must remain.');
    }

    const rows = sheet.getRange(2, 1, count, ADMIN_EMAIL_SENDER_HEADERS.length).getDisplayValues();
    let targetRow = 0;
    let wasDefault = false;
    let targetName = '';

    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][0] || '').trim() === cleanId) {
        targetRow = i + 2;
        targetName = String(rows[i][1] || '').trim();
        wasDefault = String(rows[i][4] || '').trim().toUpperCase() === 'TRUE';
        break;
      }
    }

    if (!targetRow) throw new Error('Sender with ID "' + cleanId + '" was not found.');

    sheet.deleteRow(targetRow);
    SpreadsheetApp.flush();

    if (wasDefault) {
      const remainingCount = sheet.getLastRow() - 1;
      if (remainingCount > 0) {
        sheet.getRange(2, 5).setValue('TRUE');
        SpreadsheetApp.flush();
      }
    }

    try { CacheService.getScriptCache().remove('ADMIN_EMAIL_SENDERS'); } catch(e) {}
    adminLog_(adminEmail, 'Deleted email sender', '', cleanId, [], 'Success', 'Deleted sender: ' + targetName + ' (' + cleanId + ')');

    return {
      ok: true,
      message: 'Email sender "' + targetName + '" removed.',
      senders: adminGetEmailSenders_()
    };
  } finally {
    lock.releaseLock();
  }
}

function setDefaultAdminEmailSender(senderId) {
  const adminEmail = adminAssert_();
  const cleanId = String(senderId || '').trim();
  if (!cleanId) throw new Error('No sender ID provided.');

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = adminEnsureEmailSendersSheet_();
    const count = sheet.getLastRow() - 1;
    if (count <= 0) throw new Error('No email senders configured.');

    const rows = sheet.getRange(2, 1, count, ADMIN_EMAIL_SENDER_HEADERS.length).getDisplayValues();
    let found = false;
    let senderName = '';
    const defValues = [];

    for (let i = 0; i < rows.length; i++) {
      const isMatch = String(rows[i][0] || '').trim() === cleanId;
      if (isMatch) {
        found = true;
        senderName = String(rows[i][1] || '').trim();
        defValues.push(['TRUE']);
      } else {
        defValues.push(['FALSE']);
      }
    }

    if (!found) throw new Error('Sender ID "' + cleanId + '" was not found.');

    sheet.getRange(2, 5, count, 1).setValues(defValues);
    SpreadsheetApp.flush();

    try { CacheService.getScriptCache().remove('ADMIN_EMAIL_SENDERS'); } catch(e) {}
    adminLog_(adminEmail, 'Changed default email sender', '', cleanId, ['Is Default'], 'Success', 'Active default sender set to: ' + senderName + ' (' + cleanId + ')');

    return {
      ok: true,
      message: 'Default sender set to "' + senderName + '".',
      senders: adminGetEmailSenders_()
    };
  } finally {
    lock.releaseLock();
  }
}

function adminNormalizeEmailAddress_(raw) {
  const s = String(raw || '').trim().toLowerCase();
  const m = s.match(/<([^>]+)>/);
  return m ? m[1].trim().toLowerCase() : s;
}

function adminGetTargetCalendar_() {
  const defaultSender = adminGetDefaultSender_();
  const targetEmail = defaultSender && defaultSender.email ? adminNormalizeEmailAddress_(defaultSender.email) : '';
  if (targetEmail) {
    try {
      const cal = CalendarApp.getCalendarById(targetEmail);
      if (cal) return cal;
    } catch (e) {
      console.warn('Could not access calendar for ' + targetEmail + ': ' + e.message);
    }
  }
  return CalendarApp.getDefaultCalendar();
}

function adminGetSenderDiagnostics_() {
  const activeUser = adminNormalizeEmailAddress_(Session.getActiveUser().getEmail());
  let aliases = [];
  let aliasError = '';
  try {
    aliases = GmailApp.getAliases().map(adminNormalizeEmailAddress_);
  } catch (e) {
    aliasError = e.message || String(e);
    console.warn('Could not read Gmail aliases: ' + aliasError);
  }

  const defaultSender = adminGetDefaultSender_();
  const targetEmail = defaultSender && defaultSender.email ? adminNormalizeEmailAddress_(defaultSender.email) : '';
  let calendarStatus = {
    targetEmail: targetEmail,
    calendarName: '',
    canAccessTarget: false,
    activeCalendarName: CalendarApp.getDefaultCalendar().getName()
  };

  if (targetEmail) {
    try {
      const targetCal = CalendarApp.getCalendarById(targetEmail);
      if (targetCal) {
        calendarStatus.calendarName = targetCal.getName();
        calendarStatus.canAccessTarget = true;
      }
    } catch (calErr) {
      calendarStatus.accessError = calErr.message || String(calErr);
    }
  }

  return {
    activeUser: activeUser,
    aliases: aliases,
    aliasError: aliasError,
    calendarStatus: calendarStatus
  };
}

function adminGetSenderDiagnostics() {
  adminAssert_();
  return adminGetSenderDiagnostics_();
}

function adminSendEmail_(mailOptions, specificSenderId) {
  let sender = null;
  if (specificSenderId) {
    const senders = adminGetEmailSenders_();
    for (let i = 0; i < senders.length; i++) {
      if (senders[i].id === specificSenderId) {
        sender = senders[i];
        break;
      }
    }
  }
  if (!sender) {
    sender = adminGetDefaultSender_();
  }

  const opts = Object.assign({}, mailOptions);
  if (sender && sender.name) {
    opts.name = sender.name;
  }
  if (sender && sender.replyTo) {
    opts.replyTo = sender.replyTo;
  }

  // Attempt to send from alias via GmailApp if sender.email is an authorized alias or the active user account
  if (sender && sender.email) {
    try {
      const activeUser = adminNormalizeEmailAddress_(Session.getActiveUser().getEmail());
      const targetEmail = adminNormalizeEmailAddress_(sender.email);
      const aliases = GmailApp.getAliases().map(adminNormalizeEmailAddress_);
      const isAlias = (aliases.indexOf(targetEmail) !== -1) || (activeUser === targetEmail);

      if (isAlias) {
        const gmailOpts = Object.assign({}, opts);
        gmailOpts.from = sender.email;
        const to = gmailOpts.to;
        const subj = gmailOpts.subject;
        const body = gmailOpts.body || '';
        delete gmailOpts.to;
        delete gmailOpts.subject;
        delete gmailOpts.body;
        GmailApp.sendEmail(to, subj, body, gmailOpts);
        return;
      } else {
        console.warn('Target outbound sender "' + targetEmail + '" is not registered in Gmail aliases for account ' + activeUser + ' (available aliases: ' + (aliases.length ? aliases.join(', ') : 'none') + '). Sending via MailApp with Reply-To: ' + (sender.replyTo || targetEmail) + '. To send directly from ' + targetEmail + ', add it under Gmail Settings > Accounts > "Send mail as".');
      }
    } catch (aliasErr) {
      console.warn('GmailApp alias send failed (' + aliasErr.message + '), falling back to MailApp.');
    }
  }

  // Standard MailApp send
  MailApp.sendEmail(opts);
}

function adminGetEmailHeaderBlob_() {
  const b64 = (typeof ADMIN_EMAIL_HEADER_BASE64 !== 'undefined') ? ADMIN_EMAIL_HEADER_BASE64 : '';
  if (!b64) return null;
  try {
    return Utilities.newBlob(Utilities.base64Decode(b64), 'image/jpeg', 'EmailHeader.jpeg');
  } catch (e) {
    console.warn('Failed to construct email header blob: ' + e.message);
    return null;
  }
}

function adminAssembleEmail_(templateKey, data, recipient) {
  const templates = adminGetEmailTemplates_();
  const t = templates[templateKey] || ADMIN_DEFAULT_EMAIL_TEMPLATES[templateKey];
  if (!t) throw new Error('Unknown email template: ' + templateKey);

  const recipientName = String((recipient && recipient.name) || '').trim();
  const recipientRoles = String((recipient && recipient.roles && recipient.roles.join(' and ')) || (recipient && recipient.role) || '').trim();

  const replaceTokens = function(text) {
    let s = String(text || '');
    s = s.replace(/\{\{STUDENT_NAME\}\}/g, data['Student Name'] || '');
    s = s.replace(/\{\{STUDENT_KEY\}\}/g, '');
    s = s.replace(/\{\{STUDENT_ID\}\}/g, '');
    s = s.replace(/\{\{DEFENCE_TYPE\}\}/g, data['Defence Type'] || '');
    s = s.replace(/\{\{CASE_ID\}\}/g, data['Case ID'] || '');
    s = s.replace(/\{\{RESEARCH_TITLE\}\}/g, data['Research Title'] || '');
    s = s.replace(/\{\{RECIPIENT_NAME\}\}/g, recipientName);
    s = s.replace(/\{\{PANEL_ROLES\}\}/g, recipientRoles || 'Panel Member');
    return s;
  };

  const subject = replaceTokens(t.subject);
  const opening = replaceTokens(t.openingText);
  const closing = replaceTokens(t.closingText);

  let plainLines = [];
  let htmlSections = [];

  // Salutation
  const salutation = recipientName ? 'Dear ' + recipientName + ',' : 'Dear Colleague,';
  plainLines.push(salutation);
  plainLines.push('');
  htmlSections.push('<p style="margin:0 0 16px 0;font-size:15px;color:#241b35;">' + adminEscapeHtml_(salutation) + '</p>');

  // Opening generic message
  plainLines.push(opening);
  plainLines.push('');
  htmlSections.push('<p style="margin:0 0 18px 0;font-size:14px;line-height:1.6;color:#34244b;">' + adminEscapeHtml_(opening) + '</p>');

  // Auto-generated details table & links
  if (templateKey === 'PANEL_INVITATION') {
    let dateText = 'Date to be confirmed';
    if (data['Session Date']) {
      try {
        dateText = adminReadableDate_(data['Session Date']);
      } catch (e) {
        dateText = String(data['Session Date']);
      }
    }
    const sessionPlace = data['Google Meet Link']
      ? '<a href="' + adminEscapeHtml_(data['Google Meet Link']) + '" style="color:#6d4aff;font-weight:700;">' + adminEscapeHtml_(data['Google Meet Link']) + '</a>'
      : adminEscapeHtml_(data['Venue'] || 'To be confirmed');
    const draftLinkHtml = data['Student Draft Link']
      ? '<p style="margin:16px 0 8px 0;"><a href="' + adminEscapeHtml_(data['Student Draft Link']) + '" style="color:#6d4aff;font-weight:700;">Open student draft</a></p>'
      : '<p style="margin:16px 0 8px 0;color:#756d83;">Draft link unavailable</p>';
    const isExaminer = recipientRoles && recipientRoles.toLowerCase().indexOf('examiner') >= 0;
    let portalLinkHtml = '';
    if (isExaminer && person && person.email) {
      const slotParam = (recipientRoles.indexOf('2') >= 0) ? 'examiner 2' : 'examiner 1';
      const directUrl = adminGetExaminerDirectLink_(data['Case ID'], person.email, slotParam);
      plainLines.push('Examiner Direct Portal (One-Click Access): ' + directUrl);
      portalLinkHtml = '<div style="margin:20px 0;padding:16px 20px;background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;">' +
        '<p style="margin:0 0 6px 0;font-weight:700;color:#5b21b6;font-size:14px;">Direct Evaluation Portal Access</p>' +
        '<p style="margin:0 0 12px 0;color:#6b21a8;font-size:13px;line-height:1.45;">As an appointed examiner, click the button below to directly access the candidate\'s dissertation, download your prefilled evaluation form, and upload your report without requiring directory search or password login:</p>' +
        '<a href="' + directUrl + '" style="display:inline-block;padding:10px 18px;background:#6d4aff;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:700;font-size:13.5px;">Open Candidate Evaluation Portal &rarr;</a>' +
      '</div>';
    } else {
      plainLines.push('Examiner report portal: ' + ADMIN_CONFIG.PANEL_PORTAL_URL);
      portalLinkHtml = '<p style="margin:8px 0 20px 0;"><a href="' + ADMIN_CONFIG.PANEL_PORTAL_URL + '" style="color:#6d4aff;font-weight:700;">Open examiner report portal</a></p>';
    }

    const details = [
      ['Candidate', data['Student Name']],
      ['Research title', data['Research Title']],
      ['Date', dateText],
      ['Time', (data['Start Time'] || '') + ' - ' + (data['End Time'] || '')],
      ['Venue / link', data['Google Meet Link'] || data['Venue'] || 'To be confirmed']
    ];

    details.forEach(function(item) {
      plainLines.push(item[0] + ': ' + item[1]);
    });
    plainLines.push('');
    if (data['Student Draft Link']) plainLines.push('Student draft: ' + data['Student Draft Link']);
    plainLines.push('');

    const htmlRows = [
      ['Candidate', adminEscapeHtml_(data['Student Name'])],
      ['Research title', adminEscapeHtml_(data['Research Title'])],
      ['Date', adminEscapeHtml_(dateText)],
      ['Time', adminEscapeHtml_((data['Start Time'] || '') + ' - ' + (data['End Time'] || ''))],
      ['Venue / link', sessionPlace]
    ].map(function(item) {
      return '<tr><td style="padding:6px 16px 6px 0;vertical-align:top;font-weight:700;color:#544767;white-space:nowrap;">' + item[0] + '</td><td style="padding:6px 0;vertical-align:top;color:#241b35;">' + item[1] + '</td></tr>';
    }).join('');

    htmlSections.push('<table style="border-collapse:collapse;margin:0 0 16px 0;font-size:14px;line-height:1.5;">' + htmlRows + '</table>');
    htmlSections.push(draftLinkHtml);
    htmlSections.push(portalLinkHtml);

    const letterNoticePlain = 'Your official Letter of Appointment as ' + (recipientRoles || 'Panel Member') + ' is attached to this email as a PDF document.';
    plainLines.push(letterNoticePlain);
    plainLines.push('');

    const letterNoticeHtml = '<div style="margin:16px 0;padding:12px 16px;background:#f5f2fc;border-left:4px solid #6d4aff;border-radius:6px;font-size:13.5px;color:#34244b;">' +
      '📄 <strong>Letter of Appointment Attached:</strong> Your prefilled official appointment letter as <strong>' + adminEscapeHtml_(recipientRoles || 'Panel Member') + '</strong> is attached to this email as a PDF document for your records and institutional confirmation.' +
      '</div>';
    htmlSections.push(letterNoticeHtml);

  } else if (templateKey === 'CANDIDATE_INVITATION') {
    let dateText = 'Date to be confirmed';
    if (data['Session Date']) {
      try {
        dateText = adminReadableDate_(data['Session Date']);
      } catch (e) {
        dateText = String(data['Session Date']);
      }
    }
    const sessionPlace = data['Google Meet Link']
      ? '<a href="' + adminEscapeHtml_(data['Google Meet Link']) + '" style="color:#6d4aff;font-weight:700;">' + adminEscapeHtml_(data['Google Meet Link']) + '</a>'
      : adminEscapeHtml_(data['Venue'] || 'To be confirmed');
    const draftLinkHtml = data['Student Draft Link']
      ? '<p style="margin:16px 0 8px 0;"><a href="' + adminEscapeHtml_(data['Student Draft Link']) + '" style="color:#6d4aff;font-weight:700;">View your submitted draft &rarr;</a></p>'
      : '';

    const details = [
      ['Candidate Name', data['Student Name']],
      ['Programme', data['Programme']],
      ['Defence Stage', data['Defence Type']],
      ['Research Title', data['Research Title']],
      ['Examination Date', dateText],
      ['Scheduled Time', (data['Start Time'] || '') + ' - ' + (data['End Time'] || '') + ' (Malaysia Time, UTC+08:00)'],
      ['Venue / Online Link', data['Google Meet Link'] || data['Venue'] || 'To be confirmed'],
      ['Chairperson', data['Chairperson'] || 'To be confirmed'],
      ['Examiner 1', (data['Examiner 1'] || 'To be confirmed') + (data['Examiner 1 Role'] ? ' (' + data['Examiner 1 Role'] + ')' : '')],
      ['Examiner 2', (data['Examiner 2'] || 'To be confirmed') + (data['Examiner 2 Role'] ? ' (' + data['Examiner 2 Role'] + ')' : '')],
      ['Supervisor', data['Supervisor'] || 'To be confirmed']
    ].filter(function(item) { return String(item[1] || '').trim(); });

    details.forEach(function(item) {
      plainLines.push(item[0] + ': ' + item[1]);
    });
    plainLines.push('');
    if (data['Student Draft Link']) {
      plainLines.push('Submitted draft: ' + data['Student Draft Link']);
      plainLines.push('');
    }

    const htmlRows = details.map(function(item) {
      const valHtml = item[0] === 'Venue / Online Link' ? sessionPlace : adminEscapeHtml_(item[1]);
      return '<tr><td style="padding:6px 16px 6px 0;vertical-align:top;font-weight:700;color:#544767;white-space:nowrap;">' + item[0] + '</td><td style="padding:6px 0;vertical-align:top;color:#241b35;">' + valHtml + '</td></tr>';
    }).join('');

    htmlSections.push('<table style="border-collapse:collapse;margin:0 0 16px 0;font-size:14px;line-height:1.5;">' + htmlRows + '</table>');
    if (draftLinkHtml) htmlSections.push(draftLinkHtml);

    // Examination Protocol Guidelines Box
    const isProposal = String(data['Defence Type'] || '').toLowerCase().indexOf('proposal') !== -1;
    const protocolPlain = 'Examination Guidelines:\n' +
      (isProposal
        ? '- Presentation: 15 to 20 minutes oral presentation summarizing research objectives, methodology, and expected contributions.\n- Q&A Session: 30 to 45 minutes answering questions from the examination committee.\n- Deliberation: Candidate will be requested to step out during committee deliberations.'
        : '- Presentation: 20 to 25 minutes oral presentation summarizing research findings and thesis contributions.\n- Defence & Q&A: 45 to 60 minutes oral defence addressing questions from the examiners.\n- Deliberation: Candidate will be requested to step out while the committee deliberates.');

    plainLines.push(protocolPlain);
    plainLines.push('');

    const protocolHtml = '<div style="margin:16px 0;padding:14px 18px;background:#f8fafc;border-left:4px solid #0284c7;border-radius:6px;font-size:13.5px;color:#1e293b;line-height:1.6;">' +
      '<strong style="color:#0369a1;font-size:14px;">ðŸ“Œ Examination Protocol &amp; Instructions:</strong>' +
      '<ul style="margin:8px 0 0 16px;padding:0;">' +
        '<li><strong>Presentation Duration:</strong> ' + (isProposal ? '15â€“20 minutes oral presentation.' : '20â€“25 minutes oral presentation.') + '</li>' +
        '<li><strong>Question &amp; Answer Session:</strong> ' + (isProposal ? '30â€“45 minutes session with the examination committee.' : '45â€“60 minutes oral defence.') + '</li>' +
        '<li><strong>Presentation Slides:</strong> Please ensure your presentation slides and any audio-visual equipment are tested in advance.</li>' +
        '<li><strong>Attendance &amp; Connectivity:</strong> Please join the online meeting link or arrive at the venue at least 10 minutes prior to the scheduled time.</li>' +
      '</ul>' +
      '</div>';
    htmlSections.push(protocolHtml);

    const submissionPortalLink = String(data['Submission Portal Link'] || '').trim();
    if (submissionPortalLink) {
      plainLines.push('Student Research Portal: ' + submissionPortalLink);
      plainLines.push('');
      const portalButtonHtml = '<div style="margin:20px 0;text-align:center;">' +
        '<a href="' + submissionPortalLink + '" target="_blank" style="display:inline-block;padding:11px 22px;background:#6d4aff;color:#ffffff;text-decoration:none;font-weight:700;font-size:13.5px;border-radius:8px;box-shadow:0 4px 12px rgba(109,74,255,0.25);">' +
        'Open Student Research Portal &rarr;' +
        '</a>' +
        '<div style="margin-top:5px;font-size:12px;color:#64748b;">Access your defence case details and track your examination progress.</div>' +
        '</div>';
      htmlSections.push(portalButtonHtml);
    }
  } else if (templateKey === 'RESULT_OUTCOME') {
    const details = [
      ['Candidate', data['Student Name']],
      ['Defence', data['Defence Type']],
      ['Research title', data['Research Title']],
      ['Outcome', data['Result Status']],
      ['Result scale', data['Result Scale'] && data['Result Scale'] !== 'Not recorded' ? data['Result Scale'] : ''],
      ['Corrections deadline', data['Corrections Deadline']],
      ['Final submission status', data['Final Submission Status']],
      ['Final submission due', data['Final Submission Due']]
    ].filter(function(item) { return String(item[1] || '').trim(); });

    details.forEach(function(item) {
      plainLines.push(item[0] + ': ' + item[1]);
    });
    plainLines.push('');

    const htmlRows = details.map(function(item) {
      return '<tr><td style="padding:6px 16px 6px 0;vertical-align:top;font-weight:700;color:#544767;white-space:nowrap;">' + adminEscapeHtml_(item[0]) + '</td><td style="padding:6px 0;vertical-align:top;color:#241b35;">' + item[1] + '</td></tr>';
    }).join('');

    htmlSections.push('<table style="border-collapse:collapse;margin:0 0 20px 0;font-size:14px;line-height:1.5;">' + htmlRows + '</table>');

    const outcomeNoticePlain = 'The following official documents are attached to this email:\n1. Official Confirmation Letter of Result (PDF)\n2. Examiner 1 Evaluation Report\n3. Examiner 2 Evaluation Report';
    plainLines.push(outcomeNoticePlain);
    plainLines.push('');

    const outcomeNoticeHtml = '<div style="margin:16px 0;padding:12px 16px;background:#f5f2fc;border-left:4px solid #6d4aff;border-radius:6px;font-size:13.5px;color:#34244b;">' +
      'ðŸ“Ž <strong>Official Documents Attached to this Email:</strong>' +
      '<ul style="margin:6px 0 0 16px;padding:0;line-height:1.6;">' +
        '<li><strong>Official Confirmation Letter of Result</strong> (prefilled institutional PDF with letterhead)</li>' +
        '<li><strong>Examiner 1 Evaluation Report</strong> (official evaluation document)</li>' +
        '<li><strong>Examiner 2 Evaluation Report</strong> (official evaluation document)</li>' +
      '</ul>' +
      '</div>';
    htmlSections.push(outcomeNoticeHtml);

    const submissionPortalLink = String(data['Submission Portal Link'] || '').trim();
    if (submissionPortalLink) {
      plainLines.push('Final Softcopy Submission Portal: ' + submissionPortalLink);
      plainLines.push('');
      const portalButtonHtml = '<div style="margin:22px 0;text-align:center;">' +
        '<a href="' + submissionPortalLink + '" target="_blank" style="display:inline-block;padding:12px 24px;background:#581c87;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;border-radius:8px;box-shadow:0 4px 12px rgba(88,28,135,0.25);">' +
        'Open Student Submission Portal &amp; Submit Final Draft &rarr;' +
        '</a>' +
        '<div style="margin-top:6px;font-size:12px;color:#64748b;">Use this secure link to upload your final softcopy draft and table of amendments.</div>' +
        '</div>';
      htmlSections.push(portalButtonHtml);
    }
  }

  // Closing signature
  plainLines.push(closing);
  const closingHtml = adminEscapeHtml_(closing).replace(/\n/g, '<br>');
  htmlSections.push('<div style="margin-top:20px;font-size:14px;line-height:1.6;color:#544767;">' + closingHtml + '</div>');

  const headerBannerHtml = '<div style="width:100%;margin:0;padding:0;line-height:0;text-align:center;background:#581c87;">' +
    '<img src="cid:emailHeader" alt="Innovative University College - Institute of Postgraduate Studies" style="width:100%;max-width:650px;height:auto;display:block;margin:0 auto;border:0;" />' +
    '</div>';

  const fullHtml = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:650px;margin:0 auto;background:#ffffff;border:1px solid #e2d9f3;border-radius:12px;overflow:hidden;box-shadow:0 3px 12px rgba(0,0,0,0.05);">' +
    headerBannerHtml +
    '<div style="padding:24px 28px;">' +
    htmlSections.join('') +
    '</div>' +
    '</div>';

  return {
    subject: subject,
    body: plainLines.join('\n'),
    htmlBody: fullHtml
  };
}

function getAdminEmailPreview(caseId, templateKey) {
  adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  const data = adminCaseObject_(record.values, record.map);
  let recipient = { name: data['Student Name'], email: data['Student Email'], role: 'Candidate' };
  if (templateKey === 'PANEL_INVITATION') {
    const recipients = adminPanelRecipients_(data, false);
    recipient = recipients[0] || { name: data['Chairperson'] || 'Chairperson', role: 'Chairperson' };
  }
  const assembled = adminAssembleEmail_(templateKey, data, recipient);
  const b64 = (typeof ADMIN_EMAIL_HEADER_BASE64 !== 'undefined') ? ADMIN_EMAIL_HEADER_BASE64 : '';
  const previewHtml = b64 ? (assembled.htmlBody || '').replace('cid:emailHeader', 'data:image/jpeg;base64,' + b64) : assembled.htmlBody;
  return {
    ok: true,
    subject: assembled.subject,
    htmlBody: previewHtml,
    body: assembled.body
  };
}

function adminResolveExaminerRole_(data, slot) {
  const isSlot1 = slot === 1 || slot === '1' || slot === 'Examiner 1';
  const roleField = isSlot1 ? 'Examiner 1 Role' : 'Examiner 2 Role';
  const rawRole = String((data && data[roleField]) || '').trim();
  const defenceType = String((data && data['Defence Type']) || '').trim();
  const isProposal = normaliseAdmin_(defenceType).indexOf('proposal') >= 0;

  if (rawRole) {
    if (normaliseAdmin_(rawRole).indexOf('external') >= 0) return 'External Examiner';
    if (normaliseAdmin_(rawRole).indexOf('internal') >= 0) return 'Internal Examiner';
  }

  // Fallbacks:
  // Proposal Defence at IUC has no external examiner (both are internal examiners).
  // Viva Voce has Examiner 1 as Internal Examiner, Examiner 2 as External Examiner.
  if (isSlot1) {
    return 'Internal Examiner';
  } else {
    return isProposal ? 'Internal Examiner' : 'External Examiner';
  }
}

function adminSyncPreviewData_(record, data, clientData) {
  if (clientData && typeof clientData === 'object') {
    Object.keys(clientData).forEach(function(k) {
      const v = clientData[k];
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        data[k] = String(v).trim();
      }
    });
  }
  // Fallback to Student Master if student fields are missing
  try {
    const lookupKey = data['Student Key'] || data['Student Name'] || data['Student Email'] || data['Case ID'] ||
      (clientData && (clientData['Student Key'] || clientData['Student Name'] || clientData['Student Email']));
    const student = adminFindStudent_(lookupKey);
    if (student) {
      if (!data['Student Key'] && student['Student Key']) data['Student Key'] = student['Student Key'];
      if (!data['Student Name'] && student['Student Name']) data['Student Name'] = student['Student Name'];
      if (!data['Student Email'] && student['Student Email']) data['Student Email'] = student['Student Email'];
      if (!data['Programme'] && student['Programme']) data['Programme'] = student['Programme'];
      if (!data['Research Title'] && student['Research Title']) data['Research Title'] = student['Research Title'];
      if (!data['Supervisor'] && student['Supervisor']) data['Supervisor'] = student['Supervisor'];
      if (!data['Supervisor Email'] && student['Supervisor Email']) data['Supervisor Email'] = student['Supervisor Email'];
    }
  } catch (e) {
    console.warn('adminSyncPreviewData_ student lookup warning: ' + e.message);
  }

  // Derive Result Status from Result Scale if missing
  const scaleMap = {
    'Scale 1': 'Unconditional pass',
    'Scale 2': 'Conditional pass with minor corrections',
    'Scale 3': 'Conditional pass with major corrections',
    'Scale 4': 'Re-examination',
    'Scale 5': 'Fail'
  };
  if (!String(data['Result Status'] || '').trim() && data['Result Scale'] && scaleMap[data['Result Scale']]) {
    data['Result Status'] = scaleMap[data['Result Scale']];
  }

  // Derive Result Scale from Result Status if missing or 'Not recorded'
  if (!String(data['Result Scale'] || '').trim() || String(data['Result Scale']).trim() === 'Not recorded') {
    const statusNorm = normaliseAdmin_(data['Result Status']);
    if (statusNorm.indexOf('minor') >= 0) {
      data['Result Scale'] = 'Scale 2';
    } else if (statusNorm.indexOf('major') >= 0) {
      data['Result Scale'] = 'Scale 3';
    } else if (statusNorm.indexOf('unconditional') >= 0 || statusNorm === 'pass') {
      data['Result Scale'] = 'Scale 1';
    } else if (statusNorm.indexOf('re-exam') >= 0 || statusNorm.indexOf('reexam') >= 0) {
      data['Result Scale'] = 'Scale 4';
    } else if (statusNorm.indexOf('fail') >= 0) {
      data['Result Scale'] = 'Scale 5';
    }
  }

  // Fallback corrections deadline
  if (!String(data['Corrections Deadline'] || '').trim()) {
    if (String(data['Final Submission Due'] || '').trim()) {
      data['Corrections Deadline'] = String(data['Final Submission Due']).trim();
    } else if (data['Result Scale'] === 'Scale 2' || data['Result Scale'] === 'Scale 3' || data['Result Scale'] === 'Scale 4') {
      const baseDate = adminParseDateValue_(data['Session Date']) || new Date();
      const monthsToAdd = (data['Result Scale'] === 'Scale 2') ? 1 : (data['Result Scale'] === 'Scale 3') ? 3 : 6;
      const targetDate = new Date(baseDate.getTime());
      targetDate.setMonth(targetDate.getMonth() + monthsToAdd);
      data['Corrections Deadline'] = Utilities.formatDate(targetDate, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd');
      data['Final Submission Due'] = data['Corrections Deadline'];
    }
  }

  return data;
}

function getAdminResultConfirmationLetterPreview(caseId, clientData) {
  adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  const data = adminCaseObject_(record);
  adminSyncPreviewData_(record, data, clientData);

  const scaleMap = {
    'Scale 1': 'Unconditional pass',
    'Scale 2': 'Conditional pass with minor corrections',
    'Scale 3': 'Conditional pass with major corrections',
    'Scale 4': 'Re-examination',
    'Scale 5': 'Fail'
  };
  if (!String(data['Result Status'] || '').trim() && data['Result Scale'] && scaleMap[data['Result Scale']]) {
    data['Result Status'] = scaleMap[data['Result Scale']];
  }

  const html = adminGenerateResultConfirmationLetterHtml_(data);
  let pdfUrl = data['Result Confirmation Letter Link'] || '';
  let pdfFileName = '';
  try {
    const studentFolder = adminEnsureStudentFolder_(record, data);
    const pdfRes = adminGenerateResultConfirmationLetterPdf_(record, data, studentFolder);
    if (pdfRes && pdfRes.url) {
      pdfUrl = pdfRes.url;
      pdfFileName = pdfRes.fileName;
      data['Result Confirmation Letter Link'] = pdfRes.url;
      if (record.map && record.map['Result Confirmation Letter Link']) {
        record.sheet.getRange(record.row, record.map['Result Confirmation Letter Link']).setValue(pdfRes.url);
        SpreadsheetApp.flush();
      }
    }
  } catch (e) {
    console.warn('Auto-generation of result confirmation letter PDF: ' + e.message);
  }

  // Persist resolved fields back to the sheet row if currently empty
  const fieldsToPersist = [
    'Student Name', 'Student Email', 'Programme', 'Research Title',
    'Supervisor', 'Supervisor Email', 'Chairperson', 'Examiner 1', 'Examiner 2',
    'Result Scale', 'Result Status', 'Corrections Deadline', 'Final Submission Due'
  ];
  fieldsToPersist.forEach(function(field) {
    if (record.map[field] && data[field] && !String(record.values[record.map[field] - 1] || '').trim()) {
      try {
        record.sheet.getRange(record.row, record.map[field]).setValue(data[field]);
      } catch (e) {}
    }
  });

  data._revision = wfRevision_(record);

  return {
    ok: true,
    html: html,
    pdfUrl: pdfUrl,
    pdfFileName: pdfFileName,
    caseData: data,
    studentName: data['Student Name'] || 'Candidate',
    caseId: caseId
  };
}

function getAdminCandidateInvitationLetterPreview(caseId, clientData) {
  adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  const data = adminCaseObject_(record);
  adminSyncPreviewData_(record, data, clientData);

  const html = adminGenerateCandidateInvitationLetterHtml_(data);
  let pdfUrl = data['Candidate Notice Letter Link'] || '';
  let pdfFileName = '';
  try {
    const studentFolder = adminEnsureStudentFolder_(record, data);
    const pdfRes = adminGenerateCandidateInvitationLetterPdf_(record, data, studentFolder);
    if (pdfRes && pdfRes.url) {
      pdfUrl = pdfRes.url;
      pdfFileName = pdfRes.fileName;
      data['Candidate Notice Letter Link'] = pdfRes.url;
      if (record.map && record.map['Candidate Notice Letter Link']) {
        record.sheet.getRange(record.row, record.map['Candidate Notice Letter Link']).setValue(pdfRes.url);
        SpreadsheetApp.flush();
      }
    }
  } catch (e) {
    console.warn('Auto-generation of candidate notice letter PDF: ' + e.message);
  }

  data._revision = wfRevision_(record);

  return {
    ok: true,
    html: html,
    pdfUrl: pdfUrl,
    pdfFileName: pdfFileName,
    caseData: data,
    studentName: data['Student Name'] || 'Candidate',
    studentEmail: data['Student Email'] || '',
    caseId: caseId
  };
}

function getAdminAppointmentLetterPreview(caseId, slot, clientData) {
  adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  const data = adminCaseObject_(record);
  adminSyncPreviewData_(record, data, clientData);

  const s = String(slot || 'Chair').trim();
  let recipient;
  let letterKey;
  let linkField;
  if (s === 'Chair' || s === 'Chairperson') {
    recipient = { name: data['Chairperson'] || 'Chairperson', email: data['Chair Email'], role: 'Chairperson' };
    letterKey = 'APPOINTMENT_CHAIRPERSON';
    linkField = 'Chair Appointment Letter Link';
  } else if (s === 'Examiner 1') {
    const role = adminResolveExaminerRole_(data, 1);
    recipient = { name: data['Examiner 1'] || 'Examiner 1', email: data['Examiner 1 Email'], role: role };
    letterKey = role === 'External Examiner' ? 'APPOINTMENT_EXTERNAL_EXAMINER' : 'APPOINTMENT_INTERNAL_EXAMINER';
    linkField = 'Examiner 1 Appointment Letter Link';
  } else if (s === 'Examiner 2') {
    const role = adminResolveExaminerRole_(data, 2);
    recipient = { name: data['Examiner 2'] || 'Examiner 2', email: data['Examiner 2 Email'], role: role };
    letterKey = role === 'External Examiner' ? 'APPOINTMENT_EXTERNAL_EXAMINER' : 'APPOINTMENT_INTERNAL_EXAMINER';
    linkField = 'Examiner 2 Appointment Letter Link';
  } else {
    throw new Error('Unknown panel slot: ' + slot);
  }

  const html = adminGenerateAppointmentLetterHtml_(data, recipient, letterKey);
  let pdfUrl = (linkField && data[linkField]) || '';
  let pdfFileName = '';
  try {
    const studentFolder = adminEnsureStudentFolder_(record, data);
    const pdfRes = adminGenerateAppointmentLetterPdf_(record, data, recipient, letterKey, studentFolder);
    if (pdfRes && pdfRes.url) {
      pdfUrl = pdfRes.url;
      pdfFileName = pdfRes.fileName;
      if (linkField) {
        data[linkField] = pdfRes.url;
        if (record.map && record.map[linkField]) {
          record.sheet.getRange(record.row, record.map[linkField]).setValue(pdfRes.url);
          SpreadsheetApp.flush();
        }
      }
    }
  } catch (e) {
    console.warn('Auto-generation of appointment letter PDF: ' + e.message);
  }

  data._revision = wfRevision_(record);

  return {
    ok: true,
    html: html,
    pdfUrl: pdfUrl,
    pdfFileName: pdfFileName,
    caseData: data,
    recipient: recipient,
    letterKey: letterKey,
    slot: s
  };
}

function getAdminAllOutboundLettersPreview(caseId, clientData) {
  adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  const data = adminCaseObject_(record);
  adminSyncPreviewData_(record, data, clientData);

  const studentFolder = adminEnsureStudentFolder_(record, data);
  const results = [];

  // 1. Candidate Notice Letter
  try {
    const cHtml = adminGenerateCandidateInvitationLetterHtml_(data);
    let cPdfUrl = data['Candidate Notice Letter Link'] || '';
    const cRes = adminGenerateCandidateInvitationLetterPdf_(record, data, studentFolder);
    if (cRes && cRes.url) {
      cPdfUrl = cRes.url;
      data['Candidate Notice Letter Link'] = cPdfUrl;
      if (record.map && record.map['Candidate Notice Letter Link']) {
        record.sheet.getRange(record.row, record.map['Candidate Notice Letter Link']).setValue(cPdfUrl);
      }
    }
    results.push({
      key: 'candidate',
      title: 'Candidate Notice Letter',
      recipientName: data['Student Name'] || 'Candidate',
      recipientEmail: data['Student Email'] || '',
      html: cHtml,
      pdfUrl: cPdfUrl
    });
  } catch (err) {
    console.warn('All-letter generation (Candidate): ' + err.message);
  }

  // 2. Chair Appointment Letter
  try {
    const chairRecipient = { name: data['Chairperson'] || 'Chairperson', email: data['Chair Email'], role: 'Chairperson' };
    const chairHtml = adminGenerateAppointmentLetterHtml_(data, chairRecipient, 'APPOINTMENT_CHAIRPERSON');
    let chairPdfUrl = data['Chair Appointment Letter Link'] || '';
    const chairRes = adminGenerateAppointmentLetterPdf_(record, data, chairRecipient, 'APPOINTMENT_CHAIRPERSON', studentFolder);
    if (chairRes && chairRes.url) {
      chairPdfUrl = chairRes.url;
      data['Chair Appointment Letter Link'] = chairPdfUrl;
      if (record.map && record.map['Chair Appointment Letter Link']) {
        record.sheet.getRange(record.row, record.map['Chair Appointment Letter Link']).setValue(chairPdfUrl);
      }
    }
    results.push({
      key: 'chair',
      title: 'Chairperson Appointment Letter',
      recipientName: chairRecipient.name,
      recipientEmail: chairRecipient.email,
      html: chairHtml,
      pdfUrl: chairPdfUrl
    });
  } catch (err) {
    console.warn('All-letter generation (Chair): ' + err.message);
  }

  // 3. Examiner 1 Appointment Letter
  try {
    const ex1Role = adminResolveExaminerRole_(data, 1);
    const ex1Recipient = { name: data['Examiner 1'] || 'Examiner 1', email: data['Examiner 1 Email'], role: ex1Role };
    const ex1Key = ex1Role === 'External Examiner' ? 'APPOINTMENT_EXTERNAL_EXAMINER' : 'APPOINTMENT_INTERNAL_EXAMINER';
    const ex1Html = adminGenerateAppointmentLetterHtml_(data, ex1Recipient, ex1Key);
    let ex1PdfUrl = data['Examiner 1 Appointment Letter Link'] || '';
    const ex1Res = adminGenerateAppointmentLetterPdf_(record, data, ex1Recipient, ex1Key, studentFolder);
    if (ex1Res && ex1Res.url) {
      ex1PdfUrl = ex1Res.url;
      data['Examiner 1 Appointment Letter Link'] = ex1PdfUrl;
      if (record.map && record.map['Examiner 1 Appointment Letter Link']) {
        record.sheet.getRange(record.row, record.map['Examiner 1 Appointment Letter Link']).setValue(ex1PdfUrl);
      }
    }
    results.push({
      key: 'examiner1',
      title: 'Examiner 1 Appointment Letter (' + ex1Role + ')',
      recipientName: ex1Recipient.name,
      recipientEmail: ex1Recipient.email,
      html: ex1Html,
      pdfUrl: ex1PdfUrl
    });
  } catch (err) {
    console.warn('All-letter generation (Examiner 1): ' + err.message);
  }

  // 4. Examiner 2 Appointment Letter (if assigned)
  if (data['Examiner 2'] || data['Examiner 2 Email']) {
    try {
      const ex2Role = adminResolveExaminerRole_(data, 2);
      const ex2Recipient = { name: data['Examiner 2'] || 'Examiner 2', email: data['Examiner 2 Email'], role: ex2Role };
      const ex2Key = ex2Role === 'External Examiner' ? 'APPOINTMENT_EXTERNAL_EXAMINER' : 'APPOINTMENT_INTERNAL_EXAMINER';
      const ex2Html = adminGenerateAppointmentLetterHtml_(data, ex2Recipient, ex2Key);
      let ex2PdfUrl = data['Examiner 2 Appointment Letter Link'] || '';
      const ex2Res = adminGenerateAppointmentLetterPdf_(record, data, ex2Recipient, ex2Key, studentFolder);
      if (ex2Res && ex2Res.url) {
        ex2PdfUrl = ex2Res.url;
        data['Examiner 2 Appointment Letter Link'] = ex2PdfUrl;
        if (record.map && record.map['Examiner 2 Appointment Letter Link']) {
          record.sheet.getRange(record.row, record.map['Examiner 2 Appointment Letter Link']).setValue(ex2PdfUrl);
        }
      }
      results.push({
        key: 'examiner2',
        title: 'Examiner 2 Appointment Letter (' + ex2Role + ')',
        recipientName: ex2Recipient.name,
        recipientEmail: ex2Recipient.email,
        html: ex2Html,
        pdfUrl: ex2PdfUrl
      });
    } catch (err) {
      console.warn('All-letter generation (Examiner 2): ' + err.message);
    }
  }

  // 5. Result Confirmation Letter (if outcome/result recorded)
  if (data['Result Scale'] || data['Result Status'] || data['Result Confirmation Letter Link']) {
    try {
      const scaleMap = {
        'Scale 1': 'Unconditional pass',
        'Scale 2': 'Conditional pass with minor corrections',
        'Scale 3': 'Conditional pass with major corrections',
        'Scale 4': 'Re-examination',
        'Scale 5': 'Fail'
      };
      if (!String(data['Result Status'] || '').trim() && data['Result Scale'] && scaleMap[data['Result Scale']]) {
        data['Result Status'] = scaleMap[data['Result Scale']];
      }
      const resHtml = adminGenerateResultConfirmationLetterHtml_(data);
      let resPdfUrl = data['Result Confirmation Letter Link'] || '';
      const resPdf = adminGenerateResultConfirmationLetterPdf_(record, data, studentFolder);
      if (resPdf && resPdf.url) {
        resPdfUrl = resPdf.url;
        data['Result Confirmation Letter Link'] = resPdfUrl;
        if (record.map && record.map['Result Confirmation Letter Link']) {
          record.sheet.getRange(record.row, record.map['Result Confirmation Letter Link']).setValue(resPdfUrl);
        }
      }
      results.push({
        key: 'result',
        title: 'Official Result Confirmation Letter',
        recipientName: data['Student Name'] || 'Candidate',
        recipientEmail: data['Student Email'] || '',
        html: resHtml,
        pdfUrl: resPdfUrl
      });
    } catch (err) {
      console.warn('All-letter generation (Result Confirmation): ' + err.message);
    }
  }

  try {
    SpreadsheetApp.flush();
  } catch (e) {}

  data._revision = wfRevision_(record);

  return {
    ok: true,
    caseId: caseId,
    caseData: data,
    letters: results
  };
}

function getAdminDocumentLog() {
  adminAssert_();
  const cases = adminListCases_();
  const letters = [];
  const year = new Date().getFullYear();

  cases.forEach(function(c) {
    const defenceCode = c.defenceType === 'Viva Voce' ? 'VV' : 'PD';
    const caseSequence = String(c.caseId || '').replace(/^[A-Z]+-\d+-/, '') || '001';

    // 1. Candidate Invitation Notice Letter
    if (c.candidateNoticeLetterLink) {
      letters.push({
        category: 'candidate_invitation',
        categoryLabel: 'Candidate Invitation',
        typeLabel: 'Candidate Examination Notice Letter',
        caseId: c.caseId,
        studentName: c.studentName || 'Candidate',
        studentKey: c.studentKey || '',
        programme: c.programme || '',
        defenceType: c.defenceType || '',
        refNum: 'IUC/IPGS/' + defenceCode + '/EXAM/' + year + '/' + caseSequence,
        dateFormatted: c.candidateNoticeSentAt || c.sessionDate || 'Generated',
        recipientName: c.studentName || 'Candidate',
        recipientEmail: c.studentEmail || '',
        recipientRole: 'Candidate',
        pdfUrl: c.candidateNoticeLetterLink
      });
    }

    // 2. Chairperson Appointment Letter (Internal Panels)
    if (c.chairAppointmentLetterLink) {
      letters.push({
        category: 'internal_panels',
        categoryLabel: 'Internal Panels',
        typeLabel: 'Chairperson Appointment Letter',
        caseId: c.caseId,
        studentName: c.studentName || 'Candidate',
        studentKey: c.studentKey || '',
        programme: c.programme || '',
        defenceType: c.defenceType || '',
        refNum: 'IUC/IPGS/' + defenceCode + '/' + year + '/' + caseSequence,
        dateFormatted: c.invitationEmailSentAt || c.sessionDate || 'Generated',
        recipientName: c.chairperson || 'Chairperson',
        recipientEmail: c.chairEmail || '',
        recipientRole: 'Chairperson',
        pdfUrl: c.chairAppointmentLetterLink
      });
    }

    // 3. Examiner 1 Appointment Letter (Internal or External)
    if (c.examiner1AppointmentLetterLink) {
      const isExternal1 = String(c.examiner1Role || '').toLowerCase().indexOf('external') >= 0;
      letters.push({
        category: isExternal1 ? 'external_panels' : 'internal_panels',
        categoryLabel: isExternal1 ? 'External Panels' : 'Internal Panels',
        typeLabel: 'Examiner 1 (' + (c.examiner1Role || (isExternal1 ? 'External Examiner' : 'Internal Examiner')) + ') Letter',
        caseId: c.caseId,
        studentName: c.studentName || 'Candidate',
        studentKey: c.studentKey || '',
        programme: c.programme || '',
        defenceType: c.defenceType || '',
        refNum: 'IUC/IPGS/' + defenceCode + '/' + year + '/' + caseSequence,
        dateFormatted: c.invitationEmailSentAt || c.sessionDate || 'Generated',
        recipientName: c.examiner1 || 'Examiner 1',
        recipientEmail: c.examiner1Email || '',
        recipientRole: c.examiner1Role || (isExternal1 ? 'External Examiner' : 'Internal Examiner'),
        pdfUrl: c.examiner1AppointmentLetterLink
      });
    }

    // 4. Examiner 2 Appointment Letter (Internal or External)
    if (c.examiner2AppointmentLetterLink) {
      const isExternal2 = String(c.examiner2Role || '').toLowerCase().indexOf('external') >= 0;
      letters.push({
        category: isExternal2 ? 'external_panels' : 'internal_panels',
        categoryLabel: isExternal2 ? 'External Panels' : 'Internal Panels',
        typeLabel: 'Examiner 2 (' + (c.examiner2Role || (isExternal2 ? 'External Examiner' : 'Internal Examiner')) + ') Letter',
        caseId: c.caseId,
        studentName: c.studentName || 'Candidate',
        studentKey: c.studentKey || '',
        programme: c.programme || '',
        defenceType: c.defenceType || '',
        refNum: 'IUC/IPGS/' + defenceCode + '/' + year + '/' + caseSequence,
        dateFormatted: c.invitationEmailSentAt || c.sessionDate || 'Generated',
        recipientName: c.examiner2 || 'Examiner 2',
        recipientEmail: c.examiner2Email || '',
        recipientRole: c.examiner2Role || (isExternal2 ? 'External Examiner' : 'Internal Examiner'),
        pdfUrl: c.examiner2AppointmentLetterLink
      });
    }

    // 5. Result Confirmation Letter
    if (c.resultConfirmationLetterLink) {
      letters.push({
        category: 'result',
        categoryLabel: 'Result',
        typeLabel: 'Official Result Confirmation Letter',
        caseId: c.caseId,
        studentName: c.studentName || 'Candidate',
        studentKey: c.studentKey || '',
        programme: c.programme || '',
        defenceType: c.defenceType || '',
        refNum: 'IUC/IPGS/' + defenceCode + '/RES/' + year + '/' + caseSequence,
        dateFormatted: c.resultEmailSentAt || c.sessionDate || 'Generated',
        recipientName: c.studentName || 'Candidate',
        recipientEmail: c.studentEmail || '',
        recipientRole: 'Candidate',
        pdfUrl: c.resultConfirmationLetterLink
      });
    }
  });

  return {
    ok: true,
    totalCount: letters.length,
    letters: letters
  };
}


function adminExtractDriveFileId_(url) {
  if (!url) return '';
  let str = String(url).trim();
  const linkMatch = str.match(/=HYPERLINK\(\s*["']([^"']+)["']/i);
  if (linkMatch) str = linkMatch[1];
  const aMatch = str.match(/href=["']([^"']+)["']/i);
  if (aMatch) str = aMatch[1];
  const m1 = str.match(/\/d\/([a-zA-Z0-9_-]{15,})/);
  if (m1) return m1[1];
  const m2 = str.match(/[?&]id=([a-zA-Z0-9_-]{15,})/);
  if (m2) return m2[1];
  const m3 = str.match(/\/file\/d\/([a-zA-Z0-9_-]{15,})/);
  if (m3) return m3[1];
  const m4 = str.match(/\/folders\/([a-zA-Z0-9_-]{15,})/);
  if (m4) return m4[1];
  const m5 = str.match(/^[a-zA-Z0-9_-]{15,}$/);
  if (m5) return m5[0];
  return '';
}

function adminGenerateResultConfirmationLetterHtml_(data) {
  const defenceType = String(data['Defence Type'] || 'Proposal Defence').trim();
  let studentName = String(data['Student Name'] || '').trim();
  let studentKey = String(data['Student Key'] || data['Case ID'] || '').trim();
  let programme = String(data['Programme'] || '').trim();
  let researchTitle = String(data['Research Title'] || '').trim();
  let resultScale = String(data['Result Scale'] || '').trim();
  let resultStatus = String(data['Result Status'] || '').trim();
  let correctionsDeadline = String(data['Corrections Deadline'] || '').trim();
  const sessionDate = String(data['Session Date'] || '').trim();

  let chair = String(data['Chairperson'] || '').trim();
  let ex1 = String(data['Examiner 1'] || '').trim();
  let ex2 = String(data['Examiner 2'] || '').trim();
  let supervisor = String(data['Supervisor'] || '').trim();

  // 1. Fallback to Student Master if candidate or supervisor info is missing
  if (!studentName || !programme || !researchTitle || !supervisor) {
    try {
      const student = adminFindStudent_(studentKey || studentName || data['Student Email'] || data['Case ID']);
      if (student) {
        if (!studentName && student['Student Name']) studentName = student['Student Name'];
        if (!programme && student['Programme']) programme = student['Programme'];
        if (!researchTitle && student['Research Title']) researchTitle = student['Research Title'];
        if (!supervisor && student['Supervisor']) supervisor = student['Supervisor'];
        if (!data['Student Name']) data['Student Name'] = studentName;
        if (!data['Programme']) data['Programme'] = programme;
        if (!data['Research Title']) data['Research Title'] = researchTitle;
        if (!data['Supervisor']) data['Supervisor'] = supervisor;
      }
    } catch (e) {
      console.warn('adminGenerateResultConfirmationLetterHtml_ student lookup fallback: ' + e.message);
    }
  }

  // 2. Fallback / reverse-mapping for Result Scale
  if (!resultScale || resultScale === 'Not recorded') {
    const statusNorm = normaliseAdmin_(resultStatus);
    if (statusNorm.indexOf('minor') >= 0) {
      resultScale = 'Scale 2';
    } else if (statusNorm.indexOf('major') >= 0) {
      resultScale = 'Scale 3';
    } else if (statusNorm.indexOf('unconditional') >= 0 || statusNorm === 'pass') {
      resultScale = 'Scale 1';
    } else if (statusNorm.indexOf('re-exam') >= 0 || statusNorm.indexOf('reexam') >= 0) {
      resultScale = 'Scale 4';
    } else if (statusNorm.indexOf('fail') >= 0) {
      resultScale = 'Scale 5';
    } else {
      const dec = wfDecision_(data);
      if (dec && dec.code) {
        const codeMap = { 'PASS': 'Scale 1', 'MINOR': 'Scale 2', 'MAJOR': 'Scale 3', 'REEXAM': 'Scale 4', 'FAIL': 'Scale 5' };
        if (codeMap[dec.code]) resultScale = codeMap[dec.code];
      }
    }
    if (resultScale && resultScale !== 'Not recorded') {
      data['Result Scale'] = resultScale;
    } else {
      resultScale = 'Not recorded';
    }
  }

  // 3. Fallback for Corrections Deadline
  if (!correctionsDeadline) {
    if (String(data['Final Submission Due'] || '').trim()) {
      correctionsDeadline = String(data['Final Submission Due']).trim();
    } else if (resultScale === 'Scale 2' || resultScale === 'Scale 3' || resultScale === 'Scale 4') {
      const baseDate = adminParseDateValue_(sessionDate) || new Date();
      const monthsToAdd = (resultScale === 'Scale 2') ? 1 : (resultScale === 'Scale 3') ? 3 : 6;
      const targetDate = new Date(baseDate.getTime());
      targetDate.setMonth(targetDate.getMonth() + monthsToAdd);
      correctionsDeadline = Utilities.formatDate(targetDate, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd');
    }
    if (correctionsDeadline) {
      data['Corrections Deadline'] = correctionsDeadline;
    }
  }

  if (!chair) chair = 'Appointed Chairperson';
  if (!ex1) ex1 = 'Examiner 1';
  if (!ex2) ex2 = 'Examiner 2';
  if (!supervisor) supervisor = 'Main Supervisor';

  const defenceCode = defenceType === 'Viva Voce' ? 'VV' : 'PD';
  const year = new Date().getFullYear();
  const caseSequence = String(data['Case ID'] || '').replace(/^[A-Z]+-\d+-/, '') || '001';
  const refNum = 'IUC/IPGS/' + defenceCode + '/RES/' + year + '/' + caseSequence;
  let dateFormatted = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'd MMMM yyyy');

  const signatory = adminGetSignatory_();
  const subject = 'OFFICIAL NOTIFICATION OF ' + defenceType.toUpperCase() + ' EXAMINATION RESULT';

  const headerBase64 = (typeof ADMIN_LETTERHEAD_HEADER !== 'undefined') ? ADMIN_LETTERHEAD_HEADER : '';
  const footerBase64 = (typeof ADMIN_LETTERHEAD_FOOTER !== 'undefined') ? ADMIN_LETTERHEAD_FOOTER : '';

  const headerDataUri = headerBase64 ? (headerBase64.indexOf('data:') === 0 ? headerBase64 : 'data:image/jpeg;base64,' + headerBase64) : '';
  const footerDataUri = footerBase64 ? (footerBase64.indexOf('data:') === 0 ? footerBase64 : 'data:image/jpeg;base64,' + footerBase64) : '';

  const html = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '<meta charset="utf-8">\n' +
    '<title>' + adminEscapeHtml_(subject) + '</title>\n' +
    '<style>\n' +
    '  @page { size: A4 portrait; margin: 0; }\n' +
    '  * { box-sizing: border-box; }\n' +
    '  body { font-family: Calibri, Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 9pt; line-height: 1.25; color: #111111; margin: 0; padding: 0; background: #ffffff; }\n' +
    '  .letterhead-header { position: fixed; top: 0; left: 0; width: 100%; margin: 0; padding: 0; line-height: 0; z-index: 100; }\n' +
    '  .letterhead-header img { width: 100%; height: auto; display: block; }\n' +
    '  .letterhead-footer { position: fixed; bottom: 0; left: 0; width: 100%; margin: 0; padding: 0; line-height: 0; z-index: 100; }\n' +
    '  .letterhead-footer img { width: 100%; height: auto; display: block; }\n' +
    '  table.letter-layout { width: 100%; border-collapse: collapse; margin: 0; padding: 0; }\n' +
    '  table.letter-layout > thead > tr > td { padding: 0; margin: 0; height: 70mm; border: none; }\n' +
    '  table.letter-layout > tfoot > tr > td { padding: 0; margin: 0; height: 24mm; border: none; }\n' +
    '  table.letter-layout > tbody > tr > td { padding: 0; margin: 0; vertical-align: top; border: none; }\n' +
    '  .header-spacer { height: 70mm; }\n' +
    '  .footer-spacer { height: 24mm; }\n' +
    '  .content { padding: 0 20mm; }\n' +
    '  .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 7px; font-size: 9pt; }\n' +
    '  .meta-table td { padding: 1px 0; vertical-align: top; }\n' +
    '  .meta-label { width: 110px; color: #333333; }\n' +
    '  .meta-sep { width: 14px; text-align: center; color: #333333; }\n' +
    '  .recipient-block { margin-bottom: 7px; line-height: 1.25; font-size: 9pt; }\n' +
    '  .subject-line { font-weight: bold; text-decoration: underline; margin: 8px 0 6px 0; font-size: 9.5pt; text-transform: uppercase; color: #000000; }\n' +
    '  .details-box { width: 100%; border-collapse: collapse; margin: 6px 0; border: 1px solid #7c3aed; font-size: 8.8pt; }\n' +
    '  .details-box td { padding: 3px 6px; border: 1px solid #d8b4fe; vertical-align: top; }\n' +
    '  .details-box td.label { font-weight: bold; width: 150px; background-color: #f5f3ff; color: #3b0764; }\n' +
    '  .signatory-block { margin-top: 8px; line-height: 1.2; page-break-inside: avoid; }\n' +
    '  .footer-note { font-size: 7.5pt; color: #666666; font-style: italic; margin-top: 8px; border-top: 1px dashed #cccccc; padding-top: 4px; }\n' +
    '</style>\n' +
    '</head>\n' +
    '<body>\n' +
    (headerDataUri ? '  <div class="letterhead-header"><img src="' + headerDataUri + '" alt="IUC Header"></div>\n' : '') +
    (footerDataUri ? '  <div class="letterhead-footer"><img src="' + footerDataUri + '" alt="IUC Footer"></div>\n' : '') +
    '  <table class="letter-layout">\n' +
    '    <thead><tr><td><div class="header-spacer"></div></td></tr></thead>\n' +
    '    <tfoot><tr><td><div class="footer-spacer"></div></td></tr></tfoot>\n' +
    '    <tbody>\n' +
    '      <tr>\n' +
    '        <td>\n' +
    '          <div class="content">\n' +
    '            <table class="meta-table">\n' +
    '              <tr><td class="meta-label">Our Ref</td><td class="meta-sep">:</td><td>' + adminEscapeHtml_(refNum) + '</td></tr>\n' +
    '              <tr><td class="meta-label">Date</td><td class="meta-sep">:</td><td>' + adminEscapeHtml_(dateFormatted) + '</td></tr>\n' +
    '            </table>\n' +
    '            <div class="recipient-block">\n' +
    '              <strong>' + adminEscapeHtml_(studentName) + '</strong><br>\n' +
    '              ' + adminEscapeHtml_(programme) + '<br>\n' +
    '              Innovative University College\n' +
    '            </div>\n' +
    '            <p style="margin:0 0 6px 0;">Dear Candidate,</p>\n' +
    '            <div class="subject-line">' + adminEscapeHtml_(subject) + '</div>\n' +
    '            <p style="margin:0 0 6px 0;text-align:justify;">On behalf of Innovative University College (IUC) and the Institute of Postgraduate Studies (IPGS), we are pleased to officially convey the decision and recommendations of the Examination Committee for your <strong>' + adminEscapeHtml_(defenceType) + '</strong>' + (sessionDate ? ' held on <strong>' + adminEscapeHtml_(sessionDate) + '</strong>' : '') + ':</p>\n' +
    '            <table class="details-box">\n' +
    '              <tr><td class="label">Candidate Name</td><td><strong>' + adminEscapeHtml_(studentName || 'Candidate Name') + '</strong></td></tr>\n' +
    '              <tr><td class="label">Degree Programme</td><td>' + adminEscapeHtml_(programme || 'Postgraduate Programme') + '</td></tr>\n' +
    '              <tr><td class="label">Research Title</td><td>' + adminEscapeHtml_(researchTitle || 'Research Title') + '</td></tr>\n' +
    '              <tr><td class="label">Examination Stage</td><td>' + adminEscapeHtml_(defenceType) + '</td></tr>\n' +
    '              <tr><td class="label">Official Result Scale</td><td><strong style="color:#581c87;">' + adminEscapeHtml_(resultScale) + '</strong></td></tr>\n' +
    '              <tr><td class="label">Panel Decision / Remarks</td><td style="text-align:justify;">' + (resultStatus ? adminEscapeHtml_(resultStatus).replace(/\n/g, '<br>') : 'Satisfactory examination progress recorded.') + '</td></tr>\n' +
    '              <tr><td class="label">Corrections Deadline</td><td>' + (correctionsDeadline ? ('<strong style="color:#9f1239;">' + adminEscapeHtml_(correctionsDeadline) + '</strong>') : 'Not applicable / No corrections required') + '</td></tr>\n' +
    '            </table>\n' +
    '            <p style="margin:6px 0 3px 0;font-weight:bold;">The Examination Committee comprised:</p>\n' +
    '            <ul style="margin:0 0 6px 16px;padding:0;font-size:8.8pt;line-height:1.3;">\n' +
    '              <li><strong>Chairperson:</strong> ' + adminEscapeHtml_(chair) + '</li>\n' +
    '              <li><strong>Examiner 1:</strong> ' + adminEscapeHtml_(ex1) + '</li>\n' +
    '              <li><strong>Examiner 2:</strong> ' + adminEscapeHtml_(ex2) + '</li>\n' +
    '              <li><strong>Main Supervisor:</strong> ' + adminEscapeHtml_(supervisor) + '</li>\n' +
    '            </ul>\n' +
    '            <p style="margin:0 0 6px 0;text-align:justify;">Please refer to the attached official <strong>Examiner Evaluation Reports</strong> for comprehensive commentary, guidance, and required amendments. Candidates required to carry out corrections must consult with their Main Supervisor, prepare a complete <strong>Correction Matrix</strong>, and submit the endorsed revised manuscript prior to the stipulated deadline.</p>\n' +
    '            <p style="margin:0 0 8px 0;">Should you require further guidance or clarification, please contact the Institute of Postgraduate Studies.</p>\n' +
    '            <div class="signatory-block">\n' +
    '              <p style="margin:0 0 2px 0;">Sincerely,</p>\n' +
    '              <p style="margin:0;font-weight:bold;color:#2e1065;">' + adminEscapeHtml_(signatory.name) + '</p>\n' +
    '              <p style="margin:0;color:#475569;">' + adminEscapeHtml_(signatory.title) + '</p>\n' +
    '              <p style="margin:0;color:#475569;">' + adminEscapeHtml_(signatory.department) + '</p>\n' +
    '              <p style="margin:0;color:#475569;">' + adminEscapeHtml_(signatory.institution) + '</p>\n' +
    '            </div>\n' +
    '            <div class="footer-note">This is a computer-generated official confirmation document issued by the Institute of Postgraduate Studies, Innovative University College.</div>\n' +
    '          </div>\n' +
    '        </td>\n' +
    '      </tr>\n' +
    '    </tbody>\n' +
    '  </table>\n' +
    '</body>\n' +
    '</html>';

  return html;
}

function adminGenerateResultConfirmationLetterPdf_(record, data, studentFolder) {
  const html = adminGenerateResultConfirmationLetterHtml_(data);
  const studentName = String(data['Student Name'] || 'Student').trim().replace(/[^a-zA-Z0-9_-]+/g, '_');
  const defenceType = String(data['Defence Type'] || 'Defence').trim().replace(/[^a-zA-Z0-9_-]+/g, '_');
  const fileName = 'Result_Confirmation_Letter_' + defenceType + '_' + studentName + '.pdf';

  const blob = Utilities.newBlob(html, 'text/html', fileName).getAs('application/pdf');
  blob.setName(fileName);

  const folder = studentFolder || adminEnsureStudentFolder_(record, data);
  const existingFiles = folder.getFilesByName(fileName);
  while (existingFiles.hasNext()) {
    try {
      existingFiles.next().setTrashed(true);
    } catch (e) {
      console.warn('Could not trash existing confirmation letter PDF: ' + e.message);
    }
  }
  const file = folder.createFile(blob);
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    console.warn('Could not set public view permission: ' + e.message);
  }
  return {
    file: file,
    blob: blob,
    url: file.getUrl(),
    fileName: fileName
  };
}

function sendResultOutcomeEmail(caseId, clientData) {
  const adminEmail = adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  wfAssertRevision_(record,clientData&&clientData._revision);
  if(wfNorm_(wfRaw_(record)['Case Status'])==='closed')throw new Error('Reopen the stage explicitly before modifying arrangements or issuing outcomes.');
  const data = adminCaseObject_(record);
  adminSyncPreviewData_(record, data, clientData);

  let studentEmail = String(data['Student Email'] || (clientData && clientData['Student Email']) || '').trim();
  if (!studentEmail) {
    const studentKey = String(data['Student Key'] || (clientData && clientData['Student Key']) || '').trim();
    const studentName = String(data['Student Name'] || (clientData && clientData['Student Name']) || '').trim();
    const student = adminFindStudent_(studentKey || studentName || caseId);
    if (student && student['Student Email']) {
      studentEmail = String(student['Student Email']).trim();
    }
  }

  if (!studentEmail) {
    throw new Error('Student email is required. Please check that the student email is entered under the "Student details" tab and save changes before sending.');
  }

  studentEmail = studentEmail.toLowerCase();
  adminValidateEmail_(studentEmail, 'Student email');
  data['Student Email'] = studentEmail;

  const scaleMap = {
    'Scale 1': 'Unconditional pass',
    'Scale 2': 'Conditional pass with minor corrections',
    'Scale 3': 'Conditional pass with major corrections',
    'Scale 4': 'Re-examination',
    'Scale 5': 'Fail'
  };

  const statusToScaleMap = {
    'unconditional pass': 'Scale 1',
    'conditional pass with minor corrections': 'Scale 2',
    'conditional pass with major corrections': 'Scale 3',
    're-examination': 'Scale 4',
    'reexamination': 'Scale 4',
    'fail': 'Scale 5'
  };

  if (!String(data['Result Status'] || '').trim()) {
    const scale = String(data['Result Scale'] || (clientData && clientData['Result Scale']) || '').trim();
    if (scale && scaleMap[scale]) {
      data['Result Status'] = scaleMap[scale];
    } else if (clientData && String(clientData['Result Status'] || '').trim()) {
      data['Result Status'] = String(clientData['Result Status']).trim();
    }
  }

  if (!String(data['Result Status'] || '').trim()) {
    const dec = wfDecision_(data);
    if (dec && dec.code) {
      const decMap = {
        'PASS': 'Unconditional pass',
        'MINOR': 'Conditional pass with minor corrections',
        'MAJOR': 'Conditional pass with major corrections',
        'REEXAM': 'Re-examination',
        'FAIL': 'Fail'
      };
      if (decMap[dec.code]) {
        data['Result Status'] = decMap[dec.code];
      }
    }
  }

  // Derive Result Scale if empty or 'Not recorded'
  if (!String(data['Result Scale'] || '').trim() || String(data['Result Scale']).trim() === 'Not recorded') {
    const statusNorm = normaliseAdmin_(data['Result Status']);
    if (statusToScaleMap[statusNorm]) {
      data['Result Scale'] = statusToScaleMap[statusNorm];
    } else if (statusNorm.indexOf('minor') >= 0) {
      data['Result Scale'] = 'Scale 2';
    } else if (statusNorm.indexOf('major') >= 0) {
      data['Result Scale'] = 'Scale 3';
    } else if (statusNorm.indexOf('unconditional') >= 0 || statusNorm === 'pass') {
      data['Result Scale'] = 'Scale 1';
    } else if (statusNorm.indexOf('re-exam') >= 0 || statusNorm.indexOf('reexam') >= 0) {
      data['Result Scale'] = 'Scale 4';
    } else if (statusNorm.indexOf('fail') >= 0) {
      data['Result Scale'] = 'Scale 5';
    } else if (clientData && clientData['Result Scale']) {
      data['Result Scale'] = String(clientData['Result Scale']).trim();
    }
  }

  // Fallback corrections deadline
  if (!String(data['Corrections Deadline'] || '').trim()) {
    if (clientData && String(clientData['Corrections Deadline'] || '').trim()) {
      data['Corrections Deadline'] = String(clientData['Corrections Deadline']).trim();
    } else if (String(data['Final Submission Due'] || '').trim()) {
      data['Corrections Deadline'] = String(data['Final Submission Due']).trim();
    } else if (clientData && String(clientData['Final Submission Due'] || '').trim()) {
      data['Corrections Deadline'] = String(clientData['Final Submission Due']).trim();
    } else if (data['Result Scale'] === 'Scale 2' || data['Result Scale'] === 'Scale 3' || data['Result Scale'] === 'Scale 4') {
      const baseDate = adminParseDateValue_(data['Session Date']) || new Date();
      const monthsToAdd = (data['Result Scale'] === 'Scale 2') ? 1 : (data['Result Scale'] === 'Scale 3') ? 3 : 6;
      const targetDate = new Date(baseDate.getTime());
      targetDate.setMonth(targetDate.getMonth() + monthsToAdd);
      data['Corrections Deadline'] = Utilities.formatDate(targetDate, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd');
      data['Final Submission Due'] = data['Corrections Deadline'];
    }
  }

  // Persist resolved fields back to the sheet row if currently empty
  const fieldsToPersist = [
    'Student Name', 'Student Email', 'Programme', 'Research Title',
    'Supervisor', 'Supervisor Email', 'Chairperson', 'Examiner 1', 'Examiner 2',
    'Result Scale', 'Result Status', 'Corrections Deadline', 'Final Submission Due'
  ];
  fieldsToPersist.forEach(function(field) {
    if (record.map[field] && data[field] && !String(record.values[record.map[field] - 1] || '').trim()) {
      try {
        record.sheet.getRange(record.row, record.map[field]).setValue(data[field]);
      } catch (e) {}
    }
  });

  adminRequired_(data['Result Status'], 'Result status');
  const currentEmailStatus = normaliseAdmin_(data['Result Email Status']);
  if(currentEmailStatus==='sent'&&!(clientData&&clientData._resendConfirmed))throw new Error('The result email was already sent. Use the explicit reviewed resend action.');
  if(!wfDecision_(data).known)throw new Error('Record an unambiguous academic decision before sending the outcome.');

  // Resolve Examiner 1 and 2 Report Links from clientData, Form Link, or Examiner Report File if needed
  ['Examiner 1', 'Examiner 2'].forEach(function(slot) {
    const reportKey = slot + ' Report Link';
    const formKey = slot + ' Form Link';
    const statusKey = slot + ' Report Status';

    if (!String(data[reportKey] || '').trim()) {
      if (clientData && String(clientData[reportKey] || '').trim()) {
        data[reportKey] = String(clientData[reportKey]).trim();
      } else if (data['Examiner Report File']) {
        const repFile = String(data['Examiner Report File']).trim();
        const m = repFile.match(new RegExp(slot + ':\\s*([^\\r\\n]+)', 'i'));
        if (m && m[1]) {
          data[reportKey] = m[1].trim();
        } else if (!/Examiner\s*[12]/i.test(repFile) && slot === 'Examiner 1' && adminExtractDriveFileId_(repFile)) {
          data[reportKey] = repFile;
        }
      }
      if (data[reportKey] && record.map[reportKey] && !String(record.values[record.map[reportKey] - 1] || '').trim()) {
        try { record.sheet.getRange(record.row, record.map[reportKey]).setValue(data[reportKey]); } catch (e) {}
      }
    }

    if (String(data[reportKey] || '').trim()) {
      const curStatus = normaliseAdmin_(data[statusKey]);
      if (!curStatus || curStatus === 'pending' || curStatus === 'awaiting submission') {
        data[statusKey] = 'Received';
        if (record.map[statusKey]) {
          try { record.sheet.getRange(record.row, record.map[statusKey]).setValue('Received'); } catch (e) {}
        }
      }
    }
  });

  // Official result notification email requires all appointed examiner reports
  const report1 = adminReportReceived_(data, 'Examiner 1');
  const hasExaminer2 = Boolean(String(data['Examiner 2'] || data['Examiner 2 Email'] || '').trim());
  const report2 = hasExaminer2 ? adminReportReceived_(data, 'Examiner 2') : true;
  if (!report1 || !report2) {
    const missing = [];
    if (!report1) missing.push('Examiner 1 Report');
    if (hasExaminer2 && !report2) missing.push('Examiner 2 Report');
    throw new Error('Official result email cannot be dispatched: ' + missing.join(' and ') + ' must be received by administration before the official result email can be sent to the candidate.');
  }

  const supervisorEmail = String(data['Supervisor Email'] || '').trim();
  if (supervisorEmail) {
    try {
      adminValidateEmail_(supervisorEmail, 'Supervisor email');
    } catch (e) {
      console.warn('Supervisor email validation warning: ' + e.message);
    }
  }

  // 1. Generate Confirmation Letter of Result PDF
  const studentFolder = adminEnsureStudentFolder_(record, data);
  const resultPdf = adminGenerateResultConfirmationLetterPdf_(record, data, studentFolder);

  // 2. Prepare attachments array (actual files, not links)
  const attachments = [];
  const attachmentSummary = [];
  if (resultPdf && resultPdf.blob) {
    attachments.push(resultPdf.blob);
    attachmentSummary.push('Official Result Confirmation Letter (' + (resultPdf.fileName || 'Result_Letter.pdf') + ')');
  }

  // 3. Attach Examiner 1 and Examiner 2 Reports as documents
  const reportConfigs = [
    { key: 'Examiner 1 Report Link', label: 'Examiner 1 Report', prefix: 'Examiner_1_Report_' },
    { key: 'Examiner 2 Report Link', label: 'Examiner 2 Report', prefix: 'Examiner_2_Report_' },
    { key: 'Examiner Report File', label: 'Combined Examiner Report', prefix: 'Combined_Examiner_Report_' }
  ];

  const processedFileIds = {};

  reportConfigs.forEach(function(cfg) {
    const rawVal = String(data[cfg.key] || '').trim();
    if (!rawVal) return;
    const fileId = adminExtractDriveFileId_(rawVal);
    if (!fileId || processedFileIds[fileId]) return;
    processedFileIds[fileId] = true;

    try {
      const file = DriveApp.getFileById(fileId);
      if (file) {
        let blob;
        const mimeType = file.getMimeType() || '';
        if (mimeType === MimeType.GOOGLE_DOCS || mimeType === MimeType.GOOGLE_SHEETS || mimeType === MimeType.GOOGLE_SLIDES || mimeType.indexOf('google-apps') >= 0) {
          blob = file.getAs('application/pdf');
        } else {
          blob = file.getBlob();
        }

        let origName = file.getName() || (cfg.label + '.pdf');
        if (mimeType.indexOf('google-apps') >= 0 && !origName.toLowerCase().endsWith('.pdf')) {
          origName += '.pdf';
        }
        const cleanName = cfg.prefix + origName.replace(/[^a-zA-Z0-9._-]+/g, '_');
        blob.setName(cleanName);
        attachments.push(blob);
        attachmentSummary.push(cfg.label + ' (' + cleanName + ')');
      }
    } catch (e) {
      throw new Error('Required outcome attachment unavailable: ' + cfg.label + ' (' + e.message + '). Please ensure the Google Drive file exists and is accessible.');
    }
  });

  const hasCombined = attachmentSummary.some(function(item){ return item.indexOf('Combined Examiner Report (') === 0; });
  const requiredLabels = hasCombined ? [] : ['Examiner 1 Report'].concat(hasExaminer2 ? ['Examiner 2 Report'] : []);
  requiredLabels.forEach(function(label){ if(!attachmentSummary.some(function(item){ return item.indexOf(label+' (') === 0; })) throw new Error('Required attachment missing: ' + label + '. No outcome email was sent.'); });

  // 4. Assemble email text & HTML
  const assembled = adminAssembleEmail_('RESULT_OUTCOME', data, { name: data['Student Name'], email: studentEmail });
  
  const mailOptions = {
    to: studentEmail,
    subject: assembled.subject,
    body: assembled.body,
    htmlBody: assembled.htmlBody
  };

  const headerBlob = adminGetEmailHeaderBlob_();
  if (headerBlob) {
    mailOptions.inlineImages = { emailHeader: headerBlob };
  }

  if (supervisorEmail) {
    mailOptions.cc = supervisorEmail;
  }

  if (attachments.length > 0) {
    mailOptions.attachments = attachments;
  }

  try {
    adminSendEmail_(mailOptions);
  } catch (error) {
    record.sheet.getRange(record.row, record.map['Result Email Status']).setValue('Error');
    SpreadsheetApp.flush();
    adminLog_(adminEmail, 'Result email failed', caseId, data['Student Name'], ['Result Email Status'], 'Error', error.message || String(error));
    throw new Error('The result email could not be sent: ' + (error.message || String(error)));
  }

  const now = new Date();
  const formattedSentAt = Utilities.formatDate(now, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
  record.sheet.getRange(record.row, record.map['Result Email Status']).setValue('Sent');
  record.sheet.getRange(record.row, record.map['Result Email Sent At']).setValue(formattedSentAt);
  if (record.map['Result Confirmation Letter Link'] && resultPdf && resultPdf.url) {
    record.sheet.getRange(record.row, record.map['Result Confirmation Letter Link']).setValue(resultPdf.url);
  }
  SpreadsheetApp.flush();
  adminLog_(adminEmail, currentEmailStatus === 'resend approved' ? 'Resent result email' : 'Sent result email', caseId, data['Student Name'], ['Result Email Status','Result Email Sent At'], 'Success', studentEmail + (supervisorEmail ? ' (CC: ' + supervisorEmail + ')' : '') + ' with ' + attachments.length + ' attachments: ' + attachmentSummary.join(', '));
  const refreshedData = getAdminCase(caseId);
  return {
    ok: true,
    message: 'Result outcome email with ' + attachments.length + ' document attachment(s) (' + (attachmentSummary.length > 0 ? attachmentSummary.join(', ') : 'Result Letter') + ') sent to ' + studentEmail + (supervisorEmail ? ' (CC: ' + supervisorEmail + ')' : '') + '.',
    caseData: refreshedData,
    cases: adminListCases_(),
    students: adminListStudents_()
  };
}

function sendPanelInvitations(caseId, clientData) {
  const adminEmail = adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  wfAssertRevision_(record,clientData&&clientData._revision);
  if(wfNorm_(wfRaw_(record)['Case Status'])==='closed')throw new Error('Reopen the stage explicitly before modifying arrangements or issuing outcomes.');
  const data = adminCaseObject_(record);



  adminRequireDraft_(data, record);
  if (adminMeetingPlatform_(data) === 'Google Meet') adminStoreCalendarMeet_(record, data, adminCalendarMeeting_(caseId));
  adminRequireMeetingLink_(data, true);
  adminSessionDateTime_(data['Session Date'], data['Start Time'], 'session start');
  adminSessionDateTime_(data['Session Date'], data['End Time'], 'session end');

  // 1. Resolve and persist explicit/stage-aware examiner roles
  const ex1Role = adminResolveExaminerRole_(data, 1);
  const ex1Key = ex1Role === 'External Examiner' ? 'APPOINTMENT_EXTERNAL_EXAMINER' : 'APPOINTMENT_INTERNAL_EXAMINER';
  data['Examiner 1 Role'] = ex1Role;
  if (record.map['Examiner 1 Role']) record.sheet.getRange(record.row, record.map['Examiner 1 Role']).setValue(ex1Role);

  const ex2Role = adminResolveExaminerRole_(data, 2);
  const ex2Key = ex2Role === 'External Examiner' ? 'APPOINTMENT_EXTERNAL_EXAMINER' : 'APPOINTMENT_INTERNAL_EXAMINER';
  data['Examiner 2 Role'] = ex2Role;
  if (record.map['Examiner 2 Role']) record.sheet.getRange(record.row, record.map['Examiner 2 Role']).setValue(ex2Role);

  // 2. Ensure student Drive folder
  const studentFolder = adminEnsureStudentFolder_(record, data);

  // 3. Generate Appointment Letter PDFs for Chairperson, Examiner 1, Examiner 2
  const chairRecipient = { name: data['Chairperson'], email: data['Chair Email'], role: 'Chairperson' };
  const chairPdf = adminGenerateAppointmentLetterPdf_(record, data, chairRecipient, 'APPOINTMENT_CHAIRPERSON', studentFolder);
  if (record.map['Chair Appointment Letter Link']) {
    record.sheet.getRange(record.row, record.map['Chair Appointment Letter Link']).setValue(chairPdf.url);
    data['Chair Appointment Letter Link'] = chairPdf.url;
  }

  const ex1Recipient = { name: data['Examiner 1'], email: data['Examiner 1 Email'], role: ex1Role };
  const ex1Pdf = adminGenerateAppointmentLetterPdf_(record, data, ex1Recipient, ex1Key, studentFolder);
  if (record.map['Examiner 1 Appointment Letter Link']) {
    record.sheet.getRange(record.row, record.map['Examiner 1 Appointment Letter Link']).setValue(ex1Pdf.url);
    data['Examiner 1 Appointment Letter Link'] = ex1Pdf.url;
  }

  const ex2Recipient = { name: data['Examiner 2'], email: data['Examiner 2 Email'], role: ex2Role };
  const ex2Pdf = adminGenerateAppointmentLetterPdf_(record, data, ex2Recipient, ex2Key, studentFolder);
  if (record.map['Examiner 2 Appointment Letter Link']) {
    record.sheet.getRange(record.row, record.map['Examiner 2 Appointment Letter Link']).setValue(ex2Pdf.url);
    data['Examiner 2 Appointment Letter Link'] = ex2Pdf.url;
  }

  SpreadsheetApp.flush();

  // 4. Validate panel slots
  const panelSlots = [
    { name: data['Chairperson'], email: String(data['Chair Email'] || '').trim(), role: 'Chairperson', pdf: chairPdf },
    { name: data['Examiner 1'], email: String(data['Examiner 1 Email'] || '').trim(), role: ex1Role, pdf: ex1Pdf },
    { name: data['Examiner 2'], email: String(data['Examiner 2 Email'] || '').trim(), role: ex2Role, pdf: ex2Pdf }
  ];

  panelSlots.forEach(function(slot) {
    adminRequired_(slot.name, slot.role + ' name');
    adminRequired_(slot.email, slot.role + ' email');
    adminValidateEmail_(slot.email, slot.role + ' email');
  });

  const ccEmails = adminParseEmailList_(data['Additional Invitees']);

  try {
    panelSlots.forEach(function(slot) {
      const person = { name: slot.name, email: slot.email, role: slot.role, roles: [slot.role] };
      const assembled = adminAssembleEmail_('PANEL_INVITATION', data, person);
      const personEmail = slot.email.toLowerCase();
      const mailOptions = {
        to: slot.email,
        subject: assembled.subject,
        body: assembled.body,
        htmlBody: assembled.htmlBody,
        attachments: [slot.pdf.blob]
      };
      const headerBlob = adminGetEmailHeaderBlob_();
      if (headerBlob) {
        mailOptions.inlineImages = { emailHeader: headerBlob };
      }
      if (ccEmails.length > 0) {
        const filteredCc = ccEmails.filter(function(email) { return email.toLowerCase() !== personEmail; });
        if (filteredCc.length > 0) mailOptions.cc = filteredCc.join(', ');
      }
      adminSendEmail_(mailOptions);
    });
  } catch (error) {
    record.sheet.getRange(record.row, record.map['Invitation Email Status']).setValue('Error');
    SpreadsheetApp.flush();
    adminLog_(adminEmail, 'Panel invitation failed', caseId, data['Student Name'], ['Invitation Email Status'], 'Error', error.message || String(error));
    throw error;
  }

  const now = new Date();
  const formattedSentAt = Utilities.formatDate(now, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
  record.sheet.getRange(record.row, record.map['Invitation Email Status']).setValue('Sent');
  record.sheet.getRange(record.row, record.map['Invitation Email Sent At']).setValue(formattedSentAt);
  SpreadsheetApp.flush();
  const logRecipients = panelSlots.map(function(slot) { return slot.email + ' (' + slot.role + ')'; }).join(', ') + (ccEmails.length ? ' (CC: ' + ccEmails.join(', ') + ')' : '');
  adminLog_(adminEmail, 'Sent panel invitations with appointment letter PDFs', caseId, data['Student Name'], ['Invitation Email Status','Invitation Email Sent At','Chair Appointment Letter Link','Examiner 1 Appointment Letter Link','Examiner 2 Appointment Letter Link'], 'Success', logRecipients);
  const refreshedData = getAdminCase(caseId);
  return {ok:true, message:'Panel invitation emails sent to ' + panelSlots.length + ' panel member(s)' + (ccEmails.length ? ' and CC\'d to ' + ccEmails.length + ' invitee(s)' : '') + '.', caseData:refreshedData, cases:adminListCases_()};
}

function sendCandidateInvitationEmail(caseId, clientData) {
  const adminEmail = adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('The selected case no longer exists.');
  wfAssertRevision_(record,clientData&&clientData._revision);
  if(wfNorm_(wfRaw_(record)['Case Status'])==='closed')throw new Error('Reopen the stage explicitly before modifying arrangements or issuing outcomes.');
  const data = adminCaseObject_(record);



  const studentEmail = String(data['Student Email'] || '').trim().toLowerCase();
  if (!studentEmail) throw new Error('Student email is missing for this case.');

  adminSessionDateTime_(data['Session Date'], data['Start Time'], 'session start');
  adminSessionDateTime_(data['Session Date'], data['End Time'], 'session end');

  data['Examiner 1 Role'] = adminResolveExaminerRole_(data, 1);
  data['Examiner 2 Role'] = adminResolveExaminerRole_(data, 2);

  // CC List: Supervisor Email + Additional Invitees
  const ccEmails = [];
  const supervisorEmail = String(data['Supervisor Email'] || '').trim().toLowerCase();
  if (supervisorEmail && supervisorEmail !== studentEmail) {
    ccEmails.push(supervisorEmail);
  }
  const additionalInvitees = adminParseEmailList_(data['Additional Invitees']);
  additionalInvitees.forEach(function(email) {
    if (email && email !== studentEmail && ccEmails.indexOf(email) === -1) {
      ccEmails.push(email);
    }
  });

  // 1. Ensure student Drive folder & generate official Examination Notice Letter PDF
  const studentFolder = adminEnsureStudentFolder_(record, data);
  const letterPdf = adminGenerateCandidateInvitationLetterPdf_(record, data, studentFolder);
  if (record.map['Candidate Notice Letter Link'] && letterPdf && letterPdf.url) {
    record.sheet.getRange(record.row, record.map['Candidate Notice Letter Link']).setValue(letterPdf.url);
    data['Candidate Notice Letter Link'] = letterPdf.url;
  }
  SpreadsheetApp.flush();

  const assembled = adminAssembleEmail_('CANDIDATE_INVITATION', data, {
    name: data['Student Name'] || 'Candidate',
    email: studentEmail,
    role: 'Candidate'
  });

  try {
    const mailOptions = {
      to: studentEmail,
      subject: assembled.subject,
      body: assembled.body,
      htmlBody: assembled.htmlBody,
      attachments: [letterPdf.blob]
    };
    const headerBlob = adminGetEmailHeaderBlob_();
    if (headerBlob) {
      mailOptions.inlineImages = { emailHeader: headerBlob };
    }
    if (ccEmails.length > 0) {
      mailOptions.cc = ccEmails.join(', ');
    }
    adminSendEmail_(mailOptions);
  } catch (error) {
    if (record.map['Candidate Notice Status']) {
      record.sheet.getRange(record.row, record.map['Candidate Notice Status']).setValue('Error');
      SpreadsheetApp.flush();
    }
    adminLog_(adminEmail, 'Candidate examination notice failed', caseId, data['Student Name'], ['Candidate Notice Status'], 'Error', error.message || String(error));
    throw error;
  }

  const now = new Date();
  const formattedSentAt = Utilities.formatDate(now, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
  if (record.map['Candidate Notice Status']) {
    record.sheet.getRange(record.row, record.map['Candidate Notice Status']).setValue('Sent');
  }
  if (record.map['Candidate Notice Sent At']) {
    record.sheet.getRange(record.row, record.map['Candidate Notice Sent At']).setValue(formattedSentAt);
  }
  SpreadsheetApp.flush();

  const logRecipients = studentEmail + (ccEmails.length ? ' (CC: ' + ccEmails.join(', ') + ')' : '');
  adminLog_(adminEmail, 'Sent candidate examination notice with official letter PDF', caseId, data['Student Name'], ['Candidate Notice Status', 'Candidate Notice Sent At', 'Candidate Notice Letter Link'], 'Success', logRecipients);
  const refreshedData = getAdminCase(caseId);
  return {
    ok: true,
    message: 'Candidate examination notice with official letter PDF sent to ' + studentEmail + (ccEmails.length ? ' (CC: ' + ccEmails.join(', ') + ')' : '') + '.',
    caseData: refreshedData,
    cases: adminListCases_()
  };
}

function adminEnsureStudentFolder_(record, data) {
  let folderId = String(data['Student Folder ID'] || '').trim();
  if (folderId) {
    try {
      const folder = DriveApp.getFolderById(folderId);
      if (folder) return folder;
    } catch (e) {
      console.warn('Recorded student folder ID could not be opened: ' + e.message);
    }
  }
  const root = DriveApp.getFolderById(ADMIN_CONFIG.ROOT_FOLDER_ID);
  const studentName = String(data['Student Name'] || 'Unnamed Student').trim();
  const matches = root.getFoldersByName(studentName);
  const folder = matches.hasNext() ? matches.next() : root.createFolder(studentName);
  folderId = folder.getId();
  data['Student Folder ID'] = folderId;
  if (record && record.sheet && record.map && record.map['Student Folder ID']) {
    record.sheet.getRange(record.row, record.map['Student Folder ID']).setValue(folderId);
  }
  const studentKey = String(data['Student Key'] || '').trim();
  if (studentKey) {
    try {
      const studentSheet = adminStudentSheet_();
      const sMap = {};
      ADMIN_STUDENT_HEADERS.forEach(function(h, i) { sMap[h] = i + 1; });
      const count = studentSheet.getLastRow() - 1;
      if (count > 0) {
        const keys = studentSheet.getRange(2, sMap['Student Key'], count, 1).getDisplayValues();
        for (let i = 0; i < keys.length; i++) {
          if (String(keys[i][0] || '').trim() === studentKey) {
            studentSheet.getRange(i + 2, sMap['Student Folder ID']).setValue(folderId);
            break;
          }
        }
      }
    } catch (err) {
      console.warn('Could not sync folder ID to Student Master: ' + err.message);
    }
  }
  return folder;
}

function adminGenerateAppointmentLetterHtml_(data, recipient, letterKey) {
  const templates = adminGetEmailTemplates_();
  let key = letterKey;
  if (!key) {
    const rRole = String((recipient && recipient.role) || '').toLowerCase();
    if (rRole.indexOf('chair') >= 0) {
      key = 'APPOINTMENT_CHAIRPERSON';
    } else if (rRole.indexOf('external') >= 0) {
      key = 'APPOINTMENT_EXTERNAL_EXAMINER';
    } else {
      key = 'APPOINTMENT_INTERNAL_EXAMINER';
    }
  }
  const t = templates[key] || ADMIN_DEFAULT_EMAIL_TEMPLATES[key] || ADMIN_DEFAULT_EMAIL_TEMPLATES.APPOINTMENT_CHAIRPERSON;

  const recipientName = String((recipient && recipient.name) || '').trim();
  const recipientRole = String((recipient && recipient.role) || 'Panel Member').trim();
  const defenceType = String(data['Defence Type'] || 'Proposal Defence').trim();
  const studentName = String(data['Student Name'] || '').trim();
  const studentKey = String(data['Student Key'] || data['Case ID'] || '').trim();
  const programme = String(data['Programme'] || '').trim();
  const researchTitle = String(data['Research Title'] || '').trim();

  const defenceCode = defenceType === 'Viva Voce' ? 'VV' : 'PD';
  const year = new Date().getFullYear();
  const caseSequence = String(data['Case ID'] || '').replace(/^[A-Z]+-\d+-/, '') || '001';
  const refNum = 'IUC/IPGS/' + defenceCode + '/' + year + '/' + caseSequence;
  const dateFormatted = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'd MMMM yyyy');

  const signatory = adminGetSignatory_();

  let dateText = 'Date to be confirmed';
  if (data['Session Date']) {
    try {
      dateText = adminReadableDate_(data['Session Date']);
    } catch (e) {
      dateText = String(data['Session Date']);
    }
  }
  let timeText = 'Time to be confirmed';
  if (data['Start Time'] || data['End Time']) {
    timeText = (data['Start Time'] || 'â€”') + ' - ' + (data['End Time'] || 'â€”') + ' (Malaysia Time)';
  }
  let venuePlatformText = '';
  if (data['Google Meet Link']) {
    venuePlatformText = 'Online Platform (' + data['Google Meet Link'] + ')';
    if (data['Venue']) venuePlatformText += ' / ' + data['Venue'];
  } else {
    venuePlatformText = data['Venue'] || 'To be confirmed';
  }

  const replaceTokens = function(text) {
    let s = String(text || '');
    s = s.replace(/\{\{STUDENT_NAME\}\}/g, studentName || 'Candidate Name');
    s = s.replace(/\{\{STUDENT_KEY\}\}/g, '');
    s = s.replace(/\{\{STUDENT_ID\}\}/g, '');
    s = s.replace(/\{\{CANDIDATE_NAME\}\}/g, studentName || 'Candidate Name');
    s = s.replace(/\{\{CANDIDATE\}\}/g, studentName || 'Candidate Name');
    s = s.replace(/\{\{DEFENCE_TYPE\}\}/g, defenceType);
    s = s.replace(/\{\{PROGRAMME\}\}/g, programme || 'Postgraduate Programme');
    s = s.replace(/\{\{CASE_ID\}\}/g, data['Case ID'] || '');
    s = s.replace(/\{\{RESEARCH_TITLE\}\}/g, researchTitle || 'Research Title');
    s = s.replace(/\{\{RECIPIENT_NAME\}\}/g, recipientName || 'Panel Member');
    s = s.replace(/\{\{RECIPIENT_ROLE\}\}/g, recipientRole);
    s = s.replace(/\{\{SUPERVISOR\}\}/g, data['Supervisor'] || '');
    s = s.replace(/\{\{SUPERVISORY_TEAM\}\}/g, data['Supervisor'] || '');
    s = s.replace(/\{\{EXAMINATION_DATE\}\}/g, dateText);
    s = s.replace(/\{\{SESSION_DATE\}\}/g, dateText);
    s = s.replace(/\{\{SESSION_TIME\}\}/g, timeText);
    s = s.replace(/\{\{VENUE\}\}/g, venuePlatformText);
    s = s.replace(/\{\{VENUE_PLATFORM\}\}/g, venuePlatformText);
    s = s.replace(/\{\{ADMIN_EMAIL\}\}/g, ADMIN_CONFIG.ALLOWED_ADMINS[0] || 'ipgs@innovative.edu.my');
    s = s.replace(/\{\{SIGNATORY_NAME\}\}/g, signatory.name);
    s = s.replace(/\{\{SIGNATORY_TITLE\}\}/g, signatory.title);
    s = s.replace(/\{\{SIGNATORY_DEPT\}\}/g, signatory.department);
    s = s.replace(/\{\{SIGNATORY_INSTITUTION\}\}/g, signatory.institution);
    s = s.replace(/\{\{PIC_NAME\}\}/g, signatory.name);
    s = s.replace(/\{\{PIC_TITLE\}\}/g, signatory.title);
    return s;
  };

  const subject = replaceTokens(t.subject);
  const opening = replaceTokens(t.openingText);
  const closing = replaceTokens(t.closingText);

  const closingParas = closing.split('\n\n').filter(Boolean).map(function(p) {
    return '<p style="margin:0 0 5px 0;line-height:1.28;text-align:justify;">' + adminEscapeHtml_(p.trim()).replace(/\n/g, '<br>') + '</p>';
  }).join('');

  const headerBase64 = (typeof ADMIN_LETTERHEAD_HEADER !== 'undefined') ? ADMIN_LETTERHEAD_HEADER : '';
  const footerBase64 = (typeof ADMIN_LETTERHEAD_FOOTER !== 'undefined') ? ADMIN_LETTERHEAD_FOOTER : '';

  const html = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '<meta charset="utf-8">\n' +
    '<title>' + adminEscapeHtml_(subject) + '</title>\n' +
    '<style>\n' +
    '  @page {\n' +
    '    size: A4 portrait;\n' +
    '    margin: 0;\n' +
    '  }\n' +
    '  * {\n' +
    '    box-sizing: border-box;\n' +
    '  }\n' +
    '  body {\n' +
    '    font-family: Calibri, Arial, "Helvetica Neue", Helvetica, sans-serif;\n' +
    '    font-size: 9pt;\n' +
    '    line-height: 1.25;\n' +
    '    color: #111111;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    background: #ffffff;\n' +
    '  }\n' +
    '  .letterhead-header {\n' +
    '    position: fixed;\n' +
    '    top: 0;\n' +
    '    left: 0;\n' +
    '    width: 100%;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    line-height: 0;\n' +
    '    z-index: 100;\n' +
    '  }\n' +
    '  .letterhead-header img {\n' +
    '    width: 100%;\n' +
    '    height: auto;\n' +
    '    display: block;\n' +
    '  }\n' +
    '  .letterhead-footer {\n' +
    '    position: fixed;\n' +
    '    bottom: 0;\n' +
    '    left: 0;\n' +
    '    width: 100%;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    line-height: 0;\n' +
    '    z-index: 100;\n' +
    '  }\n' +
    '  .letterhead-footer img {\n' +
    '    width: 100%;\n' +
    '    height: auto;\n' +
    '    display: block;\n' +
    '  }\n' +
    '  table.letter-layout {\n' +
    '    width: 100%;\n' +
    '    border-collapse: collapse;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '  }\n' +
    '  table.letter-layout > thead > tr > td {\n' +
    '    padding: 0;\n' +
    '    margin: 0;\n' +
    '    height: 70mm;\n' +
    '    border: none;\n' +
    '  }\n' +
    '  table.letter-layout > tfoot > tr > td {\n' +
    '    padding: 0;\n' +
    '    margin: 0;\n' +
    '    height: 24mm;\n' +
    '    border: none;\n' +
    '  }\n' +
    '  table.letter-layout > tbody > tr > td {\n' +
    '    padding: 0;\n' +
    '    margin: 0;\n' +
    '    vertical-align: top;\n' +
    '    border: none;\n' +
    '  }\n' +
    '  .header-spacer {\n' +
    '    height: 70mm;\n' +
    '  }\n' +
    '  .footer-spacer {\n' +
    '    height: 24mm;\n' +
    '  }\n' +
    '  .letter-body {\n' +
    '    padding: 0 22mm;\n' +
    '  }\n' +
    '  .meta-table {\n' +
    '    border-collapse: collapse;\n' +
    '    margin-bottom: 7px;\n' +
    '    font-size: 9pt;\n' +
    '    line-height: 1.3;\n' +
    '  }\n' +
    '  .meta-table td {\n' +
    '    vertical-align: top;\n' +
    '    padding: 1px 0;\n' +
    '  }\n' +
    '  .recipient-block {\n' +
    '    margin-bottom: 7px;\n' +
    '    font-size: 9pt;\n' +
    '    line-height: 1.25;\n' +
    '  }\n' +
    '  .subject-line {\n' +
    '    font-weight: bold;\n' +
    '    font-size: 9.5pt;\n' +
    '    text-transform: uppercase;\n' +
    '    margin: 8px 0 6px 0;\n' +
    '  }\n' +
    '  .details-table {\n' +
    '    width: 100%;\n' +
    '    border-collapse: collapse;\n' +
    '    margin: 6px 0 7px 0;\n' +
    '    font-size: 9pt;\n' +
    '  }\n' +
    '  .details-table td {\n' +
    '    padding: 0.8px 0;\n' +
    '    vertical-align: top;\n' +
    '  }\n' +
    '  .details-label {\n' +
    '    width: 135px;\n' +
    '    font-weight: bold;\n' +
    '    color: #111111;\n' +
    '    white-space: nowrap;\n' +
    '  }\n' +
    '  p {\n' +
    '    margin: 0 0 5px 0;\n' +
    '    text-align: justify;\n' +
    '  }\n' +
    '  .signatory-block {\n' +
    '    margin-top: 5px;\n' +
    '    page-break-inside: avoid;\n' +
    '    font-size: 9pt;\n' +
    '  }\n' +
    '  .signature-line {\n' +
    '    margin: 8px 0 3px 0;\n' +
    '    color: #333333;\n' +
    '    letter-spacing: 2px;\n' +
    '    font-size: 8.5pt;\n' +
    '  }\n' +
    '</style>\n' +
    '</head>\n' +
    '<body>\n' +
    (headerBase64 ? '  <div class="letterhead-header"><img src="data:image/jpeg;base64,' + headerBase64 + '" alt="IUC Letterhead"></div>\n' : '') +
    (footerBase64 ? '  <div class="letterhead-footer"><img src="data:image/jpeg;base64,' + footerBase64 + '" alt="IUC Footer"></div>\n' : '') +
    '  <table class="letter-layout">\n' +
    '    <thead><tr><td><div class="header-spacer"></div></td></tr></thead>\n' +
    '    <tfoot><tr><td><div class="footer-spacer"></div></td></tr></tfoot>\n' +
    '    <tbody>\n' +
    '      <tr>\n' +
    '        <td>\n' +
    '          <div class="letter-body">\n' +
    '            <table class="meta-table">\n' +
    '              <tr>\n' +
    '                <td style="font-weight:bold; width:80px;">Reference</td>\n' +
    '                <td style="font-weight:bold; width:15px; text-align:center;">:</td>\n' +
    '                <td>' + adminEscapeHtml_(refNum) + '</td>\n' +
    '              </tr>\n' +
    '              <tr>\n' +
    '                <td style="font-weight:bold;">Date</td>\n' +
    '                <td style="font-weight:bold; text-align:center;">:</td>\n' +
    '                <td>' + adminEscapeHtml_(dateFormatted) + '</td>\n' +
    '              </tr>\n' +
    '            </table>\n' +
    '            <div class="recipient-block">\n' +
    '              <div><strong>To :</strong></div>\n' +
    '              <div><strong>' + adminEscapeHtml_(recipientName) + '</strong></div>\n' +
    '              <div>' + adminEscapeHtml_(recipientRole) + '</div>\n' +
    '            </div>\n' +
    '            <p>Sir/Madam,</p>\n' +
    '            <div class="subject-line">' + adminEscapeHtml_(subject) + '</div>\n' +
    '            <p>' + adminEscapeHtml_(opening) + '</p>\n' +
    '            <table class="details-table">\n' +
    '              <tr><td class="details-label">Candidate Name:</td><td>' + adminEscapeHtml_(studentName || 'Candidate Name') + '</td></tr>\n' +
    '              <tr><td class="details-label">Degree Programme:</td><td>' + adminEscapeHtml_(programme || 'Postgraduate Programme') + '</td></tr>\n' +
    '              <tr><td class="details-label">Research Title:</td><td>' + adminEscapeHtml_(researchTitle || 'Research Title') + '</td></tr>\n' +
    '              <tr><td class="details-label">Supervisory Team:</td><td>' + adminEscapeHtml_(data['Supervisor'] || 'â€”') + '</td></tr>\n' +
    '              <tr><td class="details-label">Examination Date:</td><td>' + adminEscapeHtml_(dateText) + '</td></tr>\n' +
    '              <tr><td class="details-label">Scheduled Time:</td><td>' + adminEscapeHtml_(timeText) + '</td></tr>\n' +
    '              <tr><td class="details-label">Venue / Platform:</td><td>' + adminEscapeHtml_(venuePlatformText) + '</td></tr>\n' +
    '            </table>\n' +
    '            ' + closingParas + '\n' +
    '            <div class="signatory-block">\n' +
    '              <p style="margin:4px 0 1px 0;font-style:italic;font-weight:bold;">&ldquo;Industry Driven University&rdquo;</p>\n' +
    '              <p style="margin:0 0 1px 0;">Best Regards,</p>\n' +
    '              <div class="signature-line">............................................................</div>\n' +
    '              <div style="font-weight:bold;text-transform:uppercase;color:#111111;">' + adminEscapeHtml_(signatory.name) + '</div>\n' +
    '              <div style="font-weight:600;color:#222222;">' + adminEscapeHtml_(signatory.title) + '</div>\n' +
    '              <div style="color:#333333;">' + adminEscapeHtml_(signatory.department) + '</div>\n' +
    '              <div style="color:#333333;">' + adminEscapeHtml_(signatory.institution) + '</div>\n' +
    '              <div style="margin-top:3px;color:#666666;font-size:7.5pt;font-style:italic;">*(This is a computer-generated document. No physical signature is required.)*</div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </td>\n' +
    '      </tr>\n' +
    '    </tbody>\n' +
    '  </table>\n' +
    '</body>\n' +
    '</html>';

  return html;
}

function adminGenerateAppointmentLetterPdf_(record, data, recipient, letterKey, studentFolder) {
  const html = adminGenerateAppointmentLetterHtml_(data, recipient, letterKey);
  const studentName = String(data['Student Name'] || 'Student').trim().replace(/[^a-zA-Z0-9_-]+/g, '_');
  const roleSlug = String((recipient && recipient.role) || 'Panel').trim().replace(/[^a-zA-Z0-9_-]+/g, '_');
  const fileName = 'Appointment_Letter_' + roleSlug + '_' + studentName + '.pdf';

  const blob = Utilities.newBlob(html, 'text/html', fileName).getAs('application/pdf');
  blob.setName(fileName);

  const folder = studentFolder || adminEnsureStudentFolder_(record, data);
  const existingFiles = folder.getFilesByName(fileName);
  while (existingFiles.hasNext()) {
    try {
      existingFiles.next().setTrashed(true);
    } catch (e) {
      console.warn('Could not trash existing PDF: ' + e.message);
    }
  }
  const file = folder.createFile(blob);
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    console.warn('Could not set public view permission: ' + e.message);
  }

  return {
    file: file,
    url: file.getUrl(),
    blob: blob,
    fileName: fileName
  };
}

function adminGenerateCandidateInvitationLetterHtml_(data) {
  const defenceType = String(data['Defence Type'] || 'Proposal Defence').trim();
  const studentName = String(data['Student Name'] || '').trim();
  const studentKey = String(data['Student Key'] || data['Case ID'] || '').trim();
  const programme = String(data['Programme'] || '').trim();
  const researchTitle = String(data['Research Title'] || '').trim();

  const defenceCode = defenceType === 'Viva Voce' ? 'VV' : 'PD';
  const year = new Date().getFullYear();
  const caseSequence = String(data['Case ID'] || '').replace(/^[A-Z]+-\d+-/, '') || '001';
  const refNum = 'IUC/IPGS/' + defenceCode + '/EXAM/' + year + '/' + caseSequence;
  const dateFormatted = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'd MMMM yyyy');

  const signatory = adminGetSignatory_();
  const subject = 'OFFICIAL NOTIFICATION OF ' + defenceType.toUpperCase() + ' EXAMINATION';

  const ex1Role = adminResolveExaminerRole_(data, 1);
  const ex2Role = adminResolveExaminerRole_(data, 2);

  let dateText = 'Date to be confirmed';
  if (data['Session Date']) {
    try {
      dateText = adminReadableDate_(data['Session Date']);
    } catch (e) {
      dateText = String(data['Session Date']);
    }
  }
  let timeText = 'Time to be confirmed';
  if (data['Start Time'] || data['End Time']) {
    timeText = (data['Start Time'] || 'â€”') + ' - ' + (data['End Time'] || 'â€”') + ' (Malaysia Time, UTC+08:00)';
  }
  let venuePlatformText = '';
  if (data['Google Meet Link']) {
    venuePlatformText = 'Online Platform (' + data['Google Meet Link'] + ')';
    if (data['Venue']) venuePlatformText += ' / ' + data['Venue'];
  } else {
    venuePlatformText = data['Venue'] || 'To be confirmed';
  }

  const headerBase64 = (typeof ADMIN_LETTERHEAD_HEADER !== 'undefined') ? ADMIN_LETTERHEAD_HEADER : '';
  const footerBase64 = (typeof ADMIN_LETTERHEAD_FOOTER !== 'undefined') ? ADMIN_LETTERHEAD_FOOTER : '';

  const html = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '<meta charset="utf-8">\n' +
    '<title>' + adminEscapeHtml_(subject) + '</title>\n' +
    '<style>\n' +
    '  @page {\n' +
    '    size: A4 portrait;\n' +
    '    margin: 0;\n' +
    '  }\n' +
    '  * {\n' +
    '    box-sizing: border-box;\n' +
    '  }\n' +
    '  body {\n' +
    '    font-family: Calibri, Arial, "Helvetica Neue", Helvetica, sans-serif;\n' +
    '    font-size: 9pt;\n' +
    '    line-height: 1.25;\n' +
    '    color: #111111;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    background: #ffffff;\n' +
    '  }\n' +
    '  .letterhead-header {\n' +
    '    position: fixed;\n' +
    '    top: 0;\n' +
    '    left: 0;\n' +
    '    width: 100%;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    line-height: 0;\n' +
    '    z-index: 100;\n' +
    '  }\n' +
    '  .letterhead-header img {\n' +
    '    width: 100%;\n' +
    '    height: auto;\n' +
    '    display: block;\n' +
    '  }\n' +
    '  .letterhead-footer {\n' +
    '    position: fixed;\n' +
    '    bottom: 0;\n' +
    '    left: 0;\n' +
    '    width: 100%;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    line-height: 0;\n' +
    '    z-index: 100;\n' +
    '  }\n' +
    '  .letterhead-footer img {\n' +
    '    width: 100%;\n' +
    '    height: auto;\n' +
    '    display: block;\n' +
    '  }\n' +
    '  table.letter-layout {\n' +
    '    width: 100%;\n' +
    '    border-collapse: collapse;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '  }\n' +
    '  table.letter-layout > thead > tr > td {\n' +
    '    padding: 0;\n' +
    '    margin: 0;\n' +
    '    height: 70mm;\n' +
    '    border: none;\n' +
    '  }\n' +
    '  table.letter-layout > tfoot > tr > td {\n' +
    '    padding: 0;\n' +
    '    margin: 0;\n' +
    '    height: 24mm;\n' +
    '    border: none;\n' +
    '  }\n' +
    '  table.letter-layout > tbody > tr > td {\n' +
    '    padding: 0;\n' +
    '    margin: 0;\n' +
    '    vertical-align: top;\n' +
    '    border: none;\n' +
    '  }\n' +
    '  .header-spacer {\n' +
    '    height: 70mm;\n' +
    '  }\n' +
    '  .footer-spacer {\n' +
    '    height: 24mm;\n' +
    '  }\n' +
    '  .letter-body {\n' +
    '    padding: 0 22mm;\n' +
    '  }\n' +
    '  .meta-table {\n' +
    '    border-collapse: collapse;\n' +
    '    margin-bottom: 7px;\n' +
    '    font-size: 9pt;\n' +
    '    line-height: 1.3;\n' +
    '  }\n' +
    '  .meta-table td {\n' +
    '    vertical-align: top;\n' +
    '    padding: 1px 0;\n' +
    '  }\n' +
    '  .recipient-block {\n' +
    '    margin-bottom: 7px;\n' +
    '    font-size: 9pt;\n' +
    '    line-height: 1.25;\n' +
    '  }\n' +
    '  .subject-line {\n' +
    '    font-weight: bold;\n' +
    '    font-size: 9.5pt;\n' +
    '    text-transform: uppercase;\n' +
    '    margin: 8px 0 6px 0;\n' +
    '  }\n' +
    '  .details-table {\n' +
    '    width: 100%;\n' +
    '    border-collapse: collapse;\n' +
    '    margin: 6px 0 7px 0;\n' +
    '    font-size: 9pt;\n' +
    '  }\n' +
    '  .details-table td {\n' +
    '    padding: 0.8px 0;\n' +
    '    vertical-align: top;\n' +
    '  }\n' +
    '  .details-label {\n' +
    '    width: 145px;\n' +
    '    font-weight: bold;\n' +
    '    color: #111111;\n' +
    '    white-space: nowrap;\n' +
    '  }\n' +
    '  p {\n' +
    '    margin: 0 0 4.5px 0;\n' +
    '    text-align: justify;\n' +
    '  }\n' +
    '  .guidelines-list {\n' +
    '    margin: 3px 0 5px 16px;\n' +
    '    padding: 0;\n' +
    '    line-height: 1.28;\n' +
    '    font-size: 8.8pt;\n' +
    '  }\n' +
    '  .guidelines-list li {\n' +
    '    margin-bottom: 2px;\n' +
    '    text-align: justify;\n' +
    '  }\n' +
    '  .signatory-block {\n' +
    '    margin-top: 5px;\n' +
    '    page-break-inside: avoid;\n' +
    '    font-size: 9pt;\n' +
    '  }\n' +
    '  .signature-line {\n' +
    '    margin: 8px 0 3px 0;\n' +
    '    color: #333333;\n' +
    '    letter-spacing: 2px;\n' +
    '    font-size: 8.5pt;\n' +
    '  }\n' +
    '</style>\n' +
    '</head>\n' +
    '<body>\n' +
    (headerBase64 ? '  <div class="letterhead-header"><img src="data:image/jpeg;base64,' + headerBase64 + '" alt="IUC Letterhead"></div>\n' : '') +
    (footerBase64 ? '  <div class="letterhead-footer"><img src="data:image/jpeg;base64,' + footerBase64 + '" alt="IUC Footer"></div>\n' : '') +
    '  <table class="letter-layout">\n' +
    '    <thead><tr><td><div class="header-spacer"></div></td></tr></thead>\n' +
    '    <tfoot><tr><td><div class="footer-spacer"></div></td></tr></tfoot>\n' +
    '    <tbody>\n' +
    '      <tr>\n' +
    '        <td>\n' +
    '          <div class="letter-body">\n' +
    '            <table class="meta-table">\n' +
    '              <tr>\n' +
    '                <td style="font-weight:bold; width:80px;">Reference</td>\n' +
    '                <td style="font-weight:bold; width:15px; text-align:center;">:</td>\n' +
    '                <td>' + adminEscapeHtml_(refNum) + '</td>\n' +
    '              </tr>\n' +
    '              <tr>\n' +
    '                <td style="font-weight:bold;">Date</td>\n' +
    '                <td style="font-weight:bold; text-align:center;">:</td>\n' +
    '                <td>' + adminEscapeHtml_(dateFormatted) + '</td>\n' +
    '              </tr>\n' +
    '            </table>\n' +
    '            <div class="recipient-block">\n' +
    '              <div><strong>To :</strong></div>\n' +
    '              <div><strong>' + adminEscapeHtml_(studentName || 'Candidate Name') + '</strong></div>\n' +
    '              <div>Candidate for ' + adminEscapeHtml_(programme || 'Postgraduate Programme') + '</div>\n' +
    '            </div>\n' +
    '            <p>Dear ' + adminEscapeHtml_(studentName || 'Candidate') + ',</p>\n' +
    '            <div class="subject-line">' + adminEscapeHtml_(subject) + '</div>\n' +
    '            <p>On behalf of the Institute of Postgraduate Studies (IPGS), Innovative University College (IUC), please be informed that your upcoming ' + adminEscapeHtml_(defenceType) + ' examination has been officially convened and scheduled as follows:</p>\n' +
    '            <table class="details-table">\n' +
    '              <tr><td class="details-label">Candidate Name:</td><td>' + adminEscapeHtml_(studentName || 'Candidate Name') + '</td></tr>\n' +
    '              <tr><td class="details-label">Degree Programme:</td><td>' + adminEscapeHtml_(programme || 'Postgraduate Programme') + '</td></tr>\n' +
    '              <tr><td class="details-label">Research Title:</td><td>' + adminEscapeHtml_(researchTitle || 'Research Title') + '</td></tr>\n' +
    '              <tr><td class="details-label">Examination Date:</td><td>' + adminEscapeHtml_(dateText) + '</td></tr>\n' +
    '              <tr><td class="details-label">Scheduled Time:</td><td>' + adminEscapeHtml_(timeText) + '</td></tr>\n' +
    '              <tr><td class="details-label">Venue / Platform:</td><td>' + adminEscapeHtml_(venuePlatformText) + '</td></tr>\n' +
    '              <tr><td class="details-label">Supervisory Team:</td><td>' + adminEscapeHtml_(data['Supervisor'] || 'â€”') + '</td></tr>\n' +
    '              <tr><td class="details-label">Chairperson:</td><td>' + adminEscapeHtml_(data['Chairperson'] || 'Appointed Chairperson') + '</td></tr>\n' +
    '              <tr><td class="details-label">Examiner 1:</td><td>' + adminEscapeHtml_(data['Examiner 1'] || 'Examiner 1') + ' (' + adminEscapeHtml_(ex1Role) + ')</td></tr>\n' +
    '              <tr><td class="details-label">Examiner 2:</td><td>' + adminEscapeHtml_(data['Examiner 2'] || 'Examiner 2') + ' (' + adminEscapeHtml_(ex2Role) + ')</td></tr>\n' +
    '            </table>\n' +
    '            <p style="font-weight:bold;margin-top:5px;margin-bottom:2px;">Important Examination Guidelines for Candidate:</p>\n' +
    '            <ol class="guidelines-list">\n' +
    '              <li><strong>Presentation Allocation:</strong> You are allocated approximately 20 to 30 minutes for your oral presentation, followed by question-and-answer deliberations with the Examination Panel.</li>\n' +
    '              <li><strong>Punctuality & Attendance:</strong> You are required to join the online video conference platform or report to the examination venue at least 15 minutes prior to the scheduled start time.</li>\n' +
    '              <li><strong>Equipment & Connectivity:</strong> Please ensure your presentation slides, microphone, video camera, and a stable internet connection are tested and verified beforehand.</li>\n' +
    '              <li><strong>Professional Attire:</strong> Candidates are expected to maintain formal business or academic attire throughout the examination session.</li>\n' +
    '              <li><strong>Panel Deliberation:</strong> Following the oral presentation and defense, you will be requested to temporarily excuse yourself while the Examination Panel conducts its private evaluation and determines the examination outcome.</li>\n' +
    '            </ol>\n' +
    '            <p>Should you require any clarification or encounter technical difficulties prior to the examination, kindly contact the Institute of Postgraduate Studies immediately via ' + adminEscapeHtml_(ADMIN_CONFIG.ALLOWED_ADMINS[0] || 'ipgs@innovative.edu.my') + '.</p>\n' +
    '            <p>We wish you every success in your postgraduate examination.</p>\n' +
    '            <div class="signatory-block">\n' +
    '              <p style="margin:4px 0 1px 0;font-style:italic;font-weight:bold;">&ldquo;Industry Driven University&rdquo;</p>\n' +
    '              <p style="margin:0 0 1px 0;">Best Regards,</p>\n' +
    '              <div class="signature-line">............................................................</div>\n' +
    '              <div style="font-weight:bold;text-transform:uppercase;color:#111111;">' + adminEscapeHtml_(signatory.name) + '</div>\n' +
    '              <div style="font-weight:600;color:#222222;">' + adminEscapeHtml_(signatory.title) + '</div>\n' +
    '              <div style="color:#333333;">' + adminEscapeHtml_(signatory.department) + '</div>\n' +
    '              <div style="color:#333333;">' + adminEscapeHtml_(signatory.institution) + '</div>\n' +
    '              <div style="margin-top:3px;color:#666666;font-size:7.5pt;font-style:italic;">*(This is a computer-generated document. No physical signature is required.)*</div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </td>\n' +
    '      </tr>\n' +
    '    </tbody>\n' +
    '  </table>\n' +
    '</body>\n' +
    '</html>';

  return html;
}

function adminGenerateCandidateInvitationLetterPdf_(record, data, studentFolder) {
  const html = adminGenerateCandidateInvitationLetterHtml_(data);
  const studentName = String(data['Student Name'] || 'Candidate').trim().replace(/[^a-zA-Z0-9_-]+/g, '_');
  const fileName = 'Examination_Notice_Letter_' + studentName + '.pdf';

  const blob = Utilities.newBlob(html, 'text/html', fileName).getAs('application/pdf');
  blob.setName(fileName);

  const folder = studentFolder || adminEnsureStudentFolder_(record, data);
  const existingFiles = folder.getFilesByName(fileName);
  while (existingFiles.hasNext()) {
    try {
      existingFiles.next().setTrashed(true);
    } catch (e) {
      console.warn('Could not trash existing candidate letter PDF: ' + e.message);
    }
  }
  const file = folder.createFile(blob);
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    console.warn('Could not set public view permission: ' + e.message);
  }

  return {
    file: file,
    url: file.getUrl(),
    blob: blob,
    fileName: fileName
  };
}

function adminResolveDraftLink_(data, record) {
  let draftLink = String(data['Student Draft Link'] || '').trim();
  let draftName = String(data['Draft File Name'] || '').trim();
  if (draftLink) return { link: draftLink, name: draftName };

  // 1. Search the student's Google Drive folder
  try {
    const folder = adminEnsureStudentFolder_(record, data);
    if (folder) {
      const files = folder.getFiles();
      const candidates = [];
      while (files.hasNext()) {
        const file = files.next();
        const name = file.getName();
        const lower = name.toLowerCase();
        // Ignore generated appointment letters, examiner report forms/results, outcome notices
        if (lower.indexOf('appointment') >= 0 ||
            lower.indexOf('examiner report') >= 0 ||
            lower.indexOf('form link') >= 0 ||
            lower.indexOf('outcome') >= 0 ||
            lower.indexOf('result') >= 0) {
          continue;
        }
        const isDraftNamed = lower.indexOf('draft') >= 0 || lower.indexOf('thesis') >= 0 || lower.indexOf('proposal') >= 0;
        const isDoc = /\.(pdf|docx?|odt)$/i.test(name);
        if (isDraftNamed || isDoc) {
          candidates.push({
            file: file,
            isDraftNamed: isDraftNamed,
            updated: file.getLastUpdated().getTime(),
            name: name,
            url: file.getUrl()
          });
        }
      }
      if (candidates.length > 0) {
        // Prioritize draft/thesis/proposal named files, then newest updated
        candidates.sort(function(a, b) {
          if (a.isDraftNamed !== b.isDraftNamed) return b.isDraftNamed ? -1 : 1;
          return b.updated - a.updated;
        });
        const chosen = candidates[0];
        draftLink = chosen.url;
        draftName = chosen.name;
        data['Student Draft Link'] = draftLink;
        data['Draft File Name'] = draftName;
        if (record && record.sheet && record.map) {
          if (record.map['Student Draft Link']) record.sheet.getRange(record.row, record.map['Student Draft Link']).setValue(draftLink);
          if (record.map['Draft File Name']) record.sheet.getRange(record.row, record.map['Draft File Name']).setValue(draftName);
          SpreadsheetApp.flush();
        }
        return { link: draftLink, name: draftName };
      }
    }
  } catch (e) {
    console.warn('Draft resolution from student folder failed: ' + e.message);
  }

  // 2. Search sibling cases for this student in the sheet
  try {
    const studentKey = String(data['Student Key'] || '').trim();
    const studentName = normaliseAdmin_(data['Student Name']);
    const sheet = record && record.sheet ? record.sheet : adminSheet_();
    const map = record && record.map ? record.map : adminHeaderMap_(sheet);
    const count = sheet.getLastRow() - ADMIN_CONFIG.HEADER_ROW;
    if (count > 0) {
      const rows = sheet.getRange(ADMIN_CONFIG.HEADER_ROW + 1, 1, count, sheet.getLastColumn()).getValues();
      for (let i = 0; i < rows.length; i++) {
        const rowData = adminCaseObject_(rows[i], map);
        if (rowData['Case ID'] === data['Case ID']) continue;
        const isSameStudent = (studentKey && rowData['Student Key'] === studentKey) ||
                              (studentName && normaliseAdmin_(rowData['Student Name']) === studentName);
        if (isSameStudent && String(rowData['Student Draft Link'] || '').trim()) {
          draftLink = String(rowData['Student Draft Link']).trim();
          draftName = String(rowData['Draft File Name'] || 'Student Draft').trim();
          data['Student Draft Link'] = draftLink;
          data['Draft File Name'] = draftName;
          if (record && record.sheet && record.map) {
            if (record.map['Student Draft Link']) record.sheet.getRange(record.row, record.map['Student Draft Link']).setValue(draftLink);
            if (record.map['Draft File Name']) record.sheet.getRange(record.row, record.map['Draft File Name']).setValue(draftName);
            SpreadsheetApp.flush();
          }
          return { link: draftLink, name: draftName };
        }
      }
    }
  } catch (e) {
    console.warn('Draft resolution from sibling cases failed: ' + e.message);
  }

  return { link: '', name: '' };
}

function adminRequireDraft_(data, record) {
  // Non-blocking: automatically resolve draft link if available, but never block scheduling or invitations
  try {
    if (record) adminResolveDraftLink_(data, record);
  } catch (e) {
    console.warn('Draft auto-resolution notice: ' + e.message);
  }
}

function adminPanelRecipients_(data, requireComplete) {
  const roles = [
    {name:data['Chairperson'], email:data['Chair Email'], role:'Chairperson'},
    {name:data['Examiner 1'], email:data['Examiner 1 Email'], role:data['Examiner 1 Role'] || 'Examiner 1'},
    {name:data['Examiner 2'], email:data['Examiner 2 Email'], role:data['Examiner 2 Role'] || 'Examiner 2'}
  ];
  if (requireComplete) roles.forEach(function(person) {
    adminRequired_(person.name, person.role + ' name');
    adminRequired_(person.email, person.role + ' email');
    adminValidateEmail_(person.email, person.role + ' email');
  });
  const grouped = {};
  roles.forEach(function(person) {
    const email = String(person.email || '').trim().toLowerCase();
    if (!email) return;
    if (!grouped[email]) grouped[email] = {name:String(person.name || '').trim(), email:email, roles:[]};
    if (grouped[email].roles.indexOf(person.role) === -1) grouped[email].roles.push(person.role);
  });
  return Object.keys(grouped).map(function(email) { return grouped[email]; });
}

function adminParseEmailList_(rawText) {
  if (!rawText) return [];
  const items = String(rawText).split(/[,;\n\r]+/);
  const result = [];
  const seen = {};
  items.forEach(function(item) {
    const email = String(item || '').trim().toLowerCase();
    if (!email) return;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (!seen[email]) {
        seen[email] = true;
        result.push(email);
      }
    }
  });
  return result;
}

function adminParseDateValue_(value) {
  if (!value) return null;
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value;
  }
  const s = String(value).trim();
  if (!s) return null;

  // 1. YYYY-MM-DD or YYYY/MM/DD
  let m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (m) {
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }

  // 2. DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
  if (m) {
    return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  }

  // 3. Fallback: standard Date parsing
  const parsed = new Date(s);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  return null;
}

function adminSessionDateTime_(dateValue, timeValue, label) {
  let parsedDate = adminParseDateValue_(dateValue);
  if (!parsedDate) {
    console.warn('Session date missing in ' + label + ', falling back to today.');
    parsedDate = new Date();
  }
  const isEnd = label && label.indexOf('end') >= 0;
  const timeText = String(timeValue || (isEnd ? '11:30 AM' : '10:00 AM')).trim();
  const timeParts = timeText.match(/^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i);
  let hour = isEnd ? 11 : 10;
  let minute = isEnd ? 30 : 0;
  if (timeParts) {
    hour = Number(timeParts[1]);
    minute = Number(timeParts[2]);
    const meridiem = String(timeParts[3] || '').toUpperCase();
    if (meridiem) {
      if (hour === 12) hour = 0;
      if (meridiem === 'PM') hour += 12;
    }
  }
  return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), hour, minute, 0, 0);
}

function adminReadableDate_(value) {
  const parsed = adminParseDateValue_(value);
  if (parsed) {
    return Utilities.formatDate(parsed, 'Asia/Kuala_Lumpur', 'EEEE, d MMMM yyyy');
  }
  return String(value || '');
}

function adminSessionDescription_(data) {
  return [
    data['Defence Type'],
    'Candidate: ' + data['Student Name'],
    'Research title: ' + data['Research Title'],
    'Chairperson: ' + data['Chairperson'],
    'Examiner 1: ' + data['Examiner 1'] + ' (' + data['Examiner 1 Role'] + ')',
    'Examiner 2: ' + data['Examiner 2'] + ' (' + data['Examiner 2 Role'] + ')',
    'Supervisor: ' + data['Supervisor'],
    data['Venue'] ? 'Venue: ' + data['Venue'] : '',
    data['Google Meet Link'] ? 'Video conference: ' + data['Google Meet Link'] : '',
    data['Student Draft Link'] ? 'Student draft: ' + data['Student Draft Link'] : ''
  ].filter(Boolean).join('\n');
}

function adminEscapeHtml_(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function adminAssert_() {
  const email = String(Session.getActiveUser().getEmail() || '').trim().toLowerCase();
  if (!email) throw new Error('Access denied. Sign in with an authorised Google account.');
  let allowed = ADMIN_CONFIG.ALLOWED_ADMINS.indexOf(email) !== -1;
  if (!allowed) {
    try {
      allowed = adminListDirectory_().some(function(person) {
        if (normaliseAdmin_(person.status) !== 'active' || !adminHasDirectoryRole_(person, 'Admin')) return false;
        return [person.primaryEmail, person.alternateEmail].some(function(address) { return normaliseAdmin_(address) === email; });
      });
    } catch (error) { console.error('Unable to check directory administrator access: ' + error.message); }
  }
  if (!allowed) throw new Error('Access denied. Your Google account is not authorised for this administration portal.');
  return email;
}

function adminSpreadsheet_() { return SpreadsheetApp.openById(ADMIN_CONFIG.SPREADSHEET_ID); }
function adminSheet_() {
  const sheet = adminSpreadsheet_().getSheetByName(ADMIN_CONFIG.CASE_SHEET);
  if (!sheet) throw new Error('Defence Cases sheet was not found.');
  return sheet;
}

function adminFindCase_(caseId) {
  const id = String(caseId || '').trim();
  if (!id) return null;
  const sheet = adminSheet_();
  const map = adminHeaderMap_(sheet);
  const count = sheet.getLastRow() - ADMIN_CONFIG.HEADER_ROW;
  if (count < 1) return null;
  const rows = sheet.getRange(ADMIN_CONFIG.HEADER_ROW + 1, 1, count, sheet.getLastColumn()).getDisplayValues();
  const matches = [];
  rows.forEach(function(values, i) { if (String(values[map['Case ID'] - 1]).trim() === id) matches.push({sheet:sheet,row:ADMIN_CONFIG.HEADER_ROW + 1 + i,values:values,map:map}); });
  if (matches.length > 1) throw new Error('Duplicate Case ID found: ' + id);
  return matches[0] || null;
}

function adminCaseObject_(values, map) {
  let recordObj = null;
  if (values && values.values && values.map) {
    recordObj = values;
    map = values.map;
    values = values.values;
  }
  if (!map) {
    try {
      map = adminHeaderMap_(adminSheet_());
    } catch (e) {
      console.warn('adminCaseObject_: Could not resolve adminHeaderMap_: ' + e.message);
    }
  }
  const obj = {};
  if (map) {
    Object.keys(map).forEach(function(h) {
      const col = map[h];
      let val = col ? String(values[col - 1] == null ? '' : values[col - 1]).trim() : '';
      if (!val && recordObj && recordObj.sheet && recordObj.row && col) {
        try {
          const raw = recordObj.sheet.getRange(recordObj.row, col).getValue();
          if (raw instanceof Date && !isNaN(raw.getTime())) {
            val = Utilities.formatDate(raw, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd');
          } else if (raw != null && String(raw).trim()) {
            val = String(raw).trim();
          }
        } catch (e) {}
      }
      obj[h] = val;
    });
  } else {
    ADMIN_HEADERS.forEach(function(h, i) {
      obj[h] = String(values[i] == null ? '' : values[i]).trim();
    });
  }

  // Ensure Session Date is formatted as YYYY-MM-DD if present
  if (obj['Session Date']) {
    const parsed = adminParseDateValue_(obj['Session Date']);
    if (parsed) {
      obj['Session Date'] = Utilities.formatDate(parsed, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd');
    }
  }

  return obj;
}

function adminCanonicalDirectoryRoles_(input) {
  const values = Array.isArray(input) ? input : String(input || '').split(/[,;|/]+/);
  const selected = {};
  values.forEach(function(item) {
    const value = normaliseAdmin_(item);
    if (!value) return;
    if (value.indexOf('supervisor') >= 0) selected.Supervisor = true;
    if (value.indexOf('admin') >= 0) selected.Admin = true;
    if (value.indexOf('panel') >= 0 || value.indexOf('chairperson') >= 0 || value.indexOf('examiner') >= 0) selected.Panel = true;
  });
  return ADMIN_DIRECTORY_ROLES.filter(function(role) { return selected[role]; });
}

function adminHasDirectoryRole_(personOrRole, targetRole) {
  const source = personOrRole && typeof personOrRole === 'object' ? (personOrRole.roles || personOrRole.role) : personOrRole;
  return adminCanonicalDirectoryRoles_(source).indexOf(targetRole) >= 0;
}

function adminListDirectory_() {
  const sheet = adminSpreadsheet_().getSheetByName(ADMIN_CONFIG.PANEL_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getDisplayValues()
    .filter(function(r) { return String(r[0]).trim(); })
    .map(function(r) {
      const roles = adminCanonicalDirectoryRoles_(r[1]);
      return {name:String(r[0]).trim(), role:roles.join(', ') || String(r[1]).trim(), roles:roles, primaryEmail:String(r[2]).trim(), alternateEmail:String(r[3]).trim(), status:String(r[4] || 'Active').trim()};
    });
}

function adminListPanels_() {
  return adminListDirectory_().filter(function(person) {
    return normaliseAdmin_(person.status) === 'active' && adminHasDirectoryRole_(person, 'Panel');
  }).map(function(person) {
    return {name:person.name, role:'Panel', email:person.primaryEmail || person.alternateEmail, alternateEmail:person.alternateEmail};
  });
}

function adminListSupervisors_() {
  return adminListDirectory_().filter(function(person) {
    return normaliseAdmin_(person.status) === 'active' && adminHasDirectoryRole_(person, 'Supervisor');
  }).map(function(person) {
    return {name:person.name, role:'Supervisor', email:person.primaryEmail || person.alternateEmail, alternateEmail:person.alternateEmail};
  });
}

function adminDirectoryResponse_(message) {
  return {ok:true, message:message, directory:adminListDirectory_(), panels:adminListPanels_(), supervisors:adminListSupervisors_()};
}

function adminOpenDirectoryReferences_(name) {
  const sheet = adminSheet_();
  const map = adminHeaderMap_(sheet);
  const count = sheet.getLastRow() - ADMIN_CONFIG.HEADER_ROW;
  if (count < 1) return [];
  const target = normaliseAdmin_(name);
  const closed = {passed:true,completed:true,cancelled:true,postponed:true};
  const found = [];
  sheet.getRange(ADMIN_CONFIG.HEADER_ROW + 1, 1, count, sheet.getLastColumn()).getDisplayValues().forEach(function(row) {
    const status = normaliseAdmin_(row[map['Session Status'] - 1]);
    if (closed[status]) return;
    const referenced = ['Chairperson','Examiner 1','Examiner 2','Supervisor'].some(function(header) {
      return normaliseAdmin_(row[map[header] - 1]) === target;
    });
    if (referenced) found.push(String(row[map['Case ID'] - 1] || row[map['Student Name'] - 1]));
  });
  return found;
}

function normaliseAdmin_(value) { return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase(); }

function adminGenerateCaseId_(defenceType, sessionDate, sheet, map) {
  const prefix = defenceType === 'Viva Voce' ? 'VV' : 'PD';
  let date = String(sessionDate || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) date = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd');
  const datePart = date.slice(0,4) + '-' + date.slice(5,7) + date.slice(8,10);
  const base = prefix + '-' + datePart + '-';
  const count = sheet.getLastRow() - ADMIN_CONFIG.HEADER_ROW;
  let max = 0;
  if (count > 0) sheet.getRange(ADMIN_CONFIG.HEADER_ROW + 1, map['Case ID'], count, 1).getDisplayValues().forEach(function(r) {
    const id = String(r[0]);
    if (id.indexOf(base) === 0) max = Math.max(max, Number(id.slice(base.length)) || 0);
  });
  const archive = adminSpreadsheet_().getSheetByName(ADMIN_CONFIG.DELETED_SHEET);
  if (archive && archive.getLastRow() > 1) {
    const archiveHeaders = archive.getRange(1, 1, 1, archive.getLastColumn()).getDisplayValues()[0];
    const archiveCaseIdColumn = archiveHeaders.indexOf('Case ID') + 1;
    if (archiveCaseIdColumn > 0) archive.getRange(2, archiveCaseIdColumn, archive.getLastRow() - 1, 1).getDisplayValues().forEach(function(r) {
      const id = String(r[0]);
      if (id.indexOf(base) === 0) max = Math.max(max, Number(id.slice(base.length)) || 0);
    });
  }
  return base + Utilities.formatString('%02d', max + 1);
}

function adminDate_(value, label) {
  const parsed = adminParseDateValue_(value);
  if (!parsed) throw new Error(label + ' must be a valid date.');
  return parsed;
}

function adminRequired_(value, label) { const text=String(value||'').trim(); if(!text) throw new Error(label + ' is required.'); return text; }
function adminValidateEmail_(value, label) { if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())) throw new Error(label + ' is not valid.'); }
function adminLog_(email, action, caseId, studentName, fields, result, details) {
  try {
    const sheet = adminSpreadsheet_().getSheetByName(ADMIN_CONFIG.LOG_SHEET);
    if (sheet) sheet.appendRow([new Date(),email,action,caseId,studentName,(fields||[]).join(', '),result,details||'']);
  } catch (e) { console.error('Audit log failed: ' + e.message); }
}


/* Progression model: one Student Master record, many defence-stage cases. */
function adminEnsureProgressionModel_(force) {
  const studentSheet=adminSpreadsheet_().getSheetByName(ADMIN_CONFIG.STUDENT_SHEET);
  if(!studentSheet) throw new Error('Student Master is missing. Restore or initialise it explicitly; automatic migration is disabled.');
  if(force) throw new Error('Automatic historical-data migration is disabled. Existing records are preserved.');
  return {students:Math.max(0,studentSheet.getLastRow()-1),cases:0};
}

function adminReportReceived_(data, slot) {
  const link = String(data[slot + ' Report Link'] || '').trim();
  const status = normaliseAdmin_(data[slot + ' Report Status']);
  const hasDirectLink = Boolean(link && /^https?:\/\//i.test(link));
  const isStatusSubmitted = ['submitted','received','uploaded','complete','completed','verified'].indexOf(status) >= 0;
  const isPendingStatus = ['pending','awaiting submission','not submitted','unsubmitted'].indexOf(status) >= 0;
  const isStatusPending = isPendingStatus;

  if (hasDirectLink && !isStatusPending) return true;
  if (isStatusSubmitted) return true;

  const panelReport = String(data['Examiner Report File'] || '').trim();
  if (panelReport) {
    if (/Examiner\s*[12]/i.test(panelReport)) {
      const regex = new RegExp(slot + ':[^\\r\\n]*?(https?:\\/\\/[^\\s\\r\\n]+)', 'i');
      const m = panelReport.match(regex);
      if (m && m[1]) return true;
    } else if (/^https?:\/\//i.test(panelReport) && !isStatusPending) {
      return true;
    }
  }
  return false;
}

function adminCaseCloseState_(data) {
  const m=wfModel_(data);
  const hasEx2 = Boolean(String(data['Examiner 2'] || data['Examiner 2 Email'] || '').trim());
  return {ready:m.closeReady,report1:adminReportReceived_(data,'Examiner 1'),
    report2:!hasEx2||adminReportReceived_(data,'Examiner 2'),
    outcomeEmail:normaliseAdmin_(data['Result Email Status'])==='sent'&&!!data['Result Email Sent At'],missing:m.closeMissing};
}

function adminEnsureCaseLifecycle_() {
  // Case status defaulting is already handled in memory by adminListCases_()
  return;
}

function setAdminCaseStatus(caseId,targetStatus,expectedRevision) {
  const actor=adminAssert_(),lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    const record=adminFindCase_(caseId);
    if(!record) throw new Error('Case no longer exists.');
    wfAssertRevision_(record,expectedRevision);
    const d=wfRaw_(record),m=wfModel_(d),target=String(targetStatus||'').trim();
    if(['Active','Closed'].indexOf(target)<0) throw new Error('Select Active or Closed.');
    if(target==='Closed'&&!m.closeReady) throw new Error('Cannot close: '+m.closeMissing.join(', ')+'.');
    if(!record.map['Case Status']||!record.map['Submission Enabled']) throw new Error('Required lifecycle columns are missing. No changes saved.');
    if(d['Case Status']!==target) {
      wfAppend_(WF_EVENT_SHEET,d['Case ID'],d['Student Key'],target==='Closed'?'CLOSED':'REOPENED',actor,{evidence:m.evidence,previousStatus:d['Case Status']});
      record.sheet.getRange(record.row,record.map['Case Status']).setValue(target);
      record.sheet.getRange(record.row,record.map['Submission Enabled']).setValue(target==='Closed'?'No':'Yes');
      SpreadsheetApp.flush();
    }
    return adminWorkflowResponse_(caseId,target==='Closed'?'Stage closed. Verification evidence preserved.':'Stage reopened. New verification is required before closure.');
  } finally {lock.releaseLock();}
}

function normaliseHeaderKey_(h) {
  return String(h || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function adminHeaderMap_(sheet) {
  let lastColumn = Math.max(1, sheet.getLastColumn());
  let headers = sheet.getRange(ADMIN_CONFIG.HEADER_ROW, 1, 1, lastColumn).getDisplayValues()[0];
  const map = {};
  const normMap = {};

  headers.forEach(function(h, i) {
    const raw = String(h || '').trim();
    if (!raw) return;
    map[raw] = i + 1;
    const norm = normaliseHeaderKey_(raw);
    if (!normMap[norm]) normMap[norm] = i + 1;
  });

  const aliases = {
    'studentemail': ['student_email', 'candidateemail', 'email', 'emailaddress', 'studentemailaddress'],
    'sessiondate': ['date', 'defencedate', 'session_date', 'sessionday'],
    'starttime': ['start_time', 'time', 'sessiontime'],
    'endtime': ['end_time'],
    'googlemeetlink': ['meetinglink', 'meetlink', 'videolink', 'link', 'meet'],
    'studentdraftlink': ['draftlink', 'thesistlink', 'proposallink', 'drafturl'],
    'draftfilename': ['draftname', 'filename'],
    'studentfolderid': ['folderid', 'drivefolderid'],
    'additionalinvitees': ['cc', 'ccemails', 'additionalemails', 'invitees', 'extraemails', 'additional_invitees']
  };

  ADMIN_HEADERS.forEach(function(header) {
    if (map[header]) return;
    const norm = normaliseHeaderKey_(header);
    if (normMap[norm]) {
      map[header] = normMap[norm];
      return;
    }
    if (aliases[norm]) {
      for (let a = 0; a < aliases[norm].length; a++) {
        const aliasNorm = aliases[norm][a];
        if (normMap[aliasNorm]) {
          map[header] = normMap[aliasNorm];
          return;
        }
      }
    }

    throw new Error('Required column '+header+' is missing. Use the explicit schema setup after making a backup. No columns were changed.');
  });

  return map;
}

function adminNextStudentNumber_(sheet) {
  let max = 0;
  if (sheet.getLastRow()>1) sheet.getRange(2,1,sheet.getLastRow()-1,1).getDisplayValues().forEach(function(row){ const m=String(row[0]).match(/^STU-(\d+)$/); if(m) max=Math.max(max,Number(m[1])||0); });
  return max+1;
}

function adminStudentCompletionStatus_(rows,map,studentKey,nameKey) {
  return rows.some(function(row){
    if(String(row[map['Student Key']-1]||'').trim()!==studentKey) return false;
    const d={};Object.keys(map).forEach(function(h){d[h]=row[map[h]-1]||'';});
    return d['Defence Type']==='Viva Voce'&&wfModel_(d).programmeComplete;
  })?'Completed':'Active';
}

function adminStudentSheet_(){
  const sheet=adminSpreadsheet_().getSheetByName(ADMIN_CONFIG.STUDENT_SHEET);
  if(!sheet) throw new Error('Student Master sheet was not found. Run the progression setup first.');
  return sheet;
}

function adminStudentRows_(){
  const sheet=adminStudentSheet_();
  if(sheet.getLastRow()<2) return [];
  return sheet.getRange(2,1,sheet.getLastRow()-1,ADMIN_STUDENT_HEADERS.length).getDisplayValues().map(function(row,index){const data={row:index+2};ADMIN_STUDENT_HEADERS.forEach(function(h,i){data[h]=String(row[i]||'').trim();});return data;}).filter(function(data){return Boolean(data['Student Key']||data['Student Name']);});
}

function adminFindStudent_(studentKey){
  const key=String(studentKey||'').trim();
  if(!key) return null;
  const nKey=normaliseAdmin_(key);
  return adminStudentRows_().find(function(student){
    return (student['Student Key'] && student['Student Key'] === key) ||
           (student['Student Key'] && normaliseAdmin_(student['Student Key']) === nKey) ||
           (student['Student Name'] && normaliseAdmin_(student['Student Name']) === nKey) ||
           (student['Student Email'] && normaliseAdmin_(student['Student Email']) === nKey);
  })||null;
}

function adminListCases_() {
  const sheet=adminSheet_(),map=adminHeaderMap_(sheet),count=sheet.getLastRow()-ADMIN_CONFIG.HEADER_ROW;
  if(count<1) return [];
  return sheet.getRange(ADMIN_CONFIG.HEADER_ROW+1,1,count,sheet.getLastColumn()).getDisplayValues().filter(function(row){return String(row[map['Case ID']-1]||row[map['Student Name']-1]).trim();}).map(function(row){const raw={};Object.keys(map).forEach(function(h){raw[h]=row[map[h]-1]||'';});return {
    workflow:wfModel_(raw),
    caseId:String(row[map['Case ID']-1]||'').trim(),studentKey:String(row[map['Student Key']-1]||'').trim(),studentName:String(row[map['Student Name']-1]||'').trim(),progressionRoute:String(row[map['Progression Route']-1]||'').trim(),defenceType:String(row[map['Defence Type']-1]||'').trim(),stageAttempt:String(row[map['Stage Attempt']-1]||'1').trim(),sessionDate:String(row[map['Session Date']-1]||'').trim(),sessionStatus:String(row[map['Session Status']-1]||'').trim(),resultStatus:String(row[map['Result Status']-1]||'').trim(),resultScale:String(row[map['Result Scale']-1]||'').trim(),submissionEnabled:String(row[map['Submission Enabled']-1]||'').trim(),caseStatus:String(row[map['Case Status']-1]||'Active').trim(),hasDraft:Boolean(String(row[map['Student Draft Link']-1]||'').trim()),
    hasReport1:adminReportReceived_(raw,'Examiner 1'),
    hasReport2:adminReportReceived_(raw,'Examiner 2'),
    outcomeEmailSent:normaliseAdmin_(row[map['Result Email Status']-1])==='sent'&&Boolean(String(row[map['Result Email Sent At']-1]||'').trim()),
    programme:String(row[map['Programme']-1]||'').trim(),
    supervisor:String(row[map['Supervisor']-1]||'').trim(),
    chairperson:String(row[map['Chairperson']-1]||'').trim(),
    examiner1:String(row[map['Examiner 1']-1]||'').trim(),
    examiner2:String(row[map['Examiner 2']-1]||'').trim(),
    calendarStatus:String(row[map['Calendar Invitation Status']-1]||'').trim(),
    correctionsDeadline:String(row[map['Corrections Deadline']-1]||'').trim(),
    finalSubmissionStatus:String(row[map['Final Submission Status']-1]||'').trim(),
    endorsementStatus:String(row[map['Endorsement Status']-1]||'').trim(),
    finalThesisLink:String(row[map['Final Thesis Link']-1]||'').trim(),
    startTime:String(row[map['Start Time']-1]||'').trim(),
    endTime:String(row[map['End Time']-1]||'').trim(),
    venue:String(row[map['Venue']-1]||'').trim(),
    googleMeetLink:String(row[map['Google Meet Link']-1]||'').trim(),
    meetingPlatform:String(row[map['Meeting Platform']-1]||'').trim(),
    researchTitle:String(row[map['Research Title']-1]||'').trim(),
    studentEmail:String(row[map['Student Email']-1]||'').trim(),
    candidateNoticeLetterLink:String(row[map['Candidate Notice Letter Link']-1]||'').trim(),
    candidateNoticeSentAt:String(row[map['Candidate Notice Sent At']-1]||'').trim(),
    chairAppointmentLetterLink:String(row[map['Chair Appointment Letter Link']-1]||'').trim(),
    examiner1AppointmentLetterLink:String(row[map['Examiner 1 Appointment Letter Link']-1]||'').trim(),
    examiner2AppointmentLetterLink:String(row[map['Examiner 2 Appointment Letter Link']-1]||'').trim(),
    invitationEmailSentAt:String(row[map['Invitation Email Sent At']-1]||'').trim(),
    resultConfirmationLetterLink:String(row[map['Result Confirmation Letter Link']-1]||'').trim(),
    resultEmailSentAt:String(row[map['Result Email Sent At']-1]||'').trim(),
    chairEmail:String(row[map['Chair Email']-1]||'').trim(),
    examiner1Email:String(row[map['Examiner 1 Email']-1]||'').trim(),
    examiner2Email:String(row[map['Examiner 2 Email']-1]||'').trim(),
    examiner1Role:String(row[map['Examiner 1 Role']-1]||'').trim(),
    examiner2Role:String(row[map['Examiner 2 Role']-1]||'').trim(),
    studentFolderId:String(row[map['Student Folder ID']-1]||'').trim(),
    studentFolderUrl:row[map['Student Folder ID']-1]?('https://drive.google.com/drive/folders/'+String(row[map['Student Folder ID']-1]).trim()):''
  };}).sort(function(a,b){return a.studentName.localeCompare(b.studentName)||a.defenceType.localeCompare(b.defenceType)||Number(a.stageAttempt)-Number(b.stageAttempt);});
}

function adminListStudents_(preloadedCases){
  const cases = preloadedCases || adminListCases_();
  return adminStudentRows_().map(function(student){
    const sKey = student['Student Key'];
    const sName = normaliseAdmin_(student['Student Name']);
    const stages = cases.filter(function(item){
      return (sKey && item.studentKey === sKey) || (!item.studentKey && normaliseAdmin_(item.studentName) === sName);
    });
    const open = stages.filter(function(item){ return normaliseAdmin_(item.caseStatus) !== 'closed'; });
    const closed = stages.filter(function(item){ return normaliseAdmin_(item.caseStatus) === 'closed'; });
    const active = (open.length ? open : stages).slice(-1)[0] || null;

    let currentStage = 'Registered';
    let milestoneKey = 'enrolled';

    if (open.length > 0) {
      const topOpen = open[open.length - 1];
      const att = Number(topOpen.stageAttempt || '1');
      const attSuffix = att > 1 ? (' (Attempt ' + att + ')') : '';
      currentStage = topOpen.defenceType + attSuffix;
      milestoneKey = topOpen.defenceType === 'Viva Voce' ? 'viva' : 'proposal';
    } else if (closed.length > 0) {
      const lastClosed = closed[closed.length - 1];
      const lastScale = String(lastClosed.resultScale || '').trim();
      const lastStatus = normaliseAdmin_(lastClosed.resultStatus);
      const isReexam = lastScale === 'Scale 4' || lastStatus === 're-examination' || lastStatus === 're examination';
      const isFail = lastScale === 'Scale 5' || lastStatus === 'fail' || lastStatus === 'failed';
      const isPass = !isReexam && !isFail && (['Scale 1','Scale 2','Scale 3'].indexOf(lastScale) >= 0 || ['pass','passed','conditional pass with minor corrections','conditional pass with major corrections'].indexOf(lastStatus) >= 0 || (lastClosed.workflow && lastClosed.workflow.decision && lastClosed.workflow.decision.pass));

      if (isReexam) {
        currentStage = lastClosed.defenceType + ' (Re-examination Pending)';
        milestoneKey = 'reexam_pending';
      } else if (isFail) {
        currentStage = lastClosed.defenceType + ' (Did Not Pass)';
        milestoneKey = 'failed';
      } else if (lastClosed.defenceType === 'Proposal Defence' && isPass) {
        const vn = lastClosed.workflow ? lastClosed.workflow.vivaNotice : null;
        if (vn && vn.status === 'Approved') {
          currentStage = 'Ready for Viva (Notice Approved)';
          milestoneKey = 'ready_for_viva';
        } else if (vn && vn.status === 'Pending') {
          currentStage = 'Viva Notice Submitted';
          milestoneKey = 'viva_notice';
        } else {
          currentStage = 'Research On Going';
          milestoneKey = 'research_ongoing';
        }
      } else if (lastClosed.defenceType === 'Viva Voce' && isPass) {
        if (lastClosed.workflow && lastClosed.workflow.programmeComplete) {
          currentStage = 'Programme Completed';
          milestoneKey = 'completed';
        } else {
          currentStage = 'Senate Clearance / Deposit Pending';
          milestoneKey = 'clearance';
        }
      } else {
        currentStage = lastClosed.defenceType + ' (Closed)';
        milestoneKey = 'closed';
      }
    } else {
      if (student['Progression Route'] === 'Transfer') {
        currentStage = 'Transfer (Direct to Viva)';
        milestoneKey = 'transfer_enrolled';
      } else {
        currentStage = 'Registered (Awaiting PD Notice)';
        milestoneKey = 'enrolled';
      }
    }

    return {
      studentKey: sKey,
      studentName: student['Student Name'],
      studentEmail: student['Student Email'],
      programme: student['Programme'],
      researchTitle: student['Research Title'],
      supervisor: student['Supervisor'],
      progressionRoute: student['Progression Route'] || 'Custom',
      studentStatus: student['Student Status'] || 'Active',
      activeCaseId: active ? active.caseId : '',
      currentStage: currentStage,
      milestoneKey: milestoneKey,
      stages: stages
    };
  }).sort(function(a,b){return a.studentName.localeCompare(b.studentName);});
}

function getAdminBootstrap(){
  const email=adminAssert_();
  // Single-pass reads: cases read once, directory read once
  const cases = adminListCases_();
  const students = adminListStudents_(cases);
  const directory = adminListDirectory_();
  const panels = directory.filter(function(person) {
    return normaliseAdmin_(person.status) === 'active' && adminHasDirectoryRole_(person, 'Panel');
  }).map(function(person) {
    return {name:person.name, role:'Panel', email:person.primaryEmail || person.alternateEmail, alternateEmail:person.alternateEmail};
  });
  const supervisors = directory.filter(function(person) {
    return normaliseAdmin_(person.status) === 'active' && adminHasDirectoryRole_(person, 'Supervisor');
  }).map(function(person) {
    return {name:person.name, role:'Supervisor', email:person.primaryEmail || person.alternateEmail, alternateEmail:person.alternateEmail};
  });

  return {
    ok: true,
    adminEmail: email,
    portalUrls: {
      examinerPortal: ADMIN_CONFIG.PANEL_PORTAL_URL,
      studentPortal: 'https://script.google.com/a/innovative.edu.my/macros/s/AKfycbz46JF_uQ9yTLntM0bBTqzReywsKjVyM7yFthupgAS7StthHMviR3mI0ZgXC-U7COZq_A/exec',
      masterDriveFolder: 'https://drive.google.com/drive/folders/' + ADMIN_CONFIG.ROOT_FOLDER_ID
    },
    cases: cases,
    students: students,
    panels: panels,
    supervisors: supervisors,
    directory: directory,
    emailTemplates: adminGetEmailTemplatesCached_(),
    emailSenders: adminGetEmailSendersCached_(),
    senderDiagnostics: adminGetSenderDiagnostics_(),
    signatory: adminGetSignatoryCached_(),
    officialForms: (typeof getOrSetupOfficialFormsFolder_ === 'function' ? getOrSetupOfficialFormsFolder_() : null),
    options: {
      defenceType: ['Proposal Defence','Viva Voce'],
      progressionRoute: ['Standard','Transfer','Custom'],
      sessionStatus: ['Registered','Draft Submitted','Scheduled','Completed','Passed','Cancelled','Postponed'],
      resultScale: ['Not recorded','Scale 1','Scale 2','Scale 3','Scale 4','Scale 5'],
      resultEmailStatus: ['Not prepared','Prepared â€“ unsent','Ready to Send','Sent','Error','Resend Approved'],
      finalSubmissionStatus: ['Pending result details','Pending final submission','Corrections in progress','Submitted','Under verification','Endorsed','Completed'],
      endorsementStatus: ['Not recorded','Not required','Pending','Endorsed','Rejected / revise'],
      invitationEmailStatus: ['Not prepared','Drafted â€“ unsent','Drafted â€“ institutional send not confirmed','Ready to Send','Sent','Error','Resend Approved'],
      calendarStatus: ['Not scheduled','Scheduled â€“ invitation send not verified','Invitations sent','Updated','Cancelled'],
      submissionEnabled: ['No','Yes'],
      directoryRole: ADMIN_DIRECTORY_ROLES,
      directoryStatus: ['Active','Inactive']
    }
  };
}

function adminResetDeliberation(caseId) {
  const adminEmail = adminAssert_();
  if (!caseId) throw new Error('Case ID is required.');
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('Case not found: ' + caseId);

  if(wfNorm_(wfRaw_(record)['Case Status'])==='closed')throw new Error('Reopen the stage explicitly before resetting its outcome.');
  const sheet = record.sheet;
  const row = record.row;
  const map = record.map;

  if (map['Session Status']) sheet.getRange(row, map['Session Status']).setValue('Scheduled');
  if (map['Result Scale']) sheet.getRange(row, map['Result Scale']).setValue('Not recorded');
  if (map['Result Status']) sheet.getRange(row, map['Result Status']).setValue('');
  if (map['Corrections Deadline']) sheet.getRange(row, map['Corrections Deadline']).setValue('');
  if (map['Final Submission Due']) sheet.getRange(row, map['Final Submission Due']).setValue('');
  if (map['Result Email Status']) sheet.getRange(row, map['Result Email Status']).setValue('Not prepared');
  SpreadsheetApp.flush();

  const data = adminCaseObject_(record);
  adminLog_(adminEmail, 'Reset deliberation outcome to Pending', caseId, data['Student Name'], ['Session Status', 'Result Scale', 'Result Status', 'Corrections Deadline'], 'Success', 'Deliberation reset to Pending.');

  const refreshed = adminFindCase_(caseId);
  const refreshedData = refreshed ? adminCaseObject_(refreshed) : data;
  if (refreshed) {
    refreshedData._revision = wfRevision_(refreshed);
    refreshedData._workflow = wfModel_(wfRaw_(refreshed));
  }
  return {
    ok: true,
    message: 'Deliberation outcome for ' + (data['Student Name'] || caseId) + ' has been reset to Pending.',
    caseData: refreshedData,
    cases: adminListCases_(),
    students: adminListStudents_()
  };
}

function saveAdminCaseLocked_(payload){
  adminAssert_();
  adminEnsureProgressionModel_();
  if(!payload||!payload.values) throw new Error('No case data was received.');
  const values=payload.values;
  const isNew=!String(payload.originalCaseId||'').trim();
  let route=String(values['Progression Route']||'').trim();
  if(isNew){
    if(['Standard','Transfer','Custom'].indexOf(route)<0) throw new Error('Select the student progression route.');
    if(route==='Standard') values['Defence Type']='Proposal Defence';
    if(route==='Transfer') values['Defence Type']='Viva Voce';
    if(route==='Custom'&&['Proposal Defence','Viva Voce'].indexOf(String(values['Defence Type']||''))<0) throw new Error('Select the initial defence type for the custom route.');
    const duplicate=adminStudentRows_().find(function(student){return normaliseAdmin_(student['Student Name'])===normaliseAdmin_(values['Student Name']);});
    if(duplicate) throw new Error('This student is already registered. Open the existing student profile instead.');
    values['Student Key']='STU-'+String(adminNextStudentNumber_(adminStudentSheet_())).padStart(5,'0');
    values['Stage Attempt']='1';
  } else {
    const record=adminFindCase_(payload.originalCaseId);
    if(!record) throw new Error('This defence case no longer exists. Refresh before saving.');
    const current=adminCaseObject_(record);
    if(values['Defence Type']&&values['Defence Type']!==current['Defence Type'])throw new Error('Existing attempts cannot be converted to another defence type. Open a separate approved stage.');
    if(route&&route!==current['Progression Route'])throw new Error('Use the explicit progression-route action.');
    values['Student Key']=current['Student Key'];
    values['Stage Attempt']=current['Stage Attempt']||'1';
    if(!route) route=current['Progression Route']||'Custom';
    values['Progression Route']=route;
  }
  const result=saveAdminCaseLegacy_(payload,true);
  let saved=adminFindCase_(result.caseId);
  if(saved){const savedData=adminCaseObject_(saved);if(!String(savedData['Case Status']||'').trim()){saved.sheet.getRange(saved.row,saved.map['Case Status']).setValue('Active');SpreadsheetApp.flush();}}
  adminEnsureCaseLifecycle_();
  saved=adminFindCase_(result.caseId);
  if(saved) adminUpsertStudentFromCase_(adminCaseObject_(saved));
  result.cases=adminListCases_();
  result.students=adminListStudents_();
  return result;
}

function bulkRegisterAdminStudents(records, options) {
  const adminEmail = adminAssert_();
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error('No candidate records were provided for bulk registration.');
  }
  options = options || {};
  const skipDuplicates = options.skipDuplicates !== false;

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    adminEnsureProgressionModel_();
    const caseSheet = adminSheet_();
    const caseMap = adminHeaderMap_(caseSheet);
    const studentSheet = adminStudentSheet_();

    // Map existing students by normalized name and normalized email
    const existingStudents = adminStudentRows_();
    const existingNames = {};
    const existingEmails = {};
    existingStudents.forEach(function(s) {
      const n = normaliseAdmin_(s['Student Name']);
      const e = normaliseAdmin_(s['Student Email']);
      if (n) existingNames[n] = true;
      if (e) existingEmails[e] = true;
    });

    let nextStudentNum = adminNextStudentNumber_(studentSheet);

    // Prepare case ID generator state
    const todayDate = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd');
    const datePart = todayDate.slice(0, 4) + '-' + todayDate.slice(5, 7) + todayDate.slice(8, 10);

    // Find highest existing sequence for PD and VV for today
    const caseCount = Math.max(0, caseSheet.getLastRow() - ADMIN_CONFIG.HEADER_ROW);
    const existingCaseIds = caseCount > 0 ? caseSheet.getRange(ADMIN_CONFIG.HEADER_ROW + 1, caseMap['Case ID'], caseCount, 1).getDisplayValues() : [];

    let maxPd = 0;
    let maxVv = 0;
    const pdBase = 'PD-' + datePart + '-';
    const vvBase = 'VV-' + datePart + '-';

    existingCaseIds.forEach(function(r) {
      const id = String(r[0] || '');
      if (id.indexOf(pdBase) === 0) maxPd = Math.max(maxPd, Number(id.slice(pdBase.length)) || 0);
      if (id.indexOf(vvBase) === 0) maxVv = Math.max(maxVv, Number(id.slice(vvBase.length)) || 0);
    });

    // Also check archive for case ID maxes
    const archive = adminSpreadsheet_().getSheetByName(ADMIN_CONFIG.DELETED_SHEET);
    if (archive && archive.getLastRow() > 1) {
      const archiveHeaders = archive.getRange(1, 1, 1, archive.getLastColumn()).getDisplayValues()[0];
      const archiveCaseIdCol = archiveHeaders.indexOf('Case ID') + 1;
      if (archiveCaseIdCol > 0) {
        archive.getRange(2, archiveCaseIdCol, archive.getLastRow() - 1, 1).getDisplayValues().forEach(function(r) {
          const id = String(r[0] || '');
          if (id.indexOf(pdBase) === 0) maxPd = Math.max(maxPd, Number(id.slice(pdBase.length)) || 0);
          if (id.indexOf(vvBase) === 0) maxVv = Math.max(maxVv, Number(id.slice(vvBase.length)) || 0);
        });
      }
    }

    const now = new Date();
    const newStudentRows = [];
    const newCaseRows = [];
    const registeredStudents = [];
    let skippedCount = 0;

    records.forEach(function(rec) {
      const name = String(rec['Student Name'] || rec.studentName || '').trim();
      const email = String(rec['Student Email'] || rec.studentEmail || '').trim().toLowerCase();
      const programme = String(rec['Programme'] || rec.programme || '').trim();
      let researchTitle = String(rec['Research Title'] || rec.researchTitle || '').trim();
      if (!researchTitle) researchTitle = 'Pending Title Submission';
      const supervisor = String(rec['Supervisor'] || rec.supervisor || '').trim();
      const supervisorEmail = String(rec['Supervisor Email'] || rec.supervisorEmail || '').trim().toLowerCase();
      let route = String(rec['Progression Route'] || rec.progressionRoute || 'Standard').trim();
      if (['Standard', 'Transfer', 'Custom'].indexOf(route) < 0) route = 'Standard';

      if (!name || !email || !programme) {
        throw new Error('Candidate Name, Email, and Programme are required for all students.');
      }
      adminValidateEmail_(email, 'Student Email (' + name + ')');
      if (supervisorEmail) adminValidateEmail_(supervisorEmail, 'Supervisor Email (' + supervisor + ')');

      const normName = normaliseAdmin_(name);
      const normEmail = normaliseAdmin_(email);

      if (existingNames[normName] || existingEmails[normEmail]) {
        if (skipDuplicates) {
          skippedCount++;
          return;
        } else {
          throw new Error('Student "' + name + '" (' + email + ') is already registered.');
        }
      }

      // Mark as seen to avoid intra-batch duplicates
      existingNames[normName] = true;
      existingEmails[normEmail] = true;

      const studentKey = 'STU-' + String(nextStudentNum++).padStart(5, '0');
      const defenceType = (route === 'Transfer') ? 'Viva Voce' : (rec['Defence Type'] || rec.defenceType || 'Proposal Defence');

      let caseSeq;
      let caseId;
      if (defenceType === 'Viva Voce') {
        caseSeq = ++maxVv;
        caseId = vvBase + Utilities.formatString('%02d', caseSeq);
      } else {
        caseSeq = ++maxPd;
        caseId = pdBase + Utilities.formatString('%02d', caseSeq);
      }

      // 1. Student Master Row:
      // ['Student Key','Student Name','Student Email','Programme','Research Title','Supervisor','Supervisor Email','Progression Route','Student Status','Student Folder ID','Registered At','Updated At']
      newStudentRows.push([
        studentKey,
        name,
        email,
        programme,
        researchTitle,
        supervisor,
        supervisorEmail,
        route,
        'Active',
        '',
        now,
        now
      ]);

      // 2. Defence Case Row
      const caseRow = new Array(caseSheet.getLastColumn()).fill('');
      const caseObj = {
        'Case ID': caseId,
        'Student Key': studentKey,
        'Student Name': name,
        'Student Email': email,
        'Programme': programme,
        'Defence Type': defenceType,
        'Research Title': researchTitle,
        'Supervisor': supervisor,
        'Supervisor Email': supervisorEmail,
        'Progression Route': route,
        'Stage Attempt': '1',
        'Case Status': 'Active',
        'Session Status': 'Registered',
        'Submission Enabled': 'Yes',
        'Result Scale': 'Not recorded',
        'Result Status': '',
        'Result Email Status': 'Not prepared',
        'Final Submission Status': 'Pending result details',
        'Endorsement Status': 'Not recorded',
        'Invitation Email Status': 'Not prepared',
        'Calendar Invitation Status': 'Not scheduled',
        'Candidate Notice Status': 'Not prepared',
        'Notes': 'Registered via bulk student registration.'
      };

      Object.keys(caseObj).forEach(function(header) {
        const col = caseMap[header];
        if (col && col <= caseRow.length) {
          caseRow[col - 1] = caseObj[header];
        }
      });

      newCaseRows.push(caseRow);
      registeredStudents.push({ studentKey: studentKey, studentName: name, caseId: caseId });
    });

    if (newStudentRows.length === 0) {
      return {
        ok: true,
        registeredCount: 0,
        skippedCount: skippedCount,
        message: 'No new students registered' + (skippedCount ? ' (' + skippedCount + ' duplicate(s) were skipped).' : '.'),
        cases: adminListCases_(),
        students: adminListStudents_()
      };
    }

    // Write to Student Master
    const studentLastRow = studentSheet.getLastRow();
    if (studentLastRow + newStudentRows.length > studentSheet.getMaxRows()) {
      studentSheet.insertRowsAfter(studentSheet.getMaxRows(), newStudentRows.length + 20);
    }
    studentSheet.getRange(studentLastRow + 1, 1, newStudentRows.length, ADMIN_STUDENT_HEADERS.length).setValues(newStudentRows);

    // Write to Defence Cases
    const caseLastRow = caseSheet.getLastRow();
    if (caseLastRow + newCaseRows.length > caseSheet.getMaxRows()) {
      caseSheet.insertRowsAfter(caseSheet.getMaxRows(), newCaseRows.length + 20);
    }
    caseSheet.getRange(caseLastRow + 1, 1, newCaseRows.length, caseSheet.getLastColumn()).setValues(newCaseRows);

    SpreadsheetApp.flush();
    adminEnsureCaseLifecycle_();

    registeredStudents.forEach(function(s){wfAppend_(WF_EVENT_SHEET,s.caseId,s.studentKey,'REGISTERED',adminEmail,{source:'bulk registration'});});

    const logSummary = 'Bulk registered ' + newStudentRows.length + ' student(s)' + (skippedCount ? ' (skipped ' + skippedCount + ' duplicates)' : '') + ': ' + registeredStudents.map(function(s) { return s.studentName + ' (' + s.studentKey + ')'; }).join(', ');
    adminLog_(adminEmail, 'Bulk registered students', '', '', [], 'Success', logSummary);

    return {
      ok: true,
      registeredCount: newStudentRows.length,
      skippedCount: skippedCount,
      message: 'Successfully registered ' + newStudentRows.length + ' student(s)' + (skippedCount ? ' (' + skippedCount + ' duplicate(s) skipped)' : '') + '.',
      cases: adminListCases_(),
      students: adminListStudents_()
    };
  } catch (err) {
    adminLog_(adminEmail, 'Bulk registration failed', '', '', [], 'Error', err.message || String(err));
    throw err;
  } finally {
    lock.releaseLock();
  }
}

function adminUpsertStudentFromCase_(data){
  const sheet=adminStudentSheet_();
  const key=String(data['Student Key']||'').trim();
  if(!key) return;
  const rows=adminStudentRows_();
  const existing=rows.find(function(student){return student['Student Key']===key;});
  const registered=existing&&existing['Registered At']?existing['Registered At']:new Date();
  const folder=String(data['Student Folder ID']||'').trim()||(existing?existing['Student Folder ID']:'');
  const values=[key,data['Student Name'],data['Student Email'],data['Programme'],data['Research Title'],data['Supervisor'],data['Supervisor Email'],data['Progression Route']||'Custom',existing?existing['Student Status']:'Active',folder,registered,new Date()];
  if(existing) sheet.getRange(existing.row,1,1,values.length).setValues([values]); else sheet.appendRow(values);
}

function adminStudentHeaderMap_(sheet) {
  const lastCol = Math.max(1, sheet.getLastColumn());
  const headers = sheet.getRange(1, 1, 1, lastCol).getDisplayValues()[0];
  const map = {};
  headers.forEach(function(h, i) {
    const raw = String(h || '').trim();
    if (raw) map[raw] = i + 1;
  });
  ADMIN_STUDENT_HEADERS.forEach(function(h, i) {
    if (!map[h]) map[h] = i + 1;
  });
  return map;
}

function updateStudentProgressionRoute(studentKey, newRoute, options) {
  const adminEmail = adminAssert_();
  adminEnsureProgressionModel_();

  const cleanKey = String(studentKey || '').trim();
  const cleanRoute = String(newRoute || '').trim();
  if (!cleanKey) throw new Error('Student Key is required.');
  if (['Standard', 'Transfer', 'Custom'].indexOf(cleanRoute) === -1) {
    throw new Error('Select a valid progression route (Standard, Transfer, or Custom).');
  }
  options = options || {};
  if(options.updateActiveStage)throw new Error('Existing defence attempts are preserved. Change the future route without converting the active stage.');

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const studentSheet = adminStudentSheet_();
    const studentMap = adminStudentHeaderMap_(studentSheet);
    const studentRows = adminStudentRows_();
    const student = studentRows.find(function(s) { return s['Student Key'] === cleanKey; });
    if (!student) throw new Error('Student Master record not found for ' + cleanKey);

    const oldRoute = String(student['Progression Route'] || 'Custom').trim();

    const studentRouteCol = studentMap['Progression Route'] || (ADMIN_STUDENT_HEADERS.indexOf('Progression Route') + 1);
    const studentUpdatedCol = studentMap['Updated At'] || (ADMIN_STUDENT_HEADERS.indexOf('Updated At') + 1);

    // 1. Update Student Master row safely
    if (student.row && studentRouteCol) {
      studentSheet.getRange(student.row, studentRouteCol).setValue(cleanRoute);
    }
    if (student.row && studentUpdatedCol) {
      studentSheet.getRange(student.row, studentUpdatedCol).setValue(new Date());
    }

    // 2. Update Defence Cases for this student
    const caseSheet = adminSheet_();
    const caseMap = adminHeaderMap_(caseSheet);
    const count = caseSheet.getLastRow() - ADMIN_CONFIG.HEADER_ROW;
    let activeCaseId = '';

    const caseRouteCol = caseMap['Progression Route'] || (ADMIN_HEADERS.indexOf('Progression Route') + 1);
    const caseTypeCol = caseMap['Defence Type'] || (ADMIN_HEADERS.indexOf('Defence Type') + 1);

    if (count > 0) {
      const caseData = caseSheet.getRange(ADMIN_CONFIG.HEADER_ROW + 1, 1, count, caseSheet.getLastColumn()).getDisplayValues();
      caseData.forEach(function(row, idx) {
        const rowStudentKey = String(row[caseMap['Student Key'] - 1] || '').trim();
        const rowStudentName = normaliseAdmin_(row[caseMap['Student Name'] - 1]);
        if (rowStudentKey === cleanKey || (!rowStudentKey && rowStudentName === normaliseAdmin_(student['Student Name']))) {
          const rowNum = ADMIN_CONFIG.HEADER_ROW + 1 + idx;
          // Preserve the recorded route of every existing attempt.
          // The updated master route is applied only to future stages.

          const caseStatus = normaliseAdmin_(row[caseMap['Case Status'] - 1]);
          if (caseStatus !== 'closed') {
            activeCaseId = String(row[caseMap['Case ID'] - 1] || '').trim();

            // Optional active stage defence type conversion
            if (options.updateActiveStage && options.targetDefenceType && rowNum && caseTypeCol) {
              const sessionStatus = normaliseAdmin_(row[caseMap['Session Status'] - 1]);
              if (['registered', 'draft submitted', 'scheduled', ''].indexOf(sessionStatus) >= 0) {
                caseSheet.getRange(rowNum, caseTypeCol).setValue(options.targetDefenceType);
              }
            }
          }
        }
      });
    }

    SpreadsheetApp.flush();

    // 3. Log action
    adminLog_(adminEmail, 'Changed progression route', activeCaseId || cleanKey, student['Student Name'], ['Progression Route'], 'Success', 'Changed route from ' + oldRoute + ' to ' + cleanRoute + (options.updateActiveStage && options.targetDefenceType ? ' (and updated active stage to ' + options.targetDefenceType + ')' : ''));

    return {
      ok: true,
      message: 'Progression route successfully updated to ' + cleanRoute + ' for ' + student['Student Name'] + '.',
      cases: adminListCases_(),
      students: adminListStudents_(),
      caseData: activeCaseId ? getAdminCase(activeCaseId) : null
    };
  } finally {
    lock.releaseLock();
  }
}

function createNextDefenceStageLocked_(studentKey,defenceType){
  const adminActor = adminAssert_();
  adminEnsureProgressionModel_();
  const student = adminFindStudent_(studentKey);
  if(!student) throw new Error('The student master record was not found.');
  const type = String(defenceType||'').trim();
  if(['Proposal Defence','Viva Voce'].indexOf(type)<0) throw new Error('Select a valid defence stage.');
  const cases = adminListCases_().filter(function(item){ return item.studentKey === studentKey; });
  const open = cases.find(function(item){ return item.defenceType === type && normaliseAdmin_(item.caseStatus) !== 'closed'; });
  if(open) throw new Error('This student already has an open ' + type + ' case (' + open.caseId + ').');

  const sameStageCases = cases.filter(function(item){ return item.defenceType === type; });
  const attempt = 1 + sameStageCases.length;
  const isReexam = attempt > 1;
  const lastSameStage = sameStageCases.length ? sameStageCases[sameStageCases.length - 1] : null;

  if(type === 'Viva Voce' && attempt === 1 && student['Progression Route'] === 'Standard'){
    const passedProposal = cases.some(function(item){
      const isClosed = normaliseAdmin_(item.caseStatus) === 'closed';
      const isPass = ['Scale 1','Scale 2','Scale 3'].indexOf(item.resultScale) >= 0 ||
        ['pass','passed','conditional pass with minor corrections','conditional pass with major corrections'].indexOf(normaliseAdmin_(item.resultStatus)) >= 0 ||
        (item.workflow && item.workflow.decision && item.workflow.decision.pass);
      return item.defenceType === 'Proposal Defence' && isClosed && isPass;
    });
    if(!passedProposal) throw new Error('A passed and closed Proposal Defence stage is required before opening the Viva Voce stage for Standard route students.');
  }

  const initialValues = {
    'Student Name': student['Student Name'],
    'Student Email': student['Student Email'],
    'Programme': student['Programme'],
    'Research Title': student['Research Title'],
    'Supervisor': student['Supervisor'],
    'Supervisor Email': student['Supervisor Email'],
    'Defence Type': type,
    'Progression Route': student['Progression Route'],
    'Student Key': studentKey,
    'Stage Attempt': String(attempt),
    'Session Status': 'Registered',
    'Submission Enabled': 'Yes',
    'Notes': isReexam ? ('Re-examination Attempt ' + attempt + ' opened. Previous attempt: ' + (lastSameStage ? lastSameStage.caseId : '') + '.') : 'Stage opened from student progression timeline.'
  };

  // If this is a re-examination, copy forward the panel members from the previous attempt for administrative convenience
  if(isReexam && lastSameStage) {
    if(lastSameStage.chairperson) initialValues['Chairperson'] = lastSameStage.chairperson;
    if(lastSameStage.chairEmail) initialValues['Chair Email'] = lastSameStage.chairEmail;
    if(lastSameStage.examiner1) initialValues['Examiner 1'] = lastSameStage.examiner1;
    if(lastSameStage.examiner1Role) initialValues['Examiner 1 Role'] = lastSameStage.examiner1Role;
    if(lastSameStage.examiner1Email) initialValues['Examiner 1 Email'] = lastSameStage.examiner1Email;
    if(lastSameStage.examiner2) initialValues['Examiner 2'] = lastSameStage.examiner2;
    if(lastSameStage.examiner2Role) initialValues['Examiner 2 Role'] = lastSameStage.examiner2Role;
    if(lastSameStage.examiner2Email) initialValues['Examiner 2 Email'] = lastSameStage.examiner2Email;
  }

  const result = saveAdminCaseLegacy_({originalCaseId:'', values: initialValues}, true);

  if(isReexam && lastSameStage) {
    wfAppend_(WF_EVENT_SHEET, result.caseId, studentKey, 'REEXAM_OPENED', adminActor, {
      previousCaseId: lastSameStage.caseId,
      attempt: attempt,
      stage: type
    });
  } else if(type === 'Viva Voce') {
    const previous = cases.filter(function(item){
      return item.defenceType === 'Proposal Defence' && normaliseAdmin_(item.caseStatus) === 'closed';
    }).slice(-1)[0];
    if(previous) {
      wfAppend_(WF_EVENT_SHEET, result.caseId, studentKey, 'STAGE_OPENED', adminActor, {
        previousCaseId: previous.caseId,
        noticeId: (previous.workflow && previous.workflow.vivaNotice) ? previous.workflow.vivaNotice.id : ''
      });
    }
  }

  const record = adminFindCase_(result.caseId);
  if(record && student['Student Folder ID']) {
    record.sheet.getRange(record.row, record.map['Student Folder ID']).setValue(student['Student Folder ID']);
  }
  SpreadsheetApp.flush();

  const msg = isReexam ?
    (type + ' Re-examination (Attempt ' + attempt + ') is now open for revised draft submission.') :
    (type + ' stage is now open for draft submission.');

  return {
    ok: true,
    message: msg,
    caseId: result.caseId,
    cases: adminListCases_(),
    students: adminListStudents_(),
    caseData: getAdminCase(result.caseId)
  };
}

function deleteAdminStudent(studentKey,confirmationName){
  const adminEmail=adminAssert_();
  adminEnsureProgressionModel_();
  const student=adminFindStudent_(studentKey);
  if(!student) throw new Error('The student master record was not found.');
  if(normaliseAdmin_(confirmationName)!==normaliseAdmin_(student['Student Name'])) throw new Error('The student name did not match. Nothing was archived.');
  const lock=LockService.getScriptLock();lock.waitLock(30000);
  try{
    const spreadsheet=adminSpreadsheet_(),sheet=adminSheet_(),map=adminHeaderMap_(sheet);
    const count=Math.max(0,sheet.getLastRow()-ADMIN_CONFIG.HEADER_ROW),rows=count?sheet.getRange(ADMIN_CONFIG.HEADER_ROW+1,1,count,sheet.getLastColumn()).getValues():[];
    const targets=[];let folderId=student['Student Folder ID']||'';
    rows.forEach(function(row,index){if(String(row[map['Student Key']-1]||'')===studentKey){targets.push({row:ADMIN_CONFIG.HEADER_ROW+1+index,values:row});if(!folderId)folderId=String(row[map['Student Folder ID']-1]||'');}});
    let archive=spreadsheet.getSheetByName(ADMIN_CONFIG.DELETED_SHEET);
    const sourceHeaders=sheet.getRange(ADMIN_CONFIG.HEADER_ROW,1,1,sheet.getLastColumn()).getDisplayValues()[0];
    if(!archive) archive=spreadsheet.insertSheet(ADMIN_CONFIG.DELETED_SHEET);if(archive.getMaxColumns()<sourceHeaders.length+2) archive.insertColumnsAfter(archive.getMaxColumns(),sourceHeaders.length+2-archive.getMaxColumns());if(archive.getLastRow()<1||!String(archive.getRange(1,1).getDisplayValue()).trim()){archive.getRange(1,1,1,sourceHeaders.length+2).setValues([['Deleted At','Deleted By'].concat(sourceHeaders)]);archive.setFrozenRows(1);}
    targets.forEach(function(target){archive.appendRow([new Date(),adminEmail].concat(target.values));});
    targets.sort(function(a,b){return b.row-a.row;}).forEach(function(target){sheet.deleteRow(target.row);});
    let studentArchive=spreadsheet.getSheetByName(ADMIN_CONFIG.DELETED_STUDENT_SHEET);
    if(!studentArchive){studentArchive=spreadsheet.insertSheet(ADMIN_CONFIG.DELETED_STUDENT_SHEET);studentArchive.getRange(1,1,1,ADMIN_STUDENT_HEADERS.length+2).setValues([['Deleted At','Deleted By'].concat(ADMIN_STUDENT_HEADERS)]);studentArchive.setFrozenRows(1);}
    studentArchive.appendRow([new Date(),adminEmail].concat(ADMIN_STUDENT_HEADERS.map(function(h){return student[h]||'';})));
    adminStudentSheet_().deleteRow(student.row);
    const folderResult=adminArchiveStudentFolder_(folderId);
    adminLog_(adminEmail,'Archived student',targets.length?targets[0].values[map['Case ID']-1]:'',student['Student Name'],[],'Success',targets.length+' defence case(s) archived; '+folderResult.detail);
    return {ok:true,message:'Student and '+targets.length+' defence case(s) were archived. '+folderResult.detail,cases:adminListCases_(),students:adminListStudents_()};
  }finally{lock.releaseLock();}
}


// Meeting URLs stay in the existing link column for compatibility with invitations and calendars.
function adminMeetingPlatform_(data) {
  const platform=String(data['Meeting Platform']||'').trim();
  if(platform){if(['Google Meet','Other platform','In person'].indexOf(platform)<0)throw new Error('Select a valid meeting platform.');return platform;}
  const link=String(data['Google Meet Link']||'').trim();
  return link&&!/^https:\/\/meet\.google\.com\//i.test(link)?'Other platform':'Google Meet';
}
function adminRequireMeetingLink_(data, allowMissingMeet) {
  const platform=adminMeetingPlatform_(data),link=String(data['Google Meet Link']||'').trim();
  if(platform==='In person'){adminRequired_(data['Venue'],'Venue');return;}
  if(platform==='Google Meet'&&!(allowMissingMeet&&!link)&&!/^https:\/\/meet\.google\.com\/[a-z0-9-]+(?:[?#].*)?$/i.test(link))throw new Error('Open Review calendar event to retrieve its Google Meet link, or paste a link before sending invitations.');
  if(platform==='Other platform'&&!/^https:\/\/[^\s]+$/i.test(link))throw new Error('Enter a valid HTTPS meeting link for the selected platform.');
}

// CalendarApp stores an iCalUID, not the Calendar API event resource ID.
function adminCalendarMeeting_(caseId) {
  const uid=PropertiesService.getScriptProperties().getProperty('ADMIN_CALENDAR_EVENT_'+caseId);
  if(!uid)return {eventFound:false,meetingLink:'',eventUrl:'',message:'No calendar event has been scheduled for this case yet.'};
  try {
    const targetCal = adminGetTargetCalendar_();
    const calendarIds = [targetCal.getId()];
    const defaultId = CalendarApp.getDefaultCalendar().getId();
    if (calendarIds.indexOf(defaultId) === -1) calendarIds.push(defaultId);

    let event = null;
    for (let i = 0; i < calendarIds.length; i++) {
      try {
        const response = Calendar.Events.list(calendarIds[i], {iCalUID: uid, maxResults: 10, showDeleted: false});
        const events = (response.items || []).filter(function(e) { return e.status !== 'cancelled'; });
        if (events.length > 0) {
          event = events[0];
          break;
        }
      } catch (listErr) {}
    }

    if (!event) return {eventFound:false,meetingLink:'',eventUrl:'',message:'The linked calendar event was not found.'};
    const points=event.conferenceData&&event.conferenceData.entryPoints||[];
    const video=points.find(function(point){return point.entryPointType==='video'&&/^https:\/\//i.test(String(point.uri||''));});
    const link=String(event.hangoutLink||video&&video.uri||'').trim();
    const safeLink=/^https:\/\/[^\s]+$/i.test(link)?link:'';
    return {eventFound:true,meetingLink:safeLink,eventUrl:/^https:\/\/[^\s]+$/i.test(String(event.htmlLink||''))?event.htmlLink:'',message:safeLink?'Meeting link retrieved from the calendar event.':'This calendar event has no meeting link. Add Google Meet in Google Calendar, then reopen Review calendar event.'};
  } catch(error) {
    console.error('Calendar meeting lookup failed: '+(error.message||String(error)));
    return {eventFound:false,meetingLink:'',eventUrl:'',message:'The calendar meeting link could not be read. Check that the advanced Google Calendar service and Calendar API are enabled, or paste the event meeting link manually.'};
  }
}
function adminStoreCalendarMeet_(record,data,review) {
  if(adminMeetingPlatform_(data)!=='Google Meet'||!/^https:\/\/meet\.google\.com\/[a-z0-9-]+(?:[?#].*)?$/i.test(review.meetingLink||''))return;
  if(data['Google Meet Link']!==review.meetingLink){record.sheet.getRange(record.row,record.map['Google Meet Link']).setValue(review.meetingLink);data['Google Meet Link']=review.meetingLink;SpreadsheetApp.flush();}
}
function getAdminCalendarReview(caseId) {
  const email=adminAssert_(),lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    const record=adminFindCase_(caseId);if(!record)throw new Error('The selected case no longer exists.');
    const data=adminCaseObject_(record),review=adminCalendarMeeting_(caseId),previous=data['Google Meet Link'];
    adminStoreCalendarMeet_(record,data,review);
    if(previous!==data['Google Meet Link'])adminLog_(email,'Retrieved calendar meeting link',caseId,data['Student Name'],['Google Meet Link'],'Success','Copied from the linked calendar event; no invitations sent.');
    data._revision = wfRevision_(record);
    return {ok:true,caseData:data,calendarReview:review};
  } finally {lock.releaseLock();}
}

// Updated 2026-09-19 17:14:52

function adminGetSupervisionAndProgressData() {
  adminAssert_();
  try {
    const ss = adminSpreadsheet_();
    
    // 1. Supervision Logs
    const supSheet = ss.getSheetByName(ADMIN_CONFIG.SUPERVISION_SHEET);
    const logs = [];
    if (supSheet && supSheet.getLastRow() > 1) {
      const supValues = supSheet.getRange(2, 1, supSheet.getLastRow() - 1, Math.max(14, supSheet.getLastColumn())).getDisplayValues();
      supValues.forEach(function(row, idx) {
        if (row[0] || row[3]) {
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
    }

    // 2. Progress Reports
    const progSheet = ss.getSheetByName(ADMIN_CONFIG.PROGRESS_SHEET);
    const reports = [];
    if (progSheet && progSheet.getLastRow() > 1) {
      const progValues = progSheet.getRange(2, 1, progSheet.getLastRow() - 1, Math.max(15, progSheet.getLastColumn())).getDisplayValues();
      progValues.forEach(function(row, idx) {
        if (row[0] || row[3]) {
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
            status: row[11] || 'Submitted â€” Under Review',
            supervisorRemarks: row[12] || '',
            supervisorRating: row[13] || '',
            endorsedAt: row[14] || ''
          });
        }
      });
    }

    const uniqueSupervisors = {};
    const uniqueStudents = {};
    logs.forEach(function(l) {
      if (l.supervisor) uniqueSupervisors[l.supervisor.trim().toLowerCase()] = true;
      if (l.studentName) uniqueStudents[l.studentName.trim().toLowerCase()] = true;
    });
    reports.forEach(function(r) {
      if (r.supervisor) uniqueSupervisors[r.supervisor.trim().toLowerCase()] = true;
      if (r.studentName) uniqueStudents[r.studentName.trim().toLowerCase()] = true;
    });

    const verifiedCount = logs.filter(function(l) { return (l.endorsementStatus || '').toLowerCase().indexOf('verified') >= 0; }).length;
    const endorsedCount = reports.filter(function(r) { return (r.status || '').toLowerCase().indexOf('endorsed') >= 0; }).length;

    return {
      ok: true,
      supervisionLogs: logs.reverse(),
      progressReports: reports.reverse(),
      stats: {
        totalLogs: logs.length,
        verifiedLogs: verifiedCount,
        pendingVerificationLogs: logs.length - verifiedCount,
        totalProgressReports: reports.length,
        endorsedProgressReports: endorsedCount,
        pendingProgressReports: reports.length - endorsedCount,
        activeSupervisorsCount: Object.keys(uniqueSupervisors).length,
        activeSuperviseesCount: Object.keys(uniqueStudents).length
      }
    };
  } catch (e) {
    return { ok: false, message: e.message || String(e), supervisionLogs: [], progressReports: [], stats: {} };
  }
}

function adminAcknowledgeSupervisionLog(payload) {
  const adminEmail = adminAssert_();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    if (!payload || !payload.logId) throw new Error('Meeting Log ID is required.');
    const ss = adminSpreadsheet_();
    const sheet = ss.getSheetByName(ADMIN_CONFIG.SUPERVISION_SHEET);
    if (!sheet || sheet.getLastRow() < 2) throw new Error('Supervision Logs sheet not found.');

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.max(14, sheet.getLastColumn())).getDisplayValues();
    let targetRow = -1;
    for (let i = 0; i < values.length; i++) {
      if (String(values[i][0]).trim() === String(payload.logId).trim()) {
        targetRow = i + 2;
        break;
      }
    }
    if (targetRow < 0) throw new Error('Log record not found.');

    const status = payload.status || 'Verified by Admin';
    const remarks = payload.remarks || '';
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');

    sheet.getRange(targetRow, 12).setValue(status);
    if (remarks) sheet.getRange(targetRow, 13).setValue(remarks);
    sheet.getRange(targetRow, 14).setValue(nowStr);
    SpreadsheetApp.flush();

    adminLog_(adminEmail, 'Verified supervision log', payload.logId, payload.studentName || '', ['Endorsement Status'], 'Success', status);
    return { ok: true, logId: payload.logId, status: status, remarks: remarks, endorsedAt: nowStr };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Direct Admin Upload for Student Draft Document
 * Uploads file to student's Drive folder, sets public view permissions,
 * updates sheet record, syncs calendar event description, and optionally notifies examiners.
 */
function adminUploadStudentDraftLocked_(payload) {
  const adminEmail = adminAssert_();
  if (!payload || !payload.caseId) throw new Error('Case ID is required.');
  if (!payload.fileData || !payload.fileName) throw new Error('File data and filename are required.');

  const record = adminFindCase_(payload.caseId);
  if (!record) throw new Error('The selected case could not be found.');
  wfAssertRevision_(record,payload.expectedRevision);
  const data = adminCaseObject_(record);
  if(!wfModel_(data).canSubmitDraft) throw new Error('Draft submission is closed or readiness approval is outstanding.');
  if(!/\.(pdf|doc|docx)$/i.test(payload.fileName)) throw new Error('Choose a PDF or Word document.');
  if(String(payload.fileData).length>27962032) throw new Error('File exceeds 20 MB.');

  // 1. Ensure student Google Drive folder
  const studentFolder = adminEnsureStudentFolder_(record, data);
  if (!studentFolder) throw new Error('Could not access or create student Drive folder.');

  // 2. Decode file and create file in Drive
  const cleanName = String(payload.fileName || 'Student_Draft.pdf').replace(/[\\/:*?"<>|]/g, '_');
  const mimeType = payload.mimeType || 'application/pdf';
  const bytes = Utilities.base64Decode(payload.fileData);
  const blob = Utilities.newBlob(bytes, mimeType, cleanName);

  if(!bytes.length||bytes.length>20*1024*1024) throw new Error('File is empty or exceeds 20 MB.');
  // Every upload creates a new version; retain previous Drive documents.
  const driveFile = studentFolder.createFile(blob);
  try {
    driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    console.warn('Could not set public sharing on draft file: ' + e.message);
  }

  const fileUrl = driveFile.getUrl();
  const fileName = driveFile.getName();

  // 3. Update Defence Cases Sheet
  const map = record.map;
  if (map['Student Draft Link']) {
    record.sheet.getRange(record.row, map['Student Draft Link']).setValue(fileUrl);
    data['Student Draft Link'] = fileUrl;
  }
  if (map['Draft File Name']) {
    record.sheet.getRange(record.row, map['Draft File Name']).setValue(fileName);
    data['Draft File Name'] = fileName;
  }
  SpreadsheetApp.flush();

  let details = ['Draft uploaded: ' + fileName];

  // 4. Automatically sync Calendar Event if one exists
  let calendarUpdated = false;
  try {
    const propertyKey = 'ADMIN_CALENDAR_EVENT_' + payload.caseId;
    const properties = PropertiesService.getScriptProperties();
    const existingEventId = properties.getProperty(propertyKey);
    if (existingEventId) {
      const calendar = adminGetTargetCalendar_();
      const event = calendar.getEventById(existingEventId) || CalendarApp.getDefaultCalendar().getEventById(existingEventId);
      if (event) {
        const updatedDesc = adminSessionDescription_(data);
        event.setDescription(updatedDesc);
        calendarUpdated = true;
        details.push('Google Calendar event description updated with draft link');
      }
    }
  } catch (calErr) {
    console.warn('Calendar sync error during draft upload: ' + calErr.message);
  }

  // 5. Optionally notify examiners/panel if requested
  let notifiedCount = 0;
  if (payload.notifyExaminers) {
    const recipients = [
      { name: data['Examiner 1'], email: data['Examiner 1 Email'], role: data['Examiner 1 Role'] || 'Examiner 1' },
      { name: data['Examiner 2'], email: data['Examiner 2 Email'], role: data['Examiner 2 Role'] || 'Examiner 2' },
      { name: data['Chairperson'], email: data['Chair Email'], role: 'Chairperson' }
    ].filter(function(p) { return p.name && p.email && p.email.indexOf('@') > 0; });

    const ccEmails = adminParseEmailList_(data['Additional Invitees']);
    if (data['Supervisor Email'] && data['Supervisor Email'].indexOf('@') > 0) {
      const supEmail = data['Supervisor Email'].trim().toLowerCase();
      if (!ccEmails.some(function(e) { return e.toLowerCase() === supEmail; })) {
        ccEmails.push(data['Supervisor Email'].trim());
      }
    }

    if (recipients.length > 0) {
      const subject = '[' + (data['Defence Type'] || 'Defence Session') + '] Updated Student Draft Available â€” ' + (data['Student Name'] || '');
      const headerBlob = adminGetEmailHeaderBlob_();

      recipients.forEach(function(recipient) {
        try {
          const personEmail = recipient.email.toLowerCase();
          const htmlBody = '<div style="font-family:Arial,Helvetica,sans-serif;color:#1e1b4b;max-width:620px;line-height:1.6;">' +
            '<p>Dear ' + adminEscapeHtml_(recipient.name) + ' (' + adminEscapeHtml_(recipient.role) + '),</p>' +
            '<p>Please be informed that an updated student draft document has been uploaded for the following defence session:</p>' +
            '<table style="border-collapse:collapse;margin:14px 0;font-size:13.5px;">' +
              '<tr><td style="padding:4px 14px 4px 0;font-weight:bold;color:#475569;">Candidate:</td><td>' + adminEscapeHtml_(data['Student Name']) + '</td></tr>' +
              '<tr><td style="padding:4px 14px 4px 0;font-weight:bold;color:#475569;">Research Title:</td><td>' + adminEscapeHtml_(data['Research Title']) + '</td></tr>' +
              '<tr><td style="padding:4px 14px 4px 0;font-weight:bold;color:#475569;">Defence Type:</td><td>' + adminEscapeHtml_(data['Defence Type']) + '</td></tr>' +
              '<tr><td style="padding:4px 14px 4px 0;font-weight:bold;color:#475569;">Draft File Name:</td><td>' + adminEscapeHtml_(fileName) + '</td></tr>' +
            '</table>' +
            '<div style="margin:20px 0;">' +
              '<a href="' + adminEscapeHtml_(fileUrl) + '" style="background:#4f46e5;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:6px;font-weight:bold;display:inline-block;">Open Updated Student Draft â†—</a>' +
            '</div>' +
            '<p style="font-size:12.5px;color:#64748b;">You may also access this and submit your evaluation directly via the <a href="' + ADMIN_CONFIG.PANEL_PORTAL_URL + '" style="color:#4f46e5;">Examiner Portal</a>.</p>' +
            '<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">' +
            '<p style="font-size:11.5px;color:#94a3b8;">Innovative University College â€” Institute of Postgraduate Studies (IPGS)</p>' +
          '</div>';

          const mailOpts = {
            to: recipient.email,
            subject: subject,
            body: 'Dear ' + recipient.name + ',\n\nAn updated student draft (' + fileName + ') has been uploaded for ' + data['Student Name'] + ' (' + data['Defence Type'] + ').\n\nDraft Link: ' + fileUrl + '\n\nExaminer Portal: ' + ADMIN_CONFIG.PANEL_PORTAL_URL,
            htmlBody: htmlBody
          };
          if (headerBlob) mailOpts.inlineImages = { emailHeader: headerBlob };
          if (ccEmails.length > 0) {
            const filteredCc = ccEmails.filter(function(e) { return e.toLowerCase() !== personEmail; });
            if (filteredCc.length > 0) mailOpts.cc = filteredCc.join(', ');
          }
          adminSendEmail_(mailOpts);
          notifiedCount++;
        } catch (mailErr) {
          console.warn('Failed to send draft update notice to ' + recipient.email + ': ' + mailErr.message);
        }
      });
      details.push('Notice sent to ' + notifiedCount + ' panel member(s)');
    }
  }

  // 6. Admin Log
  adminLog_(adminEmail, 'Uploaded student draft document', payload.caseId, data['Student Name'], ['Student Draft Link', 'Draft File Name'], 'Success', details.join('; '));

  return {
    ok: true,
    fileUrl: fileUrl,
    fileName: fileName,
    calendarUpdated: calendarUpdated,
    notifiedCount: notifiedCount,
    message: 'Student draft uploaded successfully.' + (calendarUpdated ? ' Calendar event updated.' : '') + (notifiedCount > 0 ? ' Notified ' + notifiedCount + ' panel member(s).' : ''),
    caseData: adminCaseObject_(adminFindCase_(payload.caseId)),
    cases: adminListCases_()
  };
}

function generateExaminerDirectToken_(caseId, email, slot) {
  const salt = 'IUC_EXTERNAL_EXAMINER_SECURE_TOKEN_2026';
  const cleanId = String(caseId || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanSlot = String(slot || '').trim().toLowerCase();
  return wfHash_(cleanId + '|' + cleanEmail + '|' + cleanSlot + '|' + salt).substring(0, 32);
}

function adminGetExaminerDirectLink_(caseId, email, slot) {
  const token = generateExaminerDirectToken_(caseId, email, slot);
  const slotNum = String(slot || '').toLowerCase().indexOf('1') >= 0 ? '1' : '2';
  return ADMIN_CONFIG.PANEL_PORTAL_URL + '?case=' + encodeURIComponent(caseId) + '&slot=' + slotNum + '&token=' + token;
}

function getExaminerDirectLinkForAdmin(caseId, slot) {
  const adminEmail = adminAssert_();
  const record = adminFindCase_(caseId);
  if (!record) throw new Error('Case not found');
  const data = adminCaseObject_(record);
  const isEx1 = String(slot || '').toLowerCase().indexOf('1') >= 0;
  const email = String(isEx1 ? data['Examiner 1 Email'] : data['Examiner 2 Email'] || '').trim();
  if (!email) throw new Error('No email address registered for ' + (isEx1 ? 'Examiner 1' : 'Examiner 2') + '. Please assign an email first.');
  return {
    ok: true,
    link: adminGetExaminerDirectLink_(caseId, email, isEx1 ? 'examiner 1' : 'examiner 2')
  };
}
