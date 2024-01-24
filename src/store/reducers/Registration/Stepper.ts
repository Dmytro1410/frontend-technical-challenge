import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { updateLocalStorageState } from "../../../utils/common";

export interface IRegistrationStepperState {
  readonly activeStep: number;
  readonly steps: string[];
}

export const initialState: IRegistrationStepperState = {
  activeStep: 0,
  steps: ["Personal Info", "Business Info", "Business Details"],
};

export const registrationStepperSlice = createSlice({
  name: "REGISTRATION_STEPPER",
  initialState,
  reducers: {
    setRegistrationActiveStep: (
      state: Draft<IRegistrationStepperState>,
      action: PayloadAction<number>,
    ) => {
      state.activeStep = action.payload;
      updateLocalStorageState({ activeStep: action.payload });
    },
    submitForm: (_, action: PayloadAction<{ callback: () => void }>) => {},
    resetForm: () => initialState,
  },
});

export const { setRegistrationActiveStep, submitForm, resetForm } =
  registrationStepperSlice.actions;

export default registrationStepperSlice.reducer;
