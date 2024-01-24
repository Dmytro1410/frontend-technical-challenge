import { styled } from "@mui/system";
import { Stack, Theme } from "@mui/material";

export const StyledChipsContainer = styled(Stack)(
  ({ error, theme }: { error?: string; theme?: Theme }) => ({
    position: "relative",
    padding: 7,
    border: `1px solid ${error ? theme?.palette.error.main : theme?.palette.action.disabled}`,
    borderRadius: theme?.shape.borderRadius,
    "&:hover": {
      borderColor: error
        ? theme?.palette.error.main
        : theme?.palette.text.primary,
    },
  }),
);

export const StyledChipsContainerLabel = styled(Stack)(
  ({ error, theme }: { error?: string; theme?: Theme }) => ({
    position: "absolute",
    top: -9,
    left: 8,
    color: error ? theme?.palette.error.main : theme?.palette.text.secondary,
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontSize: 12,
    background: theme?.palette.background.paper,
    padding: "2px 6px",
    pointerEvents: "none",
  }),
);

export const StyledErrorContainer = styled(Stack)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 12,
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  alignItems: "flex-start",
  padding: "6px 0 0 14px",
}));
