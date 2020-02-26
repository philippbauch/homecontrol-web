import moment from "moment";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const baseUrl = "http://localhost:8080";

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
  const { token } = useContext(UserContext);
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
    [token]
  );

  return { http, loading };
}
