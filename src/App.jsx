import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('profileImage', selectedImage);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Imagem enviada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }
  };

  return (
    <div>
      <h2>Upload de Imagem de Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {previewImage && <img src={previewImage} alt="Preview" width="100" />}
        <button type="submit">Enviar Imagem</button>
      </form>
    </div>
  );
};

export default App;
