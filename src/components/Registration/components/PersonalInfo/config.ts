import { object, ObjectSchema, string } from "yup";
import {
  FORM_FIELD_COMPONENT_TYPES,
  FORM_FIELD_TYPES,
  FORM_FIELDS_GRID_SIZE,
} from "../../../../models/common";
import {
  IRegistrationBaseFormFiledConfig,
  IRegistrationPersonalInfoFormFields,
  REGISTRATION_FORM_FIELDS,
} from "../../../../models/Registration";
import { emailRegex } from "../../../../utils/common";
import {
  defaultEmailPatternError,
  defaultRequiredError,
} from "../../../../constants/errors";

export const getPersonalInfoFormFieldsConfig =
  (): IRegistrationBaseFormFiledConfig[] => [
    {
      field: REGISTRATION_FORM_FIELDS.FIRST_NAME,
      type: FORM_FIELD_TYPES.STRING,
      componentType: FORM_FIELD_COMPONENT_TYPES.TEXT_FIELD,
      label: "First Name",
      placeholder: "Enter your first name",
      gridSize: FORM_FIELDS_GRID_SIZE.HALF,
    },
    {
      field: REGISTRATION_FORM_FIELDS.LAST_NAME,
      type: FORM_FIELD_TYPES.STRING,
      componentType: FORM_FIELD_COMPONENT_TYPES.TEXT_FIELD,
      label: "Last Name",
      placeholder: "Enter your last name",
      gridSize: FORM_FIELDS_GRID_SIZE.HALF,
    },
    {
      field: REGISTRATION_FORM_FIELDS.EMAIL,
      type: FORM_FIELD_TYPES.STRING,
      componentType: FORM_FIELD_COMPONENT_TYPES.TEXT_FIELD,
      label: "Email",
      placeholder: "Enter your email",
      gridSize: FORM_FIELDS_GRID_SIZE.FULL,
    },
  ];

export const personalInfoFormFieldsSchema: ObjectSchema<IRegistrationPersonalInfoFormFields> =
  object().shape({
    [REGISTRATION_FORM_FIELDS.FIRST_NAME]: string().required(
      defaultRequiredError("First name"),
    ),
    [REGISTRATION_FORM_FIELDS.LAST_NAME]: string().required(
      defaultRequiredError("Last name"),
    ),
    [REGISTRATION_FORM_FIELDS.EMAIL]: string()
      .required()
      .matches(emailRegex, defaultEmailPatternError),
  });
