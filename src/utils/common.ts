import {
  IRegistrationBusinessDetailsFormFields,
  IRegistrationBusinessInfoFormFields,
  IRegistrationPersonalInfoFormFields,
} from "../models/Registration";

export const registrationLocalStorageKey = "registration";

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const updateLocalStorageState = (
  value:
    | IRegistrationPersonalInfoFormFields
    | IRegistrationBusinessInfoFormFields
    | IRegistrationBusinessDetailsFormFields
    | { activeStep: number },
) => {
  const currentLocalStorageState = JSON.parse(
    localStorage.getItem(registrationLocalStorageKey) ?? "{}",
  );
  const updatedLocalStorageState = { ...currentLocalStorageState, ...value };
  localStorage.setItem(
    registrationLocalStorageKey,
    JSON.stringify(updatedLocalStorageState),
  );
};

export const extractObjProps = ({
  sourceObj,
  targetObj,
}: {
  sourceObj: Record<any, any>;
  targetObj: Record<any, any>;
}) => {
  const res = {};
  for (const objKey in sourceObj) {
    if (objKey)
      Object.assign(res, { [objKey]: targetObj[objKey] || sourceObj[objKey] });
  }
  return res;
};

export const formFieldsToSummary = (
  formFields:
    | IRegistrationPersonalInfoFormFields
    | IRegistrationBusinessInfoFormFields
    | IRegistrationBusinessDetailsFormFields,
) => {
  return Object.keys(formFields).map((key) => ({
    field: key,
    label: camelCaseToTitle(key),
    value:
      formFields[
        key as keyof (
          | IRegistrationPersonalInfoFormFields
          | IRegistrationBusinessInfoFormFields
          | IRegistrationBusinessDetailsFormFields
        )
      ],
  }));
};

export const camelCaseToTitle = (camelCaseString: string): string => {
  const titleString = camelCaseString.replace(/([A-Z])(?=[a-z])/g, " $1");
  return titleString.charAt(0).toUpperCase() + titleString.slice(1).trim();
};
