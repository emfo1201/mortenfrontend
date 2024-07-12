import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',
  },
  h: {
    color: 'white',
    flex: 'center',
  },
  row: {},
  colSm: {
    color: 'white',
  },
  link: {
    color: '#FFF',
    textDecoration: 'none',
  },
};

function Footer({ classes }) {
  const { t } = useTranslation();
  return (
    <footer className={classes.root}>
      <Grid item container direction="column" justifyContent="center" alignItems="center" xs={12}>
        <Grid item xs={10} component={'div'}>
          <Box p={2}>
            <Typography variant="h6" className={classes.h} component="h6">
              {t('welcome_message')}
            </Typography>
          </Box>
          <hr />
        </Grid>
        <div className={classes.row}>
          <Typography variant="body2" component="h2" className={classes.colSm}>
            &copy;{new Date().getFullYear()} <Link to="https://www.limestoneweb.se" className={classes.link}>
            LIMESTONEWEB.SE
            </Link> | All rights reserved | Terms Of Service | Privacy |{' '}
          </Typography>
        </div>
      </Grid>
    </footer>
  );
}

export default withStyles(styles)(Footer);