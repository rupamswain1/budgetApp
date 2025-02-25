import "./login.style.scss";
import { loginConstant } from "$constants";
import {
  H1lg,
  H1,
  InputField,
  Button,
} from "$components";
import { ITEM_TYPES } from "$interfaces";
import {QuickAddExpenses} from "$pages";


const LoginPage = () => {
  return (
    <div className="login-container">
      <header className="header-container">
        <H1lg text={loginConstant.WELCOME_TEXT} type={ITEM_TYPES.PRIMARY} />
      </header>
      <section className="login-section">
        <H1 text="Login" type={ITEM_TYPES.SECONDARY} className="login" />
        <InputField name="userName" label="User Name or Email" type="text" />
        <Button
          name="Login"
          type={ITEM_TYPES.PRIMARY}
          onClick={() => {}}
          key="login-btn"
          className="login-btn"
        />
      </section>
      <QuickAddExpenses/>
    </div>
  );
};

export default LoginPage;
