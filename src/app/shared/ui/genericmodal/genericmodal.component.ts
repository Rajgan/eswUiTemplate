import { Injectable, NgModule, ViewChild, Output, EventEmitter, Component, OnInit, Input, TemplateRef  } from '@angular/core';
import { BsModalService, ModalBackdropOptions } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    templateUrl: './genericmodal.component.html'
})
export class GenericModalComponent {
    @Input() public title;
    @Input() public message;
    @Input() public type: ModalType;
    @Input() public style: ModalStyle;
    @Input() public ClosedCallback = Function; // Output from control is the saved event.
    @Input() public OkCallback = Function; // Output from control is the saved event.
    @Input() public CancelCallback = Function; // Output from control is the saved event.

    constructor(public bsModalRef: BsModalRef) { }

    public OkClick() { if (this.OkCallback != null && this.OkCallback !== undefined) { this.OkCallback(); } this.hide(true); }
    public CancelClick() {
      if (this.CancelCallback != null && this.CancelCallback !== undefined) {
        this.CancelCallback();
      }
      this.hide(false);
    }

    // Hide the modal.
    public hide(outcome: boolean) {
        if (this.ClosedCallback !== null) {
            this.ClosedCallback();
        }
        this.bsModalRef.hide();
    }
}

export enum ModalType {
    Dialog = 0,
    OkCancel = 1,
    YesNo = 2,
    OkOnly = 3
  }

export enum ModalStyle {
    Success = 0,
    Error = 1,
    Warning = 2,
    Info = 3,
    None = 4
  }
