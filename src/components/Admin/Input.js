import React from 'react'
import { TextField, Grid } from '@material-ui/core'

const Input = ({name, handleChange, label, autoFocus, type, half}) => (
    <Grid item xs={6} sm={12} component={'div'}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}

        />
    </Grid>
)
export default Input