interface IuseFetch<T> {
  method: "POST" | "GET";
  url: string;
  body?: object;
  callback: (response: T | null) => void;
  onFailure: (response: object | string) => void;
}

interface FetchUtilResult<T> {
  apiFailed: boolean;
  apiPending: boolean;
  apiSuccess: boolean;
  responseData: T | null;
}

const fetchUtil = <T,>({
  method,
  url,
  body,
  callback,
  onFailure,
}: IuseFetch<T>) => {
  console.log("inside fetch utils");

  const exec = async (): Promise<FetchUtilResult<T>> => {
    console.log("executing", url);
    let apiSuccess = false;
    let apiFailed = false;
    let apiPending = true;
    let responseData: T | null = null;
    console.log({body})
    try {
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
        responseData = (await response.json()) as T;
        apiSuccess = true;
        callback(responseData);
      } else {
        apiFailed = true;
        const errorResponse = await response.json();
        onFailure(errorResponse);
      }
    } catch (error) {
      apiFailed = true;
      onFailure(error instanceof Error ? error.message : "Unknown error");
    } finally {
      apiPending = false;
    }

    return { apiFailed, apiPending, apiSuccess, responseData };
  };

  return { exec };
};

export default fetchUtil;
