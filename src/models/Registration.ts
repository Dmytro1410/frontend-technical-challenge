import {
  FORM_FIELD_COMPONENT_TYPES,
  FORM_FIELD_TYPES,
  FORM_FIELDS_GRID_SIZE,
  TOption,
} from "./common";
import { RefObject } from "react";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

// common //
export interface IRegistrationComponent {
  activeStep: number;
  steps: string[];
  personalInfoFormRef: RefObject<HTMLFormElement>;
  businessInfoFormRef: RefObject<HTMLFormElement>;
  businessDetailsFormRef: RefObject<HTMLFormElement>;
  onNext: () => void;
  onBack: () => void;
  onSubmitStep: () => void;
  onSubmit: () => void;
  onReset: () => void;
}

export interface IRegistrationFormFieldsComponent {
  control: Control<any>;
  errors: FieldErrors<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleOnSubmit: (data: TOnSubmitPayload) => void;
  formRef: RefObject<HTMLFormElement>;
  formFields: IRegistrationBaseFormFiledConfig[];
}

export interface IRegistrationFieldRendererProps {
  readonly control: Control<any>;
  readonly errors: FieldErrors;
  readonly formField: IRegistrationBaseFormFiledConfig;
}

export type TOnSubmitPayload =
  | IRegistrationPersonalInfoFormFields
  | IRegistrationBusinessInfoFormFields
  | IRegistrationBusinessDetailsFormFields;

// Form fields //
export interface IRegistrationBaseFormFiledConfig {
  readonly componentType: FORM_FIELD_COMPONENT_TYPES;
  readonly field: REGISTRATION_FORM_FIELDS;
  readonly gridSize: FORM_FIELDS_GRID_SIZE;
  readonly label: string;
  readonly placeholder: string;
  readonly type: FORM_FIELD_TYPES;
  readonly options?: TOption[];
}

export enum REGISTRATION_FORM_FIELDS {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  BUSINESS_NAME = "businessName",
  BUSINESS_SIZE = "businessSize",
  BUSINESS_TYPE = "businessType",
  POS = "POS",
  DELIVERY_CHANNEL = "deliveryChannel",
}

// Personal Info //
export interface IRegistrationPersonalInfoFormFields {
  readonly [REGISTRATION_FORM_FIELDS.FIRST_NAME]: string;
  readonly [REGISTRATION_FORM_FIELDS.LAST_NAME]: string;
  readonly [REGISTRATION_FORM_FIELDS.EMAIL]: string;
}

export interface IRegistrationPersonalInfoComponent {
  readonly formRef: RefObject<HTMLFormElement>;
  readonly onSubmit: (data: IRegistrationPersonalInfoFormFields) => void;
}

// Business Info //
export interface IRegistrationBusinessInfoFormFields {
  readonly [REGISTRATION_FORM_FIELDS.BUSINESS_NAME]: string;
  readonly [REGISTRATION_FORM_FIELDS.BUSINESS_SIZE]: number;
  readonly [REGISTRATION_FORM_FIELDS.BUSINESS_TYPE]: number;
}

export interface IRegistrationBusinessInfoComponent {
  readonly formRef: RefObject<HTMLFormElement>;
  readonly onSubmit: (data: IRegistrationBusinessInfoFormFields) => void;
}

// Business Details //
export interface IRegistrationBusinessDetailsFormFields {
  readonly [REGISTRATION_FORM_FIELDS.DELIVERY_CHANNEL]: number;
  readonly [REGISTRATION_FORM_FIELDS.POS]: number;
}

export interface IRegistrationBusinessDetailsComponent {
  readonly formRef: RefObject<HTMLFormElement>;
  readonly onSubmit: (data: IRegistrationBusinessDetailsFormFields) => void;
}

// Summary //
export interface IRegistrationSummaryComponent {
  readonly steps: {
    readonly title: string;
    readonly formFields: { [x: string]: string | number }[];
  }[];
  readonly onEdit: (step: number) => void;
}

// Actions //
export interface IRegistrationActions {
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly onSubmit: () => void;
  readonly onReset: () => void;
}

export interface IRegistrationActionsComponent {
  readonly displayedButtons: TRegistrationActionsDisplayedButtons;
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly onSubmit: () => void;
  readonly onReset: () => void;
}

export type TRegistrationActionsDisplayedButtons = {
  readonly back: boolean;
  readonly next: boolean;
  readonly submit: boolean;
  readonly reset: boolean;
};
