import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  apiGetAllDeliveryChannels,
  apiGetAllPOS,
  apiSubmitForm,
} from "../../api/Registration";
import {
  fetchBusinessSize,
  fetchBusinessSizeFailed,
  fetchBusinessSizeSuccess,
  fetchBusinessType,
  fetchBusinessTypeFailed,
  fetchBusinessTypeSuccess,
  fetchDeliveryChannel,
  fetchDeliveryChannelFailed,
  fetchDeliveryChannelSuccess,
  fetchInitialData,
  fetchPOS,
  fetchPOSFailed,
  fetchPOSSuccess,
} from "../reducers/Registration/sourceData";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IRegistrationBusinessDetailsFormFields,
  IRegistrationBusinessInfoFormFields,
  IRegistrationPersonalInfoFormFields,
} from "../../models/Registration";
import {
  getRegistrationBusinessDetails,
  getRegistrationBusinessInfo,
  getRegistrationPersonalInfo,
} from "../selectors/Registration";
import {
  extractObjProps,
  registrationLocalStorageKey,
} from "../../utils/common";
import {
  resetPersonalInfo,
  updateRegistrationPersonalInfo,
} from "../reducers/Registration/PersonalInfo";
import {
  resetBusinessInfo,
  updateRegistrationBusinessInfo,
} from "../reducers/Registration/BusinesInfo";
import {
  resetBusinessDetails,
  updateRegistrationBusinessDetails,
} from "../reducers/Registration/BusinessDetails";
import {
  resetForm,
  setRegistrationActiveStep,
  submitForm,
} from "../reducers/Registration/Stepper";

function* handleOnFetchBusinessSize() {
  try {
    const fakeData = [
      { label: "1-10", id: 1 },
      { label: "11-50", id: 2 },
      { label: "51-100", id: 3 },
      { label: "101-1000", id: 4 },
      { label: "> 1000", id: 5 },
    ];

    yield put(fetchBusinessSizeSuccess(fakeData));
  } catch (e: unknown) {
    const error = e as { message: string };
    yield put(fetchBusinessSizeFailed(error.message));
  }
}

function* handleOnFetchBusinessType() {
  try {
    const fakeData = [
      { label: "SMB", id: 1 },
      { label: "Midmarket", id: 2 },
      { label: "Enterprise", id: 3 },
    ];

    yield put(fetchBusinessTypeSuccess(fakeData));
  } catch (e: unknown) {
    const error = e as { message: string };
    yield put(fetchBusinessTypeFailed(error.message));
  }
}

function* handleOnFetchPOS() {
  try {
    const { data } = yield call(apiGetAllPOS);
    const options = data.map(
      (item: { id: number; name: string; imageUrl: string }) => ({
        ...item,
        label: item.name,
      }),
    );
    yield put(fetchPOSSuccess(options));
  } catch (e: unknown) {
    const error = e as { message: string };
    yield put(fetchPOSFailed(error.message));
  }
}

function* handleOnFetchDeliveryChannel() {
  try {
    const { data } = yield call(apiGetAllDeliveryChannels);
    const options = data.map(
      (item: { id: number; name: string; imageUrl: string }) => ({
        ...item,
        label: item.name,
      }),
    );
    yield put(fetchDeliveryChannelSuccess(options));
  } catch (e: unknown) {
    const error = e as { message: string };
    yield put(fetchDeliveryChannelFailed(error.message));
  }
}

function* handleOnFetchInitialData({
  payload,
}: PayloadAction<
  IRegistrationPersonalInfoFormFields &
    IRegistrationBusinessInfoFormFields &
    IRegistrationBusinessDetailsFormFields & { activeStep: number }
>) {
  try {
    const personalInfo: IRegistrationPersonalInfoFormFields = yield select(
      getRegistrationPersonalInfo,
    );
    const businessInfo: IRegistrationBusinessInfoFormFields = yield select(
      getRegistrationBusinessInfo,
    );
    const businessDetails: IRegistrationBusinessDetailsFormFields =
      yield select(getRegistrationBusinessDetails);

    yield put(
      updateRegistrationPersonalInfo(
        extractObjProps({
          sourceObj: personalInfo,
          targetObj: payload,
        }) as IRegistrationPersonalInfoFormFields,
      ),
    );
    yield put(
      updateRegistrationBusinessInfo(
        extractObjProps({
          sourceObj: businessInfo,
          targetObj: payload,
        }) as IRegistrationBusinessInfoFormFields,
      ),
    );
    yield put(
      updateRegistrationBusinessDetails(
        extractObjProps({
          sourceObj: businessDetails,
          targetObj: payload,
        }) as IRegistrationBusinessDetailsFormFields,
      ),
    );
    yield put(setRegistrationActiveStep(payload.activeStep || 0));
  } catch (e: unknown) {
    const error = e as { message: string };
    console.log(error);
  }
}

function* handleOnSubmitForm({
  payload,
}: PayloadAction<{ callback: () => void }>) {
  try {
    const { callback } = payload;
    const personalInfo: IRegistrationPersonalInfoFormFields = yield select(
      getRegistrationPersonalInfo,
    );
    const businessInfo: IRegistrationBusinessInfoFormFields = yield select(
      getRegistrationBusinessInfo,
    );
    const businessDetails: IRegistrationBusinessDetailsFormFields =
      yield select(getRegistrationBusinessDetails);
    const apiPayload = { ...personalInfo, ...businessInfo, ...businessDetails };
    yield call(apiSubmitForm, apiPayload);
    yield call(callback);
  } catch (e: unknown) {
    const error = e as { message: string };
    console.log(error);
  }
}

function* handleOnResetForm() {
  try {
    localStorage.removeItem(registrationLocalStorageKey);
    yield put(resetPersonalInfo());
    yield put(resetBusinessInfo());
    yield put(resetBusinessDetails());
  } catch (e: unknown) {
    const error = e as { message: string };
    console.log(error);
  }
}

function* ApplicationsSaga() {
  yield takeLatest(fetchBusinessSize, handleOnFetchBusinessSize);
  yield takeLatest(fetchBusinessType, handleOnFetchBusinessType);
  yield takeLatest(fetchPOS, handleOnFetchPOS);
  yield takeLatest(fetchDeliveryChannel, handleOnFetchDeliveryChannel);
  yield takeLatest(fetchInitialData, handleOnFetchInitialData);
  yield takeLatest(submitForm, handleOnSubmitForm);
  yield takeLatest(resetForm, handleOnResetForm);
}

export default ApplicationsSaga;
