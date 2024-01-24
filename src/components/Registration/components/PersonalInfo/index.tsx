import {
  getPersonalInfoFormFieldsConfig,
  personalInfoFormFieldsSchema,
} from "./config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationPersonalInfo } from "../../../../store/selectors/Registration";
import { updateRegistrationPersonalInfo } from "../../../../store/reducers/Registration/PersonalInfo";
import { useDebouncedCallback } from "use-debounce";
import {
  IRegistrationPersonalInfoComponent,
  IRegistrationPersonalInfoFormFields,
  TOnSubmitPayload,
} from "../../../../models/Registration";
import FormFields from "../FormFields";

const PersonalInfo = ({
  formRef,
  onSubmit,
}: IRegistrationPersonalInfoComponent) => {
  const dispatch = useDispatch();
  const defaultValues: IRegistrationPersonalInfoFormFields = useSelector(
    getRegistrationPersonalInfo,
  );
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegistrationPersonalInfoFormFields>({
    defaultValues,
    resolver: yupResolver(personalInfoFormFieldsSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const formFields = getPersonalInfoFormFieldsConfig();
  const debouncedUpdateLS = useDebouncedCallback((value) => {
    dispatch(updateRegistrationPersonalInfo(value));
  }, 500);

  useEffect(() => {
    const subscription = watch((value) => {
      debouncedUpdateLS(value);
    });
    return () => subscription.unsubscribe();
  }, [debouncedUpdateLS, watch]);

  const handleOnSubmit = (data: TOnSubmitPayload) => {
    onSubmit(data as IRegistrationPersonalInfoFormFields);
  };

  return (
    <FormFields
      control={control}
      errors={errors}
      formRef={formRef}
      formFields={formFields}
      handleOnSubmit={handleOnSubmit}
      handleSubmit={handleSubmit}
    />
  );
};

export default PersonalInfo;
