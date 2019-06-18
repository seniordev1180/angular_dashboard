import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { ActionFormUpdate, FormActionTypes } from './form.actions';

export const FORM_KEY = 'EXAMPLES.FORM';

@Injectable()
export class FormEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService
  ) {}

  @Effect({ dispatch: false })
  persistForm = this.actions$.pipe(
    ofType<ActionFormUpdate>(FormActionTypes.UPDATE),
    tap(action =>
      this.localStorageService.setItem(FORM_KEY, { form: action.payload.form })
    )
  );
}
