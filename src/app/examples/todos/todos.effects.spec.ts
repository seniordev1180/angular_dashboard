import { LocalStorageService } from '@app/core';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';

import { State } from '../examples.state';
import { ActionTodosToggle } from './todos.actions';
import { TodosEffects, TODOS_KEY } from './todos.effects';
import { TodosState } from './todos.model';

describe('TodosEffects', () => {
  let localStorage: LocalStorageService;
  let store: Store<State>;

  beforeEach(() => {
    localStorage = jasmine.createSpyObj('LocalStorageService', ['setItem']);
    store = jasmine.createSpyObj('store', ['pipe']);
  });

  describe('persistTodos', () => {
    it('should not dispatch any action', () => {
      const actions$ = new Actions();
      const effect = new TodosEffects(actions$, store, localStorage);
      const metadata = getEffectsMetadata(effect);

      expect(metadata.persistTodos).toEqual({ dispatch: false });
    });

    it('should call setItem on LocalStorageService for any action', () => {
      const todosState: TodosState = {
        items: [{ id: '1', name: 'Test ToDo', done: false }],
        filter: 'ALL'
      };
      (store.pipe as jasmine.Spy).and.returnValue(of(todosState));
      const persistAction = new ActionTodosToggle({ id: 'a' });
      const source = cold('a', { a: persistAction });
      const actions = new Actions(source);
      const effect = new TodosEffects(actions, store, localStorage);

      effect.persistTodos.subscribe(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          TODOS_KEY,
          todosState
        );
      });
    });
  });
});
