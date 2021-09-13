//--------------------- Saving Patient Form ---------------//

var firstName = $('#first-name');
var lastName = $('#last-name');
var birthYear = $('#age');
var address = $('#address-input');
var idNum = $('#response-id');
var gender = $('#gender');
var bp = $('#blood-pressure');
var notes = $('#notes');
var submitForm = $('.form-submit');
var patientInfo = JSON.parse(localStorage.getItem('patientinfo')) || [];
var symptomsInfo = JSON.parse(localStorage.getItem('symptoms'));
var patient = '';

submitForm.on('click', function submitInfo(patient) {
  patientInfo = JSON.parse(localStorage.getItem('patientinfo'));

  if (!patientInfo) {
    patientInfo = [];
  }

  var patient = {
    firstName: firstName.val(),
    lastName: lastName.val(),
    address: address.val(),
    responder: idNum.val(),
    //birthDay: birthDay.val(),
    //birthMonth: birthMonth.val(),
    birthYear: birthYear.val(),
    notes: notes.val(),
    bloodPressure: bp.val(),
    gender: gender.val(),
  };

  patientInfo.push(patient);
  localStorage.setItem('patientinfo', JSON.stringify(patientInfo));
});

if (window.location.href.match('existingpatient.html') != null) {
  console.log('works');
  loadPatientList();
}

function loadPatientList() {
  patientInfo = JSON.parse(localStorage.getItem('patientinfo'));
  console.log(patientInfo);

  for (var i = 0; i < patientInfo.length; i++) {
    addToList(patientInfo[i]);
  }
}

function addToList(c) {
  var start = $('<div>');
  start.attr(
    'class',
    'uk-card uk-card-default uk-card-body uk-width-1-1@m start'
  );

  var a = $('<h3>' + c.firstName + ' ' + c.lastName + '</h3>');
  $(a).attr('class', 'uk-card-title nameEl test-content');
  start.append(a);

  var b = $(
    '<ul><li> ADDRESS: ' +
      c.address +
      '</li><li> GENDER: ' +
      c.gender +
      '</li> <li> BLOOD PRESSURE: ' +
      c.bloodPressure +
      '</li> <li> RESPONDER ID #: ' +
      c.responder +
      '</li></ul>'
  );
  $(b).attr('class', 'p');
  start.append(b);
  $('.add-test').append(start);
}

/*------------------- medical api -------------------- */

fetch(
  'https://sandbox-healthservice.priaid.ch/symptoms?language=en-gb&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1mLm1pY2hhZWxmaXNjaGVyQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTYyOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOC0zMSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjMxNDEwODAzLCJuYmYiOjE2MzE0MDM2MDN9.TFmm_adga7777JuuBuqo6PeGReIykD_g05S9JiPcf98'
)
  .then((response) => {
    return response.json();
  })
  .then((symptoms) => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
  });

// auto complete function

function saveArr() {
  var obj = {
      metadata: {
        products: symptomsInfo,
      },
    },
    name = obj.metadata.products
      .map(function (product) {
        return product.Name;
      })
      .join(', ');

  localStorage.setItem('nameString', name);
  console.log(name);
}

$(document).ready(function () {
  var name = localStorage.getItem('nameString');

  for (var i = 0; i < name.length; i++) {
    // Creating an array with country names and load them into local storage
    // Adding autocmplete functionality to a textfield with data from local storage
    $('#autocomplete').autocomplete({
      source: name,
      minLength: 1,
      delay: 0,
    });
  }
  console.log(name);
});
