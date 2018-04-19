import { HostListener, Directive, ElementRef  } from '@angular/core';

// Directive attribute to stop any input, other than a decimal number.
@Directive({
    selector: '[eswDecimalInput]'
})
export class DecimalInputDirective {

    constructor(private element: ElementRef) { }

    // Hook into the key press event.
    @HostListener('keypress', ['$event']) onkeypress( keyEvent: KeyboardEvent ): void {

        // Get the key that was pressed in order to check it against the regEx.
        const input = keyEvent.key;

        if (!this.IsInputAllowed( input, this.element.nativeElement.value )) {
            keyEvent.preventDefault();
        }
    }

    // Hook into the focusout event.
    @HostListener('focusout', ['$event.target']) onFocusout(target) {

        // If the text is blank then default it to 0.0.
        if (this.element.nativeElement.value.length === 0) {
            this.element.nativeElement.value = '0.0';
        }

        const alreadyHasFullStop = this.element.nativeElement.value.indexOf('.') !== -1;

        // If it doesnt have a full stop then add one and zero.
        if (!alreadyHasFullStop) {
            this.element.nativeElement.value += '.0';
        }
    }

    public IsInputAllowed ( keyChar: string, text: string): boolean {
        // Check if a full stop already exists in the input.
        const alreadyHasFullStop = text.indexOf('.') !== -1;

        // Test for allowed character using regEx. Allowed is number or decimal.
        const isAllowed = /^(\d+)?([.]?\d{0,2})?$/.test( keyChar );

        // If this is an invlid character (i.e. alpha or symbol) OR we already have a full stop, prevent key press.
        if (!isAllowed || (isAllowed && keyChar === '.' && alreadyHasFullStop)) {
            return false;
        } else {
            return true;
        }
    }
}
