import {
  businessInfoFormFieldsSchema,
  getBusinessInfoFormFieldsConfig,
} from "./config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationBusinessInfo } from "../../../../store/selectors/Registration";
import { useDebouncedCallback } from "use-debounce";
import { updateRegistrationBusinessInfo } from "../../../../store/reducers/Registration/BusinesInfo";
import {
  IRegistrationBusinessInfoComponent,
  IRegistrationBusinessInfoFormFields,
  TOnSubmitPayload,
} from "../../../../models/Registration";
import FormFields from "../FormFields";
import useFetchBusinessInfo from "../../../../hooks/useFetchBusinessInfo";

const BusinessInfo = ({
  formRef,
  onSubmit,
}: IRegistrationBusinessInfoComponent) => {
  const dispatch = useDispatch();
  const defaultValues: IRegistrationBusinessInfoFormFields = useSelector(
    getRegistrationBusinessInfo,
  );
  const { businessTypeOptions, businessSizeOptions } = useFetchBusinessInfo();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegistrationBusinessInfoFormFields>({
    resolver: yupResolver(businessInfoFormFieldsSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const formFields = useMemo(
    () =>
      getBusinessInfoFormFieldsConfig({
        businessTypeOptions,
        businessSizeOptions,
      }),
    [businessTypeOptions, businessSizeOptions],
  );
  const debouncedUpdateLS = useDebouncedCallback((value) => {
    dispatch(updateRegistrationBusinessInfo(value));
  }, 500);

  useEffect(() => {
    const subscription = watch((value) => {
      debouncedUpdateLS(value);
    });
    return () => subscription.unsubscribe();
  }, [debouncedUpdateLS, watch]);

  const handleOnSubmit = (data: TOnSubmitPayload) => {
    onSubmit(data as IRegistrationBusinessInfoFormFields);
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

export default BusinessInfo;
