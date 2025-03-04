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
        LABEL:"Date",
        NAME:"date"
    },
    ITEM:{
        LABEL:"Item Name",
        NAME:"itemName"
    },
    PRICE:{
        LABEL:"Price",
        NAME:"price"
    },
    CATEGORY:{
        LABEL:"Category",
        NAME:"category"
    },
    PAYMENT_METHOD:{
        LABEL:"Payment Method",
        NAME:"paymentMethod"
    },
    ADD_EXPENSES:{
        NAME:"Add Expense"
    }
}
export enum EXPENSES_CATEGORY {
    FOOD = "Food & Groceries",
    HOUSING = "Housing",
    TRANSPORTATION = "Transportation",
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