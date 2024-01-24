import {
  StyledRegistrationContainer,
  StyledRegistrationWrapper,
} from "./styles";
import { Step, StepLabel, Stepper } from "@mui/material";
import Actions from "./components/Actions";
import PersonalInfo from "./components/PersonalInfo";
import BusinessInfo from "./components/BusinessInfo";
import BusinessDetails from "./components/BusinessDetails";
import { IRegistrationComponent } from "../../models/Registration";
import Summary from "./components/Summary";
import Congratulations from "./components/Congratulations";

const RegistrationComponent = ({
  activeStep,
  steps,
  personalInfoFormRef,
  businessInfoFormRef,
  businessDetailsFormRef,
  onBack,
  onNext,
  onSubmitStep,
  onSubmit,
  onReset,
}: IRegistrationComponent) => (
  <StyledRegistrationWrapper>
    <StyledRegistrationContainer elevation={2}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "100%" }}>
        {steps.map((step: string) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <PersonalInfo onSubmit={onNext} formRef={personalInfoFormRef} />
      )}
      {activeStep === 1 && (
        <BusinessInfo onSubmit={onNext} formRef={businessInfoFormRef} />
      )}
      {activeStep === 2 && (
        <BusinessDetails onSubmit={onNext} formRef={businessDetailsFormRef} />
      )}
      {activeStep === 3 && <Summary />}
      {activeStep === 4 && <Congratulations />}
      <Actions
        onNext={onSubmitStep}
        onBack={onBack}
        onSubmit={onSubmit}
        onReset={onReset}
      />
    </StyledRegistrationContainer>
  </StyledRegistrationWrapper>
);

export default RegistrationComponent;

//
