import {
  FORM_FIELD_COMPONENT_TYPES,
  FORM_FIELD_TYPES,
  FORM_FIELDS_GRID_SIZE,
  TOption,
} from "../../../../models/common";
import { number, object, ObjectSchema, string } from "yup";
import {
  IRegistrationBusinessInfoFormFields,
  REGISTRATION_FORM_FIELDS,
} from "../../../../models/Registration";
import { defaultRequiredError } from "../../../../constants/errors";

export const getBusinessInfoFormFieldsConfig = ({
  businessTypeOptions,
  businessSizeOptions,
}: {
  businessTypeOptions: TOption[];
  businessSizeOptions: TOption[];
}) => [
  {
    field: REGISTRATION_FORM_FIELDS.BUSINESS_NAME,
    type: FORM_FIELD_TYPES.STRING,
    componentType: FORM_FIELD_COMPONENT_TYPES.TEXT_FIELD,
    label: "Business Name",
    placeholder: "Enter your business name",
    gridSize: FORM_FIELDS_GRID_SIZE.HALF,
  },
  {
    field: REGISTRATION_FORM_FIELDS.BUSINESS_TYPE,
    type: FORM_FIELD_TYPES.NUMBER,
    componentType: FORM_FIELD_COMPONENT_TYPES.SELECT,
    label: "Business Type",
    placeholder: "Choose your business type",
    gridSize: FORM_FIELDS_GRID_SIZE.HALF,
    options: businessTypeOptions,
  },
  {
    field: REGISTRATION_FORM_FIELDS.BUSINESS_SIZE,
    type: FORM_FIELD_TYPES.NUMBER,
    componentType: FORM_FIELD_COMPONENT_TYPES.CHIP_SELECTOR,
    label: "Business size",
    placeholder: "Choose you business size",
    gridSize: FORM_FIELDS_GRID_SIZE.FULL,
    options: businessSizeOptions,
  },
];

export const businessInfoFormFieldsSchema: ObjectSchema<IRegistrationBusinessInfoFormFields> =
  object().shape({
    [REGISTRATION_FORM_FIELDS.BUSINESS_NAME]: string().required(
      defaultRequiredError("Business Name"),
    ),
    [REGISTRATION_FORM_FIELDS.BUSINESS_TYPE]: number()
      .transform((val) => (val === 0 ? null : val)) // 0 - not valid
      .required(defaultRequiredError("Business Type")),
    [REGISTRATION_FORM_FIELDS.BUSINESS_SIZE]: number()
      .transform((val) => (val === 0 ? null : val)) // 0 - not valid
      .required(defaultRequiredError("Business Size")),
  });
