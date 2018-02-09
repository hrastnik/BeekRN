import { AsyncStorage } from "react-native";
const serverBaseUrl = "http://178.62.223.45:9000/";

export default class RestClient {
  constructor(jwt) {
    if (jwt) {
      this.jwt = jwt;
    }
  }

  setJWT(jwt) {
    this.jwt = jwt;
  }

  async login(username, password) {
    let url = serverBaseUrl + "login";

    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    let body = "username=" + encodeURIComponent(username);
    body += "&password=" + encodeURIComponent(password);

    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: headers
    });

    if (response.status != 200) {
      throw "Error logging in";
    }

    const data = await response.json();

    if (data.error != null) {
      throw data.error;
    }

    if (data.jwt != null) {
      this.jwt = data.jwt;
    }

    return data;
  }

  async isLoggedIn() {
    if (this.jwt == null) {
      return false;
    }

    const url = serverBaseUrl + "isLoginValid";

    const headers = new Headers();
    headers.append("Cookie", "jwt=" + this.jwt);

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (response.status == 200) {
      return true;
    } else if (response.status == 401) {
      this.jwt = null;
      return false;
    } else {
      throw "Error connecting to server";
    }
  }

  async getBeeks(latitude, longitude) {
    let url = serverBaseUrl + `beeks/${latitude},${longitude}`;

    let headers = new Headers();
    headers.append("Cookie", "jwt=" + this.jwt);

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (response.status != 200) {
      throw "Server error (" + response.status + ")";
    }

    const data = await response.json();

    if (data.error) {
      throw data.error;
    }

    return data;
  }
}
