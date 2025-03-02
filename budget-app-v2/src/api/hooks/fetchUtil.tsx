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
  console.log("inside fetch utils")
  const exec = async () => {
    console.log("executing",url)
    try {
      apiPending = true;
      const response = await fetch(url, {
        method: method || "GET",
        ...(body?.constructor === Object && body !== null
          ? { body: JSON.stringify(body) }
          : {}),
      });
      if (response.ok) {
        console.log({response})
        responseData = await response.json();
        if(!responseData.error){
          apiSuccess = true;
          callback(responseData);
        }
        else{
          apiFailed = true;
        }
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
