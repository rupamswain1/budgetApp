import { H1, InputField, Button, Loader } from "$components";
import { ITEM_TYPES } from "$interfaces";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authReducer";
import type { RootState, AppDispatch } from "store/store";
import { useEffect, useState } from "react";
import "./loginSection.style.scss";
import { UseFormInput } from "$hooks";

interface LoginFields {
  userName: string;
  password: string;
}

const LoginSection = ({
  authCallback = () => {},
  customLogin = null
}: {
  authCallback?: () => void,
  customLogin?: null|((state:LoginFields)=>void)
}) => {
  const [formState, handleFormInput] = UseFormInput<LoginFields>({
    userName: "",
    password: "",
  });
  const { loading, error, token, locked } = useSelector(
    (state: RootState) => state.auth
  );
  const [disableLogin, setDisableLogin] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (
      formState.userName &&
      formState.password &&
      formState.userName.length > 0 &&
      formState.password.length > 0 &&
      !locked
    ) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  }, [formState.userName, formState.password]);

  useEffect(() => {
    return ()=>{
      if (!loading && !error && token) {
        authCallback();
      }
    }

  }, [loading, error]);

  const handleLogin = () => {
    if (!locked) {
      if(customLogin !==null){
        customLogin(formState)
      }  
      else{dispatch(
        loginUser({
          userName: formState.userName,
          password: formState.password,
        })
      )};
    }
  };

  return (
    <section className="login-section">
      {loading && <Loader />}

      <H1 text="Login" type={ITEM_TYPES.SECONDARY} className="login" />
      {error && <p className="error">{error}</p>}
      <InputField
        name="userName"
        label="User Name or Email"
        type="text"
        onChangeHandler={handleFormInput}
        value={formState.userName}
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        onChangeHandler={handleFormInput}
        value={formState.password}
      />
      <Button
        name="Login"
        type={ITEM_TYPES.PRIMARY}
        onClick={handleLogin}
        key="login-btn"
        className="login-btn"
        isEnabled={!disableLogin}
      />
    </section>
  );
};

export default LoginSection;
