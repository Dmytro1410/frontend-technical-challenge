import { Grid } from "@mui/material";
import {
  IRegistrationBaseFormFiledConfig,
  IRegistrationFormFieldsComponent,
} from "../../../models/Registration";
import FieldRenderer from "../fieldRenderer";
import { StyledFormFieldsContainer } from "../styles";

const FormFields = ({
  control,
  errors,
  handleSubmit,
  handleOnSubmit,
  formRef,
  formFields,
}: IRegistrationFormFieldsComponent) => (
  <StyledFormFieldsContainer>
    <form onSubmit={handleSubmit(handleOnSubmit)} ref={formRef}>
      <Grid container spacing={2}>
        {formFields.map((formField: IRegistrationBaseFormFiledConfig) => (
          <Grid key={formField.field} item xs={formField.gridSize}>
            <FieldRenderer
              control={control}
              errors={errors}
              formField={formField}
            />
          </Grid>
        ))}
      </Grid>
    </form>
  </StyledFormFieldsContainer>
);

export default FormFields;
