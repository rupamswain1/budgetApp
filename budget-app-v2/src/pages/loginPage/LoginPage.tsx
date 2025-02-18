import "./login.style.scss";
import { loginConstant } from "$constants";
import { H1, H2 } from "$components";
import { ITEM_TYPES } from "$interfaces";
const LoginPage = () => {
  return (
    <div className="login-container">
      <header>
        <H1 text={loginConstant.WELCOME_TEXT} type={ITEM_TYPES.PRIMARY} />
      </header>
      <section>
        <H2 text="Login" type={ITEM_TYPES.SECONDARY} />
      </section>
    </div>
  );
};

export default LoginPage;
