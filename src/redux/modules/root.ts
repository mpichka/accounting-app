import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { additionalExpensesEpics } from './additionalExpenses/epics';
import additionalExpenses from './additionalExpenses/reducers';
import { appEpics } from './app/epics';
import app from './app/reducers';
import { productMakerEpics } from './productMaker/epics';
import productMaker from './productMaker/reducers';
import { productSummaryEpics } from './productSummary/epics';
import productSummary from './productSummary/reducers';
import { productEpics } from './products/epics';
import product from './products/reducers';

export const rootEpic = combineEpics(
  productEpics,
  additionalExpensesEpics,
  productMakerEpics,
  productSummaryEpics,
  appEpics,
);

export const rootReducer = combineReducers({
  product,
  additionalExpenses,
  productMaker,
  productSummary,
  app,
});
