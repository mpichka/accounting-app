import { Action } from '@/redux/types';
import {
  CLEAR_PRODUCT_MAKER,
  LOAD_PRODUCT_SUCCESS,
  SAVE_PRODUCT_SUCCESS,
  SET_ACCESSORIES_FULFILLED,
  SET_AMORTIZATIONS_FULFILLED,
  SET_BEADS_FULFILLED,
  SET_BEADS_QUALITY_FULFILLED,
  SET_BEADS_TOTAL_WEIGHT_FULFILLED,
  SET_CATEGORY_FULFILLED,
  SET_ESTIMATE_FULFILLED,
  SET_GERDAN_TYPE_FULFILLED,
  SET_IMAGE_FULFILLED,
  SET_LENGTH_FULFILLED,
  SET_MARGE_FULFILLED,
  SET_NAME_FULFILLED,
  SET_PACKAGES_FULFILLED,
  SET_PREVIEW_FULFILLED,
  SET_SCHEMA_AUTHOR_FULFILLED,
  SET_SCHEMA_PRICE_FULFILLED,
  SET_SURCHARGE_FULFILLED,
  SET_THREADS_FULFILLED,
  SET_THREADS_TOTAL_PRICE_FULFILLED,
  SET_WEIGHT_FULFILLED,
  SET_WIDTH_FULFILLED
} from './actions';
import { BeadsQuality, GerdanType, Product } from './type';

const initialState: Product = {
  image: null,
  preview: null,
  amortizations: [],
  beads: [],
  accessories: [],
  packages: [],
  threads: [],
  beadsQuality: BeadsQuality.high,
  gerdanType: GerdanType.no_type,
  marge: '25',
  surcharge: '10'
};

export default function productMaker(state = initialState, action: Action): Product {
  switch (action.type) {
    case SET_IMAGE_FULFILLED:
      return { ...state, image: action.payload };
    case SET_PREVIEW_FULFILLED:
      return { ...state, preview: action.payload };
    case SET_NAME_FULFILLED:
      return { ...state, name: action.payload };
    case SET_SCHEMA_PRICE_FULFILLED:
      return { ...state, schemaPrice: action.payload };
    case SET_SCHEMA_AUTHOR_FULFILLED:
      return { ...state, schemaAuthor: action.payload };
    case SET_CATEGORY_FULFILLED:
      return { ...state, category: action.payload };
    case SET_GERDAN_TYPE_FULFILLED:
      return { ...state, gerdanType: action.payload };
    case SET_WEIGHT_FULFILLED:
      return { ...state, weight: action.payload };
    case SET_LENGTH_FULFILLED:
      return { ...state, length: action.payload };
    case SET_WIDTH_FULFILLED:
      return { ...state, width: action.payload };
    case SET_ESTIMATE_FULFILLED:
      return { ...state, estimate: action.payload };
    case SET_SURCHARGE_FULFILLED:
      return { ...state, surcharge: action.payload };
    case SET_MARGE_FULFILLED:
      return { ...state, marge: action.payload };
    case SET_AMORTIZATIONS_FULFILLED:
      return { ...state, amortizations: action.payload };
    case SET_BEADS_QUALITY_FULFILLED:
      return { ...state, beadsQuality: action.payload };
    case SET_BEADS_TOTAL_WEIGHT_FULFILLED:
      return { ...state, beadsTotalWeight: action.payload };
    case SET_BEADS_FULFILLED:
      return { ...state, beads: action.payload };
    case SET_ACCESSORIES_FULFILLED:
      return { ...state, accessories: action.payload };
    case SET_PACKAGES_FULFILLED:
      return { ...state, packages: action.payload };
    case SET_THREADS_FULFILLED:
      return { ...state, threads: action.payload };
    case SET_THREADS_TOTAL_PRICE_FULFILLED:
      return { ...state, threadsTotalPrice: action.payload };
    case SAVE_PRODUCT_SUCCESS: 
      return { ...action.payload };
    case LOAD_PRODUCT_SUCCESS: 
      return { ...action.payload };
    case CLEAR_PRODUCT_MAKER:
      return initialState;
    default:
      return state;
  }
}
