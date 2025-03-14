import { addExpenseUrl } from "$constants";
import { AddExpenseResponse, FetchUtilResult, NewExpense } from "$interfaces";
import fetchUtil from "./hooks/fetchUtil";
import Cookies from "js-cookie";

const useAddExpenses = async (expenses: NewExpense[]): Promise<FetchUtilResult<AddExpenseResponse>> => {
  const url = addExpenseUrl;

  const onSuccess = (response: AddExpenseResponse|null) => {
    if (
      !(response?.success &&
      response?.recordsAdded > 0 &&
      response?.updatedRecords &&
      response?.updatedRecords?.length > 0 &&
      response?.totalExpenseAmount)
    ) {
        throw new Error('api failed')
    }
  };

  const { exec } = fetchUtil({
    method: "POST",
    url,
    callback:onSuccess,
    onFailure:()=>{},
    body:{
        payload:expenses,
        token:Cookies.get("session_id")
    }
  });
  const { apiFailed, apiSuccess, responseData} = await exec();
  return { apiFailed, apiSuccess, responseData};
};

export default useAddExpenses;
