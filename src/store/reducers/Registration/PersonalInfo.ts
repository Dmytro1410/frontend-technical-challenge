import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { updateLocalStorageState } from "../../../utils/common";
import {
  IRegistrationPersonalInfoFormFields,
  REGISTRATION_FORM_FIELDS,
} from "../../../models/Registration";

export const initialState: IRegistrationPersonalInfoFormFields = {
  [REGISTRATION_FORM_FIELDS.FIRST_NAME]: "",
  [REGISTRATION_FORM_FIELDS.LAST_NAME]: "",
  [REGISTRATION_FORM_FIELDS.EMAIL]: "",
};

export const registrationPersonalInfoSlice = createSlice({
  name: "REGISTRATION_PERSONAL_INFO",
  initialState,
  reducers: {
    updateRegistrationPersonalInfo: (
      state: Draft<IRegistrationPersonalInfoFormFields>,
      action: PayloadAction<IRegistrationPersonalInfoFormFields>,
    ) => {
      Object.assign(state, action.payload);
      updateLocalStorageState(action.payload);
    },
    resetPersonalInfo: () => initialState,
  },
});

export const { updateRegistrationPersonalInfo, resetPersonalInfo } =
  registrationPersonalInfoSlice.actions;

export default registrationPersonalInfoSlice.reducer;
