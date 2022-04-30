function calculateTimestampHasil(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var timestampMilisOrder = new Date(sheet.getRange(e.range.getRow(),1).getValue()).getTime();
  var timestampHasil = new Date();
  var timestampMilisHasil = timestampHasil.getTime();
  var selisihTimestampHasil = Math.abs(timestampMilisHasil-timestampMilisOrder);
  var selisihMenit = Math.round(selisihTimestampHasil/(1000)).toFixed(0);
  sheet.getRange(e.range.getRow(),19).setValue(selisihMenit);
  sheet.getRange(e.range.getRow(),18).setValue(timestampHasil); 

  var messageId = sheet.getRange(e.range.getRow(),6).getValue();
  var userTelegramId = sheet.getRange(e.range.getRow(),4).getValue();
  var userNameTelegram = sheet.getRange(e.range.getRow(),5).getValue();
  var groupId = sheet.getRange(e.range.getRow(),3).getValue();
  var ticketId = sheet.getRange(e.range.getRow(),2).getValue();
  var statusHasil = sheet.getRange(e.range.getRow(),17).getValue();

  sendText({chat: { id: groupId}, message_id:  messageId}, `Hai <a href=\"tg://user?id=${userTelegramId}\">@${userNameTelegram}</a>, tiket kamu ${ticketId} saat ini berstatus ${statusHasil} `)
}

function calculateTimestampEskalasi(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var timestampMilisHasil = new Date(sheet.getRange(e.range.getRow(),18).getValue()).getTime();
  var timestampEskalasi = new Date();
  var timestampMilisEskalasi = timestampEskalasi.getTime();
  var selisihTimestampEskalasi = Math.abs(timestampMilisEskalasi-timestampMilisHasil);
  var selisihMenit = Math.round(selisihTimestampEskalasi/(1000)).toFixed(0);
  sheet.getRange(e.range.getRow(),22).setValue(selisihMenit);
  sheet.getRange(e.range.getRow(),21).setValue(timestampEskalasi);  
}

function getTicketId() {
  return "MOBAN-" + Number(new Date().getTime()).toFixed(0);
}

function sendText(message, text, replymarkup) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(message.chat.id), //group id
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(replymarkup),
      reply_to_message_id: message.message_id,
    },
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}