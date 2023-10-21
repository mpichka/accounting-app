import { Product } from '../productMaker/type';

// TODO: redundant actions
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const ADD_NEW_PRODUCT_SUCCESS = 'ADD_NEW_PRODUCT_SUCCESS';
export const ADD_NEW_PRODUCT_ERROR = 'ADD_NEW_PRODUCT_ERROR';

export const addNewProduct = (payload: Product) => ({ type: ADD_NEW_PRODUCT, payload });

export const FETCH_PRODUCTS_LIST = 'FETCH_PRODUCTS_LIST';
export const FETCH_PRODUCTS_LIST_SUCCESS = 'FETCH_PRODUCTS_LIST_SUCCESS';
export const FETCH_PRODUCTS_LIST_ERROR = 'FETCH_PRODUCTS_LIST_ERROR';
export const fetchProductsList = () => ({ type: FETCH_PRODUCTS_LIST });
