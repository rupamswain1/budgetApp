import "./login.style.scss";
import { loginConstant } from "$constants";
import { H1lg, H1, InputField, Button } from "$components";
import { ITEM_TYPES } from "$interfaces";
import { QuickAddExpenses } from "$pages";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authReducer";
import type { RootState, AppDispatch } from "store/store";
import { useCallback, useState } from "react";
const LoginPage = () => {
  console.log("LoginPage");
  const [userName, setUserName] = useState<string>("");
  // const [error, setError] = useState<null | string>(null);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const dispatch = useDispatch<AppDispatch>();
  const onChangeHandler = useCallback((e) => {
    setUserName(e.target.value);
    console.log(e.target.value)
  }, []);
  const handleLogin = () =>{
    dispatch(loginUser(userName))
  }
  return (
    <div className="login-container">
      <header className="header-container">
        <H1lg text={loginConstant.WELCOME_TEXT} type={ITEM_TYPES.PRIMARY} />
      </header>
      <section className="login-section">
        <H1 text="Login" type={ITEM_TYPES.SECONDARY} className="login" />
        <InputField
          name="userName"
          label="User Name or Email"
          type="text"
          onChangeHandler={onChangeHandler}
        />
        <Button
          name="Login"
          type={ITEM_TYPES.PRIMARY}
          onClick={handleLogin}
          key="login-btn"
          className="login-btn"
        />
      </section>
      <QuickAddExpenses />
    </div>
  );
};

export default LoginPage;
