import { ProviderAvailability } from 'src/screens/CreateAppointment';
import * as actions from '../actions/listAvaialbilityActionTypes';

interface ListAvailabilityState {
  isLoading: boolean;
  error: Error | null;
  data: ProviderAvailability[];
}

export const initialState: ListAvailabilityState = {
  isLoading: false,
  error: null,
  data: [],
};

export const listAvailabilityReducer = (
  state: ListAvailabilityState = initialState,
  action: actions.ListAvailabilityAction,
): ListAvailabilityState => {
  switch (action.type) {
    case actions.ListAvailabilityLoading:
      return { ...state, isLoading: true, error: null };
    case actions.ListAvailabilitySuccess:
      return { ...state, data: action.data, isLoading: false };
    case actions.ListAvailabilityError:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};
