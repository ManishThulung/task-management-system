import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./config/app-router";
import { AuthProvider } from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
