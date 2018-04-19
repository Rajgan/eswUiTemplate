import {Directive, Input, Output, EventEmitter, ElementRef, OnDestroy, Renderer } from '@angular/core';
import {NgbDropdownConfig} from './ngbdropdown.config';

/**
 * Transforms a node into a dropdown.
 */
@Directive({
  selector: '[eswDropdown]',
  exportAs: 'eswDropdown',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.dropdown]': '!up',
    '[class.dropup]': 'up',
    '[class.open]': 'isOpen()',
    '(keyup.esc)': 'closeFromOutsideEsc()',
  }
})
// tslint:disable-next-line:directive-class-suffix
export class NgbDropdown implements OnDestroy {
  private _toggleElement: any;

  // globalListenFunc will hold the function returned by "renderer.listenGlobal"
  private outsideClickListener: Function;

  /**
   * Indicates that the dropdown should open upwards
   */
  @Input() up: boolean;

  /**
   * Indicates that dropdown should be closed when selecting one of dropdown items (click) or pressing ESC.
   */
  @Input() autoClose: boolean;

  /**
   *  Defines whether or not the dropdown-menu is open initially.
   */
  // tslint:disable-next-line:no-input-rename
  @Input('open') private _open = false;

  /**
   *  An event fired when the dropdown is opened or closed.
   *  Event's payload equals whether dropdown is open.
   */
  @Output() openChange = new EventEmitter();

  constructor(config: NgbDropdownConfig, private renderer: Renderer) {
    this.up = config.up;
    this.autoClose = config.autoClose;
    this.renderer = renderer;
  }

  ngOnDestroy() {

  }

  /**
   * Checks if the dropdown menu is open or not.
   */
  isOpen(): boolean { return this._open; }

  /**
   * Opens the dropdown menu of a given navbar or tabbed navigation.
   */
  open(): void {
    if (!this._open) {
      this._open = true;
      this.openChange.emit(true);
      // We cache the function "listenGlobal" returns
      this.outsideClickListener = this.renderer.listenGlobal('document', 'click', (event) => {
        const el: Element = event.target;
        // if (!el.classList.contains('dropdown-toggle')) {
          this.closeFromOutsideClick(event);
        // }
      });
    }
  }

  /**
   * Closes the dropdown menu of a given navbar or tabbed navigation.
   */
  close(): void {
    if (this._open) {
      this._open = false;
      this.openChange.emit(false);
      // Removes "listenGlobal" listener
      this.outsideClickListener();
    }
  }

  /**
   * Toggles the dropdown menu of a given navbar or tabbed navigation.
   */
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  closeFromOutsideClick($event) {
    if (this.autoClose && !this._isEventFromToggle($event)) {
      this.close();
    }
  }

  closeFromOutsideEsc() {
    if (this.autoClose) {
      this.close();
    }
  }

  /**
   * @internal
   */
  set toggleElement(toggleElement: any) { this._toggleElement = toggleElement; }

  private _isEventFromToggle($event) { return !!this._toggleElement && this._toggleElement.contains($event.target); }
}

/**
 * Allows the dropdown to be toggled via click. This directive is optional.
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[eswDropdownToggle]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'dropdown-toggle',
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'dropdown.isOpen()',
    '(click)': 'toggleOpen()'
  }
})
// tslint:disable-next-line:directive-class-suffix
export class NgbDropdownToggle {
  constructor(public dropdown: NgbDropdown, elementRef: ElementRef) {
    dropdown.toggleElement = elementRef.nativeElement;
  }

  toggleOpen() {
    this.dropdown.toggle();
  }
}

export const NGB_DROPDOWN_DIRECTIVES = [NgbDropdownToggle, NgbDropdown];
