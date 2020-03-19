import moment from "moment";

export enum HttpMethod {
  DELETE = "DELETE",
  GET = "GET",
  POST = "POST",
  PUT = "PUT"
}

class HttpClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  private prepareUrl(endpoint: string) {
    if (!endpoint.startsWith("/")) {
      endpoint = "/" + endpoint;
    }

    return this.url + endpoint;
  }

  private async request(method: HttpMethod, endpoint: string, body?: any) {
    const timestamp = moment()
      .valueOf()
      .toString();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Timestamp: timestamp
    };

    if (body) {
      body = JSON.stringify(body);
    }

    const token = localStorage.getItem("token");

    if (token) {
      headers.Authentication = token;
    }

    const url = this.prepareUrl(endpoint);
    const init: RequestInit = { body, headers, method };

    const response = await fetch(url, init);

    const { data, error } = await response.json();

    if (error) {
      throw new Error(error.id);
    }

    return data;
  }

  delete(endpoint: string, body?: any) {
    return this.request(HttpMethod.DELETE, endpoint, body);
  }

  get(endpoint: string, body?: any) {
    return this.request(HttpMethod.GET, endpoint, body);
  }

  post(endpoint: string, body?: any) {
    return this.request(HttpMethod.POST, endpoint, body);
  }

  put(endpoint: string, body?: any) {
    return this.request(HttpMethod.PUT, endpoint, body);
  }
}

const apiUrl = process.env.REACT_APP_API_URL;

if (!apiUrl) {
  throw new Error("URL of the API is not given.");
}

export const client = new HttpClient(apiUrl);
