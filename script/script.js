


    $('#send').onclick(function() {
        var newURL = $("#newURL").val();
        var nameURL = $("#nameURL").val();
        var desc = $("#desc").val();
        var http = new XMLHttpRequest();
        var url = "https://script.google.com/macros/s/AKfycbwBJGTk4z_oxZIi1z_JjrP5u-VWK9q52cgqy8H1iG2G1Zt6ssPV/exec";
        var params = "p1="+newURL+"&p2="+nameURL+"&p3="+desc;
        http.open("GET", url + "?" + params, true);
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                //alert(http.responseText);
            }
        }
        http.send(null);
    });


