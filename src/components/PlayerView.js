import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'

import Players from './Players/Players'
import MenuUpper from './Menus/MenuUpper/MenuUpper'
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles/styled";
import Paper from "@material-ui/core/Paper";

function PlayerView(props) {

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <MenuUpper />
                </Grid>
                <Grid item xs={6}>
                   <PlayerView />
                </Grid>
            </Grid>
        </Box>
    )
}

export default PlayerView