import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";

type PropTypes = {
  children?: React.ReactNode;
};

const MyRouter = (props: PropTypes) => {
  return (
    <Router>
      {props.children}
      <Switch>
        <Route path="/*" component={IndexPage} />
      </Switch>
    </Router>
  );
};

export class App extends React.Component {
  render() {
    return <MyRouter />;
  }
}
