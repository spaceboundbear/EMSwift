//--------------------- Saving Patient Form ---------------//

var firstName = $('#first-name');
var lastName = $('#last-name');
var birthYear = $('#age');
var address = $('#address-input');
var idNum = $('#response-id');
var gender = $('#gender');
var bp = $('#blood-pressure');
var symptomsNumbers = [];
var notes = $('#notes');
var submitForm = $('.form-submit');
var patientInfo = JSON.parse(localStorage.getItem('patientinfo')) || [];
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

/*   if (patientInfo == null) {
    patientInfo = [];
    patientInfo.push(patient);
    localStorage.setItem('patientinfo', JSON.stringify(patientInfo));
    addToList(patient);
  }

  for (var i = 0; i < patientInfo.length; i++) {
    addToList(patientInfo[i]);

    function addToList(c) {
      var start = $('<div> test test');
      $(start).attr(
        'class',
        'uk-card uk-card-default uk-card-body uk-width-1-1@m start'
      );
      $('.add-test').after(start);

      var a = $('<h3>' + c.firstName + ' ' + c.lastName + '</h3>');
      $(a).attr('class', 'uk-card-title nameEl test-content');
      $('.start').append(a);

      var b = $('</p> TEST TEST SET SE TSE ET ETS TE S TES</p>');
      $(b).attr('class', 'p');
      $('.nameEl').after(b);

      var c = $('</div>');
      $('.p').after(c);
    }
  }

/*    $(".nameEl").text(
      patientInfo[i].firstName.toUpperCase() +
        " " +
        patientInfo[i].lastName.toUpperCase()
    );
    $(".address-text").text("Address: " + patientInfo[i].address);
    $(".age-text").text("Age: " + patientInfo[i].birthYear);
    $(".bp-text").text("Blood Pressure: " + patientInfo[i].bloodPressure);
    $(".notes-text").text("Notes: " + patientInfo[i].notes);
    $(".id-text").text("Responder ID#: " + patientInfo[i].responder);
    $(".gender-val").text("Gender: " + patientInfo[i].gender);
  }

/*<ul uk-accordion class="accordion-start">
        <li class="uk-open open-test">
          <a class="uk-accordion-title nameEl test-content" href="#"></a>
          <div class="uk-accordion-content test">
            <div
              class="
                name-test
                uk-card uk-card-default uk-card-body uk-width-1-1@s
              "
            >
              <h5 class="uk-card-title">Info:</h5>
              <p class="address-text"></p>
              <p class="age-text"></p>
              <p class="bp-text"></p>
              <p class="notes-text"></p>
              <p class="id-text"></p>
              <p class="gender-val"></p>
              <a class="uk-button uk-button-danger uk-align-top"
                >Delete Patient</a
              >
            </div>
          </div>
        </li>
      </ul>

//var symptoms =
//'https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1mLm1pY2hhZWxmaXNjaGVyQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTYyOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOC0zMSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjMxMjM0ODI3LCJuYmYiOjE2MzEyMjc2Mjd9.qTYJ1YWtwdhly_qdprtPPkkRQ3Bx7nY_NkeI2UMVa9I&format=json&language=en-gb';

/* var diagnosis =
  'https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=' +
  //symptomsNumbers +
  '&gender=Male' +
  //gender +
  '&year_of_birth=1983' +
  // birthYear +
  '&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1mLm1pY2hhZWxmaXNjaGVyQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTYyOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOC0zMSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjMxMjM1MTIzLCJuYmYiOjE2MzEyMjc5MjN9.Zkr14yldTVoyKfLdt8cWe7qzXueW2-mFgOI3eF3Cs3Q&format=json&language=en-gb';

  */

//console.log(symptoms);
//console.log(diagnosis);

/* fetch(symptoms)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

/*fetch(diagnosis)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
  */
