const token = "5358945959:AAGk_0KDBhbL_Qh2rbpAE9L_2bViqOVvI7w";
const telegramUrl = "https://api.telegram.org/bot" + token;
const webAppUrl = "https://script.google.com/macros/s/AKfycbw_S54NohJtDY7UpvWGEogOzgYDdZ0Lxht7IFsXw6ta9jnMYFbzyCPQNE-XwcxoE5SE/exec";

function getMe() {
  var getMeUrl = this.telegramUrl + "/getMe"
  var response = UrlFetchApp.fetch(getMeUrl)
  Logger.log(response)
}

function setWebhook() {
  var response = UrlFetchApp.fetch(telegramUrl + "/setWebhook?url=" + webAppUrl);
  Logger.log(response.getContentText())
}

function doPost(e) {
  var parsedContents = JSON.parse(e.postData.contents)
  var chat_bot = parsedContents.message.text;
  var command_cek = chat_bot.substring(0, 1);
  var command = chat_bot.split(" ")[0];
  if (command_cek == "/") {
    switch(command) {
      case "/moban" :
        saveAndSendReplyBasedOnCommand(parsedContents)
        break;
      case "/format" :
       sendText(parsedContents.message, FORMAT_HINT)
        break;
      case "/layanan" :
       sendText(parsedContents.message, LAYANAN_HINT)
        break;
      case "/menu" :
       sendText(parsedContents.message, MENU_HINT)
        break;
      case "/cek" :
        sendTicketStatus(parsedContents)
        break;
      case "/sto" :
        sendValidSTO(parsedContents)
        break;
      case "/datel" :
        sendValidDATEL(parsedContents)
        break;
      default:
     sendText(parsedContents.message, WRONG_FORMAT_HINT);
    }
  } else {
    let text = WELCOME_HINT;
   sendText(parsedContents.message, text);
  }
}

function sendTicketStatus(data) {
  let id = data.message.from.id;
  var username = data.message.from.username;
  var pesan = data.message.text;
  var ticketId =pesan.split(" ")[1]
  var sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(SHEET_NAME);
  var textFinder = sheet.createTextFinder(ticketId)
  var rowOfTicketId = textFinder.findNext().getRow()
  var currentTicketIdStatus = sheet.getRange(rowOfTicketId,17).getValue();
  var result = "";
  if (currentTicketIdStatus !== "") {
    result = currentTicketIdStatus;
  } else {
    result = "DALAM PROSES";
  }
  sendText(data.message, `Hai <a href=\"tg://user?id=${id}\">@${username}</a> Berikut tiket ID kamu : ${ticketId} statusnya ${result}`)
  return;
}

