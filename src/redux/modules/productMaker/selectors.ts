import { RootState } from '@/redux/store';
import { Product } from './type';

export const getProductAmortizations = (store: RootState) => store.productMaker.amortizations;
export const getProductBeads = (store: RootState) => store.productMaker.beads;
export const getProductAccessories = (store: RootState) => store.productMaker.accessories;
export const getProductPackages = (store: RootState) => store.productMaker.packages;
export const getProductThreads = (store: RootState) => store.productMaker.threads;
export const getProduct = (store: RootState): Product => store.productMaker;
