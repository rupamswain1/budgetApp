import { responseType } from "$interfaces";
interface IuseFetch {
  method: "POST" | "GET";
  url: string;
  body?: object;
  callback: (response: responseType|null) => void;
  onFailure: (response: object|string) => unknown;
}


const fetchUtil = ({ method, url, body, callback, onFailure }: IuseFetch) => {
  let apiSuccess: boolean = false,
    apiFailed: boolean = false,
    apiPending: boolean = false;
  let responseData: responseType | null = null;
  console.log("inside fetch utils");
  const exec = async () => {
    console.log("executing", url);
    try {
      apiPending = true;
      const response = await fetch(url, {
        method: method || "GET",
        ...(body?.constructor === Object && body !== null
          ? { body: JSON.stringify(body) }
          : {}),
          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
      });
      if (response.ok) {
        console.log({ response });
        responseData = await response.json();
        if (!responseData?.error) {
          apiSuccess = true;
          callback(responseData);
        } else {
          apiFailed = true;
          onFailure(responseData);
        }
      } else {
        console.log("apifailed");
        // onFailure(response.error);
        apiFailed = true;
        onFailure(await response.json());
      }
      apiPending = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      apiPending = false;
      onFailure(error);
      apiFailed = true;
    }
    return {
      apiFailed,
      apiPending,
      apiSuccess,
      responseData,
    };
  };
  return {
    exec,
  };
};

export default fetchUtil;
