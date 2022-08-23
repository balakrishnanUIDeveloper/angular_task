export function fakeFileForTest(extension: String) {
  let blob: any = new Blob([''], { type: 'text/html' });
  blob['lastModifiedDate'] = '';
  blob['name'] = `testFile.${extension}`;
  return <File>blob;
}
export function testCsvFileData() {
  return `Reference,Account Number,Description,Start Balance,Mutation,End Balance\r
  \n156108,NL69ABNA0433647324,Flowers from Erik de Vries,13.92,-7.25,6.67\r
  \n112806,NL93ABNA0585619023,Subscription from Rik Theu�,77.29,-23.99,53.3\r`;
}
export function testXMLData() {
  return `<records>\n  <record reference="164702">\n    
    <accountNumber>NL46ABNA0625805417</accountNumber>\n
    <description>Flowers for Rik Dekker</description>\n </record>\n</records>`;
}
