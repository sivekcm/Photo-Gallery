import React, { useState } from 'react';
import Title from './comps/Title';
import ImageGrid from './comps/ImageGrid';
import UploadForm from './comps/UploadForm';
import Modal from './comps/Modal';

function App() {

  const [modalImg, setModalImg] = useState(null);
  return (
    <div className="App">
      <Title/>
      <UploadForm/>
      <ImageGrid setModalImg={setModalImg} />
      {modalImg && <Modal modalImg={modalImg} setModalImg={setModalImg} />}
    </div>
  );
}

export default App;
