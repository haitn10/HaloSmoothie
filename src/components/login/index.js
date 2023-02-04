import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import { Component } from "react";

import { connect } from "react-redux";
import { login } from "../profile/action";
import ConfirmModal from "../common/CofirmModal";
import { LockOutlined } from "@material-ui/icons";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  onLogin = async () => {
    const { password, email } = this.state;
    if (email.length === 0 || password.length === 0) {
      return;
    }
    try {
      await this.props.login({ email, password });
    } catch (e) {
      this.setState({ errorMessage: e });
    }
  };

  render() {
    return (
      <Container
        component="main"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onKeyPress={(e) => (e.key === "Enter" ? this.onLogin() : {})}
      >
        <ConfirmModal
          open={this.state.errorMessage}
          title="Info"
          onDismiss={() => this.setState({ errorMessage: "" })}
        />
        <Grid>
          <Paper
            elevation={10}
            style={{
              padding: 20,
              height: "60vh",
              width: 280,
              margin: "50px auto",
            }}
          >
            <Grid align="center">
              <Avatar style={{ backgroundColor: "#2ECC71" }}>
                <LockOutlined />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              label="Email"
              placeholder="Enter email"
              type="text"
              style={{ marginTop: "20px", width: "100%" }}
              required
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <TextField
              security="*"
              label="Password"
              placeholder="Enter password"
              type="password"
              style={{ marginTop: "20px", width: "100%" }}
              required
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <Button
              style={{ marginTop: "40px", width: "100%" }}
              type="submit"
              color="primary"
              variant="contained"
              onLoad={this.state.isLoggingIn}
              onClick={this.onLogin}
            >
              Sign In
            </Button>
          </Paper>
        </Grid>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggingIn: state.profile.isLoggingIn,
  };
};
const mapDispatch = (dispatch) => {
  return {
    login: (credential) => dispatch(login(credential)),
  };
};

export default connect(mapState, mapDispatch)(Login);
