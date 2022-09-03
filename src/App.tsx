import Container from "@material-ui/core/Container";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorSnackbar } from "./components/ErrorSnakbar/ErrorSnackbar";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { SuccessSnackbar } from "./components/SuccessSnakbar/SuccessSnakbar";

function App() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ErrorSnackbar/>
      <SuccessSnackbar/>
    </Container>
  );
}

export default App;
