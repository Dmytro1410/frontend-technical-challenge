import { useSelector } from "react-redux";
import ActionsComponent from "./component";
import {
  getRegistrationActiveStep,
  getRegistrationSteps,
} from "../../../../store/selectors/Registration";
import { useMemo } from "react";
import { IRegistrationActions } from "../../../../models/Registration";

const Actions = ({
  onNext,
  onBack,
  onSubmit,
  onReset,
}: IRegistrationActions) => {
  const activeStep = useSelector(getRegistrationActiveStep);
  const steps = useSelector(getRegistrationSteps);

  const handleOnNext = () => {
    onNext();
  };
  const handleOnBack = () => {
    onBack();
  };
  const handleOnSubmit = () => {
    onSubmit();
  };
  const handleOnReset = () => {
    onReset();
  };

  const displayedButtons = useMemo(() => {
    let back = false,
      next = false,
      submit = false,
      reset = false;
    if (activeStep > 0 && activeStep <= steps.length) back = true;
    if (activeStep < steps.length) next = true;
    if (activeStep === steps.length) submit = true;
    if (activeStep > steps.length) reset = true;
    return { back, next, submit, reset };
  }, [activeStep, steps]);

  return (
    <ActionsComponent
      displayedButtons={displayedButtons}
      onNext={handleOnNext}
      onBack={handleOnBack}
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    />
  );
};

export default Actions;
