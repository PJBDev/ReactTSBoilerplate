import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { HopeProvider, NotificationsProvider } from "@hope-ui/solid";
import { UserProvider } from "./stores/UserStore";

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <HopeProvider>
      <NotificationsProvider placement="bottom-end">
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </NotificationsProvider>
    </HopeProvider>
  ),

  root
);
