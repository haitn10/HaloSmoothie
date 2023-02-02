import {
  Button,
  Card,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Component } from "react";

import { connect } from "react-redux";
import { login } from "../profile/action";
import ConfirmModal from '../common/CofirmModal'

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
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ConfirmModal
          open={this.state.errorMessage}
          title="Info"
          onDismiss={() => this.setState({ errorMessage: '' })}
        />
        <Card
          style={{
            width: "40%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        > 
          <Typography component="h1" variant="h5" className="text-center">
            Login
          </Typography>
          <FormControl style={{ width: "22vw", marginTop: "1.5em" }}>
            <InputLabel>Email address</InputLabel>
            <Input
              margin="dense"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              autoFocus
            />
          </FormControl>
          <FormControl style={{ width: "22vw", marginTop: "1.5em" }}>
            <InputLabel>Password</InputLabel>
            <Input
              security="*"
              type="password"
              margin="dense"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            style={{ width: "17vw", marginTop: "3em", marginBottom: "2em" }}
            onClick={this.onLogin}
          >
            Sign In
          </Button>
        </Card>
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
