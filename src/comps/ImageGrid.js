import { collection } from "firebase/firestore";
import React from "react";
import { projectFirestore } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

const ImageGrid = ({setModalImg}) => {

    const { docs } = useFirestore(collection(projectFirestore,'images'));
    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
                <motion.div className="img-wrap" key={doc.id}
                    onClick={() => setModalImg(doc.url)}
                    layout
                    whileHover={{opacity: 1}}
                >
                    <motion.img src={doc.url} alt="uploaded image"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 1}}
                    />    
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;