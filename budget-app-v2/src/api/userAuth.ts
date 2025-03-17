import { userAuthUrl } from "$constants";
import fetchUtil from "./hooks/fetchUtil";
import Cookies from "js-cookie";
import { responseType } from "$interfaces";
interface UserAuth {
  userName: string;
  password: string;
}

const userAuth = async ({ userName, password }: UserAuth) => {
  const url = userAuthUrl;
  const onSuccess = (response: responseType | null) => {
    console.log({ response });
    if (!response?.error && response?.token && !response?.locked) {
      Cookies.set("session_id", response.token, {
        expires: 7,
        secure: true,
        sameSite:"Strict"
      });
    }
  };
  const onFailure = (response: responseType | string) => {
    console.log("onFailure ",{ response });
  };
  const { exec } = fetchUtil({
    method: "POST",
    url,
    callback: onSuccess,
    onFailure,
    body: {
      username: userName,
      password
    },
  });
  const { apiFailed, apiSuccess, responseData } = await exec();
  return { responseData, apiFailed, apiSuccess };
};

export default userAuth;
