import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export const UserContext = createContext({});

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  stripeCustomerId: string;
  stripePaymentMethodId: string;
  stripeSubscriptionId: string;
  stripeCardBrand: string;
  stripePaymentLast4: string;
  isEmailVerified: boolean | string;
  isAuth: boolean | string;
}

export function UserProvider(props: any) {
  const [user, setUser] = createStore({
    _id: localStorage.getItem("_id") || "",
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    email: localStorage.getItem("email") || "",
    createdAt: localStorage.getItem("createdAt") || "",
    stripeCustomerId: localStorage.getItem("stripeCustomerId") || "",
    stripePaymentMethodId: localStorage.getItem("stripePaymentMethodId") || "",
    stripeSubscriptionId: localStorage.getItem("stripeSubscriptionId") || "",
    stripeCardBrand: localStorage.getItem("stripeCardBrand") || "",
    stripePaymentLast4: localStorage.getItem("stripePaymentLast4") || "",
    isEmailVerified: localStorage.getItem("isEmailVerified") || false,
    isAuth: localStorage.getItem("isAuth") || false,
  });

  const userActions = [
    user,
    {
      // Initialize the user
      initializeUser(user: User) {
        localStorage.setItem("_id", user._id);
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("createdAt", user.createdAt);
        localStorage.setItem("stripeCustomerId", user.stripeCustomerId || "");
        localStorage.setItem("isAuth", true.toString());

        localStorage.setItem(
          "isEmailVerified",
          user.isEmailVerified.toString()
        );

        localStorage.setItem(
          "stripePaymentMethodId",
          user.stripePaymentMethodId || ""
        );

        localStorage.setItem(
          "stripeSubscriptionId",
          user.stripeSubscriptionId || ""
        );

        localStorage.setItem("stripeCardBrand", user.stripeCardBrand || "");

        localStorage.setItem(
          "stripePaymentLast4",
          user.stripePaymentLast4 || ""
        );

        setUser(user);
      },

      // Update the user
      updateUser(e: any) {
        setUser({ [e.target.name]: e.target.value });
      },

      // Logout the user
      logoutUser() {
        localStorage.clear();

        setUser({
          _id: "",
          firstName: "",
          lastName: "",
          email: "",
          createdAt: "",
          stripeCustomerId: "",
          stripePaymentMethodId: "",
          stripeSubscriptionId: "",
          stripeCardBrand: "",
          stripePaymentLast4: "",
          isEmailVerified: false,
          isAuth: false,
        });
      },
    },
  ];

  return (
    <UserContext.Provider value={userActions}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
