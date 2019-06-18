import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import {
  ActionStockMarketRetrieve,
  ActionStockMarketRetrieveError,
  ActionStockMarketRetrieveSuccess,
  StockMarketActionTypes
} from './stock-market.actions';
import { StockMarketService } from './stock-market.service';

export const STOCK_MARKET_KEY = 'EXAMPLES.STOCKS';

@Injectable()
export class StockMarketEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private service: StockMarketService
  ) {}

  @Effect()
  retrieveStock = ({ debounce = 500 } = {}) =>
    this.actions$.pipe(
      ofType<ActionStockMarketRetrieve>(StockMarketActionTypes.RETRIEVE),
      tap(action =>
        this.localStorageService.setItem(STOCK_MARKET_KEY, {
          symbol: action.payload.symbol
        })
      ),
      debounceTime(debounce),
      switchMap((action: ActionStockMarketRetrieve) =>
        this.service.retrieveStock(action.payload.symbol).pipe(
          map(stock => new ActionStockMarketRetrieveSuccess({ stock })),
          catchError(error => of(new ActionStockMarketRetrieveError({ error })))
        )
      )
    );
}
