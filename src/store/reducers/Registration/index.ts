import { combineReducers } from "@reduxjs/toolkit";
import StepperReducer from "./Stepper";
import PersonalInfoReducer from "./PersonalInfo";
import BusinessInfoReducer from "./BusinesInfo";
import BusinessDetailsReducer from "./BusinessDetails";
import SourceDataReducer from "./sourceData";

const registrationReducer = combineReducers({
  stepper: StepperReducer,
  personalInfo: PersonalInfoReducer,
  businessInfo: BusinessInfoReducer,
  businessDetails: BusinessDetailsReducer,
  sourceData: SourceDataReducer,
});

export default registrationReducer;
