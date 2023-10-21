import { Action } from '@/redux/types';
import { Product } from '../productMaker/type';
import { ADD_NEW_PRODUCT_SUCCESS, FETCH_PRODUCTS_LIST_SUCCESS } from './actions';
import { Pagination } from '@/models/pagination';

type ProductState = { data: Product[]; pagination: Pagination };

const initialState: ProductState = {
  data: [],
  pagination: Pagination.new(),
};

export default function products(state = initialState, action: Action): ProductState {
  switch (action.type) {
    // case ADD_NEW_PRODUCT_SUCCESS:
    //   return {
    //     data: [...state.data, action.payload].map((state, index) => ({ ...state, id: index })).sort((a, b) => b.id - a.id),
    //     // totalCount: state.data.length + 1,
    //   };
    case FETCH_PRODUCTS_LIST_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}
