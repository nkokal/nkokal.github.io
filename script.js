
/**
 * API
 * this is a class that will house our connections to the api
 */
class API {
  constructor() {
    this.url = "https://the-iris-api.herokuapp.com/api/v1";
  }

  get(path, callback = function() {}) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open("GET", `${this.url}${path}`, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  post(path, body, callback = function() {}) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState === 4 && xmlHttp.status === 201) {
        callback(JSON.parse(xmlHttp.response));
      }
    }
    xmlHttp.open("POST", `${this.url}${path}`, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(body);
  }

}

const api = new API();

function submitEmail() {
  const payload = { email: document.getElementById("js-input-form-email").value };

  api.post("/emails", JSON.stringify(payload));
}


function submitTextData() {
  const payload = { text: document.querySelector(".textInputBox").value };

  api.post("/data", JSON.stringify(payload));
  api.post("/data/analyze", JSON.stringify(payload), function(data) {
    insertInsight(data)
  })
}

function insertInsight(insightResponse) {
  var what_they_care_about = document.getElementById("care");
  var their_communication_style = document.getElementById("communicate");
  var how_they_make_decisions = document.getElementById("decisions");
  var how_they_show_their_affection = document.getElementById("affection");
  var how_to_make_them_happy = document.getElementById("happy");
  var their_perfect_date = document.getElementById("date");

  what_they_care_about.innerHTML = insightResponse.what_they_care_about
  their_communication_style.innerHTML = insightResponse.their_communication_style
  how_they_make_decisions.innerHTML = insightResponse.how_they_make_decisions
  how_they_show_their_affection.innerHTML = insightResponse.how_they_show_their_affection
  how_to_make_them_happy.innerHTML = insightResponse.how_to_make_them_happy
  their_perfect_date.innerHTML = insightResponse.their_perfect_date
}