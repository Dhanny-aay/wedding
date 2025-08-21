import config from "../config";

const api = async (method, uri, body = null) => {
  const url = `${config.baseURL}${uri}`;
  // console.log("API Request URL:", url);

  const headers = {
    Accept: "application/json",
  };

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method,
    headers,
    ...(body && {
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      const errorMessage =
        errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export default api;
