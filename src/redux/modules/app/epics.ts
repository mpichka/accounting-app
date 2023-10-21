import { EpicAction } from '@/redux/types';
import { combineEpics, ofType } from 'redux-observable';
import { delay, filter, map, tap } from 'rxjs';
import { CLEAR_PRODUCT_MAKER, LOAD_PRODUCT_SUCCESS } from '../productMaker/actions';
import { CLEAR_ERROR, SET_ERROR, SET_PAGE_CALENDAR, SET_PAGE_DASHBOARD, SET_PAGE_MATERIALS, SET_PAGE_ORDERS, SET_PAGE_ORDER_EDITOR, SET_PAGE_PRODUCTS, SET_PAGE_PRODUCT_EDITOR, SET_PAGE_PURCHASES } from './actions';

const DELAY_TIME = 100;

const setError = (action$: EpicAction) => action$.pipe(
  filter((action) => action.error),
  tap((action) => console.error(action.error)),
  map(({ error }) => ({ type: SET_ERROR, payload: error, error: null }))
);

const clearError = (action$: EpicAction) => action$.pipe(
  ofType(SET_ERROR),
  delay(DELAY_TIME),
  map(() => ({ type: CLEAR_ERROR, error: null }))
);

const switchPageAfterLoadProduct = (action$: EpicAction) => action$.pipe(
  ofType(LOAD_PRODUCT_SUCCESS),
  map(() => ({ type: SET_PAGE_PRODUCT_EDITOR }))
);

const clearProductMaker = (action$: EpicAction) => action$.pipe(
  ofType(
    SET_PAGE_DASHBOARD,
    SET_PAGE_PRODUCTS,
    SET_PAGE_ORDERS,
    SET_PAGE_ORDER_EDITOR,
    SET_PAGE_MATERIALS,
    SET_PAGE_PURCHASES,
    SET_PAGE_CALENDAR
  ),
  map(() => ({ type: CLEAR_PRODUCT_MAKER }))
);

export const appEpics = combineEpics(
  setError,
  clearError,
  switchPageAfterLoadProduct,
  clearProductMaker
);
