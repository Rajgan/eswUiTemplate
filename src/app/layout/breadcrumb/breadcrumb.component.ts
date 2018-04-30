import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { KeyValuePair } from '../../shared/models/keyvaluepair';
import { TranslateService } from '@ngx-translate/core';

// Component that will contain the header html. Populates the <navigation></navigation> element.
@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'eswBreadcrumb',
  exportAs: 'eswBreadcrumb',
  templateUrl: 'breadcrumb.component.html',
})
export class BreadcrumbComponent {


  // List of key value pairs, representing a key for the route name and url value.
  public Breadcrumbs: KeyValuePair<string>[] = [];
  private breadCrumbIgnorePaths: string[] = [
    '404',
    '403',
    '401',
    'token',
    'login'
  ];

  constructor ( private router: Router, private translateService: TranslateService ) {
    // Hook into the router events - allows us to grab Navigation Start event, which
    // in turn allows us to set the routes, based on the url.
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.setRoutes(event.url);
      }
      // NOTE: other events that you can hook into: NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized
    });

    translateService.onLangChange.subscribe((lang) => {
      this.Breadcrumbs.forEach(keyValue => {
        keyValue.key = this.translateService.instant(keyValue.tag);
      });
    });
  }

  // Method for setting the array of routes (routename/path) used to determin the breadcrumbs.
  private setRoutes(routeUrl: string): void {

    const routeMatch = this.router;

    // Split the url into parts, e.g. "/routeSearch" will be spit into: "" and "routeSearch".  The first "" will be
    // taken as a "Home" link, the second will be further split by capital letters and first letter capitalised to produce "Route Search".
    // This means if we nest routes such as /routeSearch/addRoute we can get an automatic breadcrumb of "Home / Route Search / Add Route".
    const routeParts: Array<Object> = routeUrl.split('/');

    // Variables used in loop for building our breadcrumb.
    const crumbs: KeyValuePair<string>[] = [];
    let lastWasHome = false;

    // Loop through each part of the split url parts.
    for (let index = 0; index < routeParts.length; index++) {

      // Key value pair that's used in the UI to render the breadcrumb.  Added to the crumbs array.
      const keyValue = new KeyValuePair<string>();

      // Test to see if this is a blank string.
      const route = routeParts[index].toString();

      if (route === '') {

        // If its blank and we havent already set the home link, then set now.
        if (lastWasHome !== true) {
          keyValue.tag = 'breadcrumb.home';
          keyValue.key = this.translateService.instant(keyValue.tag);
          keyValue.value = '/';
          crumbs.push(keyValue);
          lastWasHome = true;
        }
      } else {
        // If the route length is greater than zero, then split using full stops to generate a route name.
        if (route.length > 0 && !this.isNumber(route) &&
            !(this.breadCrumbIgnorePaths.indexOf(route) > -1) &&
            !(route.indexOf('token') > -1)) {
          // Get the key (route name) and value (actual route).
          // const key = this.capitalise(route.split(/(?=[A-Z])/).join(' '));
          keyValue.tag = 'breadcrumb.' + route;
          const translatedKey = this.translateService.instant(keyValue.tag.toLowerCase());
          keyValue.key = translatedKey;
          keyValue.value = route;

          crumbs.push(keyValue);
        }
      }
    }

    // Breadcrumbs is the array of crumbs.
    this.Breadcrumbs = crumbs;
  }

  private isNumber(obj): boolean {
    return !isNaN(parseFloat(obj));
  }

}
