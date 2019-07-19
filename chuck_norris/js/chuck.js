function randomFacts(){
    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.chucknorris.io/jokes/random";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var json = JSON.parse(this.responseText);  
            parseResponse(json);
        }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function parseResponse(json){
 document.getElementById("data").innerHTML = "<b>" + json["value"] + "</b>";
}

document.getElementById("logo").addEventListener("click", function(){
randomFacts();
});

randomFacts();