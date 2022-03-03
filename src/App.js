import React, { useState } from 'react';
import Title from './comps/Title';
import ImageGrid from './comps/ImageGrid';
import UploadForm from './comps/UploadForm';
import Modal from './comps/Modal';

function App() {

  const [modalImg, setModalImg] = useState(null);
  const [selectMode,setSelectMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allPictures, setAllPictures] = useState([]);

  return (
    <div className="App">
      <Title/>
      <UploadForm allPicutures={allPictures} setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} setSelectMode={setSelectMode} selectMode={selectMode}/>
      <ImageGrid setAllPictures={setAllPictures} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} selectMode={selectMode} setModalImg={setModalImg} />
      {modalImg && <Modal modalImg={modalImg} setModalImg={setModalImg} />}
    </div>
  );
}

export default App;
