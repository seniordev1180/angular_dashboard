import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Stock } from './stock-market.model';

export enum StockMarketActionTypes {
  RETRIEVE = '[Stock] Retrieve',
  RETRIEVE_SUCCESS = '[Stock] Retrieve Success',
  RETRIEVE_ERROR = '[Stock] Retrieve Error'
}

export class ActionStockMarketRetrieve implements Action {
  readonly type = StockMarketActionTypes.RETRIEVE;

  constructor(readonly payload: { symbol: string }) {}
}

export class ActionStockMarketRetrieveSuccess implements Action {
  readonly type = StockMarketActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { stock: Stock }) {}
}

export class ActionStockMarketRetrieveError implements Action {
  readonly type = StockMarketActionTypes.RETRIEVE_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) {}
}

export type StockMarketActions =
  | ActionStockMarketRetrieve
  | ActionStockMarketRetrieveSuccess
  | ActionStockMarketRetrieveError;
