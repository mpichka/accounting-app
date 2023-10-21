import { Commands } from '@/commands';
import { EpicAction } from '@/redux/types';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs';
import { FETCH_ADDITIONAL_EXPENSES, SET_ADDITIONAL_EXPENSES, SET_ADDITIONAL_EXPENSES_ERROR, SET_ADDITIONAL_EXPENSES_SUCCESS } from './actions';

const DEBOUNCE_TIME = 500;

const setAdditionalExpenses = (action$: EpicAction) => action$.pipe(
  ofType(SET_ADDITIONAL_EXPENSES),
  debounceTime(DEBOUNCE_TIME),
  switchMap((action) => from(Commands.updateAdditionalExpenses(action.payload)).pipe(
    map(response => ({ type: SET_ADDITIONAL_EXPENSES_SUCCESS, payload: response })),
    catchError(error => of({ type: SET_ADDITIONAL_EXPENSES_ERROR, error: error }))
  ))
);

const loadAdditionalExpenses = (action$: EpicAction) => action$.pipe(
  ofType(FETCH_ADDITIONAL_EXPENSES),
  debounceTime(DEBOUNCE_TIME),
  switchMap(() => from(Commands.fetchAdditionalExpenses()).pipe(
    map(response => ({ type: SET_ADDITIONAL_EXPENSES_SUCCESS, payload: response })),
    catchError(error => of({ type: SET_ADDITIONAL_EXPENSES_ERROR, error: error }))
  ))
);

export const additionalExpensesEpics = combineEpics(
  setAdditionalExpenses,
  loadAdditionalExpenses
);
