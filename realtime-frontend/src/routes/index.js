import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Task from "../pages/Task";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/tarefas" />
        </Route>
        <Route exact component={Task} path="/tarefas" />
      </Switch>
    </BrowserRouter>
  );
}
