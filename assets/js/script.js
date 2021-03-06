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
var tStatus = $('#transfer');
var patientInfo = JSON.parse(localStorage.getItem('patientinfo')) || [];
var symptomsInfo = JSON.parse(localStorage.getItem('symptoms'));
var patient = '';

submitForm.on('click', function submitInfo(patient) {
  patientInfo = JSON.parse(localStorage.getItem('patientinfo'));

  if (!localStorage.getItem('i')) {
    localStorage.setItem('i', '0');
  }

  var id = parseInt(localStorage.getItem('i'));
  id++;
  localStorage.setItem('i', id);

  if (!patientInfo) {
    patientInfo = [];
  }

  var patient = {
    firstName: firstName.val(),
    lastName: lastName.val(),
    address: address.val(),
    responder: idNum.val(),
    birthYear: birthYear.val(),
    notes: notes.val(),
    bloodPressure: bp.val(),
    gender: gender.val(),
    transfer: tStatus.val(),
    uId: id,
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
    'uk-card uk-margin-bottom uk-card-default uk-card-body uk-width-1-1@m start'
  );
  start.attr('data-index', '+data[i].re');
  start.attr('data-number', c.uId);

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
      '</li> <li> NOTES: ' +
      c.notes +
      '</li> <li> TRANSFER STATUS: ' +
      c.transfer +
      '</li> </ul>'
  );
  $(b).attr('class', 'p');
  start.append(b);
  $('.add-test').append(start);

  var cb = $(
    '<a class="uk-button uk-button-danger uk-float-right" id="clear-button"> CLEAR PATIENT </a>'
  );
  start.append(cb);
}

/*------------------- medical api -------------------- */

fetch('https://api.endlessmedical.com/v1/dx/GetFeatures')
  .then((response) => {
    return response.json();
  })
  .then((symptoms) => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms.data));
  });

// auto complete function

$(document).ready(function () {
  var name = JSON.parse(localStorage.getItem('symptoms'));

  for (var i = 0; i < name.length; i++) {
    $('#autocomplete').autocomplete({
      source: name,
      minLength: 1,
      delay: 0,
    });
  }
  console.log(name);
});

//  --------- WORK ON THIS, FINAL ITEM ---------
$('.add-button').on('click', function (added) {
  added.preventDefault();
  fillNotes();
  console.log(textVal);
});

let fillNotes = () => {
  var textVal = $('.symptoms').val();
  let ele = document.getElementById('notes');
  ele.innerHTML += textVal + ', ';
};

// Bonuses, not necessary

var clearEl = $(this).parent();
var clearButton = $('.start a');

clearButton.on('click', clearEl, function (e) {
  e.preventDefault();
  console.log('clear data-number', $(this).parent().attr('data-number'));
  //$(this).parent().remove();
  removeFromList($(this).parent().attr('data-number'));
});

function removeFromList(patientID) {
  // get item from local storage
  var patientsArr = JSON.parse(localStorage.getItem('patientinfo'));

  //clear container of cards (jquery)
  patientsArr.forEach((patient, index) => {
    var idString = patient.uId.toString();
    if (idString === patientID) {
      console.log('matched');
      patientsArr.splice(index, 1);
      console.log(patientsArr);
      localStorage.setItem('patientinfo', JSON.stringify(patientsArr));
      location.reload();
    }
  });
}
