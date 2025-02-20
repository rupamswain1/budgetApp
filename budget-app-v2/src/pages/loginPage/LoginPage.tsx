import "./login.style.scss";
import { loginConstant } from "$constants";
import { H1lg, H1, InputField } from "$components";
import { ITEM_TYPES } from "$interfaces";
const LoginPage = () => {
  return (
    <div className="login-container">
      <header className="header-container">
        <H1lg text={loginConstant.WELCOME_TEXT} type={ITEM_TYPES.PRIMARY} />
      </header>
      <section className="login-section">
        <H1 text="Login" type={ITEM_TYPES.SECONDARY} />
        <InputField name="userName" label="User Name"/>
      </section>
    </div>
  );
};

export default LoginPage;
