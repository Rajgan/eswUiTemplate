import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { forEach } from '@angular/router/src/utils/collection';
import * as fromPref from '../reducers';
import * as PrefActions from '../preferences/actions/preferences';
import { getLanguage } from '../preferences/reducers/preferences';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'esw-preferences',
  templateUrl: './preferences.component.html'
})
export class PreferencesComponent implements OnInit {
  language$: Observable<string>;

  constructor(private translateService: TranslateService,
              private store: Store<fromPref.State>) {
                this.language$ = this.store.select(getLanguage);
               }

  ngOnInit() {}

  public languageChanged(selectedItem: any): void {
    this.store.dispatch(new PrefActions.SetLanguage(selectedItem));
  }

}
