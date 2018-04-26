
describe('Directive: NumericFieldDirective', () => {
  it('should create an instance', () => {
    const directive = new NumericFieldDirective(null);
    expect(directive).toBeTruthy();
  });
});


import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NumericFieldDirective } from './numeric-field.directive';
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
        declarations: [ NumericFieldDirective, TestComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.directive(NumericFieldDirective));
        btnElement = fixture.debugElement.query(By.css('#tstBtn'));
    });

    describe('Directive: NumericFieldDirective', () => {
      it('should create an instance', () => {
        expect(debugElement).toBeTruthy();
      });
    });

    it('should allow numbers to be input', () => {
        input = debugElement.nativeElement;
        input.value = '2.2';

        dispatchEvent(input, 'input');

        let keyBoardEvent = new KeyboardEvent('keydown', { key: input.value } );
        const spy = spyOn(keyBoardEvent, 'preventDefault');
        debugElement.triggerEventHandler('keydown', keyBoardEvent);

        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);

        input.value = 'a';

        dispatchEvent(input, 'input');

        keyBoardEvent = new KeyboardEvent('keydown', { key: input.value } );
        debugElement.triggerEventHandler('keydown', keyBoardEvent);

        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);

        const keyBoardEvent1 = new KeyboardEvent('keydown', { key: String.fromCharCode(65) } );

        const keyBoardEvent2 = new KeyboardEvent('keydown', { key: String.fromCharCode(17) } );
        debugElement.triggerEventHandler('keydown', keyBoardEvent1);
        debugElement.triggerEventHandler('keydown', keyBoardEvent2);

        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);
    });
/*
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
    });*/

});

@Component({
    template: `
    <div class="form-group">
        <label>INPUT DECIMAL NUMBER</label>
        <input eswNumericField name="txtExample1" id="txtExample1" class="form-control" min="0" type="number"
         placeholder="0" step="1" maxlength="6" />
        <button id="tstBtn" type="button">Test</button>
    </div>`
})
class TestComponent { }
