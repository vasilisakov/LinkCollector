// JavaScript Document
//Получаем доступ к таблице по ссылке с уникальным идентификатором
var LinkCollector = SpreadsheetApp.openById("12Z9OGKaxJaTBoni9dDCc2bWH54m4URNz60RTBNXfqYo");
//Получаем доступ к странице по ее имени
var Link1 = LinkCollector.getSheetByName("Link1");
//Стандартная функция Google Apps Script для прослушивания входящих запросов, отправленных методом POST
function doPost (e) {
  var operation = e.parameter.action;//получаем параметр "action"
  
  switch (operation) {
      case "deleteLink": return deleteLink (e);
       case "addLink": return addLink (e);
  }

}

//Стандартная функция Google Apps Script для прослушивания входящих запросов, отправленных методом GET
function doGet (e) {
  var operation = e.parameter.action;//получаем параметр "action"
  
  switch (operation) { 
   
    case "getLink": return getLink ();
  }

}
//Функция, отвечающая за добавление новых задач
function addLink (e) {

   var dateTime = Utilities.formatDate(new Date(), 'America/New_York', 'MMMM dd, yyyy HH:mm:ss Z');
  //определяем дату в нужном формате и часовом поясе
  var newURL = e.parameter.p1;//получаем название задачи в переданном параметре
   var nameURL = e.parameter.p2;
   var desc = e.parameter.p3;
  
  Link1.appendRow([dateTime,newURL,nameURL,desc]); //обращаемся к нашей странице “Link1” определяем крайнюю свободную строку и вставляем полученные значения.
  return ContentService.createTextOutput('Link успешно добавлен!');//возвращает в ответ текстовое сообщение об успехе
}

//Функция, отвечающая за получение строк и отправку данных клиенту
function getLink () {
  var lastrow = Link1.getLastRow();//получаем номер последней строки в таблице
  var data = Link1.getRange("A1:D" + lastrow).getValues();//получаем массив нужных колонок
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);//возвращает в ответ полученные данные в JSON формате
}

//Функция, отвечающая за удаление задач
function deleteLink (e) {
  var link = e.parameter.link;//получаем название задачи в переданном параметре
  var lastrow = Link1.getLastRow();//получаем номер последней строки в таблице
  var array = Link1.getRange("A1:A" + lastrow).getValues();//получаем массив указанных ячеек колонки, в которой будем искать соответствие
  
  for (var i = 0; i <= array.length; i++) {
    if (array[i] == link) {//если элемент соответствует искомому в массиве, то...
      Link1.deleteRow(i+1);//обращаемся к нашей странице “Link1” и удаляем строку, в которой  было найдено совпадение. Прибавляем единичку, т.к. это был массив и у него нумерация идет с нуля...
      break;//завершаем цикл, т.к. мы нашли что искали и сделали, что хотели
    }
  }
    
  return ContentService.createTextOutput("Задача успешно удалена!");
}


