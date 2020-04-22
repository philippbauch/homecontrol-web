type HttpMethod = "DELETE" | "GET" | "POST" | "PUT";

export class HttpClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  private prepareRequest(method: HttpMethod, body?: any): RequestInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (body) {
      body = JSON.stringify(body);
    }

    return { body, headers, method, credentials: "include" };
  }

  private prepareUrl(endpoint: string) {
    if (!endpoint.startsWith("/")) {
      endpoint = "/" + endpoint;
    }

    return this.url + endpoint;
  }

  private async request(method: HttpMethod, endpoint: string, body?: any) {
    const request = this.prepareRequest(method, body);
    const url = this.prepareUrl(endpoint);

    const response = await fetch(url, request);

    const { data, error } = await response.json();

    if (error) {
      throw new Error(error.id);
    }

    return data;
  }

  delete(endpoint: string, body?: any) {
    return this.request("DELETE", endpoint, body);
  }

  get(endpoint: string, body?: any) {
    return this.request("GET", endpoint, body);
  }

  post(endpoint: string, body?: any) {
    return this.request("POST", endpoint, body);
  }

  put(endpoint: string, body?: any) {
    return this.request("PUT", endpoint, body);
  }
}

const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not specified");
}

export default new HttpClient(API_URL);
