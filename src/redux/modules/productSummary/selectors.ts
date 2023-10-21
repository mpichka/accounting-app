import { RootState } from '@/redux/store';
import { ProductSummary } from './type';

export const getProductSummary = (store: RootState): ProductSummary => store.productSummary;
