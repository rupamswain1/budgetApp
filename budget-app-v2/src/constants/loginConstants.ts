export const loginConstant = {
    WELCOME_TEXT : "Welcome To Budget App!!",
    USERNAME:{
        NAME:"username",
        LABEL:"User Name or Email",
    },
    LOGIN_BTN:{
        NAME:"Login",
    },
}

export const ADD_EXPENSES = {
    DATE:{
        NAME:"Date"
    },
    ITEM:{
        NAME:"Item Name"
    },
    PRICE:{
        NAME:"Price"
    },
    CATEGORY:{
        NAME:"Category"
    },
    PAYMENT_METHOD:{
        NAME:"Payment Method"
    },
    ADD_EXPENSES:{
        NAME:"Add Expense"
    }
}
export enum EXPENSES_CATEGORY {
    HOUSING = "Housing",
    TRANSPORTATION = "Transportation",
    FOOD = "Food & Groceries",
    HEALTHCARE = "Healthcare",
    UTILITIES = "Utilities",
    INSURANCE = "Insurance",
    SHOPPING = "Shopping & Personal Care",
    ENTERTAINMENT = "Entertainment",
    FITNESS = "Health & Fitness",
    GIFTS = "Gifts & Donations",
    DEBT = "Debt & Loans",
    SAVINGS = "Savings & Investments",
    EDUCATION = "Education & Learning",
    MISC = "Miscellaneous",
  }

  export enum PAYMENT_METHOD{
    CREDIT_CARD="Credit Card",
    UPI="UPI",
    CASH="Cash",
  }