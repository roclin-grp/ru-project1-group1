/* Commenting this code out temporarily
var link = localStorage.getItem("img")
console.log(link)
$(".editor").html(`<img src="${link}" class="editor"/>`);
*/


// existing code from edit.js; this gets the searched image from localstorage
var link = localStorage.getItem("img")
console.log(link)
// loads image into the div
$(".editor").html(`<img src="${link}" class="editor"/>`);

// this is the default text displayed on load, I'm adding the Chuck Norris joke API to fill this in on default
$( document ).ready(function() {
	var text_title = "";
	var chuckURL = `http://api.icndb.com/jokes/random`;

        $.ajax({
            url: chuckURL,
            method: "GET"
        }).then(function (response) {
            var chuckJoke = ""
            for (i = 0; i < 1; i++) {
                var res = response.hits[i]
                chuckJoke = res
                console.log(chuckJoke)
		var text_title = chuckJoke
            }
		
        });
	
};

// this gets the imageLoader id, (which is used to upload images)
var imageLoader = document.getElementById('imageLoader');
	// the event is listening for a file, and calls the handleImage function
	imageLoader.addEventListener('change', handleImage, false);

// gets the canvas element and turns it into a variable we can use
var canvas = document.getElementById('imageCanvas');

//  canvas.js method to set the context for image type
var ctx = canvas.getContext('2d');
// canvas.js method to create, or instantiate, a new image object
var img = new Image();
// this modifies the CORS to allow us to make changes to the image
img.crossOrigin="anonymous";

// listens for the page to load, then calls the function "drawplaceholder"
window.addEventListener('load', DrawPlaceHolder)

// on load draw function
function DrawPlaceHolder() {
	image.onload = function() {
		DrawOverlay(img);
		DrawText();
		DynamicText(img)
	};
	// looking to load the default image as the searched result from the previous page
	img.src = link 
};

//creates the location where the text will be drawn
function DrawOverlay(img) {
	ctx.drawImage(img,0,0);
	ctx.fillStyle = 'rgba(30, 144, 255, 0.4)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// creates the text itself 
function DrawText() {
	ctx.fillStyle = "white";
	ctx.textBaseline = 'middle';
	ctx.font = "50px 'Montserrat'";
	ctx.fillText(text_title, 50, 50);

};

// this function uplaods an image
function handleImage(e) {
	var reader = new FilerReader();
	var img = "";
	var src = "";
	reader.onload = function(event) {
		img = new Image();
		img.onload = function() {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img,0,0);
		}
		img.src = event.target.result;
		src = event.target.result;
		canvas.classList.add("show");
		DrawOverlay(img);
		DrawText();
		DynamicText(img);
	}

	// this method may be helpful to later save and export the image to another API
	reader.readAsDataURL(e.target.files[0]);

};

// declaring a variable which can be saved when the file is downloaded to use in the gift API
var completedImage = ""
// is this also a method we need to re-write to save the image+text overlay after we complete editing?
function convertToImage() {
	window.open(canvas.toDataURL('png'));
	completedImage = canvas.toDataURL('png');
};


//this would allow us to download the image to local as a png file
// did I properly write this onclick function?
$('#download').on('click', function (event) {
	convertToImage();
}
		  
		  
// I still doubt that this is going to work, unless I hear back from a representative
// They denied my application and we DO need a valid API key
$("#buyGift").on("click", function() {
		  
	var request = new XMLHttpRequest();

	request.open('POST', 'https://represent.com/api/fulfilment/orders?buyGift=' + completedImage);

	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer your_api_key');

	request.onreadystatechange = function () {
  	if (this.readyState === 4) {
    	console.log('Status:', this.status);
    	console.log('Headers:', this.getAllResponseHeaders());
    	console.log('Body:', this.responseText);
  	}
	};
	
	var body = {
    	'type': 'order',
    	'reference': '<your-reference-id>',
    	'products': [
	        {
	            'product_id': 12345
            	'variant_id': 'black',
            	'size': 'M',
            	'quantity': 1
        	},
        	{
	            'product_id': 12345
	            'variant_id': 'white',
	            'size': 'S',
	            'quantity': 1
	        }
    	],
    	'to_address': {
	        'full_name': 'John Doe',
	        'shipping1': '1680 Vine St',
	        'shipping2': 'Suite 400',
	        'city': 'Los Angeles',
	        'zip': '90028',
	        'state': 'CA',
        	'country': 'US'
    	}
	};

	request.send(JSON.stringify(body));
};
