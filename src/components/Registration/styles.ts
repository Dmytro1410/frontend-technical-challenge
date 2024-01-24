import { styled } from "@mui/system";
import { Paper, Stack } from "@mui/material";

export const StyledRegistrationWrapper = styled(Stack)({
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledRegistrationContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "30vh",
  width: "50%",
});

export const StyledActionsContainer = styled(Stack)({
  flexDirection: "row",
  width: "100%",
  justifyContent: "flex-end",
  marginTop: "auto",
  gap: 12,
});

export const StyledFormFieldsContainer = styled(Stack)({
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  form: { width: "100%" },
});
