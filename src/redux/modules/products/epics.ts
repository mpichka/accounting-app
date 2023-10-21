import { Commands } from '@/commands';
import { EpicAction } from '@/redux/types';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs';
import { FETCH_PRODUCTS_LIST, FETCH_PRODUCTS_LIST_ERROR, FETCH_PRODUCTS_LIST_SUCCESS } from './actions';


// const addNewProduct = (action$: EpicAction) => action$.pipe(
//   ofType(ADD_NEW_PRODUCT),
//   debounceTime(200),
//   switchMap((action) => from(Commands.insertProduct(action.payload)).pipe(
//     map(response => ({ type: ADD_NEW_PRODUCT_SUCCESS, payload: response })),
//     catchError(error => of({ type: ADD_NEW_PRODUCT_ERROR, payload: error }))
//   ))
// );

const fetchProductsList = (action$: EpicAction) => action$.pipe(
  ofType(FETCH_PRODUCTS_LIST),
  debounceTime(200),
  switchMap((action) => from(Commands.fetchProductsList(action.payload)).pipe(
    map(response => ({ type: FETCH_PRODUCTS_LIST_SUCCESS, payload: response })),
    catchError(error => of({ type: FETCH_PRODUCTS_LIST_ERROR, payload: error }))
  ))
);


export const productEpics = combineEpics(
  // addNewProduct,
  fetchProductsList
);
