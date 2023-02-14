import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Logo from "../../images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async () => {
    try {
      // await login(email, password);
    } catch (e) {
      setErrorMessage(e);
    }
  };

  return (
    <Box
      component="main"
      paddingTop={10}
      onKeyPress={(e) => (e.key === "Enter" ? this.onLogin() : {})}
    >
      {/* <ConfirmModal
        open={this.state.errorMessage}
        title="Info"
        onDismiss={() => this.setState({ errorMessage: "" })}
      /> */}
      <form>
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
            label="Email"
            name="email"
            margin="normal"
            type="email"
            variant="outlined"
            color="success"
            placeholder="e.g admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            margin="normal"
            type="password"
            variant="outlined"
            color="success"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "30px", borderRadius: "10px" }}
            type="submit"
            onClick={() => onSubmit()}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
