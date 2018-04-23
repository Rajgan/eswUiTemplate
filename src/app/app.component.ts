import { Component } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GenericModalService } from './shared/services/gernericmodal/genericmodal.service';
import { ModalType, ModalStyle } from './shared/ui/genericmodal/genericmodal.component';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from './shared/services/logger/logger.service';
import { ConfigService } from './shared/services/configservice/config.service';

@Component({
  selector: 'esw-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  showBreadcrumb = false;

  public constructor(private translateService: TranslateService, private configuration: ConfigService, private logger: LoggerService) {

    logger.logDebug('THIS IS A ROB LOG TEST');

    translateService.addLangs(['en', 'de']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('en');

    let browserLang = translateService.getBrowserLang();

    // Store the language in local storage - ready to use again.
    const storedLang = localStorage.getItem('lang');

    // We also want to check if they've previously stored a language.
    if (storedLang != null) {
      browserLang = storedLang;
    }

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use(browserLang.match(/en|de/) ? browserLang : 'en');
    this.showBreadcrumb = configuration.SHOW_BREADCUMB;
  }

  get currentLang() {
    return this.translateService.currentLang;
  }
  get currentLangTranslated() {
    return this.translateService.instant(this.currentLang);
  }
}
