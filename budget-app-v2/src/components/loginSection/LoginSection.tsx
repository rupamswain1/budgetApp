import { H1, InputField, Button, Loader } from "$components";
import { ITEM_TYPES } from "$interfaces";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authReducer";
import type { RootState, AppDispatch } from "store/store";
import { useCallback, useState } from "react";
import "./loginSection.style.scss";
const LoginSection = () => {
  const [userName, setUserName] = useState<string>("");
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [disableLogin, setDisableLogin] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const onChangeHandler = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    if (e.target.value.length > 0) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  }, []);
  const handleLogin = () => {
    dispatch(loginUser(userName));
  };

  return (
    <section className="login-section">
      {loading && <Loader />}

      <H1 text="Login" type={ITEM_TYPES.SECONDARY} className="login" />
      {error && <p className="error">Invalid User Name or Password</p>}
      <InputField
        name="userName"
        label="User Name or Email"
        type="text"
        onChangeHandler={onChangeHandler}
        value={userName}
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
