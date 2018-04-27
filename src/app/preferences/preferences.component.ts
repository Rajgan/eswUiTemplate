import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'esw-preferences',
  templateUrl: './preferences.component.html'
})
export class PreferencesComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit() {}

  public languageChanged(selectedItem: any): void {
    this.translateService.use(selectedItem).subscribe(() => {
    });

    // Store the language in local storage - ready to use again.
    localStorage.setItem('lang', selectedItem);
  }

  get currentLang() {
    return this.translateService.currentLang;
  }

  get currentLangTranslated() {
    return this.translateService.instant(this.currentLang);
  }

}
