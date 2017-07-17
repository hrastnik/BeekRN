import { AsyncStorage } from "react-native";
const serverBaseUrl = "http://178.62.223.45:9000/";

const NO_JWT = 0;
const HAS_JWT = 1;

export default class RestClient {
  constructor(jwt) {
    if (jwt) {
      this.jwt = jwt;
    }
  }

  setJWT(jwt) {
    this.jwt = jwt;
  }

  login(username, password, onResponse) {
    let url = serverBaseUrl + "login";

    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    let body = "username=" + encodeURIComponent(username);
    body += "&password=" + encodeURIComponent(password);

    fetch(url, {
      method: "POST",
      body: body,
      headers: headersF
    })
      .then(response => {
        if (response.status != 200) {
          throw "Error logging in";
        }

        return response.json();
      })
      .then(data => {
        if (data.error != null) {
          throw data.error;
        }

        if (data.jwt != null) {
          this.jwt = data.jwt;
        }

        onResponse(null, data);
      })
      .catch(error => {
        console.log("Login error");
        console.log(error);
        onResponse(error);
      });
  }

  isLoggedIn(onResponse) {
    if (this.jwt == null) {
      return onResponse(null, false);
    }

    let url = serverBaseUrl + "isLoginValid";

    let headers = new Headers();
    headers.append("Cookie", "jwt=" + this.jwt);

    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (response.status == 401) {
          this.jwt = null;
          onResponse(null, false);
        } else if (response.status == 200) {
          onResponse(null, true);
        } else {
          throw "Error connecting to server";
        }
      })
      .catch(error => {
        onResponse(error);
      });
  }
}
