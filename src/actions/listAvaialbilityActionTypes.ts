import { ProviderAvailability } from '../screens/CreateAppointment';

export const ListAvailabilityLoading = 'listAvailability/loading';
export interface ListAvailabilityLoadingAction {
  type: typeof ListAvailabilityLoading;
}

export const ListAvailabilityError = 'listAvailability/error';
export interface ListAvailabilityErrorAction {
  type: typeof ListAvailabilityError;
  error: Error;
}

export const ListAvailabilitySuccess = 'listAvailability/success';
export interface ListAvailabilitySuccessAction {
  type: typeof ListAvailabilitySuccess;
  data: ProviderAvailability[];
}

export type ListAvailabilityAction =
  | ListAvailabilityLoadingAction
  | ListAvailabilityErrorAction
  | ListAvailabilitySuccessAction;
