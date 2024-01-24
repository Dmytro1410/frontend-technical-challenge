import { useDispatch, useSelector } from "react-redux";
import {
  getRegistrationBusinessSizeSourceDataState,
  getRegistrationBusinessTypeSourceDataState,
} from "../store/selectors/Registration";
import {
  fetchBusinessSize,
  fetchBusinessType,
} from "../store/reducers/Registration/sourceData";
import { useEffect, useRef } from "react";

const useFetchBusinessInfo = () => {
  let ignore = useRef(false);
  const dispatch = useDispatch();
  const { options: businessSizeOptions, isLoading: isLoadingBusinessSize } =
    useSelector(getRegistrationBusinessSizeSourceDataState);
  const { options: businessTypeOptions, isLoading: isLoadingBusinessType } =
    useSelector(getRegistrationBusinessTypeSourceDataState);

  useEffect(() => {
    if (!ignore.current) {
      if (!businessSizeOptions.length && !isLoadingBusinessSize)
        dispatch(fetchBusinessSize());
      if (!businessTypeOptions.length && !isLoadingBusinessType)
        dispatch(fetchBusinessType());
    }
    return () => {
      ignore.current = true;
    };
  }, [
    businessTypeOptions,
    isLoadingBusinessType,
    businessSizeOptions,
    isLoadingBusinessSize,
    dispatch,
  ]);

  return { businessSizeOptions, businessTypeOptions };
};

export default useFetchBusinessInfo;
