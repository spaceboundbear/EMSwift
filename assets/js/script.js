var firstNameInput = document.querySelector("#first_name")
var lastNameInput= document.querySelector("#last_name")
var symptomsInput = document.querySelector("#symptoms")
var addressInput = document.querySelector("#address")
var responderInput = document.querySelector("#responder")
var saveButton = document.querySelector(".save")


$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.fixed-action-btn').floatingActionButton();
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });
});

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://priaid-symptom-checker-v1.p.rapidapi.com/body/locations/15?language=en-gb",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
		"x-rapidapi-key": "SIGN-UP-FOR-KEY"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});