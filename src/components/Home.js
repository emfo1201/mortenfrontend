import React from 'react'
import { useTranslation } from "react-i18next"
import image from "../images/footballStadium.jpg"
import CardMedia from "@mui/material/CardMedia"
import Card from "@mui/material/Card/Card"
import {makeStyles} from "@mui/styles"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 100,
        maxWidth: 900,
        displayFlex: 'center',
        marginBottom: 40,
        border: "none",
        boxShadow: "none",
        justifyContent: 'center'
    },
    media: {
        maxHeight: 700,
        minHeight: 200,
        paddingTop: '2%',
    },
}))

function Home () {
    const {t} = useTranslation()
    const classes = useStyles()
    return (
            <Grid container justifyContent="center">
                <Card className={classes.root} square>
                    <Typography variant="h5">{t('welcome_message')}</Typography>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={image}
                        title="Image"
                        alt="pic"
                    />
                </Card>
            </Grid>
    )

}

export default Home;