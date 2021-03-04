import React, { useContext } from "react";
import Application from "./pages/functionalcomponents/Application";
import UserProvider from "./providers/UserProvider";

function App() {
  
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;