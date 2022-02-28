import React, { useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from 'framer-motion';

const ProgressBar = ({files, setFiles, setCurrentFile}) => {
    const { url, progress, currentFile } = useStorage(files);
    const [totalProgress, setTotalProgress] = useState(0);

    useEffect(() => {
        console.log(currentFile);
        console.log(progress);
        if (url) {
            setTimeout(function () {
                setFiles(null);

            }, 3000)
            console.log("hello?")
            // if (files.length > 1) {
            //     console.log("slice");
            //     setFiles(files.slice(1));
            // }
            // else {
            //     console.log(files);
            //     setFiles();
            // }
        }
        if (currentFile) {
            setCurrentFile(currentFile);
        }
        // if (progress === 100) {
        //     setTotalProgress(totalProgress + (100 / files.length));
        // }
    }, [url,currentFile,setFiles, setCurrentFile])

    return (
        <motion.div className="progress-bar"
            initial={{ width: 0}}
            animate={{ width: (progress) + '%' }}
        ></motion.div>
    )
}

export default ProgressBar;