import { Chip } from "@mui/material";
import {
  StyledChipsContainer,
  StyledChipsContainerLabel,
  StyledErrorContainer,
} from "./styles";
import { ChipSelectorComponent } from "../../models/ChipSelector";

const ChipSelector = ({
  items,
  error,
  value,
  onChange,
}: ChipSelectorComponent) => (
  <>
    <StyledChipsContainer error={error} direction={"row"}>
      <StyledChipsContainerLabel error={error}>
        Business Size
      </StyledChipsContainerLabel>
      {items.map((item) => (
        <Chip
          key={item.id}
          label={item.label}
          color={value === item.id ? "primary" : "default"}
          clickable
          onClick={() => onChange(item.id)}
          style={{ margin: "4px" }}
        />
      ))}
    </StyledChipsContainer>
    {error && <StyledErrorContainer>{error}</StyledErrorContainer>}
  </>
);

export default ChipSelector;
