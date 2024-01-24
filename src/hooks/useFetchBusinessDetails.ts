import { useDispatch, useSelector } from "react-redux";
import {
  getRegistrationDeliveryChannelSourceDataState,
  getRegistrationPOSSourceDataState,
} from "../store/selectors/Registration";
import {
  fetchDeliveryChannel,
  fetchPOS,
} from "../store/reducers/Registration/sourceData";
import { useEffect, useRef } from "react";

const useFetchBusinessDetails = () => {
  let ignore = useRef(false);
  const dispatch = useDispatch();
  const { options: posOptions, isLoading: isLoadingPOS } = useSelector(
    getRegistrationPOSSourceDataState,
  );
  const {
    options: deliveryChannelOptions,
    isLoading: isLoadingDeliveryChannel,
  } = useSelector(getRegistrationDeliveryChannelSourceDataState);

  useEffect(() => {
    if (!ignore.current) {
      if (!posOptions.length && !isLoadingPOS) dispatch(fetchPOS());
      if (!deliveryChannelOptions.length && !isLoadingDeliveryChannel)
        dispatch(fetchDeliveryChannel());
    }
    return () => {
      ignore.current = true;
    };
  }, [
    isLoadingPOS,
    posOptions,
    isLoadingDeliveryChannel,
    deliveryChannelOptions,
    dispatch,
  ]);

  return { deliveryChannelOptions, posOptions };
};

export default useFetchBusinessDetails;
