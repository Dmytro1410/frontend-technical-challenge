const baseUrl = "http://localhost:5000";
const headers = {
  "Content-Type": "application/json",
};

export const apiRequest = async ({
  method,
  url,
  body,
}: {
  method: string;
  url: string;
  body?: any;
}) => {
  let request;
  switch (method) {
    case "get":
      request = fetch(baseUrl + url, {
        headers,
        method: "GET",
      });
      break;
    case "post":
    default:
      request = fetch(baseUrl + url, {
        headers,
        method: "POST",
        body: JSON.stringify({ body }),
      });
  }

  return request
    .then((response) => response.json())
    .then((data) => ({
      data,
    }));
};
