import React from "react";
import { useState } from "react";
import ProgressBar from "./ProgressBar"

const UploadForm = () => {
    const [files,setFiles] = useState(null);
    const [currentFile,setCurrentFile] = useState(null);
    const [error,setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files;
        let validType = true;
        
        for (var i = 0; i < selected.length; i++) {
            if (!types.includes(selected[i].type)) {
                validType = false;
            }
        }
        //console.log(selected);
        if (selected && validType) {
            var fileBuffer=[];

            // append the file list to an array
            Array.prototype.push.apply( fileBuffer, selected ); // <-- here
            setFiles(fileBuffer);
            setError('');
        } else {
            setFiles(null);
            setError('Please select a PNG or JPG file')
        }
        
    }

    return (
        <form>
            <label>
                <input type="file" multiple onChange={changeHandler} />
                <span>+</span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {currentFile && <div>{currentFile.name}</div>}
                {files && <ProgressBar setCurrentFile={setCurrentFile} files={files} setFiles={setFiles} />}
            </div>
        </form>
    )
}

export default UploadForm;