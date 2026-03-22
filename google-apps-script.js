/**
 * Google Apps Script — Consultation Form Handler
 * ================================================
 * 
 * HOW TO DEPLOY:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this code into the script editor
 * 3. Click Deploy → New Deployment
 * 4. Select "Web app" as type
 * 5. Set "Execute as" = Me, "Who has access" = Anyone
 * 6. Click Deploy and copy the URL
 * 7. Paste the URL into js/app.js → CONFIG.googleSheetsUrl
 *
 * SHEET SETUP:
 * Create a sheet named "Consultations" with these column headers in row 1:
 * A: Timestamp | B: Email | C: Services | D: Description | E: Country
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Consultations');
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Consultations');
      sheet.appendRow(['Timestamp', 'Email', 'Services', 'Description', 'Country']);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email || '',
      data.services || '',
      data.description || '',
      data.country || 'Unknown'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Teklyn Consultation Form API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
