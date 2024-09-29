
const ExcelJs=require('exceljs')

async function getCellNos(val) {
    let colNumber={rowNo:-1,cellNo:-1};
    let workBook=new ExcelJs.Workbook();
    await workBook.xlsx.readFile("tests/sec13_excel_utils/SampleData.xlsx");
    let workSheet=workBook.getWorksheet('writeExcel')
    workSheet.eachRow( (row, rowNumber) => {
      row.eachCell(async (cell, cellNo) => {
        if(cell.value==val){
            colNumber.rowNo=rowNumber;
            colNumber.cellNo=cellNo;
            
        }
         });
 
     })
     return colNumber;
 } 

async function writeExcel(val) {
    let data= await getCellNos(val);
    let workBook=new ExcelJs.Workbook();
   await workBook.xlsx.readFile("tests/sec13_excel_utils/SampleData.xlsx");
   let workSheet=workBook.getWorksheet('writeExcel')
   const write= workSheet.getCell(data.rowNo,data.cellNo)
   write.value="Anand"
   await  workBook.xlsx.writeFile("tests/sec13_excel_utils/SampleData.xlsx");

    
}

writeExcel("Kathleen")





