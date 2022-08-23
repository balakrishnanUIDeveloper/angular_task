import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';
import { ERROR_MSG, RECORDS_EVENT } from 'src/app/home/home.constants';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    const ngbModalStub = () => ({ open: (msgModal: any) => ({}) });
    const modalServiceStub = () => ({
      modalPopupSubject: {
        subscribe: (f: any) => f({ status: RECORDS_EVENT.UPLOAD_ERROR }),
        unsubscribe: () => ({})
      }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ModalComponent],
      providers: [
        { provide: NgbModal, useFactory: ngbModalStub },
        { provide: ModalService, useFactory: modalServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`modalContent has default value`, () => {
    expect(component.modalContent).toEqual(ERROR_MSG.SOMETHING_WRONG);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'open').and.callThrough();
      component.ngOnInit();
      expect(component.open).toHaveBeenCalled();
      expect(component.modalContent).toEqual(ERROR_MSG.UPLOAD_ERROR);
    });
  });
});
