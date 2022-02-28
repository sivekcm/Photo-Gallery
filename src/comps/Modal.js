import React from "react";
import { motion } from "framer-motion";

const Modal = ({ modalImg, setModalImg }) => {

    const closeModal = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setModalImg(null); 
        }
    }
    return (
        <motion.div className="backdrop" onClick={closeModal}
            initial={{opacity: 0 }}
            animate={{opacity: 1 }}
        >
            <motion.img src={modalImg} alt="enlarged pic" />
        </motion.div>
    )
}

export default Modal;