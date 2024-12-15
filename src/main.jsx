import { createRoot } from "react-dom/client";
import "./index.css";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={2}
    autoHideDuration={1500}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
  >
    <App />
  </SnackbarProvider>
);
