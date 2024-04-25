import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { WagmiProvider } from "contexts/wagmi";
import { client } from "utils/wagmi";
import "./i18n";
import { RefreshContextProvider } from "contexts/RefreshContext";

import { Provider } from "react-redux";
import store from "./state";
import { ProjectContextProvider } from "contexts/ProjectContext";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiProvider client={client}>
        <RefreshContextProvider>
          <ProjectContextProvider>
            <App />
            <ToastContainer autoClose={10000} />
          </ProjectContextProvider>
        </RefreshContextProvider>
      </WagmiProvider>
    </Provider>
  </React.StrictMode>
);
