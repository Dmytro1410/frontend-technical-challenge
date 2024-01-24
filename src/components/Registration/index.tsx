import RegistrationComponent from "./component";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegistrationActiveStep,
  getRegistrationSteps,
} from "../../store/selectors/Registration";
import { useRef } from "react";
import {
  resetForm,
  setRegistrationActiveStep,
  submitForm,
} from "../../store/reducers/Registration/Stepper";

const Registration = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector(getRegistrationActiveStep);
  const steps = useSelector(getRegistrationSteps);

  const personalInfoFormRef = useRef<HTMLFormElement>(null);
  const businessInfoFormRef = useRef<HTMLFormElement>(null);
  const businessDetailsFormRef = useRef<HTMLFormElement>(null);

  const handleOnSubmitStep = () => {
    switch (activeStep) {
      case 0:
        personalInfoFormRef.current?.requestSubmit();
        break;
      case 1:
        businessInfoFormRef.current?.requestSubmit();
        break;
      case 2:
        businessDetailsFormRef.current?.requestSubmit();
        break;
      case 3:
        handleOnSubmit();
        break;
    }
  };
  const handleOnBack = () => {
    dispatch(setRegistrationActiveStep(activeStep - 1));
  };

  const handleOnNext = () => {
    dispatch(setRegistrationActiveStep(activeStep + 1));
  };

  const handleOnSubmit = () => {
    dispatch(
      submitForm({
        callback: () => {
          dispatch(setRegistrationActiveStep(4));
        },
      }),
    );
  };

  const handleOnReset = () => {
    dispatch(resetForm());
  };

  return (
    <RegistrationComponent
      activeStep={activeStep}
      steps={steps}
      personalInfoFormRef={personalInfoFormRef}
      businessInfoFormRef={businessInfoFormRef}
      businessDetailsFormRef={businessDetailsFormRef}
      onNext={handleOnNext}
      onBack={handleOnBack}
      onSubmitStep={handleOnSubmitStep}
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    />
  );
};

export default Registration;
