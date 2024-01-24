import { all } from "redux-saga/effects";
import RegistrationSaga from "./Registration";

export default function* rootSaga() {
  yield all([RegistrationSaga()]);
}
