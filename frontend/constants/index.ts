export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  TRAVEL: {
    bg: "bg-green-50",
    circleBg: "bg-green-100",
    text: { main: "text-green-700", count: "text-green-700" },
    progress: { bg: "bg-green-100", indicator: "bg-green-500" },
    icon: "/icons/travel.svg",
  },
  TRANSPORTATION: {
    bg: "bg-yellow-50",
    circleBg: "bg-yellow-100",
    text: { main: "text-yellow-600", count: "text-yellow-600" },
    progress: { bg: "bg-yellow-100", indicator: "bg-yellow-500" },
    icon: "/icons/transportation.svg",
  },
  "FOOD_AND_DRINK": {
    bg: "bg-blue-50",
    circleBg: "bg-blue-100",
    text: { main: "text-blue-700", count: "text-blue-700" },
    progress: { bg: "bg-blue-100", indicator: "bg-blue-500" },
    icon: "/icons/food-and-drink.svg",
  },
  "LOAN_PAYMENTS": {
    bg: "bg-red-50",
    circleBg: "bg-red-100",
    text: { main: "text-red-700", count: "text-red-700" },
    progress: { bg: "bg-red-100", indicator: "bg-red-500" },
    icon: "/icons/loan-payment.svg",
  },
  INCOME: {
    bg: "bg-green-50",
    circleBg: "bg-green-100",
    text: { main: "text-green-700", count: "text-green-700" },
    progress: { bg: "bg-green-100", indicator: "bg-green-500" },
    icon: "/icons/income.svg",
  },
  default: {
    bg: "bg-purple-50",
    circleBg: "bg-purple-100",
    text: { main: "text-purple-700", count: "text-purple-700" },
    progress: { bg: "bg-purple-100", indicator: "bg-purple-400" },
    icon: "/icons/default.svg",
  },
};

export const transactionCategoryStyles = {
  "FOOD_AND_DRINK": {
    borderColor: "border-blue-600",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "INCOME": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "LOAN_PAYMENTS": {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  TRANSPORTATION: {
    borderColor: "border-yellow-400",
    backgroundColor: "bg-yellow-200",
    textColor: "text-yellow-400",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  TRAVEL: {
    borderColor: "border-yellow-800",
    backgroundColor: "bg-yellow-800",
    textColor: "text-yellow-600",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "border-purple-700",
    backgroundColor: "bg-purple-500",
    textColor: "text-purple-700",
    chipBackgroundColor: "bg-inherit",
  },
};
