import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp} from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const useStorage = (files) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [currentFile, setCurrentFile] = useState(null);

    useEffect(() => {
        // references
        const promises = [];
        const collectionRef = collection(projectFirestore, 'images');
        const tempUrlArr = [];
        let totalProgress = 0;
        files.forEach(file => { 
            setCurrentFile(file);
            console.log(file);
            const storageRef = ref(projectStorage, file.name);

            const uploadTask = uploadBytesResumable(storageRef, file);
            promises.push(uploadTask);
            let prog = 0;

            uploadTask.on(
                'state_changed', 
                (snapshot) => {
                    let percentage = (((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                    if (percentage === 100) {
                        prog = prog + (percentage / files.length);
                        setProgress(prog);
                        console.log(prog);
                    }
                }, 
                (err) => {
                    setError(err);
                    console.log(err);
                }, 
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        tempUrlArr.push(url);
                        setUrl(tempUrlArr);

                        if (url) {
                            const createdAt = timestamp;
                            addDoc(collectionRef, {url, createdAt });
                        }
                    });
                    
                    
                }
            );
            
        });

        Promise.all(promises).then(() => {
            setUrl(tempUrlArr);
            setProgress(100);
        });
        
    }, [files])

    return { progress, error, url, currentFile }
}

export default useStorage;