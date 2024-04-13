import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { withStyles } from '@mui/material/styles'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor: "black",
    },
    h: {
        color: "white",
        flex: 'center'
    },
    row: {
    },
    colSm: {
        color: "white"
    },
    link: {
        color: '#FFF',
        textDecoration: 'none'
    }
}

function Footer ({classes}) {
    const {t} = useTranslation()
    return (
        <footer className={classes.root}>
            <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                xs={12}
            >
                <Grid item xs={10} component={'div'}>
                    <Box p={2}>
                    <Typography variant="h6" className={classes.h} component="h6">{t('welcome_message')}</Typography>
                    </Box>
                    <hr/>
                </Grid>
            <div className={classes.row}>
                <Typography variant="body2" component="h2" className={classes.colSm}>
                    &copy;{new Date().getFullYear()} RISSLA.COM | All rights reserved | Terms Of Service | Privacy | <Link to="../Admin" className={classes.link} >Admin</Link>
                </Typography>
            </div>
            </Grid>
        </footer>
    )

}

export default withStyles(styles) (Footer)