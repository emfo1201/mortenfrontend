import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { getPlayers } from '../../../actions/players';
import AddCategory from '../../Admin/Category/AddCategory';
import AddSubCategory from '../../Admin/Category/AddSubCategory';
import DeleteCategory from '../../Admin/Category/DeleteCategory';
import DeleteSubCategory from '../../Admin/Category/DeleteSubCategory';
import ScrollDialog from '../../dialog';

const useStyles = makeStyles((theme) => ({
  mainMenuContainer: {
    display: "flex",
    flexFlow: "column wrap",
    maxHeight: 500,
    overflow: "auto"
  },
  mainMenuItem: {
    fontSize: '1rem',
    paddingTop: 1,
    paddingBottom: 1,
  },
  subMenuItem: {
    fontSize: '0.2rem',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: theme.spacing(3),
  },
  addCategoryButton: {
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: theme.spacing(3),
  },
  closeMenuButton: {
    alignSelf: "flex-start",
    margin: theme.spacing(2),
  }
}));

const DrawerMenu = ({ categories, isAuthenticated }) => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const dispatch = useDispatch();
  const history = useNavigate();
  const players = useSelector((state) => state.players.players);

  const filterCategories = useCallback((categories) => {
    const filteredCategories = categories.map(category => {
        // Filtrera subkategori baserat på matchande spelare
        const subMenusWithPlayers = category.subMenu.filter(subMenu => {
            return players.some(player => {
                // Kontrollera om spelaren har huvudkategori och subkategori som matchar
                return player.category.some(cat => cat.main === category.mainMenu && cat.sub === subMenu);
            });
        });

        return {
            ...category,
            subMenu: subMenusWithPlayers
        };
      }).filter(category => category.subMenu.length > 0);

      return filteredCategories;
    }, [players]);

    useEffect(() => {
      setMenu(isAuthenticated ? categories : filterCategories(categories));
    }, [categories, filterCategories, isAuthenticated]);

  useEffect(() => {
  }, [players]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const listPlayer = (e, mainMenu, sub) => {
    e.preventDefault();
    const categories = [mainMenu, sub];

    // Hitta spelare som matchar huvudkategori och subkategori
    const selectedPlayer = players.find(player =>
        player.category.some(cat => cat.main === mainMenu && cat.sub === sub)
    );

    if (!selectedPlayer) {
        dispatch(getPlayers({ name: categories.join(',') }));
    }

    history(`/players/search?searchQuery=${categories.join(',')}`, { redirect: true });
    handleDrawerClose();
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerOpen}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="top" open={isDrawerOpen} onClose={handleDrawerClose}>
        {/* Knapp för att stänga menyn */}
        <IconButton className={classes.closeMenuButton} onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
        {/* Knapp för att lägga till en ny kategori */}
        {isAuthenticated && (
            <ListItem className={classes.addCategoryButton}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleOpenDialog(<AddCategory handleCloseDialog={handleCloseDialog} />)}
            >
              Add new category
            </Button>
          </ListItem>
          )}
        <div className={classes.mainMenuContainer}>
          {menu.map((category) => {
            const { _id, mainMenu, subMenu } = category;

            if (!_id || !mainMenu || !subMenu) {
              return null;
            }

            return (
              <div key={_id}>
                <ListItem className={classes.mainMenuItem}>
                  <ListItemText primary={mainMenu} />
                  {isAuthenticated && (
                    <div>
                      <IconButton className={classes.iconButton} onClick={() => handleOpenDialog(<AddSubCategory mainCategory={mainMenu} handleCloseDialog={handleCloseDialog} />)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton className={classes.iconButton} onClick={() => handleOpenDialog(<DeleteCategory category={mainMenu} id={_id} handleCloseDialog={handleCloseDialog} />)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </ListItem>
                <List component="div" disablePadding>
                  {subMenu.map((subItem, index) => {
                    const subItemId = subItem ? subItem._id : '';
                    const subItemText = subItem || '';

                    return (
                      <ListItem
                        key={`${subItemId}-${index}`}
                        button
                        onClick={(e) => {
                          listPlayer(e, mainMenu, subItem);
                        }}
                        className={classes.subMenuItem}
                      >
                        <ListItemText primary={subItemText} />
                        {isAuthenticated && (
                          <div>
                            <IconButton className={classes.iconButton} onClick={() => handleOpenDialog(<DeleteSubCategory mainCategory={_id} subCategory={subItem} handleCloseDialog={handleCloseDialog} />)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        )}
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            );
          })}
        </div>
      </Drawer>
      <ScrollDialog open={openDialog} onClose={handleCloseDialog}>
        {dialogContent}
      </ScrollDialog>
    </div>
  );
};

export default DrawerMenu;