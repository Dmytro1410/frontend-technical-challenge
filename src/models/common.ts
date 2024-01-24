export type TOption = {
  readonly id: string | number;
  readonly label: string;
  readonly imageUrl?: string;
};

export enum FORM_FIELDS_GRID_SIZE {
  HALF = 6,
  FULL = 12,
}

export enum FORM_FIELD_TYPES {
  STRING = "string",
  NUMBER = "number",
}

export enum FORM_FIELD_COMPONENT_TYPES {
  TEXT_FIELD = "textField",
  CHIP_SELECTOR = "chipSelector",
  SELECT = "select",
  AUTOCOMPLETE = "autocomplete",
}
