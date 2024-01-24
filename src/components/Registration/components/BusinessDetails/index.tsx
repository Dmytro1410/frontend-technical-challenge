import {
  businessDetailsFormFieldsSchema,
  getBusinessDetailsFormFieldsConfig,
} from "./config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationBusinessDetails } from "../../../../store/selectors/Registration";
import { useDebouncedCallback } from "use-debounce";
import { updateRegistrationBusinessDetails } from "../../../../store/reducers/Registration/BusinessDetails";
import {
  IRegistrationBusinessDetailsComponent,
  IRegistrationBusinessDetailsFormFields,
  TOnSubmitPayload,
} from "../../../../models/Registration";
import FormFields from "../FormFields";
import useFetchBusinessDetails from "../../../../hooks/useFetchBusinessDetails";

const BusinessDetails = ({
  formRef,
  onSubmit,
}: IRegistrationBusinessDetailsComponent) => {
  const dispatch = useDispatch();
  const defaultValues: IRegistrationBusinessDetailsFormFields = useSelector(
    getRegistrationBusinessDetails,
  );
  const { posOptions, deliveryChannelOptions } = useFetchBusinessDetails();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegistrationBusinessDetailsFormFields>({
    resolver: yupResolver(businessDetailsFormFieldsSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const formFields = useMemo(
    () =>
      getBusinessDetailsFormFieldsConfig({
        posOptions,
        deliveryChannelOptions,
      }),
    [posOptions, deliveryChannelOptions],
  );
  const debouncedUpdateLS = useDebouncedCallback((value) => {
    dispatch(updateRegistrationBusinessDetails(value));
  }, 500);

  useEffect(() => {
    const subscription = watch((value) => {
      debouncedUpdateLS(value);
    });
    return () => subscription.unsubscribe();
  }, [debouncedUpdateLS, watch]);

  const handleOnSubmit = (data: TOnSubmitPayload) => {
    onSubmit(data as IRegistrationBusinessDetailsFormFields);
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

export default BusinessDetails;
