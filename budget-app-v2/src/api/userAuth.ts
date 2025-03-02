import { userAuthUrl } from "$constants";
import fetchUtil from "./hooks/fetchUtil";
import Cookies from "js-cookie";
interface UserAuth {
  userName: string;
}

const userAuth = async ({ userName }: UserAuth) => {
  const url = userAuthUrl + userName;
  const onSuccess = (response) => {
    console.log({response})
    if (!response.error) {
      Cookies.set("session_id", response.data.token, {
        expires: 7,
        secure: true,
      });
    }
  };
  const onFailure = (response) => {
    console.log({ response });
  };
  const { exec } = fetchUtil({
    method: "GET",
    url,
    callback: onSuccess,
    onFailure,
  });
  const { apiFailed, apiPending, apiSuccess, responseData } = await exec();
  console.log({ apiFailed, apiPending, apiSuccess });
  return { responseData, apiFailed, apiSuccess };
};

export default userAuth;
