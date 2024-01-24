import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { TOption } from "../../../models/common";
import {
  IRegistrationBusinessDetailsFormFields,
  IRegistrationBusinessInfoFormFields,
  IRegistrationPersonalInfoFormFields,
} from "../../../models/Registration";

export interface IRegistrationSourceDataState {
  readonly businessSize: {
    readonly options: TOption[];
    readonly isLoading: boolean;
    readonly error: string | null;
  };
  readonly businessType: {
    readonly options: TOption[];
    readonly isLoading: boolean;
    readonly error: string | null;
  };
  readonly pos: {
    readonly options: TOption[];
    readonly isLoading: boolean;
    readonly error: string | null;
  };
  readonly deliveryChannel: {
    readonly options: TOption[];
    readonly isLoading: boolean;
    readonly error: string | null;
  };
}

export const initialState: IRegistrationSourceDataState = {
  businessSize: {
    options: [],
    isLoading: false,
    error: null,
  },
  businessType: {
    options: [],
    isLoading: false,
    error: null,
  },
  pos: {
    options: [],
    isLoading: false,
    error: null,
  },
  deliveryChannel: {
    options: [],
    isLoading: false,
    error: null,
  },
};

export const registrationBusinessDetailsSlice = createSlice({
  name: "REGISTRATION_SOURCE_DATA",
  initialState,
  reducers: {
    fetchBusinessSize: (state: Draft<IRegistrationSourceDataState>) => {
      state.businessSize.isLoading = true;
    },
    fetchBusinessSizeSuccess: (
      state: Draft<IRegistrationSourceDataState>,
      action: PayloadAction<TOption[]>,
    ) => {
      state.businessSize.options = action.payload;
      state.businessSize.isLoading = false;
    },
    fetchBusinessSizeFailed: (
      state: Draft<IRegistrationSourceDataState>,
      action: PayloadAction<string>,
    ) => {
      state.businessSize.error = action.payload;
      state.businessSize.isLoading = false;
    },
    fetchBusinessType: (state: Draft<IRegistrationSourceDataState>) => {
      state.businessType.isLoading = true;
    },
    fetchBusinessTypeSuccess: (
      state: Draft<IRegistrationSourceDataState>,
      action: PayloadAction<TOption[]>,
    ) => {
      state.businessType.options = action.payload;
      state.businessType.isLoading = false;
    },
    fetchBusinessTypeFailed: (
      state: Draft<IRegistrationSourceDataState>,
      action: PayloadAction<string>,
    ) => {
      state.businessType.error = action.payload;
      state.businessType.isLoading = false;
    },
    fetchPOS: (state: Draft<IRegistrationSourceDataState>) => {
      state.pos.isLoading = true;
    },
    fetchPOSSuccess: (
      state: Draft<IRegistrationSourceDataState>,
      action: PayloadAction<TOption[]>,
    ) => {
      state.pos.options = action.payload;
      state.pos.isLoading = false;
    },
    fetchPOSFailed: (
      state: Draft<IRegistrationSourceDataState>,
      action: PayloadAction<string>,
    ) => {
      state.pos.error = action.payload;
      state.pos.isLoading = false;
    },
    fetchDeliveryChannel: (state: Draft<IRegistrationSourceDataState>) => {
      state.deliveryChannel.isLoading = true;
    },
    fetchDeliveryChannelSuccess: (
      state: Draft<IRegistrationSourceDataState>,
      action: PayloadAction<TOption[]>,
    ) => {
      state.deliveryChannel.options = action.payload;
      state.deliveryChannel.isLoading = false;
    },
    fetchDeliveryChannelFailed: (
      state: Draft<IRegistrationSourceDataState>,
      action: PayloadAction<string>,
    ) => {
      state.deliveryChannel.error = action.payload;
      state.deliveryChannel.isLoading = false;
    },
    fetchInitialData: (
      _,
      action: PayloadAction<
        IRegistrationPersonalInfoFormFields &
          IRegistrationBusinessInfoFormFields &
          IRegistrationBusinessDetailsFormFields & { activeStep: number }
      >,
    ) => {},
  },
});

export const {
  fetchBusinessSize,
  fetchBusinessSizeSuccess,
  fetchBusinessSizeFailed,
  fetchBusinessType,
  fetchBusinessTypeSuccess,
  fetchBusinessTypeFailed,
  fetchPOS,
  fetchPOSSuccess,
  fetchPOSFailed,
  fetchDeliveryChannel,
  fetchDeliveryChannelSuccess,
  fetchDeliveryChannelFailed,
  fetchInitialData,
} = registrationBusinessDetailsSlice.actions;

export default registrationBusinessDetailsSlice.reducer;
