import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

function DeletePlayer() {
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const handleDeletePlayer = () => {
    // Add your logic to delete the selected player here
  };

  return (
    <div>
      <h3>Delete player</h3>
      <FormControl variant="outlined">
        <InputLabel>Players</InputLabel>
        <Select
          label="Players"
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          {/* Add your player options here */}
        </Select>
      </FormControl>
      <p />
      <Button variant="contained" color="primary" onClick={handleDeletePlayer}>
        Delete player
      </Button>
    </div>
  );
}

export default DeletePlayer;