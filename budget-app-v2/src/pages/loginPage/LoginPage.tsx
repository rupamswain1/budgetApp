import "./login.style.scss";
import { loginConstant } from "$constants";
import { AddExpenses, H1lg, LoginSection } from "$components";
import { ITEM_TYPES } from "$interfaces";
import { QuickAddExpenses } from "$pages";

const LoginPage = () => {
  console.log("LoginPage");

  return (
    <div className="login-container">
      <header className="header-container">
        <H1lg text={loginConstant.WELCOME_TEXT} type={ITEM_TYPES.PRIMARY} />
      </header>
      <LoginSection />
      <QuickAddExpenses>
        <AddExpenses customClass="login-add-expense"/>
      </QuickAddExpenses>
    </div>
  );
};

export default LoginPage;
