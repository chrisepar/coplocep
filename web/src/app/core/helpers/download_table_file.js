import appDetails from '_appDetails.js';
import { postData, deleteData, getData } from 'app/core/helpers/fetch.js';
import { getUserCode } from "app/core/authentication/authentication.js"
import { downloadFile } from "app/core/helpers/file_handler.js";
import isEmpty from "app/core/helpers/is_empty.js";


const downloadTableFile = () => {
    let fileName = "";
    return getData(`download/membership`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            let contentDisposition = response.headers.get("Content-Disposition");
            fileName = contentDisposition.substring(
                contentDisposition.indexOf("filename=\"") + 10,
                contentDisposition.lastIndexOf(".xlsx\";")
            );;
            return response.blob();
        })
        .then(blob => {
            downloadFile(blob, `Computation - ${fileName}.xlsx`);
            return fileName;
        });
};

export { 
    downloadTableFile
};