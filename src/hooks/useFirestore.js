import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (coll) => {
    const [docs, setDocs] = useState([]);


    useEffect(() => {
        const q = query(collection(projectFirestore, "images"), orderBy("createdAt","desc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        });

        return () => unsub();
        // const asyncQuery = async () => {
        //     const querySnapshot = await getDocs(collection(projectFirestore, 'images'));
        //     let documents = []
        //     querySnapshot.forEach((doc) => {
                
        //         documents.push({...doc.data(), id: doc.id});
        //         console.log(doc.data())
        //     });
        //     setDocs(documents);
        // }

        // asyncQuery();
    }, [collection])
    return { docs }; 
}

export default useFirestore;