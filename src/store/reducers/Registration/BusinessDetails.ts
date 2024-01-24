import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { updateLocalStorageState } from "../../../utils/common";
import {
  IRegistrationBusinessDetailsFormFields,
  REGISTRATION_FORM_FIELDS,
} from "../../../models/Registration";

export const initialState: IRegistrationBusinessDetailsFormFields = {
  [REGISTRATION_FORM_FIELDS.DELIVERY_CHANNEL]: 0,
  [REGISTRATION_FORM_FIELDS.POS]: 0,
};

export const registrationBusinessDetailsSlice = createSlice({
  name: "REGISTRATION_BUSINESS_DETAILS",
  initialState,
  reducers: {
    updateRegistrationBusinessDetails: (
      state: Draft<IRegistrationBusinessDetailsFormFields>,
      action: PayloadAction<IRegistrationBusinessDetailsFormFields>,
    ) => {
      Object.assign(state, action.payload);
      updateLocalStorageState(action.payload);
    },
    resetBusinessDetails: () => initialState,
  },
});

export const { updateRegistrationBusinessDetails, resetBusinessDetails } =
  registrationBusinessDetailsSlice.actions;

export default registrationBusinessDetailsSlice.reducer;