function saveAndSendReplyBasedOnCommand(data) {
  let id = data.message.from.id;
  var username = data.message.from.username;
  var chatId = data.message.message_id;
  var groupId = data.message.chat.id;
  var pesan = data.message.text;
  var now = new Date();
  var ticketId = getTicketId()

  if (!LAYANAN_AVAILABLE.includes(pesan.split(" ")[1].split(">")[0].split("-")[0])) {
    sendText(data.message, "Hai <a href=\"tg://user?id="+id+"\">@"+username+"</a> mohon maaf, jenis layanan yang kamu masukkan tidak ada dalam list kamu. Mohon lihat jenis layanan yang kami sediakan dengan menggunakan /layanan")
    return;
  }
  if (!STOS.includes(pesan.split(" ")[1].split(">")[0].split("-")[1])) {
      sendText(data.message, "Hai <a href=\"tg://user?id="+id+"\">@"+username+"</a> mohon maaf STO yang anda masukkan tidak terdaftar, mohon cek STO yang terdaftar dengan menggunakan perintah /sto")
      return;
  }
  if (!DATELS.includes(pesan.split(" ")[1].split(">")[0].split("-")[2])) {
    sendText(data.message, "Hai <a href=\"tg://user?id="+id+"\">@"+username+"</a> mohon maaf DATEL yang anda masukkan tidak terdaftar, mohon cek DATEL yang terdaftar dengan menggunakan perintah /datel")
    return;
  }

    if (!pesan.split(" ")[1].split(">")[1]) {
    sendText(data.message, "Hai <a href=\"tg://user?id="+id+"\">@"+username+"</a> mohon maaf format kamu tidak sesuai, Mohon lihat format yang sesuai di /format")
    return;
  }

  if (pesan.split(" ")[1].split(">")[0].split("-")[0] === "FD"){
    const jenisLayanan = pesan.split(" ")[1].split(">")[0].split("-")[0];
    const mobanLocation = pesan.split(" ")[1].split(">")[0];
    const scNumber = pesan.split(" ")[1].split(">")[1];
    const inNumber = pesan.split("|")[2];
    const falloutInfo = pesan.split(" ")[2].concat(" ").concat(pesan.split(" ")[3].split(";")[0]);
    const provInfo = pesan.split(" ").slice(4).join(" ");

    SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(SHEET_NAME).appendRow([now, ticketId, groupId, id, username, chatId, jenisLayanan, mobanLocation, scNumber, inNumber, falloutInfo, provInfo, "-", "-", "-"]);
    sendText(data.message, "Hai <a href=\"tg://user?id="+id+"\">@"+username+"</a> mohon ditunggu yaa, tiket kamu sudah masuk antrian kami. Berikut tiket ID kamu : " + ticketId)
    return;
  }

  if (pesan.split(" ")[1].split(">")[0].split("-")[0] === "DEV"){
    const jenisLayanan = pesan.split(" ")[1].split(">")[0].split("-")[0];
    const mobanLocation = pesan.split(" ")[1].split(">")[0];
    const devLocation = pesan.split(">")[1].split(" ")[0];
    const portLocation = pesan.split(" ")[2];

    SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(SHEET_NAME).appendRow([now, ticketId, data.message.chat.id, id, username, chatId, jenisLayanan, mobanLocation, "-", "-", "-", "-", devLocation, portLocation,"-"]);
    sendText(data.message, "Hai <a href=\"tg://user?id="+id+"\">@"+username+"</a> mohon ditunggu yaa, tiket kamu sudah masuk antrian kami. Berikut tiket ID kamu : " + ticketId)
    return;
  }

  if (pesan.split(" ")[1].split(">")[0].split("-")[0] === "OCC"){
    const jenisLayanan = pesan.split(" ")[1].split(">")[0].split("-")[0];
    const mobanLocation = pesan.split(" ")[1].split(">")[0];
    const occLocation = pesan.split(">")[1].trim();

    SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(SHEET_NAME).appendRow([now, ticketId, data.message.chat.id, id, username, chatId, jenisLayanan, mobanLocation, "-", "-", "-", "-", occLocation, "-", "-"]);
    sendText(data.message, "Hai <a href=\"tg://user?id="+id+"\">@"+username+"</a> mohon ditunggu yaa, tiket kamu sudah masuk antrian kami. Berikut tiket ID kamu : " + ticketId)
    return;
  }

  if (pesan.split(" ")[1].split(">")[0].split("-")[0] === "SVC"){
    const jenisLayanan = pesan.split(" ")[1].split(">")[0].split("-")[0];
    const mobanLocation = pesan.split(" ")[1].split(">")[0];
    const scNumber = pesan.split(" ")[1].split(">")[1];
    const serviceInfo = pesan.split(" ").slice(2).join(" ");

    SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(SHEET_NAME).appendRow([now, ticketId, data.message.chat.id, id, username, chatId, jenisLayanan, mobanLocation, scNumber, "-", "-", "-", "-", "-", serviceInfo]);
    sendText(data.message, "Hai <a href=\"tg://user?id="+id+"\">@"+username+"</a> mohon ditunggu yaa, tiket kamu sudah masuk antrian kami. Berikut tiket ID kamu : " + ticketId)
    return;
  }
}

function sendValidDATEL(data) {
  let id = data.message.from.id;
  var username = data.message.from.username;
  sendText(data.message, `Hai <a href=\"tg://user?id=${id}\">@${username}</a> Berikut daftar DATEL yang tersedia: ${DATELS.toString()}`)
  return;
}

function sendValidSTO(data){
  let id = data.message.from.id;
  var username = data.message.from.username;
  sendText(data.message, `Hai <a href=\"tg://user?id=${id}\">@${username}</a> Berikut daftar STO yang tersedia: ${STOS.toString()}`)
  return;
}

function onEdit(e){
  if(e.range.columnEnd !== 17 && e.range.columnEnd !== 20){
    return
  }
  if(e.range.columnEnd === 20){
    calculateTimestampEskalasi(e)
    return
  }
  calculateTimestampHasil(e);
}
 module.exports = { sendTicketStatus };
