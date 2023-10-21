import { RootState } from '@/redux/store';

export const getProducts = (store: RootState) => store.product;
