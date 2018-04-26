import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap, mergeMap, switchMap } from 'rxjs/operators';
import { SetLanguage, PreferencesActionTypes } from '../actions/preferences';

@Injectable()
export class PreferencesEffects {
    @Effect({ dispatch: false })
     setLanguage$ = this.actions$.ofType<SetLanguage>(PreferencesActionTypes.SetLanguage)
        .pipe(
            map(action => action.payload),
            tap(payload => this.translateService.use(payload))
     );

    constructor(private actions$: Actions, private translateService: TranslateService) {}
}
