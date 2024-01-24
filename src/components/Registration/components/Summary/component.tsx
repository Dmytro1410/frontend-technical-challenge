import { Button, Divider, Stack } from "@mui/material";
import {
  StyledSummaryBody,
  StyledSummaryRow,
  StyledSummaryTitle,
  SummaryContainer,
} from "./styles";
import { IRegistrationSummaryComponent } from "../../../../models/Registration";

const SummaryComponent = ({ steps, onEdit }: IRegistrationSummaryComponent) => (
  <SummaryContainer>
    {steps.map(
      (
        step: { title: string; formFields: { [x: string]: string | number }[] },
        index: number,
      ) => (
        <Stack key={step.title}>
          <StyledSummaryTitle>
            <h4>{step.title}</h4>
            <Button size={"small"} onClick={() => onEdit(index)}>
              edit
            </Button>
          </StyledSummaryTitle>
          <Divider />
          <StyledSummaryBody>
            {step.formFields.map((item: { [x: string]: string | number }) => (
              <StyledSummaryRow key={item.label}>
                <span className={"title"}>{item.label}:</span> {item.value}
              </StyledSummaryRow>
            ))}
          </StyledSummaryBody>
        </Stack>
      ),
    )}
  </SummaryContainer>
);

export default SummaryComponent;
