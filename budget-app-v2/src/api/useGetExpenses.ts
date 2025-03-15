import { getExpenses } from "$constants";
import { AddBudget, FetchUtilResult, GetExpensesResponse } from "$interfaces";
import Cookies from "js-cookie";
import fetchUtil from "./hooks/fetchUtil";
export const useGetExpenses = async ({
    month,
    year,
  }: AddBudget): Promise<FetchUtilResult<GetExpensesResponse>> => {
    const url =
      getExpenses
        .replace("%month", month.toString())
        .replace("%year", year.toString()) + Cookies.get("session_id");
  
    const onSuccess = (response: GetExpensesResponse | null) => {
      if (
        response !== null &&
        !response?.expenses
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
  