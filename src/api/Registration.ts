import { apiRequest } from "./config";
import {
  IRegistrationBusinessDetailsFormFields,
  IRegistrationBusinessInfoFormFields,
  IRegistrationPersonalInfoFormFields,
} from "../models/Registration";

export const apiGetAllPOS = (): Promise<{
  data: { id: number; name: string; imageUrl: string }[];
}> => apiRequest({ method: "get", url: "/pos" });

export const apiGetAllDeliveryChannels = (): Promise<{
  data: { id: number; name: string; imageUrl: string }[];
}> => apiRequest({ method: "get", url: "/channel" });

export const apiSubmitForm = (
  body: IRegistrationPersonalInfoFormFields &
    IRegistrationBusinessInfoFormFields &
    IRegistrationBusinessDetailsFormFields,
): Promise<unknown> => apiRequest({ method: "post", body, url: "/account" });
