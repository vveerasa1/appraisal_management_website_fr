import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store.js";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_6IVaAL8X0",
  client_id: "4ddoerjll2aonqd8srp8rljt9",
  redirect_uri: "http://localhost:5174/callback",
  response_type: "code",
  scope: "aws.cognito.signin.user.admin email openid phone profile",
  automaticSilentRenew: false,
};

const onSigninCallback = async (user) => {
  console.log('User signed in:', user?.profile);
  window.history.replaceState({}, document.title, window.location.pathname);
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider {...cognitoAuthConfig} onSigninCallback={onSigninCallback}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          <App />
        </PersistGate>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
