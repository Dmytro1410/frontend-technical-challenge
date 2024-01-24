import { RootState } from "../config";
import { createSelector } from "@reduxjs/toolkit";
import { formFieldsToSummary } from "../../utils/common";
import { REGISTRATION_FORM_FIELDS } from "../../models/Registration";

const registrationState = (state: RootState) => state.registration;
const registrationSourceDataState = (state: RootState) =>
  state.registration.sourceData;

export const getRegistrationActiveStep = createSelector(
  [registrationState],
  ({ stepper }) => stepper.activeStep,
);

export const getRegistrationSteps = createSelector(
  [registrationState],
  ({ stepper }) => stepper.steps,
);

export const getRegistrationPersonalInfo = createSelector(
  [registrationState],
  ({ personalInfo }) => personalInfo,
);

export const getRegistrationBusinessInfo = createSelector(
  [registrationState],
  ({ businessInfo }) => businessInfo,
);

export const getRegistrationBusinessDetails = createSelector(
  [registrationState],
  ({ businessDetails }) => businessDetails,
);

export const getRegistrationBusinessSizeSourceDataState = createSelector(
  [registrationSourceDataState],
  ({ businessSize: { error, isLoading, options } }) => ({
    error,
    isLoading,
    options,
  }),
);

export const getRegistrationBusinessTypeSourceDataState = createSelector(
  [registrationSourceDataState],
  ({ businessType: { error, isLoading, options } }) => ({
    error,
    isLoading,
    options,
  }),
);

export const getRegistrationPOSSourceDataState = createSelector(
  [registrationSourceDataState],
  ({ pos: { error, isLoading, options } }) => ({
    error,
    isLoading,
    options,
  }),
);

export const getRegistrationDeliveryChannelSourceDataState = createSelector(
  [registrationSourceDataState],
  ({ deliveryChannel: { error, isLoading, options } }) => ({
    error,
    isLoading,
    options,
  }),
);

export const getRegistrationPersonalInfoSummary = createSelector(
  [getRegistrationPersonalInfo],
  (personalInfo) => formFieldsToSummary(personalInfo),
);

export const getRegistrationBusinessInfoSummary = createSelector(
  [
    getRegistrationBusinessInfo,
    getRegistrationBusinessSizeSourceDataState,
    getRegistrationBusinessTypeSourceDataState,
  ],
  (
    businessInfo,
    { options: businessSizeOptions },
    { options: businessTypeOptions },
  ) =>
    formFieldsToSummary(businessInfo).map((item) => {
      switch (item.field) {
        case REGISTRATION_FORM_FIELDS.BUSINESS_SIZE:
          return {
            ...item,
            value:
              businessSizeOptions.find((bs) => bs.id === item.value)?.label ||
              "",
          };
        case REGISTRATION_FORM_FIELDS.BUSINESS_TYPE:
          return {
            ...item,
            value:
              businessTypeOptions.find((bt) => bt.id === item.value)?.label ||
              "",
          };
        default:
          return item;
      }
    }),
);

export const getRegistrationBusinessDetailsSummary = createSelector(
  [
    getRegistrationBusinessDetails,
    getRegistrationPOSSourceDataState,
    getRegistrationDeliveryChannelSourceDataState,
  ],
  (
    businessDetails,
    { options: POSOptions },
    { options: deliveryChannelOptions },
  ) =>
    formFieldsToSummary(businessDetails).map((item) => {
      switch (item.field) {
        case REGISTRATION_FORM_FIELDS.POS:
          return {
            ...item,
            value: POSOptions.find((pos) => pos.id === item.value)?.label || "",
          };
        case REGISTRATION_FORM_FIELDS.DELIVERY_CHANNEL:
          return {
            ...item,
            value:
              deliveryChannelOptions.find((dc) => dc.id === item.value)
                ?.label || "",
          };
        default:
          return item;
      }
    }),
);
