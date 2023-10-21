import { Action } from '@/redux/types';

export const SET_ERROR = 'SET_ERROR';
export const setError = (message: string): Action => ({ type: SET_ERROR, error: message });

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const PAGE_DASHBOARD = 'PAGE_DASHBOARD';
export const SET_PAGE_DASHBOARD = 'SET_PAGE_DASHBOARD';
export const setPageDashboard = (): Action => ({ type: SET_PAGE_DASHBOARD });

export const PAGE_PRODUCTS = 'PAGE_PRODUCTS';
export const SET_PAGE_PRODUCTS = 'SET_PAGE_PRODUCTS';
export const setPageProducts = (): Action => ({ type: SET_PAGE_PRODUCTS });

export const PAGE_PRODUCT_EDITOR = 'PAGE_PRODUCT_EDITOR';
export const SET_PAGE_PRODUCT_EDITOR = 'SET_PAGE_PRODUCT_EDITOR';
export const setPageProductEditor = (id?: number): Action => ({ type: SET_PAGE_PRODUCT_EDITOR, payload: { id } });

export const PAGE_ORDERS = 'PAGE_ORDERS';
export const SET_PAGE_ORDERS = 'SET_PAGE_ORDERS';
export const setPageOrders = (): Action => ({ type: SET_PAGE_ORDERS });

export const PAGE_ORDER_EDITOR = 'PAGE_ORDER_EDITOR';
export const SET_PAGE_ORDER_EDITOR = 'SET_PAGE_ORDER_EDITOR';
export const setPageOrderEditor = (): Action => ({ type: SET_PAGE_ORDER_EDITOR });

export const PAGE_MATERIALS = 'PAGE_MATERIALS';
export const SET_PAGE_MATERIALS = 'SET_PAGE_MATERIALS';
export const setPageMaterials = (): Action => ({ type: SET_PAGE_MATERIALS });

export const PAGE_PURCHASES = 'PAGE_PURCHASES';
export const SET_PAGE_PURCHASES = 'SET_PAGE_PURCHASES';
export const setPagePurchases = (): Action => ({ type: SET_PAGE_PURCHASES });

export const PAGE_CALENDAR = 'PAGE_CALENDAR';
export const SET_PAGE_CALENDAR = 'SET_PAGE_CALENDAR';
export const setPageCalendar = (): Action => ({ type: SET_PAGE_CALENDAR });
