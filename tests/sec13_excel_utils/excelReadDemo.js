const { error } = require('console');
const ExcelJs=require('exceljs')

//using async
async function readExcelUsingAsync(){
    console.log("Read Excel Data using Async")
    let workBook=new ExcelJs.Workbook();
   await workBook.xlsx.readFile("tests/sec13_excel_utils/SampleData.xlsx");
   let workSheet=workBook.getWorksheet('readExcel')
   workSheet.eachRow( (row, rowNumber) => {
     row.eachCell(async (cell, cellNo) => {
        console.log(cell.value);
        });

    })
   console.log("----------------------------------")   

}

//using promise
 function readExcelUsingPromise(){
    let workBook=new ExcelJs.Workbook();
     workBook.xlsx.readFile("tests/sec13_excel_utils/SampleData.xlsx").then(()=>{
        console.log("Read Excel Data using Promise")

        let workSheet=workBook.getWorksheet('readExcel')
        workSheet.eachRow((row,rowNumber)=>{
         row.eachCell((cell,cellNo)=>{
             console.log(cell.value)
         })
     
        })
         
     }).catch(error=>console.log(error))
     console.log("----------------------------------")   
 
 }
async function getCellNos(val) {
    let colNumber={rowNo:-1,cellNo:-1};
    let workBook=new ExcelJs.Workbook();
    await workBook.xlsx.readFile("tests/sec13_excel_utils/SampleData.xlsx");
    let workSheet=workBook.getWorksheet('readExcel')
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

 async function readSpecificCell(val){
   let data= await getCellNos(val);
   let workBook=new ExcelJs.Workbook();
   await workBook.xlsx.readFile("tests/sec13_excel_utils/SampleData.xlsx");
   let workSheet=workBook.getWorksheet('readExcel')
    workSheet.getRow(data.rowNo).eachCell((cell,cellNo)=>{
        console.log(cell.value)
    })

   
 }
//readExcelUsingAsync();
readSpecificCell("Kathleen")
//readExcelUsingPromise();


