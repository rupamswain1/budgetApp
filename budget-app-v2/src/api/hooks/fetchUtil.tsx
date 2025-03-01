interface IuseFetch {
  method: "POST" | "GET";
  url: string;
  body?: object;
  callback: (response: object) => unknown;
  onFailure: (response: object) => unknown;
}

const fetchUtil = ({ method, url, body, callback, onFailure }: IuseFetch) => {
  let apiSuccess: boolean = false,
    apiFailed: boolean = false,
    apiPending: boolean = false;
  let responseData = null;
  const exec = async () => {
    try {
      apiPending = true;
      const response = await fetch(url, {
        method: method || "GET",
        ...(body?.constructor === Object && body !== null
          ? { body: JSON.stringify(body) }
          : {}),
      });
      if (response.ok) {
        responseData = response.json();
        apiSuccess = true;
        callback(responseData);
      } else {
        console.log("apifailed");
        // onFailure(response.error);
        apiFailed = true;
      }
      apiPending = false;
    } catch (error) {
      apiPending = false;
      onFailure({ err: "api failed " + error });
      apiFailed = true;
    }
    return {
      apiFailed,
      apiPending,
      apiSuccess,
      responseData
    };
  };
  return {
    exec,
  };
};

export default fetchUtil;
