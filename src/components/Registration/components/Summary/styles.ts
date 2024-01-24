import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const SummaryContainer = styled(Stack)({
  padding: "12px 0",
  width: "100%",
  gap: 24,
});

export const StyledSummaryTitle = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  paddingLeft: 12,
  h4: { margin: 0 },
  button: { fontSize: 12 },
});

export const StyledSummaryBody = styled(Stack)({
  alignItems: "flex-start",
  padding: "12px 24px",
  gap: 12,
});

export const StyledSummaryRow = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
  h5: { margin: 0 },
  fontSize: 14,
  ".title": {
    fontWeight: 500,
  },
});
