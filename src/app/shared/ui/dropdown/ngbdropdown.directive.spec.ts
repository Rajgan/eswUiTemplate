import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDropdownToggle, NgbDropdown, NGB_DROPDOWN_DIRECTIVES } from './ngbdropdown.directive';
import { By } from '@angular/platform-browser';
import { dispatchEvent, createEvent } from '../../testing/utils';
import { NgbDropdownConfig } from './ngbdropdown.config';

describe('NgbDropdownDirective', () => {
    let component: TestComponent;
    let componentEl: Element;
    let fixture: ComponentFixture<TestComponent>;
    let dropdown, dropdownToggle: DebugElement;
    let btnElement: DebugElement;
    let divOutside: DebugElement;
    let inputEl: DebugElement;
    let input;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            NGB_DROPDOWN_DIRECTIVES,
            TestComponent
        ],
        providers: [
            NgbDropdownConfig
        ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        componentEl = fixture.nativeElement;
        fixture.detectChanges();

        dropdown = fixture.debugElement.query(By.directive(NgbDropdown));
        dropdownToggle = fixture.debugElement.query(By.directive(NgbDropdownToggle));
        btnElement = fixture.debugElement.query(By.css('#tstBtn'));
        inputEl = fixture.debugElement.query(By.css('#txtExample1'));
        divOutside = fixture.debugElement.query(By.css('.title'));
    });

    it('the dropdown directive should be attached to 1 element', () => {
        expect(dropdown).toBeTruthy();
    });

    it('the dropdownToggle directive should be attached to 1 element', () => {
      expect(dropdownToggle).toBeTruthy();
    });

    it('clicking button should call dropdown toggle', () => {
      btnElement.nativeElement.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const classes = componentEl.querySelector('.dropdown').classList;
        expect(classes).toContain('open');
      });

    });

    xit('test open and close toggle methods', () => {
      dropdown.toggleOpen();
      dropdown.close();
      dropdown.close();
      dropdown.open();

      fixture.whenStable().then(() => {
        expect(componentEl.querySelector('.dropdown-menu').classList).toContain('ssssssssssssssopen');
      });
    });

    it('escape key click should close toggle', () => {
      btnElement.nativeElement.click();
      divOutside.nativeElement.click();

      input = inputEl.nativeElement;

      dispatchEvent(input, 'input');

      const keyBoardEvent = new KeyboardEvent('keydown', { key: String.fromCharCode(27) } );
      const spy = spyOn(keyBoardEvent, 'preventDefault');
      inputEl.triggerEventHandler('keypress', keyBoardEvent);

      btnElement.nativeElement.click();
      fixture.detectChanges();

      btnElement.nativeElement.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const classes = componentEl.querySelector('.dropdown').classList;
        const hasOpen = classes.contains('open');
        expect(hasOpen).toBe(false);
      });
    });
});

@Component({
    template: `
    <h1 class="title">Dropdown buttons</h1>
    <input name="txtExample1" id="txtExample1" class="form-control" min="0" type="text" />
    <div>
        <div class="dropdown" eswDropdown>
          <a eswDropdownToggle  id="tstBtn" class="dropdown-toggle btn btn-primary"
            role="button" aria-haspopup="true" aria-expanded="false">
              Language <span class="caret"></span>
          </a>
          <ul class="dropdown-menu" role="menu">
              <li role="menuitem"><a> English <i class="fa fa-check pull-right margin-top-xs"></i></a></li>
              <li role="menuitem"><a>German</a></li>
          </ul>
        </div>
    </div>`
})
class TestComponent { }
