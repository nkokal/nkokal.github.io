
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
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open("POST", `${this.url}${path}`, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(body);
  }

}

const api = new API();


function submitTextData() {
  const payload = { text: document.querySelector(".textInputBox").value };

  api.post("/data", JSON.stringify(payload));
  api.post("/data/analyze", JSON.stringify(payload), function(data) {
    console.log(data)
  })
}