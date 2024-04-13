import React from 'react'
import Grid from '@mui/material/Grid'

import Menu from '../Menu'
import Header from './Header'
import Footer from './Footer'


const Main = ({ children }) => (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Grid item xs={12} component={'div'}>
                <Header/>
            </Grid>
            <Grid container component={'div'} style={{justifyContent: 'center', marginTop: 30, marginBottom: 30}}>
                <Grid item xs={11} component={'div'}>
                    {children}
                </Grid>
            </Grid>
            <Grid item xs={12} style={{marginTop: 'auto', maxHeight: 30}} component={'div'}>
                <Footer/>
            </Grid>
        </div>
    )

export default Main