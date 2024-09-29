const ExcelJs=require('exceljs')


async function writeExcel(valueToFind,ColToWrite){
    let workBook=new ExcelJs.Workbook();
    await workBook.xlsx.readFile("tests/sec13_excel_utils/SampleData.xlsx");
    let workSheet=workBook.getWorksheet('writeExcel')
    const cellNos=await readExcel(workSheet,valueToFind)
    const colHeaderRowNo=await getColHeaderRowNo(workSheet,ColToWrite);
    console.log(cellNos)
    console.log(colHeaderRowNo)
    const write=workSheet.getCell(cellNos.rowNo,colHeaderRowNo);
    write.value="WRITE "+new Date().toString()
    workBook.xlsx.writeFile("tests/sec13_excel_utils/SampleData.xlsx");



  


}

async function getColHeaderRowNo(workSheet,ColToWrite){
    let colHeaderRowNo=0;
    const row=workSheet.getRow(1);

    for(let cellNo=1;cellNo<=row.cellCount;cellNo++){
        const cell=row.getCell(cellNo);
        if(cell.value===ColToWrite){
            colHeaderRowNo=cellNo;
           break;
        }



    }
    return colHeaderRowNo;

}


async function readExcel(workSheet,valueToFind){
    let colNumbers={rowNo:-1,colNo:-1}

    for(let rowNo=1;rowNo<=workSheet.rowCount;rowNo++){
        const row=workSheet.getRow(rowNo);
        for(let cellNo=1;cellNo<=row.cellCount;cellNo++){
            const cell=row.getCell(cellNo);
            if(cell.value===valueToFind){
                colNumbers.rowNo=rowNo;
                colNumbers.colNo=cellNo;
               break;
            }



        }
    }
    return colNumbers;
  
}

writeExcel("Anand","writeData")