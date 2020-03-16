var myApp = "https://script.google.com/macros/s/AKfycbwmtjC6DDc5AvOMIsjvCXhn8MQie2CTnBQBtU9SU4YKcphJ2Dkt/exec";
//URL нашего приложения


$(document).ready(function() {
	getLinks ();
	
	
	$(document).on('click','.catalog', function(){
		$(this).next().toggle();
});
	
	$('[name != myForm]').submit(function(event) {
		event.preventDefault();
		var newURL = $('[name = newURL]').val();
		var nameURL = $('[name = nameURL]').val();
		var desc = $('[name = desc]').val();
		var action = "addLink";
		var hidden = $('[name = hidden]').val();
		var xhr = new XMLHttpRequest();
		var body = 'p1=' + encodeURIComponent(newURL) + '&p2=' + encodeURIComponent(nameURL)  + '&p3=' + encodeURIComponent(desc) + '&p4=' + encodeURIComponent(hidden) + '&action=' + encodeURIComponent(action);
		xhr.open("POST", myApp, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementsByName("myForm").reset();//сбрасываем форму
				$("#openModal").closest();//скрываем модалку 
				getLinks ();//обновляем список задач
				}
			};
			
		try { xhr.send(body);} 
		catch (err) {console.log(err) }
		
	});
	
	
	
	
	
	
$('#Catalog').submit(function(event) {
		event.preventDefault();
		var nameCatalog = $("#nameCatalog").val();
		var action = "newCatalog";
		var xhr = new XMLHttpRequest();
		var body = 'p1=' + encodeURIComponent(nameCatalog) + '&action=' + encodeURIComponent(action);
		xhr.open("POST", myApp, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById("Catalog").reset();//сбрасываем форму
				$("#openModal2").hide();//скрываем модалку 
				alert("OK");
				getLinks ();//обновляем список задач
				}
			};
			
		try { xhr.send(body);} 
		catch (err) {console.log(err) }
		
	});

});


function LinkModal(data) {
	
	var title = 'Окно ввода данных';
   
			var input = '<div class="form-group">'+
			                '<input type="text" id="newURL" placeholder="Add new URL">' +
							'<input type="text" id="nameURL" placeholder="Add name URL">' +
							'<input type="text" id="desc" placeholder="Add description">' +
							'<input type="hidden" id="hidden" value="' +data +'">' +
			            '</div>';
			
	var form = '<form id="LinkForm" onsubmit="return true;">'+input+'</form>';
		var buttons = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>';
            	      

	$('#LinkModal .modal-header .modal-title').html(title);
	$('#LinkModal .modal-body').html(form);
	$('#LinkModal .modal-footer').html(buttons);
	$("#LinkModal").show();

}

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
        	var linki = JSON.parse(xhr.response);
        	linkTable (linki);
        }
	};
		try { xhr.send(); } 
		catch (err) {console.log(err) }
};

	//функция, которая обработает данные, полученные при выполнении запроса и сформирует из них таблицу

function linkTable (linki) {
	let Catalog = document.getElementById('catalogs');
	
	linki.forEach(function (elem) {
		let container = document.createElement('div');
		let table = document.createElement('div');
		let application = document.createElement('div');
		let button = document.createElement('button');

		Catalog.appendChild(container);

		container.setAttribute('class', 'container');
        container.setAttribute('name', `${elem.name}`);
	    container.innerHTML = `<h2 class="catalog">${elem.name}</h2>`;
		application.setAttribute('style', 'display: none');
		container.append(application);
		button.setAttribute('onclick', `LinkModal("${elem.name}");`);
		
		button.innerHTML = `Окно ввода данных`;
		application.append(button);
		table.setAttribute('class', 'tblbody');
		table.setAttribute('id', `${elem.name}`);
		application.append(table);
		Catalog.appendChild(container);

		
		
		$(`#${elem.name}`).html( function () {	
		var td = '';
		for ( i = 0; i < elem.data.length; i++) {
			td +=   '<tr>'+
					'<td>'+'<a href="https://'+ elem.data[i][1] +'"'+ 'class="URL" target="_blank">'+ 
					elem.data[i][1] +
					'</td>'+
					'</tr>'+
					'<tr>'+
					'<td>'+elem.data[i][2]+'</td>'+
					'</tr>'+
					'<tr>'+
					'<td>'+elem.data[i][3]+'</td>'+
					'</tr>'+
					'<tr>'+
					'<td hidden="true" >'+elem.data[i][0]+'</td>'+
				'<td><button  id="btn_modal_window" onclick="fillingModal(\''+elem.data[i][0]+'\')">Изменить</button></td>'+
					'<td><button type="button" class="btn btn-link" onclick="deleteLink(\''+elem.data[i][0]+'\')">Удалить</button></td>'+
					'</tr>';
		}
		//собираем и возвращаем готовую таблицу
		return '<table class="table"><tbody>'+td+'</tbody></table>'
		
	})
	
	
	});
		
		
};

	













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

	function newCatalog(){
		var action = "newCatalog";
    var url = myApp+"?action="+action

    //подготавливаем и выполняем GET запрос
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
			//в случае успеха преобразуем полученный ответ в JSON и передаем отдельной функции, которая сформирует нам таблицу
        	var data = JSON.parse(xhr.response);
        	alert(xhr.response);
        }
	};
		try { xhr.send(); } 
		catch (err) {console.log(err) }
};
		
  

