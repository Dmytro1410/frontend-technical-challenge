import React from "react";
import "./App.css";
import Registration from "./components/Registration";
import { useDispatch } from "react-redux";
import { fetchInitialData } from "./store/reducers/Registration/sourceData";
import { registrationLocalStorageKey } from "./utils/common";

function App() {
  const dispatch = useDispatch();
  const localStorageData = JSON.parse(
    localStorage.getItem(registrationLocalStorageKey) || "{}",
  );

  dispatch(fetchInitialData(localStorageData));

  return (
    <div className="App">
      <Registration />
    </div>
  );
}

export default App;
