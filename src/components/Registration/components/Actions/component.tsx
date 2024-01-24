import { Button } from "@mui/material";
import { StyledActionsContainer } from "../../styles";
import { IRegistrationActionsComponent } from "../../../../models/Registration";

const ActionsComponent = ({
  displayedButtons,
  onNext,
  onBack,
  onSubmit,
  onReset,
}: IRegistrationActionsComponent) => (
  <StyledActionsContainer>
    {displayedButtons.back && <Button onClick={onBack}>Back</Button>}
    {displayedButtons.next && (
      <Button variant={"contained"} onClick={onNext}>
        Next
      </Button>
    )}
    {displayedButtons.submit && (
      <Button variant={"contained"} onClick={onSubmit}>
        Submit
      </Button>
    )}
    {displayedButtons.reset && (
      <Button variant={"contained"} onClick={onReset}>
        Reset
      </Button>
    )}
  </StyledActionsContainer>
);

export default ActionsComponent;
