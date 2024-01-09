import React, { useState } from 'react';
import AddCategory from './Category/AddCategory';
import DeleteCategory from './Category/DeleteCategory';
import Player from './Player/AddPlayer';
import useStyles from './styles'; // Importera stilar

function Admin() {
  const [activeFunction, setActiveFunction] = useState(null);
  const classes = useStyles(); // Använd stilar
  const login = useStyles();

  const handleToggleFunction = (functionName) => {
    setActiveFunction(functionName === activeFunction ? null : functionName);
  };

  return (
    <div className={classes.container}>
      <h2>Admin!</h2>

      {/** Add new category */}
      <div>
        <button onClick={() => handleToggleFunction('addCategory')} className={classes.button}>
          Add new category
        </button>
        {activeFunction === 'addCategory' && <AddCategory />}
      </div>

      {/** Delete category */}
      <div>
        <button onClick={() => handleToggleFunction('deleteCategory')} className={classes.button}>
          Delete category
        </button>
        {activeFunction === 'deleteCategory' && <DeleteCategory />}
      </div>

      {/** Add new player */}
      <div>
        <button onClick={() => handleToggleFunction('addPlayer')} className={classes.button}>
          Add new player
        </button>
        {activeFunction === 'addPlayer' && <Player />}
      </div>
    </div>
  );
}

export default Admin;