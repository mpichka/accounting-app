import { Action } from '@/redux/types';
import { SET_PRODUCT_SUMMARY_SUCCESS } from './actions';
import { ProductSummary } from './type';

const initialState: ProductSummary = {
  beadsTotalCount: 0,
  beadsTotalPrice: 0,
  accessoriesTotalCount: 0,
  accessoriesTotalPrice: 0,
  packagesTotalCount: 0,
  packagesTotalPrice: 0,
  threadsTotalCount: 0,
  threadsTotalPrice: 0,
  selfCost: 0,
  fixedCost: 0,
  variableCost: 0,
  totalPrice: 0,
};


export default function productSummary(state = initialState, action: Action) {
  switch (action.type) {
    case SET_PRODUCT_SUMMARY_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
