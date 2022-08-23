import {
  Component,
  VERSION,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ModalService } from '../shared/modal/modal.service';
import { APPTITLE, NO_RECORDS, RECORDS_EVENT } from './home.constants';
import { HomeService } from './home.service';
import { environment } from '../../environments/environment';
export type AccountSData = {
  reference: String;
  accountNumber: String;
  description: String;
  startBalance: String;
  mutation: String;
  endBalance: String;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  records: AccountSData[] = [];
  title = environment.app_title;
  noRecords_title: String = NO_RECORDS.title;
  noRecords_subTitle: String = NO_RECORDS.subTitle;
  duplicateReferenceIDs: String[] = [];
  recordsEventSubscription: any;
  constructor(
    private _homeService: HomeService,
    private _modalPopService: ModalService
  ) {}
  ngOnInit(): void {
    this.recordsEventSubscription = this._homeService.recordSubject.subscribe(
      (data: any) => {
        if (data.status === RECORDS_EVENT.RESET) {
          this.fileReset();
        }
        if (data.status === RECORDS_EVENT.INITIATE_RECORDS) {
          this.records = data.records;
          this.getDuplicateRecord(data.records);
        }
      }
    );
  }

  getDuplicateRecord(records: AccountSData[]) {
    this.duplicateReferenceIDs = records
      .map((v) => v.reference)
      .filter((refId, index, allRefIds) => {
        return allRefIds.indexOf(refId) !== index;
      });
  }
  uploadListener($event: any): void {
    let files = $event.srcElement.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);
    if (
      this._homeService.isValidCSVFile(files[0]) ||
      this._homeService.isValidXMLFile(files[0])
    ) {
      let instance = this;
      reader.onload = () => {
        this._homeService.checkRecordsDataFromFile(files[0], reader.result);
      };
      reader.onerror = function () {
        instance._modalPopService.modalPopupSubject.next({
          status: RECORDS_EVENT.UPLOAD_ERROR
        });
      };
    } else {
      this._modalPopService.modalPopupSubject.next({
        status: RECORDS_EVENT.INVALID_FILE_ERROR
      });
      this.fileReset();
    }
  }

  fileReset() {
    this.records = [];
    this.duplicateReferenceIDs = [];
  }
  ngOnDestroy() {
    this.recordsEventSubscription?.unsubscribe();
  }
}
