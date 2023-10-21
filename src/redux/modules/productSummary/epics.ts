import { Commands } from '@/commands';
import { EpicAction, EpicRootState } from '@/redux/types';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, debounceTime, filter, from, map, of, switchMap } from 'rxjs';
import { SET_ADDITIONAL_EXPENSES_SUCCESS } from '../additionalExpenses/actions';
import {
  SET_ACCESSORIES_FULFILLED,
  SET_AMORTIZATIONS_FULFILLED,
  SET_BEADS_FULFILLED,
  SET_BEADS_QUALITY_FULFILLED,
  SET_BEADS_TOTAL_WEIGHT_FULFILLED,
  SET_ESTIMATE_FULFILLED,
  SET_GERDAN_TYPE_FULFILLED,
  SET_MARGE_FULFILLED,
  SET_PACKAGES_FULFILLED,
  SET_SCHEMA_PRICE_FULFILLED,
  SET_SURCHARGE_FULFILLED,
  SET_THREADS_FULFILLED,
  SET_THREADS_TOTAL_PRICE_FULFILLED
} from '../productMaker/actions';
import { SET_PRODUCT_SUMMARY_ERROR, SET_PRODUCT_SUMMARY_SUCCESS } from './actions';
import { PAGE_PRODUCT_EDITOR } from '../app/actions';

const DEBOUNCE_TIME = 0;

const calculateProductSummary: any = (action$: EpicAction, state$: EpicRootState) => action$.pipe(
  ofType(
    SET_AMORTIZATIONS_FULFILLED,
    SET_ACCESSORIES_FULFILLED,
    SET_BEADS_FULFILLED,
    SET_BEADS_QUALITY_FULFILLED,
    SET_BEADS_TOTAL_WEIGHT_FULFILLED,
    SET_ESTIMATE_FULFILLED,
    SET_GERDAN_TYPE_FULFILLED,
    SET_MARGE_FULFILLED,
    SET_PACKAGES_FULFILLED,
    SET_SCHEMA_PRICE_FULFILLED,
    SET_SURCHARGE_FULFILLED,
    SET_THREADS_FULFILLED,
    SET_THREADS_TOTAL_PRICE_FULFILLED,
    SET_ADDITIONAL_EXPENSES_SUCCESS,
  ),
  filter(() => state$.value.app.page === PAGE_PRODUCT_EDITOR),
  debounceTime(DEBOUNCE_TIME),
  switchMap(() => from(Commands.calculateProductPreview(state$.value.productMaker)).pipe(
    map(response => ({ type: SET_PRODUCT_SUMMARY_SUCCESS, payload: response })),
    catchError(error => of({ type: SET_PRODUCT_SUMMARY_ERROR, error: error }))
  ))
);

export const productSummaryEpics = combineEpics(
  calculateProductSummary,
);
