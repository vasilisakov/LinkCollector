var myApp = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$(document).ready(function () {
    getLinks();
    $(document).on('click', '.catalog', function () {
        $(this).next().toggle();
    });
	
	
    $('#Catalog').submit(function (event) {
        event.preventDefault();
        var nameCatalog = $("#nameCatalog").val();
        var action = "newCatalog";
        var xhr = new XMLHttpRequest();
        var body = 'p1=' + encodeURIComponent(nameCatalog) + '&action=' + encodeURIComponent(action);
        xhr.open("POST", myApp, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("Catalog").reset();
                $("#openModal2").hide();
                location.reload();
            }
        };
        try {
            xhr.send(body);
        } catch (err) {
            console.log(err)
        }
    });
	
	
	
	
    $('#delCatalog').submit(function (event) {
        event.preventDefault();
        var nameCatalog = $('#delCat').val();
        var action = "delCatalog";
        var xhr = new XMLHttpRequest();
        var body = 'p1=' + encodeURIComponent(nameCatalog) + '&action=' + encodeURIComponent(action);
        xhr.open("POST", myApp, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                $("#delCatalog").hide();
                location.reload();
            }
        };
        try {
            xhr.send(body);
        } catch (err) {
            console.log(err)
        }
    });
});
function AddLink(event) {
    var newURL = $('#newURL').val();
    var nameURL = $('#nameURL').val();
    var desc = $('#desc').val();
    var action = "addLink";
    var hidden = $('#hidden').val();
    var xhr = new XMLHttpRequest();
    var body = 'p1=' + encodeURIComponent(newURL) + '&p2=' + encodeURIComponent(nameURL) + '&p3=' + encodeURIComponent(desc) + '&p4=' + encodeURIComponent(hidden) + '&action=' + encodeURIComponent(action);
    xhr.open("POST", myApp, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("LinkForm").reset();
            $("#LinkModal").hide();
            location.reload();
        }
    };
    try {
        xhr.send(body);
    } catch (err) {
        console.log(err)
    }
};
function LinkModal(data) {
    var title = 'Data entry window';
    var input = '<div class="form-group">' + '<input type="text" id="newURL" placeholder="Add new URL">' + '<input type="text" id="nameURL" placeholder="Add name URL">' + '<input type="text" id="desc" placeholder="Add description">' + '<input type="hidden" id="hidden" value="' + data + '">' + '<button type="submit" onclick="AddLink(event);">addURL</button>' + '</div>';
    var form = '<form id="LinkForm">' + input + '</form>';
    var buttons = '<button type="button" onclick="closeLinkModal()">Cancel</button>';
    $('#LinkModal .modal-header .modal-title').html(title);
    $('#LinkModal .modal-body').html(form);
    $('#LinkModal .modal-footer').html(buttons);
    $("#LinkModal").show();
}
function getLinks() {
    var action = "getLink";
    var url = myApp + "?action=" + action
        var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var linki = JSON.parse(xhr.response);
            linkTable(linki);
        }
    };
    try {
        xhr.send();
    } catch (err) {
        console.log(err)
    }
};
function linkTable(linki) {
    let Catalog = document.getElementById('catalogs');
    linki.forEach(function (elem) {
        let container = document.createElement('div');
        let table = document.createElement('div');
        let application = document.createElement('div');
        let button = document.createElement('button');
        let delCatalog = document.createElement('button');
        Catalog.appendChild(container);
        delCatalog.setAttribute('onclick', `delCatalog("${elem.name}")`);
        delCatalog.innerHTML = 'delCatalog';
        application.append(delCatalog);
        container.setAttribute('class', 'container');
        container.setAttribute('name', `${elem.name}`);
        container.innerHTML = `<h2 class="catalog">${elem.name}</h2>`;
        application.setAttribute('style', 'display: none');
        container.append(application);
        button.setAttribute('onclick', `LinkModal("${elem.name}");`);
        button.innerHTML = `Data entry window`;
        application.append(button);
        table.setAttribute('class', 'tblbody');
        table.setAttribute('id', `${elem.name}`);
        application.append(table);
        Catalog.appendChild(container);
        $(`#${elem.name}`).html(function () {
            var td = '';
            for (i = 0; i < elem.data.length; i++) {
                td += '<tr>' + '<td>' + '<a href="https://' + elem.data[i][1] + '"' + 'id="' + elem.data[i][0] + '"' + 'class="URL" target="_blank">' +
                elem.data[i][1] + '</td>' + '</tr>' + '<tr>' + '<td>' + elem.data[i][2] + '</td>' + '</tr>' + '<tr>' + '<td>' + elem.data[i][3] + '</td>' + '</tr>' + '<tr>' + '<td hidden="true" >' + elem.data[i][0] + '</td>' + 
				'<td><button   onclick="copytext('+ elem.data[i][0] +')">Copy</button></td>' + 
				'<td><button   onclick="fillingModal([\'' + table.id + '\',\'' + elem.data[i][0] + '\'])">Edit</button></td>' + 
				'<td><button type="button"  onclick="deleteLink([\'' + table.id + '\',\'' + elem.data[i][0] + '\'])">Delete</button></td>' + '</tr>';
            }
            return '<table class="table"><tbody>' + td + '</tbody></table>'
        })
    });
};
function deleteLink(link) {
    var action = "deleteLink";
    var xhr = new XMLHttpRequest();
    var body = 'p1=' + encodeURIComponent(link[0]) + '&p2=' + encodeURIComponent(link[1]) + '&action=' + encodeURIComponent(action);
    xhr.open("POST", myApp, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            location.reload();

        }
    };
    try {
        xhr.send(body);
    } catch (err) {
        console.log(err)
    }
}
function fillingModal(link) {
    var action = "fillingModal";
    var xhr = new XMLHttpRequest();
    var body = 'p1=' + encodeURIComponent(link[0]) + '&p2=' + encodeURIComponent(link[1]) + '&action=' + encodeURIComponent(action);
    xhr.open("POST", myApp, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.response);
            updateLinkModal(data);
        }
    }
    try {
        xhr.send(body);
    } catch (err) {
        console.log(err)
    }
}
function updateLinkModal(elem) {
    var title = 'Edit data' + '<button type="button" class="close" onclick="closeLink()"><span aria-hidden="true">X</span></button>';
    for (i = 0; i < elem.data.length; i++) {
        var input = '<div class="form-group">' + '<textarea name="text" id="newLink">' + elem.data[i][1] + '</textarea>' + '<textarea type="text" id="newName">' + elem.data[i][2] + '</textarea>' + '<textarea type="text" id="newDesc">' + elem.data[i][3] + '</textarea>' + '</div>';
        break;
    }
    var form = '<form id="updateLinkForm" onsubmit="return true;">' + input + '</form>';
    var buttons = '<button type="button" onclick="closeLink()">Cancel</button>' + '<button type="button" class="btn btn-success" onclick="updateLink([\'' + elem.name + '\',\'' + elem.data[i][0] + '\'])">Save</button>';
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
    var body = 'p1=' + encodeURIComponent(link[0]) + '&p2=' + encodeURIComponent(link[1]) + '&newLink=' + encodeURIComponent(newLink) + '&newName=' + encodeURIComponent(newName) + '&newDesc=' + encodeURIComponent(newDesc) + '&action=' + encodeURIComponent(action);
    xhr.open("POST", myApp, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            $("#updateLinkModal").hide();
            alert(xhr.response);
            location.reload();

        }
    };
    try {
        xhr.send(body);
    } catch (err) {
        console.log(err)
    }
}
function delCatalog(data) {
    var title = 'Delete entire directory?';
    var input = '<div class="form-group">' + '<input type="hidden" id="delCat" value="' + data + '">' + data + '</input>' + '</div>';
    var buttons = '<button type="button" onclick="closeCatalog()">Cancel</button>' + '<button type="submit">Delete</button>';
    var form = '<form id="delete" onsubmit="return true;">' + input + buttons + '</form>';
    $('#delCatalog .modal-header .modal-title').html(title);
    $('#delCatalog .modal-body').html(form);
    $("#delCatalog").show();
};
function closeLink() {
    $("#updateLinkModal").hide();
	};
	function openModal2() {
    $("#openModal2").show();
	};
	function closeModal2() {
    $("#openModal2").hide();
	};
function closeLinkModal() {
    $("#LinkModal").hide();
	};
function closeCatalog() {
    $("#delCatalog").hide();
	};
function copytext(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(el).text()).select();
    document.execCommand("copy");
    $tmp.remove();
	};
