import { useDispatch, useSelector } from "react-redux";
import {
  getRegistrationBusinessDetailsSummary,
  getRegistrationBusinessInfoSummary,
  getRegistrationPersonalInfoSummary,
  getRegistrationSteps,
} from "../../../../store/selectors/Registration";
import SummaryComponent from "./component";
import { setRegistrationActiveStep } from "../../../../store/reducers/Registration/Stepper";
import { useMemo } from "react";
import useFetchBusinessInfo from "../../../../hooks/useFetchBusinessInfo";
import useFetchBusinessDetails from "../../../../hooks/useFetchBusinessDetails";

const Summary = () => {
  const dispatch = useDispatch();

  useFetchBusinessInfo();
  useFetchBusinessDetails();
  const personalInfo = useSelector(getRegistrationPersonalInfoSummary);
  const businessInfo = useSelector(getRegistrationBusinessInfoSummary);
  const businessDetails = useSelector(getRegistrationBusinessDetailsSummary);
  const steps = useSelector(getRegistrationSteps);

  const modifiedSteps = useMemo(
    () =>
      steps?.map((step: string, index: number) => {
        let formFields: { label: string; value: any }[];
        switch (index) {
          case 0:
            formFields = personalInfo;
            break;
          case 1:
            formFields = businessInfo;
            break;
          case 2:
            formFields = businessDetails;
            break;
          default:
            formFields = [];
        }

        return { title: step, formFields };
      }) || [],
    [businessDetails, businessInfo, personalInfo, steps],
  );

  const handleOnEdit = (step: number) => {
    dispatch(setRegistrationActiveStep(step));
  };

  return <SummaryComponent steps={modifiedSteps} onEdit={handleOnEdit} />;
};

export default Summary;
