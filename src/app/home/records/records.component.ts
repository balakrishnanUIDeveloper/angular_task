import { Component, Input, OnInit } from '@angular/core';
import { AccountSData } from '../home.component';
import { TAB_TITLE } from '../home.constants';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {
  @Input() records: AccountSData[] = [];
  @Input() duplicateReferenceIDs: String[] = [];
  showSuccessRecords: Boolean = true;
  transactionLabel: String = TAB_TITLE.TRANSACTION;
  tabs = [
    {
      title: TAB_TITLE.SUCCESS,
      active: true
    },
    {
      title: TAB_TITLE.FAILURE,
      active: false
    }
  ];
  checkTransactionStatus(record: AccountSData) {
    const endBalance = Number(record.startBalance) + Number(record.mutation);
    return (
      endBalance.toString() === record.endBalance &&
      !this.duplicateReferenceIDs.includes(record.reference)
    );
  }
  selectTab(tab: any) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
    this.showSuccessRecords = tab.title === TAB_TITLE.SUCCESS;
  }
}
