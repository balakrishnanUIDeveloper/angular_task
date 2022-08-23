import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ERROR_MSG, RECORDS_EVENT } from 'src/app/home/home.constants';
import { HomeService } from 'src/app/home/home.service';
import { ModalService } from './modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  modalContent: String = ERROR_MSG.SOMETHING_WRONG;
  modalEventSubscription: any;
  @ViewChild('msgModal') msgModal: any;
  constructor(
    private _modalService: NgbModal,
    private _modalpopService: ModalService
  ) {}
  ngOnInit() {
    this.modalEventSubscription =
      this._modalpopService.modalPopupSubject.subscribe((data: any) => {
        if (data.status === RECORDS_EVENT.UPLOAD_ERROR) {
          this.modalContent = ERROR_MSG.UPLOAD_ERROR;
        } else if (data.status === RECORDS_EVENT.INVALID_FILE_ERROR) {
          this.modalContent = ERROR_MSG.INVALID_FILE_ERROR;
        }
        this.open(this.msgModal);
      });
  }
  open(msgModal: any) {
    this._modalService.open(msgModal);
  }
  ngOnDestroy(): void {
    this.modalEventSubscription?.unsubscribe();
  }
}
