import { Action } from '@/redux/types';
import { SET_ADDITIONAL_EXPENSES_SUCCESS } from './actions';
import { initialState } from './initial_state';
import { AdditionalExpenses } from './type';

export default function additionalExpenses(state = initialState, action: Action): AdditionalExpenses {
  switch (action.type) {
    case SET_ADDITIONAL_EXPENSES_SUCCESS: 
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
