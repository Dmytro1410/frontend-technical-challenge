import ChipSelector from "../ChipSelector";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FORM_FIELD_COMPONENT_TYPES, TOption } from "../../models/common";
import { IRegistrationFieldRendererProps } from "../../models/Registration";

const FieldRenderer = ({
  control,
  errors,
  formField,
}: IRegistrationFieldRendererProps) => {
  switch (formField.componentType) {
    case FORM_FIELD_COMPONENT_TYPES.AUTOCOMPLETE:
      return (
        <Controller
          name={formField.field}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth>
              <Autocomplete
                options={formField.options || []}
                getOptionLabel={(option: TOption) => option.label}
                isOptionEqualToValue={(option, value: TOption) =>
                  option.id === value.id
                }
                onChange={(_, data) => {
                  onChange(data?.id || null);
                }}
                value={getAutocompleteValue({
                  value,
                  options: formField.options,
                })}
                renderOption={(props, option: TOption) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="36"
                      srcSet={option.imageUrl}
                      src={option.imageUrl}
                      alt={option.label}
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={formField.label}
                    error={Boolean(errors[formField.field])}
                    helperText={errors[formField.field]?.message as string}
                  />
                )}
              />
            </FormControl>
          )}
        />
      );
    case FORM_FIELD_COMPONENT_TYPES.SELECT:
      return (
        <Controller
          name={formField.field}
          control={control}
          render={({ field: { onChange, value } }) => {
            debugger;
            return (
              <FormControl fullWidth error={Boolean(errors[formField.field])}>
                <InputLabel id={value + "-id"}>{formField.label}</InputLabel>
                <Select
                  labelId={value + "-id"}
                  id={formField.field + "-id"}
                  value={formField.options?.length ? value || "" : ""}
                  label={formField.label}
                  onChange={onChange}
                >
                  {formField.options?.map(({ id, label }: TOption) => (
                    <MenuItem key={id} value={id}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors[formField.field]?.message as string}
                </FormHelperText>
              </FormControl>
            );
          }}
        />
      );
    case FORM_FIELD_COMPONENT_TYPES.CHIP_SELECTOR: {
      return (
        <Controller
          name={formField.field}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ChipSelector
              items={formField.options || []}
              error={errors[formField.field]?.message as string}
              value={value}
              onChange={onChange}
            />
          )}
        />
      );
    }
    case FORM_FIELD_COMPONENT_TYPES.TEXT_FIELD:
      return (
        <Controller
          name={formField.field}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              aria-label={formField.label}
              autoComplete={formField.label}
              error={Boolean(errors[formField.field])}
              helperText={errors[formField.field]?.message as string}
              label={formField.label}
              placeholder={formField.placeholder}
              type={formField.type}
              fullWidth
            />
          )}
        />
      );

    default:
      return null;
  }
};

const getAutocompleteValue = ({
  value,
  options,
}: {
  value: string | number | null;
  options?: TOption[];
}): TOption | null => options?.find((opt) => opt.id === value) || null;

export default FieldRenderer;
