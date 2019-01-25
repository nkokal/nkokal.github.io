
// Constants

class API {
  constructor() {
    this.url = "https://damp-plateau-89390.herokuapp.com/api/v1";
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

}

const api = new API();

api.get('', )