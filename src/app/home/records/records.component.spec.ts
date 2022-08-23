import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountSData } from '../home.component';
import { RecordsComponent } from './records.component';
import { TAB_TITLE } from '../home.constants';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecordsComponent]
    });
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`records has default value`, () => {
    expect(component.records).toEqual([]);
  });

  it(`duplicateReferenceIDs has default value`, () => {
    expect(component.duplicateReferenceIDs).toEqual([]);
  });

  it(`showSuccessRecords has default value`, () => {
    expect(component.showSuccessRecords).toEqual(true);
  });

  it(`tabs has default value`, () => {
    expect(component.tabs).toEqual([
      {
        title: TAB_TITLE.SUCCESS,
        active: true
      },
      {
        title: TAB_TITLE.FAILURE,
        active: false
      }
    ]);
  });
  describe('Tabs change', () => {
    it('should show failure data when same data passed twice on tab click', () => {
      component.duplicateReferenceIDs = ['156108'];
      component.records = [
        {
          reference: '156108',
          accountNumber: 'NL69ABNA0433647324',
          description: 'Flowers from Erik de Vries',
          startBalance: '13.92',
          mutation: '-7.25',
          endBalance: '6.67'
        },
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
      spyOn(component, 'selectTab').and.callThrough();
      fixture.nativeElement.querySelectorAll('a.nav-link')[1].click();
      expect(component.selectTab).toHaveBeenCalled();
      expect(component.showSuccessRecords).toEqual(false);
      fixture.detectChanges();
      const tableEl = fixture.nativeElement.querySelectorAll('tbody');
      expect(tableEl[0].childElementCount).toEqual(2);
    });
    it('should show  data in success tab and no data on failure', () => {
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
      const successTableEl = fixture.nativeElement.querySelectorAll('tbody');
      expect(successTableEl[0].childElementCount).toEqual(1);
      spyOn(component, 'selectTab').and.callThrough();
      fixture.nativeElement.querySelectorAll('a.nav-link')[1].click();
      expect(component.selectTab).toHaveBeenCalled();
      expect(component.showSuccessRecords).toEqual(false);
      fixture.detectChanges();
      const failuretableEl = fixture.nativeElement.querySelectorAll('tbody');
      expect(failuretableEl[0].childElementCount).toEqual(0);
    });
  });
});
