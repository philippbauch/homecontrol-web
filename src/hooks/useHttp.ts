import moment from "moment";
import { useCallback, useState } from "react";

const baseUrl = process.env.REACT_APP_API_URL;

function sanitizeEndpoint(endpoint: string) {
  if (!endpoint.startsWith("/")) {
    endpoint = "/" + endpoint;
  }

  return endpoint;
}

export enum HttpMethod {
  DELETE = "DELETE",
  GET = "GET",
  POST = "POST",
  PUT = "PUT"
}

export function useHttp() {
  const [loading, setLoading] = useState<boolean>(false);

  const http = useCallback(
    async (method: HttpMethod, endpoint: string, body?: any) => {
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

      const url = baseUrl + sanitizeEndpoint(endpoint);
      const init: RequestInit = { body, headers, method };

      setLoading(true);

      var response = await fetch(url, init);

      setLoading(false);

      const { data, error } = await response.json();

      if (error) {
        throw new Error(error.id);
      }

      return data;
    },
    []
  );

  return { http, loading };
}
