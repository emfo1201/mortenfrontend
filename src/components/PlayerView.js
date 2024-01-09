import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'

import Box from "@material-ui/core/Box";

function PlayerView(props) {

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                   <PlayerView />
                </Grid>
            </Grid>
        </Box>
    )
}

export default PlayerView