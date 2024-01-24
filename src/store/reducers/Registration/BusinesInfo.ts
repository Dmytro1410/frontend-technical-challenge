import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { updateLocalStorageState } from "../../../utils/common";
import {
  IRegistrationBusinessInfoFormFields,
  REGISTRATION_FORM_FIELDS,
} from "../../../models/Registration";

export const initialState: IRegistrationBusinessInfoFormFields = {
  [REGISTRATION_FORM_FIELDS.BUSINESS_NAME]: "",
  [REGISTRATION_FORM_FIELDS.BUSINESS_SIZE]: 0,
  [REGISTRATION_FORM_FIELDS.BUSINESS_TYPE]: 0,
};

export const registrationBusinessInfoSlice = createSlice({
  name: "REGISTRATION_BUSINESS_INFO",
  initialState,
  reducers: {
    updateRegistrationBusinessInfo: (
      state: Draft<
        Record<
          keyof IRegistrationBusinessInfoFormFields,
          string | number | null
        >
      >,
      action: PayloadAction<IRegistrationBusinessInfoFormFields>,
    ) => {
      Object.assign(state, action.payload);
      updateLocalStorageState(action.payload);
    },
    resetBusinessInfo: () => initialState,
  },
});

export const { updateRegistrationBusinessInfo, resetBusinessInfo } =
  registrationBusinessInfoSlice.actions;

export default registrationBusinessInfoSlice.reducer;
