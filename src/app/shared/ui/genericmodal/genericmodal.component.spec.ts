import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericModalComponent } from './genericmodal.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

describe('GenericModalComponent', () => {
    let component: GenericModalComponent;
    let fixture: ComponentFixture<GenericModalComponent>;
    let bsModalRef: BsModalRef;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ModalModule.forRoot()
            ],
            providers: [
                BsModalRef
            ],
            declarations: [ GenericModalComponent ]
        })
        .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(GenericModalComponent);
        component = fixture.componentInstance;
        bsModalRef = TestBed.get(BsModalRef);
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should hide on OK click', () => {
        const spy = spyOn(bsModalRef, 'hide');
        component.OkCallback = null;
        component.CancelCallback = null;
        component.ClosedCallback = null;
        component.OkClick();

        component.OkCallback = component.ClosedCallback;
        component.CancelCallback = component.ClosedCallback;
        component.ClosedCallback = component.ClosedCallback;
        component.OkClick();

        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(2);
      });

      it('should hide on Cancel click', () => {
        const spy = spyOn(bsModalRef, 'hide');
        component.OkCallback = null;
        component.CancelCallback = null;
        component.ClosedCallback = null;
        component.CancelClick();

        component.OkCallback = component.ClosedCallback;
        component.CancelCallback = component.ClosedCallback;
        component.ClosedCallback = component.ClosedCallback;
        component.CancelClick();

        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(2);
      });

});
