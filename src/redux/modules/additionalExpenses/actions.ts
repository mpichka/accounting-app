import { AdditionalExpenses } from './type';

export const SET_ADDITIONAL_EXPENSES = 'SET_ADDITIONAL_EXPENSES';
export const SET_ADDITIONAL_EXPENSES_SUCCESS = 'SET_ADDITIONAL_EXPENSES_SUCCESS';
export const SET_ADDITIONAL_EXPENSES_ERROR = 'SET_ADDITIONAL_EXPENSES_ERROR';
export const FETCH_ADDITIONAL_EXPENSES = 'FETCH_ADDITIONAL_EXPENSES';

export const setAdditionalExpenses = (payload: AdditionalExpenses) => ({ type: SET_ADDITIONAL_EXPENSES, payload });
export const fetchAdditionalExpenses = () => ({ type: FETCH_ADDITIONAL_EXPENSES });
