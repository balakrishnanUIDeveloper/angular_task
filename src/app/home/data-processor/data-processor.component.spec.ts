import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeService } from '../home.service';
import { PROCESSOR_TITLE } from '../home.constants';
import { DataProcessorComponent } from './data-processor.component';
import { By } from '@angular/platform-browser';

describe('DataProcessorComponent', () => {
  let component: DataProcessorComponent;
  let fixture: ComponentFixture<DataProcessorComponent>;

  beforeEach(() => {
    const homeServiceStub = () => ({ recordSubject: { next: () => ({}) } });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DataProcessorComponent],
      providers: [{ provide: HomeService, useFactory: homeServiceStub }]
    });
    fixture = TestBed.createComponent(DataProcessorComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`records has default value`, () => {
    expect(component.records).toEqual([]);
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(PROCESSOR_TITLE);
  });
  it('should detect file input change emit data to parent component', () => {
    const fakeFaileData = new DataTransfer();
    fakeFaileData.items.add(new File([''], 'test-file.csv'));
    spyOn(component.uploadFileEvent, 'emit');
    const fileUploadEl =
      fixture.nativeElement.querySelector('input[type=file]');
    fileUploadEl.files = fakeFaileData.files;
    fileUploadEl.dispatchEvent(new InputEvent('change'));
    fixture.detectChanges();
    expect(component.uploadFileEvent.emit).toHaveBeenCalled();
  });
  it('should reset input element and emit event to parent', () => {
    component.records = [
      {
        reference: '156108',
        accountNumber: 'NL69ABNA0433647324',
        description: 'Flowers from Erik de Vries',
        startBalance: '13.92',
        mutation: '-7.25',
        endBalance: '6.67'
      }
    ];
    fixture.detectChanges();
    const resetBtnEl = fixture.nativeElement.querySelector('button');
    resetBtnEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.csvReader.nativeElement.value).toEqual('');
  });
});
