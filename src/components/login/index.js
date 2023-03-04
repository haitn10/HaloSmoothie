import { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Logo from "../../images/logo.png";
import { login } from "api";
import ConfirmModal from "components/common/ConfirmModal";
import { StoreContext, actions } from "store";

const Login = () => {
  const [state, dispatch] = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorState, setErrorState] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      return;
    }
    const result = await login({ email, password });
    if (result.status === 200) {
      await dispatch(actions.setToken(result.data.accessToken));
    } else {
      setEmail("");
      setPassword("");
      setErrorMessage(result.data.title);
      setErrorState(true);
    }
  };
  return (
    <Box
      component="main"
      paddingTop={10}
      onKeyPress={(e) => (e.key === "Enter" ? onLogin : {})}
    >
      <ConfirmModal
        open={errorState}
        setOpen={setErrorState}
        title="Info"
        message={errorMessage}
      />
      <form onSubmit={onLogin}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
            backgroundColor: "#fff",
          }}
        >
          <img src={Logo} width="180px" height="180px" alt="logo" />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            color="success"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g admin@example.com"
            required
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            variant="outlined"
            color="success"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            required
          />
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "30px", borderRadius: "5px" }}
            type="submit"
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
