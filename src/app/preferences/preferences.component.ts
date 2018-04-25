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
    // Set the translation service to use the selected language.
    // this.translateService.use(selectedItem).subscribe(() => {
      // Save the change to the user's profile.
      // this.merchantService.onLanguageChanged(selectedItem)
    // });
    this.store.dispatch(new PrefActions.SetLanguage(selectedItem));

    // Store the language in local storage - ready to use again.
    // localStorage.setItem('lang', selectedItem);
  }

  // get currentLang() {
  //   const lang = this.language$.subscribe();
  //   const test = this.store.select<string>(getLanguage);
  //   return this.translateService.currentLang;
  // }

  // get currentLangTranslated() {
  //   return this.translateService.instant(this.currentLang);
  // }
}
