import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDropdownToggle, NgbDropdown, NGB_DROPDOWN_DIRECTIVES } from './ngbdropdown.directive';
import { By } from '@angular/platform-browser';
import { dispatchEvent, createEvent } from '../../testing/utils';
import { NgbDropdownConfig } from './ngbdropdown.config';

describe('NgbDropdownDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dropdown, dropdownToggle: DebugElement;

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
        fixture.detectChanges();

        dropdown = fixture.debugElement.query(By.directive(NgbDropdown));
        dropdownToggle = fixture.debugElement.query(By.directive(NgbDropdownToggle));
    });

    it('the dropdown directive should be attached to 1 element', () => {
        expect(dropdown).toBeTruthy();
    });

    it('the dropdownToggle directive should be attached to 1 element', () => {
        expect(dropdownToggle).toBeTruthy();
    });
});

@Component({
    template: `
    <h1 class="title">Dropdown buttons</h1>
    <div>
        <div class="dropdown" eswDropdown>
        <a eswDropdownToggle class="dropdown-toggle btn btn-primary" role="button" aria-haspopup="true" aria-expanded="false">
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
