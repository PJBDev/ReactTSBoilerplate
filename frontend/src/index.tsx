import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import "./index.css";
import App from "./App";
import { HopeProvider } from "@hope-ui/solid";
import { UserProvider } from "./stores/UserStore";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}

render(() => {
  return (
    <HopeProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </HopeProvider>
  );
}, root!);
