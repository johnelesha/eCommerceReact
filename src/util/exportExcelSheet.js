import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';


const handleExportExcelSheet =(jsonData)=>{

    // 1- convert json data to sheet
    const dataSheet = XLSX.utils.json_to_sheet(jsonData);    
    
    // 2- create excel sheet
    const excelSheet = XLSX.utils.book_new();

    // 3- add dataSheet to excelSheet
    XLSX.utils.book_append_sheet(excelSheet, dataSheet, "e-commerceSheet");

    // 4- convert excelSheet into buffer and save it
    const excelBufferFile = XLSX.write(excelSheet, {bookType: "xlsx", type: "array"});

    // 5- convert buffer into blob file (that is file we can "save it")
    const finalFile = new Blob([excelBufferFile], { 
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" 
    })

    // 6- final save
    saveAs(finalFile, "e-commerceSheet.xlsx");

}



export default handleExportExcelSheet;