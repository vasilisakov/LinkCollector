var LinkCollector = SpreadsheetApp.openById("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
function doPost(e) {
    var operation = e.parameter.action;
    switch (operation) {
    case "fillingModal":
        return fillingModal(e);
    case "deleteLink":
        return deleteLink(e);
    case "addLink":
        return addLink(e);
    case "updateLink":
        return updateLink(e);
    case "newCatalog":
        return newCatalog(e);
    case "delCatalog":
        return delCatalog(e);
    }
}
function doGet(e) {
    var operation = e.parameter.action;
    switch (operation) {
    case "getLink":
        return getLink();
    }
}
function newCatalog(e) {
    LinkCollector;
    var newSheetName = e.parameter.p1;
    var sourceSheetName = 'Исходник';
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    for (var sheet in sheets) {
        if (sheets[sheet].getSheetName() == newSheetName) {
            ss.setActiveSheet(sheets[0]);
            ss.deleteSheet(sheets[sheet]);
        }
    }
    ss.insertSheet().setName(newSheetName);
    var newSheet = ss.getSheetByName(newSheetName);
    var i = 0;
    var row = newSheet.getRange('A1');
    var newrow = row.offset(0, i);
    i++;
    newSheet.autoResizeColumn(i);
    return ContentService.createTextOutput('ЛИСТ успешно добавлен!');
}
function delCatalog(e) {
    LinkCollector;
    var delSheetName = e.parameter.p1;
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    for (var sheet in sheets) {
        if (sheets[sheet].getSheetName() == delSheetName) {
            ss.setActiveSheet(sheets[0]);
            ss.deleteSheet(sheets[sheet]);
        }
    }
    return ContentService.createTextOutput('ЛИСТ успешно удален!');
}
function addLink(e) {
    var dateTime = 'i' + Date.now();
    var newURL = e.parameter.p1;
    var nameURL = e.parameter.p2;
    var desc = e.parameter.p3;
    var hidden = e.parameter.p4;
    var Link = LinkCollector.getSheetByName(hidden);
    Link.appendRow([dateTime, newURL, nameURL, desc]);
    return ContentService.createTextOutput('Link успешно добавлен!');
}
function getLink() {
    var allsheet = LinkCollector.getSheets();
    var array = [];
    for (var i = 0; i < allsheet.length; i++) {
        var name = allsheet[i].getName();
        var lastrow = allsheet[i].getLastRow();
        var data;
        if (lastrow <= 0) {
            data = [["NO DATA", "NO DATA", "NO DATA", "NO DATA"]];
        } else {
            data = allsheet[i].getRange("A1:D" + lastrow).getValues();
        };
        var people = {
            name: name,
            data: data,
        }
        array.push(people);
    }
    return ContentService.createTextOutput(JSON.stringify(array)).setMimeType(ContentService.MimeType.JSON);
}
function deleteLink(e) {
    var hidden = e.parameter.p1;
    var note = e.parameter.p2;
    var Link = LinkCollector.getSheetByName(hidden);
    var lastrow = Link.getLastRow();
    var array = Link.getRange("A1:A" + lastrow).getValues();
    for (var i = 0; i <= array.length; i++) {
        if (array[i] == note) {
            Link.deleteRow(i + 1);
            break;
        }
    }
    return ContentService.createTextOutput("Задача успешно удалена!");
}
function fillingModal(e) {
    var hidden = e.parameter.p1;
    var note = e.parameter.p2;
    var Link = LinkCollector.getSheetByName(hidden);
    var lastrow = Link.getLastRow();
    var array = Link.getRange("A1:A" + lastrow).getValues();
    for (var i = 0; i <= array.length; i++) {
        if (array[i] == note) {
            var data = Link.getRange("A" + (i + 1) + ":D" + (i + 1)).getValues();
            var people = {
                name: hidden,
                data: data,
            }
            return ContentService.createTextOutput(JSON.stringify(people)).setMimeType(ContentService.MimeType.JSON);
        }
    }
}
function updateLink(e) {
    var hidden = e.parameter.p1;
    var note = e.parameter.p2;
    var Link = LinkCollector.getSheetByName(hidden);
    var newLink = e.parameter.newLink;
    var newName = e.parameter.newName;
    var newDesc = e.parameter.newDesc;
    var lastrow = Link.getLastRow();
    switch (note) {
    case "newLink":
        var col = "B";
    case "newName":
        var col = "C";
    case "newDesc":
        var col = "D";
        break;
    }
    var array = Link.getRange("A1:A" + lastrow).getValues();
    for (var i = 0; i <= array.length; i++) {
        if (array[i] == note) {
            Link.getRange("B" + (i + 1)).setValue(newLink);
            Link.getRange("C" + (i + 1)).setValue(newName);
            Link.getRange("D" + (i + 1)).setValue(newDesc);
            break;
        }
    }
    return ContentService.createTextOutput("Задача успешно обновлена!");
}
