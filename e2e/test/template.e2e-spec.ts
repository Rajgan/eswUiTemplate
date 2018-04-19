import { AppPage } from './../app.po';
import { element, by } from 'protractor';

describe('cob-ui App Template', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Verify Header options', () => {
    page.navigateTo();

    const el = element.all(by.css('.nav')).all(by.tagName('li'));
    el.getText().then(function (items) {
      expect(items[0]).toEqual('Style Guide');
      expect(items[1]).toEqual('Login');
    });
  });

  it('Verify Body of the page', () => {
    page.navigateTo();

    const el = element(by.linkText('Home'));
    el.getText().then(function(text) {
      expect(text).toContain('Home');
    });
  });

  it('Verify page footer and copyright message', () => {
    page.navigateTo();

    const el = element.all(by.tagName('eswfooter'));
    el.getText().then(function (items) {

      const thisYear = new Date().getFullYear().toString();

      expect(items[0]).toContain('© Copyright ' + thisYear + ' eShopWorld');
    });
  });
});
