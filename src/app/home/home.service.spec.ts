import { TestBed } from '@angular/core/testing';
import {
  fakeFileForTest,
  testCsvFileData,
  testXMLData
} from '../core/helper/test.helper';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HomeService] });
    service = TestBed.inject(HomeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('check checkRecordsDataFromFile checks data based on csv ', () => {
    spyOn(service, 'checkRecordsDataFromFile').and.callThrough();
    spyOn(service, 'getDataRecordsArrayFromCSVFile').and.callThrough();
    service.checkRecordsDataFromFile(fakeFileForTest('csv'), testCsvFileData());
    expect(service.checkRecordsDataFromFile).toHaveBeenCalled();
    expect(service.getDataRecordsArrayFromCSVFile).toHaveBeenCalled();
  });
  it('check checkRecordsDataFromFile checks data based on xml ', () => {
    spyOn(service, 'checkRecordsDataFromFile').and.callThrough();
    spyOn(service, 'getDataRecordsArrayFromXMLFile').and.callThrough();
    service.checkRecordsDataFromFile(fakeFileForTest('xml'), testXMLData());
    expect(service.checkRecordsDataFromFile).toHaveBeenCalled();
    expect(service.getDataRecordsArrayFromXMLFile).toHaveBeenCalled();
  });
  it('check if getHeaderArray returns array of headers when passed as string', () => {
    spyOn(service, 'getHeaderArray').and.callThrough();
    let checkString = service.getHeaderArray(['Reference,Account Number']);
    expect(checkString.length).toEqual(2);
  });
  it('check if isValidCSVFile returns true for csv file', () => {
    spyOn(service, 'isValidCSVFile').and.callThrough();
    let checkString = service.isValidCSVFile(fakeFileForTest('csv'));
    expect(checkString).toBeTrue();
  });
  it('check if isValidCSVFile returns true for other file formats', () => {
    spyOn(service, 'isValidCSVFile').and.callThrough();
    let checkString = service.isValidCSVFile(fakeFileForTest('xml'));
    expect(checkString).toBeFalse();
  });
  it('check if isValidXMLFile returns true for xml file', () => {
    spyOn(service, 'isValidXMLFile').and.callThrough();
    let checkString = service.isValidXMLFile(fakeFileForTest('xml'));
    expect(checkString).toBeTrue();
  });
  it('check if isValidXMLFile returns true for other file formats', () => {
    spyOn(service, 'isValidXMLFile').and.callThrough();
    let checkString = service.isValidXMLFile(fakeFileForTest('csv'));
    expect(checkString).toBeFalse();
  });
  it('check camalize string', () => {
    spyOn(service, 'camelize').and.callThrough();
    let checkString = service.camelize('Test');
    expect(checkString).toEqual('test');
  });
});
