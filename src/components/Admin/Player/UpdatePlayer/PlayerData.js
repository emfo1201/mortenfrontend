import React from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function PlayerData({ playerData, handleInputChange }) {
  return (
    <div>
      <TextField
        fullWidth
        name="name"
        label="Name"
        variant="outlined"
        value={playerData.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        name="club"
        label="Club"
        variant="outlined"
        value={playerData.club}
        onChange={handleInputChange}
      />
      <TextareaAutosize
        fullWidth
        name="infoEnglish"
        placeholder="Info (English)"
        rowsMin={3}
        value={playerData.infoEnglish}
        onChange={handleInputChange}
      />
      <TextareaAutosize
        fullWidth
        name="infoNorwegian"
        placeholder="Info (Norwegian)"
        rowsMin={3}
        value={playerData.infoNorwegian}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default PlayerData;