import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function UpdatePlayer({ player }) {
  const [playerData, setPlayerData] = useState(player);
  const [newImages, setNewImages] = useState([]); // En lista för nya bilder
  const [selectedImages, setSelectedImages] = useState([]); // En lista för befintliga bilder som ska tas bort

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    // Lägg till de nya bilderna i listan
    setNewImages([...newImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    // Ta bort den befintliga bilden från listan
    const updatedImages = [...playerData.images];
    updatedImages.splice(index, 1);
    setPlayerData({ ...playerData, images: updatedImages });
    // Lägg till bilden i listan med bilder som ska tas bort
    setSelectedImages([...selectedImages, playerData.images[index]]);
  };

  const handleUpdatePlayer = () => {
    // ... din logik för att uppdatera spelaren och ladda upp de nya bilderna ...

    // Ta bort de valda bilderna från servern
    selectedImages.forEach((image) => {
      // Skicka en förfrågan till servern för att ta bort bilden med `image` som identifierare
      // T.ex., använd en DELETE-förfrågan till din API-rutt för att ta bort bilden
    });
  };

  return (
    <div>
      <h3>Update player</h3>
      <form onSubmit={handleUpdatePlayer}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          value={playerData.name}
          onChange={handleInputChange}
        />
        {/* ... andra fält ... */}
        
        {/* Input-fält för att välja nya bilder */}
        <input
          type="file"
          multiple
          onChange={handleImageChange}
        />
        
        {/* Visa befintliga bilder och knapp för att ta bort dem */}
        {playerData.images.map((image, index) => (
          <div key={index}>
            <img
              src={`http://localhost:5000/static/${image}`}
              alt={`Image ${index}`}
            />
            <Button onClick={() => handleRemoveImage(index)}>
              Remove
            </Button>
          </div>
        ))}

        {/* Visa nya bilder som läggs till */}
        {newImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`New Image ${index}`}
          />
        ))}

        <Button variant="contained" color="primary" type="submit">
          Update Player
        </Button>
      </form>
    </div>
  );
}

export default UpdatePlayer;