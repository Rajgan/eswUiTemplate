import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

// Add zone modal component.
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'esw-custommodal',
  templateUrl: './custommodal.component.html'
})
export class CustomComponent {

  @ViewChild('customModal') public CustomModal: ModalDirective; // Exposes the modal child to the parent.
  @Output() public Saved = new EventEmitter<any>(); // Output from control is the saved event.

  // show the modal.
  public show() {
    this.CustomModal.config.backdrop = 'static'; // Means clicking the background will not dismiss the modal.
    this.CustomModal.show();
  }

  // Programatically hide the modal.
  public hide() {
    // Reset the form.
    this.CustomModal.hide();
  }

  // On validated save, sample of emitting an event.
  public addClick(): void {


    // Notification to parent that a save has occurred. This will allow things like, telling the parent to refresh.
    this.Saved.emit(Object.assign({},
      {
        property1: 'a',
        propert2: 'b',
        proeprty3: 'c'
      }  // Output an object of your choosing.
    ));

    // Hide this modal.
    this.hide();
  }

  public closeClick(): void {
    this.hide();
  }
}
