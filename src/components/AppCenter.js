import { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "./profile/action";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";

class App extends Component {
  state = {
    isFetching: true,
  };

  componentDidMount() {
    this.getDependencies();
  }

  getDependencies = async () => {
    try {
      await this.state.getProfile();
      this.setState({ isFetching: false });
    } catch (e) {
      this.setState({ isFetching: false });
    }
  };

  render() {
    if (this.state.isFetching) {
      return <div />;
    }
    if (!this.state.profile) {
      return (
        <BrowserRouter basename="/login">
          <Switch>
            <Route path="/" component={() => <Header />} exact />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}
const mapState = (state) => {
  return {
    profile: state.profile,
  };
};

const mapDispatch = (dispatch) => ({
  getProfile: () => dispatch(getProfile()),
});

export default connect(mapState, mapDispatch)(App);
