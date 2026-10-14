function panelIdentity_(name,email) {
  const directory=getActivePanelDirectory_(),person=directory[normalise_(name)];
  if(!person) return null;
  const mail=wfNorm_(email);
  return [wfNorm_(person.primaryEmail||person.email),wfNorm_(person.alternateEmail)].indexOf(mail)>=0?person:null;
}
function getPanelContextByCredentials(name,email,sessionToken) {
  if(sessionToken){
    try {
      const session=panelSession_(sessionToken);
      if(normalise_(name)===normalise_(session.name)) {
        const context=panelContextByIdentity_(session.name,session.email);
        context.sessionToken=sessionToken;
        return context;
      }
    } catch(err) {
      // Stale or expired token; ignore and proceed to authenticate via name/email
    }
  }
  const lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    const person=panelIdentity_(name,email);
    if(!person) {
      return {ok:false,message:'The provided name and email address do not match any active faculty member in the directory.'};
    }
    const token=Utilities.getUuid()+Utilities.getUuid(),cache=CacheService.getScriptCache();
    cache.put('FACULTY_SESSION_'+wfHash_(token),JSON.stringify({name:person.name,email:wfNorm_(email),expires:Date.now()+21600000}),21600);
    const context=panelContextByIdentity_(person.name,wfNorm_(email));
    context.sessionToken=token;
    return context;
  }finally{lock.releaseLock();}
}
function verifyFacultyAccessCode(challengeId,code) {
  const lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    const cache=CacheService.getScriptCache(),key='FACULTY_CHALLENGE_'+wfText_(challengeId),raw=cache.get(key);
    if(!raw)throw new Error('Code invalid or expired. Request a new code.');
    const s=JSON.parse(raw);s.attempts++;
    if(s.expires<Date.now()||s.attempts>5){cache.remove(key);throw new Error('Code expired or too many attempts.');}
    if(s.hash!==wfHash_(challengeId+wfText_(code))){cache.put(key,JSON.stringify(s),Math.max(1,Math.ceil((s.expires-Date.now())/1000)));throw new Error('Invalid code.');}
    cache.remove(key);
    if(!panelIdentity_(s.name,s.email))throw new Error('Directory identity changed.');
    const token=Utilities.getUuid()+Utilities.getUuid();
    cache.put('FACULTY_SESSION_'+wfHash_(token),JSON.stringify({name:s.name,email:s.email,expires:Date.now()+21600000}),21600);
    return {ok:true,sessionToken:token};
  }finally{lock.releaseLock();}
}
function panelSession_(token) {
  const raw=CacheService.getScriptCache().get('FACULTY_SESSION_'+wfHash_(wfText_(token)));
  if(!raw)throw new Error('Your verified faculty session expired. Sign in again.');
  const s=JSON.parse(raw);
  if(s.expires<Date.now()||(!s.isExternalDirect && !panelIdentity_(s.name,s.email)))throw new Error('Your faculty session is no longer valid.');
  return s;
}
function panelAuthorize_(payload) {
  if(!payload)throw new Error('No request received.');
  if(payload.sessionToken){
    try {
      const s=panelSession_(payload.sessionToken);
      if(payload.panelName&&normalise_(payload.panelName)!==normalise_(s.name))throw new Error('Faculty identity mismatch.');
      payload.panelName=s.name;
      return s;
    } catch(err) {
      // If token expired, fall back to validating panelName in directory
    }
  }
  if(payload.panelName){
    const panel=assertActivePanel_(payload.panelName);
    if(panel){
      payload.panelName=panel.name;
      return {name:panel.name,email:panel.primaryEmail||panel.email};
    }
  }
  throw new Error('Your verified faculty session expired. Sign in again.');
}
function revokeFacultySession(token){CacheService.getScriptCache().remove('FACULTY_SESSION_'+wfHash_(wfText_(token)));return{ok:true};}
function panelAssertSupervisor_(studentKey,facultyName) {
  const sheet=getPanelSpreadsheet_().getSheetByName(PANEL_CONFIG.STUDENT_MASTER_SHEET);
  if(!sheet||sheet.getLastRow()<2)throw new Error('Student master not found.');
  const headers=sheet.getRange(1,1,1,sheet.getLastColumn()).getDisplayValues()[0];
  const rows=sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).getDisplayValues();
  const row=rows.find(r=>r[headers.indexOf('Student Key')]===studentKey);
  if(!row||normalise_(row[headers.indexOf('Supervisor')])!==normalise_(facultyName))throw new Error('You are not the assigned supervisor for this student.');
}
