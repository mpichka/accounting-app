import { Commands } from '@/commands';
import { EpicAction, EpicRootState } from '@/redux/types';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs';
import {
  LOAD_PRODUCT,
  LOAD_PRODUCT_ERROR,
  LOAD_PRODUCT_SUCCESS,
  SAVE_PRODUCT,
  SAVE_PRODUCT_ERROR,
  SAVE_PRODUCT_SUCCESS,
  SET_ACCESSORIES,
  SET_ACCESSORIES_FULFILLED,
  SET_AMORTIZATIONS,
  SET_AMORTIZATIONS_FULFILLED,
  SET_BEADS,
  SET_BEADS_FULFILLED,
  SET_BEADS_QUALITY,
  SET_BEADS_QUALITY_FULFILLED,
  SET_BEADS_TOTAL_WEIGHT,
  SET_BEADS_TOTAL_WEIGHT_FULFILLED,
  SET_CATEGORY,
  SET_CATEGORY_FULFILLED,
  SET_ESTIMATE,
  SET_ESTIMATE_FULFILLED,
  SET_GERDAN_TYPE,
  SET_GERDAN_TYPE_FULFILLED,
  SET_IMAGE,
  SET_IMAGE_FULFILLED,
  SET_LENGTH,
  SET_LENGTH_FULFILLED,
  SET_MARGE,
  SET_MARGE_FULFILLED,
  SET_NAME, SET_NAME_FULFILLED,
  SET_PACKAGES,
  SET_PACKAGES_FULFILLED,
  SET_PREVIEW,
  SET_PREVIEW_FULFILLED,
  SET_SCHEMA_AUTHOR,
  SET_SCHEMA_AUTHOR_FULFILLED,
  SET_SCHEMA_PRICE,
  SET_SCHEMA_PRICE_FULFILLED,
  SET_SURCHARGE,
  SET_SURCHARGE_FULFILLED,
  SET_THREADS,
  SET_THREADS_FULFILLED,
  SET_THREADS_TOTAL_PRICE,
  SET_THREADS_TOTAL_PRICE_FULFILLED,
  SET_WEIGHT,
  SET_WEIGHT_FULFILLED,
  SET_WIDTH,
  SET_WIDTH_FULFILLED
} from './actions';

const DEBOUNCE_TIME = 200;

const setImage = (action$: EpicAction) => action$.pipe(
  ofType(SET_IMAGE),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_IMAGE_FULFILLED, payload }))
);

const setPreview = (action$: EpicAction) => action$.pipe(
  ofType(SET_PREVIEW),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_PREVIEW_FULFILLED, payload }))
);

const setName = (action$: EpicAction) => action$.pipe(
  ofType(SET_NAME),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_NAME_FULFILLED, payload }))
);

const setSchemaPrice = (action$: EpicAction) => action$.pipe(
  ofType(SET_SCHEMA_PRICE),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_SCHEMA_PRICE_FULFILLED, payload }))
);

const setSchemaAuthor = (action$: EpicAction) => action$.pipe(
  ofType(SET_SCHEMA_AUTHOR),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_SCHEMA_AUTHOR_FULFILLED, payload }))
);

const setCategory = (action$: EpicAction) => action$.pipe(
  ofType(SET_CATEGORY),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_CATEGORY_FULFILLED, payload }))
);

const setGerdanType = (action$: EpicAction) => action$.pipe(
  ofType(SET_GERDAN_TYPE),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_GERDAN_TYPE_FULFILLED, payload }))
);

const setWeight = (action$: EpicAction) => action$.pipe(
  ofType(SET_WEIGHT),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_WEIGHT_FULFILLED, payload }))
);

const setLength = (action$: EpicAction) => action$.pipe(
  ofType(SET_LENGTH),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_LENGTH_FULFILLED, payload }))
);

const setWidth = (action$: EpicAction) => action$.pipe(
  ofType(SET_WIDTH),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_WIDTH_FULFILLED, payload }))
);

const setEstimate = (action$: EpicAction) => action$.pipe(
  ofType(SET_ESTIMATE),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_ESTIMATE_FULFILLED, payload }))
);

const setSurcharge = (action$: EpicAction) => action$.pipe(
  ofType(SET_SURCHARGE),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_SURCHARGE_FULFILLED, payload }))
);

const setMarge = (action$: EpicAction) => action$.pipe(
  ofType(SET_MARGE),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_MARGE_FULFILLED, payload }))
);

const setAmortizations = (action$: EpicAction) => action$.pipe(
  ofType(SET_AMORTIZATIONS),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_AMORTIZATIONS_FULFILLED, payload }))
);

const setAccessories = (action$: EpicAction) => action$.pipe(
  ofType(SET_ACCESSORIES),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_ACCESSORIES_FULFILLED, payload }))
);

const setBeads = (action$: EpicAction) => action$.pipe(
  ofType(SET_BEADS),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_BEADS_FULFILLED, payload }))
);

const setBeadsQuality = (action$: EpicAction) => action$.pipe(
  ofType(SET_BEADS_QUALITY),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_BEADS_QUALITY_FULFILLED, payload }))
);

const setBeadsTotalWeight = (action$: EpicAction) => action$.pipe(
  ofType(SET_BEADS_TOTAL_WEIGHT),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_BEADS_TOTAL_WEIGHT_FULFILLED, payload }))
);

const setPackages = (action$: EpicAction) => action$.pipe(
  ofType(SET_PACKAGES),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_PACKAGES_FULFILLED, payload }))
);

const setThreads = (action$: EpicAction) => action$.pipe(
  ofType(SET_THREADS),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_THREADS_FULFILLED, payload }))
);

const setThreadsTotalPrice = (action$: EpicAction) => action$.pipe(
  ofType(SET_THREADS_TOTAL_PRICE),
  debounceTime(DEBOUNCE_TIME),
  map(({ payload }) => ({ type: SET_THREADS_TOTAL_PRICE_FULFILLED, payload }))
);

const saveProduct: any = (action$: EpicAction, state$: EpicRootState) => action$.pipe(
  ofType(SAVE_PRODUCT),
  // debounceTime(DEBOUNCE_TIME),
  // tap((action$) => console.log({action$, state$})),
  switchMap(() => from(Commands.saveProduct(state$.value.productMaker)).pipe(
    map(response => ({ type: SAVE_PRODUCT_SUCCESS, payload: response })),
    catchError(error => of({ type: SAVE_PRODUCT_ERROR, error: error }))
  ))
);

const loadProduct = (action$: EpicAction) => action$.pipe(
  ofType(LOAD_PRODUCT),
  // debounceTime(DEBOUNCE_TIME),
  switchMap(({payload}) => from(Commands.fetchProductById(payload)).pipe(
    map(response => ({ type: LOAD_PRODUCT_SUCCESS, payload: response })),
    catchError(error => of({ type: LOAD_PRODUCT_ERROR, error: error }))
  ))
);

export const productMakerEpics = combineEpics(
  saveProduct,
  setImage,
  setPreview,
  setName,
  setSchemaPrice,
  setSchemaAuthor,
  setCategory,
  setGerdanType,
  setWeight,
  setLength,
  setWidth,
  setEstimate,
  setSurcharge,
  setMarge,
  setAmortizations,
  setAccessories,
  setBeads,
  setBeadsQuality,
  setBeadsTotalWeight,
  setPackages,
  setThreads,
  setThreadsTotalPrice,
  loadProduct
);
