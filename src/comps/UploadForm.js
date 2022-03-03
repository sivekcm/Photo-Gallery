import React from "react";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { FaRegHandPointer, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";
import { motion } from 'framer-motion';
import { saveAs } from 'file-saver'
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { doc, deleteDoc, Firestore } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";
import { docs } from "./ImageGrid";
import { collection } from "firebase/firestore";
import useFirestore from "../hooks/useFirestore";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const UploadForm = ({setSelectedFiles, allPictures, selectMode, setSelectMode, selectedFiles}) => {
    const { docs } = useFirestore(collection(projectFirestore,'images'));
    const [files,setFiles] = useState(null);
    const [currentFile,setCurrentFile] = useState(null);
    const [error,setError] = useState(null);
    const [selectColor,setSelectColor] = useState("white");

    const types = ['image/png', 'image/jpeg'];

    const urlToPromise = (url) => {
        return new Promise(function(resolve, reject) {
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    const handleDownloadClick = () => {
        var zip = new JSZip();
        let filesToDownload = selectedFiles;
        console.log(allPictures)
        
        if (selectedFiles.length === 0) {
            filesToDownload = docs;
        }

        confirmAlert({
            title: 'Confirm Download',
            message: 'Would you like to download a zip file containing ' + filesToDownload.length + ' images?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    for (var i = 0; i < filesToDownload.length; i++) {
                        zip.file(i + ".png", urlToPromise(filesToDownload[i]["url"]), {binary:true})
                        console.log("hello from url")
                    }
                        
                    if (filesToDownload.length != 0) {
                        zip.generateAsync({type:"blob"})
                            .then(function callback(blob) {
            
                                // see FileSaver.js
                                saveAs(blob, "pictures.zip");
                            });
                    }
                    setSelectedFiles([]);
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
        
    }

    const handleDeleteClick = () => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "You are about to delete " + selectedFiles.length + " images, are you sure?",
            buttons: [
                {
                    label: "Yes, Delete Images",
                    onClick: async () => {
                        for (var i = 0; i < selectedFiles.length; i++) {
                            await deleteDoc(doc(projectFirestore,"images",selectedFiles[i]["id"]));
                        }
                        setSelectedFiles([]);
                    }
                },
                {
                    label: "No, Go Back",
                    onClick: () => {

                    }
                }
            ]
        });
        
    }

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

    const toggleSelectMode = () => {
        if (selectMode) {
            setSelectColor("white");
        } else {
            setSelectColor("#00008B");
        }
        setSelectMode(!selectMode); 
    }

    return (
        <form>
            <motion.label layout>
                <input type="file" multiple onChange={changeHandler} />
                <span>+</span>
            </motion.label>
            <motion.label layout style={{backgroundColor: selectColor}}>
                <FaRegHandPointer style={{ width: 14}} onClick={toggleSelectMode}/>
            </motion.label>
            {selectMode && 
                <span>
                    <motion.label initial={{opacity: 0, y: "-4vh" }}
                            animate={{opacity: 1,y: 0 }}
                            transition={{delay: 0.2}}
                            exit={{opacity: 0, y: "-4vh"}}
                            onClick={handleDownloadClick}>
                        <AiOutlineDownload/>
                    </motion.label>
                    <motion.label initial={{opacity:0,y: "-4vh" }}
                            animate={{opacity:1,y: 0 }}
                            transition={{delay: 0.2}}
                            exit={{opacity: 0, y: "-4vh"}}
                            onClick={handleDeleteClick}>
                        <FaRegTrashAlt/>
                    </motion.label>
                </span>
            }
            
            <div className="output">
                {error && <div className="error">{error}</div>}
                {currentFile     && <div>{currentFile.name}</div>}
                {files && <ProgressBar setCurrentFile={setCurrentFile} files={files} setFiles={setFiles} />}
            </div>
        </form>
    )
}

export default UploadForm;