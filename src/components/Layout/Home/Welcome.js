// Welcome.js
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import Soccer3 from '../../../images/soccer3.png';

const Welcome = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.outerContainer}>
      {/* Vänster sida */}
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {/* Bild */}
            <div className={classes.imageContainer}>
              <img
                className={classes.image}
                src={Soccer3}
                alt="Bild"
              />
            </div>
          </Grid>
        </Grid>
      </Grid>

      {/* Höger sida */}
      <Grid item xs={12} sm={12} md={6} lg={6}>
        {/* Textsektion */}
        <div className={classes.textContainer}>
          <Typography variant="h4" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
          </Typography>
          <div className={classes.buttonContainer}>
            <Button variant="outlined" color="primary" className={classes.readMoreButton}>
              Read more
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Welcome;