import { collection } from "firebase/firestore";
import React from "react";
import { projectFirestore } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
import { motion, useAnimation } from "framer-motion";
import { useEffect, forceUpdate } from "react"

const ImageGrid = ({setAllPictures, selectedFiles, setSelectedFiles,selectMode, setModalImg}) => {

    const { docs } = useFirestore(collection(projectFirestore,'images'));
    const controls = useAnimation();

    const variants = {
        start: (i) => ({
          rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
          transition: {
            repeat: Infinity
          }
        }),
        reset: {
          rotate: 0
        }
      };
    
    const handleImageClick = (url, id) => {
        if (selectMode) {
            if (selectedFiles.length === 0) {
                setSelectedFiles([{url:url, id:id}]);
            } else {
                setSelectedFiles([...selectedFiles, {url:url,id:id}]);
            }
            controls.start('start');
        } else {
            setModalImg(url);
        }
    }

    const conditionalComp = (id, url) => {
        
        if (selectedFiles.includes({url,id})) {
            return <motion.img src={url} alt="uploaded image"
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                    exit={{opacity: 0}}
                    animate={controls}
                    variants={variants}
                    />   
        } else {
            return <motion.img src={url} alt="uploaded image"
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                    exit={{opacity: 0}}
            />   
        }
    }

     
    
    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
                <motion.div className="img-wrap" key={doc.id}
                    onClick={() => handleImageClick(doc.url, doc.id)}
                    layout
                    whileHover={{opacity: 1}}
                    
                >
                    {conditionalComp(doc.id, doc.url)}
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;