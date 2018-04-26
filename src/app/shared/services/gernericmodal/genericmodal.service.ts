import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { GenericModalComponent, ModalStyle, ModalType } from '../../ui/genericmodal/genericmodal.component';

@Injectable()
export class GenericModalService {

    public modalRef: BsModalRef = null;

    public constructor(private modalService: BsModalService) {
        this.modalService.config.backdrop = 'static';
    }

    // Show the modal.
    public showSuccess(title: string, message: string, callback: Function = null): void {
      this.showDialog(title, message, ModalType.Dialog, ModalStyle.Success, callback);
    }
    public showInfo(title: string, message: string, callback: Function = null): void {
      this.showDialog(title, message, ModalType.Dialog, ModalStyle.Info, callback);
    }
    public showError(title: string, message: string, callback: Function = null): void {
      this.showDialog(title, message, ModalType.Dialog, ModalStyle.Error, callback);
    }
    public showWarning(title: string, message: string, callback: Function = null): void {
      this.showDialog(title, message, ModalType.Dialog, ModalStyle.Warning, callback);
    }

    public showDialog(title: string, message: string, type: ModalType, style: ModalStyle,
      closeCallback: Function = null, okCallback: Function = null, cancelCallback: Function = null) {

        const parent = this;

        if (this.modalRef == null) {
            this.modalRef = this.modalService.show(GenericModalComponent);
            this.modalRef.content.title = title;
            this.modalRef.content.message = message;
            this.modalRef.content.style = style;
            this.modalRef.content.type = type;
            this.modalRef.content.ClosedCallback = function() {
              parent.ClearRef(); if (closeCallback !== undefined && closeCallback != null) { closeCallback(); }
            };
            this.modalRef.content.CancelCallback = function() {
              parent.ClearRef(); if (cancelCallback !== undefined && cancelCallback != null) { cancelCallback(); }
            };
            this.modalRef.content.OkCallback = function() {
              parent.ClearRef(); if (okCallback !== undefined && okCallback != null) { okCallback(); }
            };
        }
    }

    public DialogOk() {
      if (this.modalRef != null) {
        this.modalRef.content.OkClick();
      }
    }

    public DialogCancel() {
      if (this.modalRef != null) {
        this.modalRef.content.CancelClick();
      }
    }

    public ClearRef() {
        this.modalRef = null;
    }
}
