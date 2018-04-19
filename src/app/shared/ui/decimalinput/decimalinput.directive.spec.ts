import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DecimalInputDirective } from './decimalinput.directive';
import { By } from '@angular/platform-browser';
import { dispatchEvent, createEvent } from '../../testing/utils';

describe('DecimalInputDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;
    let btnElement: DebugElement;
    let input;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ DecimalInputDirective, TestComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.directive(DecimalInputDirective));
        btnElement = fixture.debugElement.query(By.css('#tstBtn'));
    });

    it('the DecimalInputDirective should be attached to 1 Input tag', () => {
        expect(debugElement).toBeTruthy();
    });

    it('should allow numbers to be input', () => {
        input = debugElement.nativeElement;
        input.value = '2';

        dispatchEvent(input, 'input');

        const keyBoardEvent = new KeyboardEvent('keypress', { key: input.value } );
        const spy = spyOn(keyBoardEvent, 'preventDefault');
        debugElement.triggerEventHandler('keypress', keyBoardEvent);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should allow decimal numbers to be input', () => {
        input = debugElement.nativeElement;
        input.value = '2.2';

        dispatchEvent(input, 'input');

        const keyBoardEvent = new KeyboardEvent('keypress', { key: input.value } );
        const spy = spyOn(keyBoardEvent, 'preventDefault');
        debugElement.triggerEventHandler('keypress', keyBoardEvent);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should not allow letters to be input', () => {
        input = debugElement.nativeElement;
        input.value = 'e';

        const keyBoardEvent = new KeyboardEvent('keypress', { key: 'e' } );
        const spy = spyOn(keyBoardEvent, 'preventDefault');
        debugElement.triggerEventHandler('keypress', keyBoardEvent);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should allow only 1 decimal point', () => {
        input = debugElement.nativeElement;
        input.value = '2.2';

        const keyBoardEvent = new KeyboardEvent('keypress', { key: '.' } );
        const spy = spyOn(keyBoardEvent, 'preventDefault');
        debugElement.triggerEventHandler('keypress', keyBoardEvent);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should append .0 to end of number 2', () => {
        input = debugElement.nativeElement;
        debugElement.triggerEventHandler('focusin', null);
        input.value = '2';
        fixture.detectChanges();

        const focusOutEvent = new FocusEvent('focusout', { relatedTarget: new EventTarget()});

        debugElement.triggerEventHandler('focusout', focusOutEvent);
        fixture.detectChanges();

        expect(input.value).toEqual('2.0');
    });

    it('should default to 0.0', () => {
        input = debugElement.nativeElement;
        debugElement.triggerEventHandler('focusin', null);
        input.value = '';
        fixture.detectChanges();

        const focusOutEvent = new FocusEvent('focusout', { relatedTarget: new EventTarget()});

        debugElement.triggerEventHandler('focusout', focusOutEvent);
        fixture.detectChanges();

        expect(input.value).toEqual('0.0');
    });

});

@Component({
    template: `
    <div class="form-group">
        <label>INPUT DECIMAL NUMBER</label>
        <input eswDecimalInput name="txtExample1" id="txtExample1" class="form-control" min="0" type="number"
         placeholder="0.0" step="0.1" maxlength="6" />
        <button id="tstBtn" type="button">Test</button>
    </div>`
})
class TestComponent { }
