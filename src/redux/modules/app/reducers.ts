import { Action } from '@/redux/types';
import {
  CLEAR_ERROR,
  PAGE_CALENDAR,
  PAGE_DASHBOARD,
  PAGE_MATERIALS,
  PAGE_ORDERS,
  PAGE_ORDER_EDITOR,
  PAGE_PRODUCTS,
  PAGE_PRODUCT_EDITOR,
  PAGE_PURCHASES,
  SET_ERROR,
  SET_PAGE_CALENDAR,
  SET_PAGE_DASHBOARD,
  SET_PAGE_MATERIALS,
  SET_PAGE_ORDERS,
  SET_PAGE_ORDER_EDITOR,
  SET_PAGE_PRODUCTS,
  SET_PAGE_PRODUCT_EDITOR,
  SET_PAGE_PURCHASES
} from './actions';

const initialState = {
  page: PAGE_DASHBOARD,
  error: null,
};

export default function app(state = initialState, action: Action) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case SET_PAGE_DASHBOARD:
      return { ...state, page: PAGE_DASHBOARD };
    case SET_PAGE_PRODUCTS:
      return { ...state, page: PAGE_PRODUCTS };
    case SET_PAGE_PRODUCT_EDITOR:
      return { ...state, page: PAGE_PRODUCT_EDITOR };
    case SET_PAGE_ORDERS:
      return { ...state, page: PAGE_ORDERS };
    case SET_PAGE_ORDER_EDITOR:
      return { ...state, page: PAGE_ORDER_EDITOR };
    case SET_PAGE_MATERIALS:
      return { ...state, page: PAGE_MATERIALS };
    case SET_PAGE_PURCHASES:
      return { ...state, page: PAGE_PURCHASES };
    case SET_PAGE_CALENDAR:
      return { ...state, page: PAGE_CALENDAR };
    default:
      return state;
  }
}
