var myApp = "https://script.google.com/macros/s/AKfycbzcsJ0BcQJa1c6-3Dwsqeie7lgrLkhRfC1DnXbI2g4v38g4LoQ/exec";
//URL нашего приложения

$( document ).ready(function() {
	getLinks ();

	$('#myForm').submit(function(event) {
		event.preventDefault();
		var newURL = $("#newURL").val();
		var nameURL = $("#nameURL").val();
		var desc = $("#desc").val();
		var action = "addLink";
		var xhr = new XMLHttpRequest();
		var body = 'p1=' + encodeURIComponent(newURL) + '&p2=' + encodeURIComponent(nameURL)  + '&p3=' + encodeURIComponent(desc) + '&action=' + encodeURIComponent(action);
		xhr.open("POST", myApp, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById("myForm").reset();//сбрасываем форму
				$("#openModal").hide();//скрываем модалку 
				getLinks ();//обновляем список задач
				}
			};
			
		try { xhr.send(body);} 
		catch (err) {console.log(err) }
		
	});
});

function getLinks () {
    var action = "getLink";
    var url = myApp+"?action="+action

    //подготавливаем и выполняем GET запрос
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
			//в случае успеха преобразуем полученный ответ в JSON и передаем отдельной функции, которая сформирует нам таблицу
        	var data = JSON.parse(xhr.response);
        	linkTable (data);
        }
	};
		try { xhr.send(); } 
		catch (err) {console.log(err) }
};

	//функция, которая обработает данные, полученные при выполнении запроса и сформирует из них таблицу
function linkTable (data) {
	$('.tblbody').html( function () {	
		var td = '';
		for ( i = 0; i < data.length; i++) {
			td +=   '<tr>'+
					'<td>'+'<a href="https://'+ data[i][1] +'"'+ 'class="URL" target="_blank">'+ 
					data[i][1] +
					'</td>'+
					'</tr>'+
					'<tr>'+
					'<td>'+data[i][2]+'</td>'+
					'</tr>'+
					'<tr>'+
					'<td>'+data[i][3]+'</td>'+
					'</tr>'+
					'<tr>'+
					'<td hidden="true" >'+data[i][0]+'</td>'+
				'<td><button type="button" id="btn_modal_window" onclick="fillingModal(\''+data[i][0]+'\')">Изменить</button></td>'+
				
					'<td><button type="button" class="btn btn-link" onclick="deleteLink(\''+data[i][0]+'\')">Удалить</button></td>'+
					'</tr>';
		}
		//собираем и возвращаем готовую таблицу
		return '<table class="table"><tbody>'+td+'</tbody></table>'
		
	})
}


function deleteLink (link) {
	var action = "deleteLink";
	var xhr = new XMLHttpRequest();
	var body = 'link=' + encodeURIComponent(link) + '&action=' + encodeURIComponent(action);
	xhr.open("POST", myApp, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
//        	alert(xhr.response);
		getLinks ();//обновляем список задач
        }
    };
	try { xhr.send(body);} catch (err) {console.log(err) }
}


function fillingModal(link) {
	
	var action = "fillingModal";
	var xhr = new XMLHttpRequest();
    var body = 'link=' + encodeURIComponent(link) + '&action=' + encodeURIComponent(action);
	xhr.open("POST", myApp, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
		   //в случае успеха преобразуем полученный ответ в JSON и передаем отдельной функции
		/* 	alert(xhr.response); */
			var data = JSON.parse(xhr.response);
			updateLinkModal(data);
		}
	}
	try { xhr.send(body);} catch (err) {console.log(err) }

}


function updateLinkModal(data) {
	
	var title = 'Редактировать данные';
   for ( i = 0; i < data.length; i++ ) {
			var input = '<div class="form-group">'+
			                '<textarea name="text" id="newLink">'+ data[i][1]+'</textarea>' +
							'<textarea type="text" id="newName">' +data[i][2]+'</textarea>' +
							'<textarea type="text" id="newDesc">' + data[i][3]+'</textarea>' +
			            '</div>';
				break;
   }
	
	var form = '<form id="updateLinkForm" onsubmit="return true;">'+input+'</form>';
		var buttons = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>'+
            	      '<button type="button" class="btn btn-success" onclick="updateLink(\''+data[i][0]+'\')">Сохранить</button>';

	$('#updateLinkModal .modal-header .modal-title').html(title);
	$('#updateLinkModal .modal-body').html(form);
	$('#updateLinkModal .modal-footer').html(buttons);
	$("#updateLinkModal").show();

}


function updateLink(link) {
		var action = "updateLink";
		var newLink = $('#newLink').val();
		var newName = $('#newName').val();
		var newDesc = $('#newDesc').val();
		var xhr = new XMLHttpRequest();
		var body = 'link=' + encodeURIComponent(link) + '&newLink=' + encodeURIComponent(newLink) + '&newName=' + encodeURIComponent(newName)+ '&newDesc=' + encodeURIComponent(newDesc) + 
		'&action=' + encodeURIComponent(action);
		xhr.open("POST", myApp, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				$("#updateLinkModal").hide();
			getLinks ();//обновляем список задач
			}
		};
		try { xhr.send(body);} catch (err) {console.log(err) }

	}
	
$( document ).ready(function(){

		$('.catalog').click(function() {
  $('.tblbody').toggle();
})
	$('.catalog2').click(function() {
  $('.tblbody2').toggle();
})
})

