//api call for adding a budget

import {
  AddBudget,
  AddBudgetResponse,
  Budget,
  FetchUtilResult,
  GetBudgetResponse,
} from "$interfaces";
import { addBudgetUrl, getBudgetUrl } from "$constants";
import Cookies from "js-cookie";
import fetchUtil from "./hooks/fetchUtil";

export const useAddBudget = async ({
  date,
  budget,
}: Budget): Promise<FetchUtilResult<AddBudgetResponse>> => {
  const url = addBudgetUrl;

  const onSuccess = (response: AddBudgetResponse | null) => {
    if (!response?.success) {
      throw new Error("Add Budget Failed");
    }
  };

  const { exec } = fetchUtil({
    method: "POST",
    url,
    callback: onSuccess,
    onFailure: () => {},
    body: {
      payload: {
        date,
        budget,
      },
      token: Cookies.get("session_id"),
    },
  });

  const { apiFailed, apiSuccess, responseData } = await exec();
  return { apiFailed, apiSuccess, responseData };
};

//api call for fetching budget
export const useGetBudget = async ({
  month,
  year,
}: AddBudget): Promise<FetchUtilResult<GetBudgetResponse>> => {
  const url =
    getBudgetUrl
      .replace("%month", month.toString())
      .replace("%year", year.toString()) + Cookies.get("session_id");

  const onSuccess = (response: GetBudgetResponse | null) => {
    if (
      response !== null &&
      !response?.budget &&
      Object.keys(response.budget).length < 4
    ) {
      throw new Error(`Budget not available for Month ${month} and Year ${year}`);
    }
  };

  const { exec } = fetchUtil({
    method: "GET",
    url,
    callback: onSuccess,
    onFailure: () => {},
  });

  const { apiFailed, apiSuccess, responseData } = await exec();
  return { apiFailed, apiSuccess, responseData };
};
