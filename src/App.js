import React from "react";
import { Routes, Route } from "react-router-dom";

import { routes as characterRoutes } from "./packages/characters";

const routesList = [...characterRoutes];

function App() {
  return (
    <Routes>
      {routesList.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
}

export default App;
