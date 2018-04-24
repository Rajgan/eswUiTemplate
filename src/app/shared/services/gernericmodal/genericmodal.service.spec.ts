import { GenericModalComponent, ModalStyle, ModalType } from './../../ui/genericmodal/genericmodal.component';
import { BsModalService, ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GenericModalService } from './genericmodal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('GenericModalService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let genericModalService: GenericModalService;
    let component: GenericModalComponent;
    let fixture: ComponentFixture<GenericModalComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TestModule,
                ModalModule.forRoot()
            ],
            providers: [
                GenericModalService,
                BsModalService
            ],
        });

        fixture = TestBed.createComponent(GenericModalComponent);
        component = fixture.componentInstance;
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        genericModalService = TestBed.get(GenericModalService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should be created', inject([GenericModalService], (service: GenericModalService) => {
        expect(service).toBeTruthy();
    }));

    it('should clear ref for modalRef', () => {
        genericModalService.ClearRef();
        expect(genericModalService.modalRef).toBeNull();
    });

    it('should display Modal dialog', () => {
      const title = 'Show Success';
      const message = 'I am Testing Show Success';
      genericModalService.showDialog(title, message, ModalType.OkOnly, ModalStyle.Error, function() {}, function() { }, function() {});
      genericModalService.showDialog(title, message, ModalType.OkOnly, ModalStyle.Error);
      expect(genericModalService.modalRef.content.title).toEqual(title);
      expect(genericModalService.modalRef.content.style).toEqual(ModalStyle.Error);
      expect(genericModalService.modalRef.content.message).toEqual(message);
    });

    it('should display Modal for showSuccess call', () => {
        const title = 'Show Success';
        const message = 'I am Testing Show Success';
        genericModalService.showSuccess(title, message, function() { });
        genericModalService.showSuccess(title, message);
        expect(genericModalService.modalRef.content.title).toEqual(title);
        expect(genericModalService.modalRef.content.style).toEqual(ModalStyle.Success);
        expect(genericModalService.modalRef.content.message).toEqual(message);
    });

    it('should display Modal for showInfo call', () => {
        const title = 'Show Info';
        const message = 'I am Testing Show Info';
        genericModalService.showInfo(title, message, function() { });
        genericModalService.showInfo(title, message);
        expect(genericModalService.modalRef.content.title).toEqual(title);
        expect(genericModalService.modalRef.content.message).toEqual(message);
    });

    it('should display Modal for showError call', () => {
        const title = 'Show Error';
        const message = 'I am Testing Show Error';
        genericModalService.showError(title, message, function() { });
        genericModalService.showError(title, message);
        expect(genericModalService.modalRef.content.title).toEqual(title);
        expect(genericModalService.modalRef.content.message).toEqual(message);
    });

    it('should display Modal for showWarning call', () => {
        const title = 'Show Warning';
        const message = 'I am Testing Show Warning';
        genericModalService.showWarning(title, message, function() { });
        genericModalService.showWarning(title, message);
        expect(genericModalService.modalRef.content.title).toEqual(title);
        expect(genericModalService.modalRef.content.message).toEqual(message);
    });

});



@NgModule({
    imports: [CommonModule],
    declarations: [GenericModalComponent],
    entryComponents: [
        GenericModalComponent,
    ],
    providers:[BsModalRef]
})
class TestModule {}


