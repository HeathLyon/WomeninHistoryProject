/**
 * THE DISTAFF DISPATCH — PUBLIC, READ-ONLY GOOGLE DOC FEED
 * Paste into Extensions > Apps Script from the Google Doc, then follow README.
 * Only the document with this fixed ID can be read. Visitors cannot choose a Doc.
 * The first document tab is published as plain text. Do not put private notes in it.
 */
const DOCUMENT_ID = 'PASTE_YOUR_GOOGLE_DOCUMENT_ID_HERE';

function readGazetteText_() {
  if (!/^[A-Za-z0-9_-]{20,}$/.test(DOCUMENT_ID) || DOCUMENT_ID.indexOf('PASTE_') === 0) {
    throw new Error('Set DOCUMENT_ID to the ID from your Google Doc URL.');
  }
  const doc = DocumentApp.openById(DOCUMENT_ID);
  const firstTab = doc.getTabs()[0].asDocumentTab();
  const text = firstTab.getBody().getText();
  if (text.length > 250000) throw new Error('The website text is too large.');
  if (text.indexOf('[[site.title]]') < 0 || text.indexOf('[[hero.title]]') < 0 || text.indexOf('[[hero.description]]') < 0) {
    throw new Error('Copy all of content.txt into the first Google Doc tab, keeping the labels.');
  }
  return text;
}

// Run once in the editor to authorize the read and confirm the labels are present.
function testConnection() {
  const text = readGazetteText_();
  console.log('The document can be read. Website text length: ' + text.length + ' characters.');
}

function doGet(e) {
  const callback = e && e.parameter && e.parameter.callback;
  if (callback && !/^__distaffFeed_[A-Za-z0-9_]{1,100}$/.test(callback)) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Invalid callback.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  let payload;
  try {
    payload = { ok: true, text: readGazetteText_() };
  } catch (error) {
    // Avoid exposing account details or internal exception traces to visitors.
    payload = { ok: false, error: 'Could not read the gazette. Check DOCUMENT_ID, authorization, and the first document tab.' };
  }
  const json = JSON.stringify(payload)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
