import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { routes as characterRoutes } from "./packages/characters";

const routesList = [...characterRoutes];

function App() {
  return (
    <Routes>
      {routesList.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      <Route path="*" element={<Navigate to={routesList[0].path} />} />
    </Routes>
  );
}

export default App;
