
var link = localStorage.getItem("img")
console.log(link)
$(".editor").html(`<img src="${link}" class="editor"/>`);


// Request to create new order at 
$("#giftbtn").on('click', function () {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://represent.com/api/fulfilment/products/12345?ImageGift=' + link);

    request.setRequestHeader('Gift', '');

    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
    }
    };

    request.send();

});