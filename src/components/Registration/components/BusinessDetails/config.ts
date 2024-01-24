import {
  FORM_FIELD_COMPONENT_TYPES,
  FORM_FIELD_TYPES,
  FORM_FIELDS_GRID_SIZE,
  TOption,
} from "../../../../models/common";
import { number, object, ObjectSchema } from "yup";
import {
  IRegistrationBusinessDetailsFormFields,
  REGISTRATION_FORM_FIELDS,
} from "../../../../models/Registration";
import { defaultRequiredError } from "../../../../constants/errors";

export const getBusinessDetailsFormFieldsConfig = ({
  posOptions,
  deliveryChannelOptions,
}: {
  posOptions: TOption[];
  deliveryChannelOptions: TOption[];
}) => [
  {
    field: REGISTRATION_FORM_FIELDS.POS,
    type: FORM_FIELD_TYPES.NUMBER,
    componentType: FORM_FIELD_COMPONENT_TYPES.AUTOCOMPLETE,
    label: "POS used by business",
    placeholder: "Choose your POS",
    gridSize: FORM_FIELDS_GRID_SIZE.FULL,
    options: posOptions,
  },
  {
    field: REGISTRATION_FORM_FIELDS.DELIVERY_CHANNEL,
    type: FORM_FIELD_TYPES.NUMBER,
    componentType: FORM_FIELD_COMPONENT_TYPES.AUTOCOMPLETE,
    label: "Delivery Channel used by business",
    placeholder: "Choose your delivery channel",
    gridSize: FORM_FIELDS_GRID_SIZE.FULL,
    options: deliveryChannelOptions,
  },
];

export const businessDetailsFormFieldsSchema: ObjectSchema<IRegistrationBusinessDetailsFormFields> =
  object().shape({
    [REGISTRATION_FORM_FIELDS.POS]: number()
      .transform((val) => (val === 0 ? null : val)) // 0 - not valid
      .required(defaultRequiredError("POS")),
    [REGISTRATION_FORM_FIELDS.DELIVERY_CHANNEL]: number()
      .transform((val) => (val === 0 ? null : val)) // 0 - not valid
      .required(defaultRequiredError("Delivery Channel")),
  });
