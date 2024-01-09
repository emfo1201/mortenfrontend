import React, { useEffect, useState } from 'react';
import Player from './UpdatePlayer/Player';

function AddPlayer() {
  // ... your state and logic for adding players ...

  return (
    <div>
      <h3>Add new player</h3>
      <Player />
    </div>
  );
}

export default AddPlayer;