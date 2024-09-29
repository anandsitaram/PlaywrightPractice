import {test,expect} from '@playwright/test'
const ExcelJs=require('exceljs')
const fs = require('fs/promises');  // Import promise-based version of fs
const path = require('path');

async function writeExcel(filePath,valueToFind,ColToWrite,valueToBeUpdated){
    let workBook=new ExcelJs.Workbook();
    await workBook.xlsx.readFile(filePath);
    let workSheet=workBook.getWorksheet('Sheet1')
    const cellNos=await readExcel(workSheet,valueToFind)
    const colHeaderRowNo=await getColHeaderRowNo(workSheet,ColToWrite);
    console.log(cellNos)
    console.log(colHeaderRowNo)
    const write=workSheet.getCell(cellNos.rowNo,colHeaderRowNo);
    write.value=valueToBeUpdated
    workBook.xlsx.writeFile(filePath);



  


}

async function getColHeaderRowNo(workSheet,ColToWrite){
    let colHeaderRowNo=0;
    const row= workSheet.getRow(1);

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

    for(let rowNo=1;rowNo<= workSheet.rowCount;rowNo++){
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

async function clearDownloadDirectory(){
    let downloadPath="tests/sec13_excel_utils/downloads/"
    const files = await fs.readdir(downloadPath);
      const promises= files.map(file=>fs.unlink(path.join(downloadPath,file)))
      await Promise.all(promises)
}

test.only("Upload and Download excel Validations",async({page})=>{
    const valueToBeUpdated="788";
    const textSearch="Banana"
    const downloadPath="tests/sec13_excel_utils/downloads/download.xlsx"
    await clearDownloadDirectory()

    await page.goto("https://rahulshettyacademy.com/upload-download-test/")
   const downloadPromise=  page.waitForEvent('download')
  
    //download file
    await page.getByRole('button',{name:'Download'}).click()
    const download=await downloadPromise;
   await download.saveAs(downloadPath)
    await writeExcel(downloadPath,textSearch,"price",valueToBeUpdated)



    //upload file
   await page.locator("#fileinput").click()
   //uploads -works only if attribute as type='file'
   console.log(path.resolve(downloadPath))
   await page.locator("#fileinput").setInputFiles(path.resolve(downloadPath))
   await page.waitForLoadState('domcontentloaded')
   await page.screenshot({path:'screenshot.png'})
   const desriredRow= page.getByRole('row').filter({hasText:textSearch});
   await expect( desriredRow.locator('#cell-4-undefined')).toContainText(valueToBeUpdated)
   


})


