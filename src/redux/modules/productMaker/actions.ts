import { Accessory, Amortization, Bead, BeadsQuality, GerdanType, Thread } from '../productMaker/type';

export const SET_IMAGE = 'SET_IMAGE';
export const SET_IMAGE_FULFILLED = 'SET_IMAGE_FULFILLED';
export const setImage = (payload: string | null) => ({ type: SET_IMAGE, payload });

export const SET_PREVIEW = 'SET_PREVIEW';
export const SET_PREVIEW_FULFILLED = 'SET_PREVIEW_FULFILLED';
export const setPreview = (payload: string | null) => ({ type: SET_PREVIEW, payload });

export const SET_NAME = 'SET_NAME';
export const SET_NAME_FULFILLED = 'SET_NAME_FULFILLED ';
export const setName = (payload: string) => ({ type: SET_NAME, payload });

export const SET_SCHEMA_PRICE = 'SET_SCHEMA_PRICE';
export const SET_SCHEMA_PRICE_FULFILLED = 'SET_SCHEMA_PRICE_FULFILLED';
export const setSchemaPrice = (payload: string) => ({ type: SET_SCHEMA_PRICE, payload });

export const SET_SCHEMA_AUTHOR = 'SET_SCHEMA_AUTHOR';
export const SET_SCHEMA_AUTHOR_FULFILLED = 'SET_SCHEMA_AUTHOR_FULFILLED';
export const setSchemaAuthor = (payload: string) => ({ type: SET_SCHEMA_AUTHOR, payload });

export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_CATEGORY_FULFILLED = 'SET_CATEGORY_FULFILLED';
export const setCategory = (payload: string) => ({ type: SET_CATEGORY, payload });

export const SET_GERDAN_TYPE = 'SET_GERDAN_TYPE';
export const SET_GERDAN_TYPE_FULFILLED = 'SET_GERDAN_TYPE_FULFILLED';
export const setGerdanType = (payload: GerdanType | string) => ({ type: SET_GERDAN_TYPE, payload });

export const SET_WEIGHT = 'SET_WEIGHT';
export const SET_WEIGHT_FULFILLED = 'SET_WEIGH_FULFILLED';
export const setWeight = (payload: string) => ({ type: SET_WEIGHT, payload });

export const SET_LENGTH = 'SET_LENGTH';
export const SET_LENGTH_FULFILLED = 'SET_LENGTH_FULFILLED';
export const setLength = (payload: string) => ({ type: SET_LENGTH, payload });

export const SET_WIDTH = 'SET_WIDTH';
export const SET_WIDTH_FULFILLED = 'SET_WIDTH_FULFILLED';
export const setWidth = (payload: string) => ({ type: SET_WIDTH, payload });

export const SET_ESTIMATE = 'SET_ESTIMATE';
export const SET_ESTIMATE_FULFILLED = 'SET_ESTIMATE_FULFILLED';
export const setEstimate = (payload: string) => ({ type: SET_ESTIMATE, payload });

export const SET_SURCHARGE = 'SET_SURCHARGE';
export const SET_SURCHARGE_FULFILLED = 'SET_SURCHARGE_FULFILLED';
export const setSurcharge = (payload: string) => ({ type: SET_SURCHARGE, payload });

export const SET_MARGE = 'SET_MARGE';
export const SET_MARGE_FULFILLED = 'SET_MARGE_FULFILLED';
export const setMarge = (payload: string) => ({ type: SET_MARGE, payload });

export const SET_AMORTIZATIONS = 'SET_AMORTIZATIONS';
export const SET_AMORTIZATIONS_FULFILLED = 'SET_AMORTIZATIONS_FULFILLED';
export const setAmortizations = (payload: Amortization[]) => ({ type: SET_AMORTIZATIONS, payload });

export const SET_BEADS = 'SET_BEADS';
export const SET_BEADS_FULFILLED = 'SET_BEADS_FULFILLED';
export const setBeads = (payload: Bead[]) => ({ type: SET_BEADS, payload });

export const SET_BEADS_QUALITY = 'SET_BEADS_QUALITY';
export const SET_BEADS_QUALITY_FULFILLED = 'SET_BEADS_QUALITY_FULFILLED';
export const setBeadsQuality = (payload: BeadsQuality | string) => ({ type: SET_BEADS_QUALITY, payload });

export const SET_BEADS_TOTAL_WEIGHT = 'SET_BEADS_TOTAL_WEIGHT';
export const SET_BEADS_TOTAL_WEIGHT_FULFILLED = 'SET_BEADS_TOTAL_WEIGHT_FULFILLED';
export const setBeadsTotalWeight = (payload: string) => ({ type: SET_BEADS_TOTAL_WEIGHT, payload });

export const SET_ACCESSORIES = 'SET_ACCESSORIES';
export const SET_ACCESSORIES_FULFILLED = 'SET_ACCESSORIES_FULFILLED';
export const setAccessories = (payload: Accessory[]) => ({ type: SET_ACCESSORIES, payload });

export const SET_PACKAGES = 'SET_PACKAGES';
export const SET_PACKAGES_FULFILLED = 'SET_PACKAGES_FULFILLED';
export const setPackages = (payload: Accessory[]) => ({ type: SET_PACKAGES, payload });

export const SET_THREADS = 'SET_THREADS';
export const SET_THREADS_FULFILLED = 'SET_THREADS_FULFILLED';
export const setThreads = (payload: Thread[]) => ({ type: SET_THREADS, payload });

export const SET_THREADS_TOTAL_PRICE = 'SET_THREADS_TOTAL_PRICE';
export const SET_THREADS_TOTAL_PRICE_FULFILLED = 'SET_THREADS_TOTAL_PRICE_FULFILLED';
export const setThreadsTotalPrice = (payload: string) => ({ type: SET_THREADS_TOTAL_PRICE, payload });

export const SAVE_PRODUCT = 'SAVE_PRODUCT';
export const SAVE_PRODUCT_SUCCESS = 'SAVE_PRODUCT_SUCCESS';
export const SAVE_PRODUCT_ERROR = 'SAVE_PRODUCT_ERROR';
export const saveProduct = () => ({ type: 'SAVE_PRODUCT' });

export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const LOAD_PRODUCT_SUCCESS = 'LOAD_PRODUCT_SUCCESS';
export const LOAD_PRODUCT_ERROR = 'LOAD_PRODUCT_ERROR';
export const loadProduct = (id: number) => ({ type: 'LOAD_PRODUCT', payload: { id } });

export const CLEAR_PRODUCT_MAKER = 'CLEAR_PRODUCT_MAKER';
