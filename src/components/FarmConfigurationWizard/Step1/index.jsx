import React, { useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    footer: {
      textAlign: 'right',
      display: 'block'
    },
    ...styles
}));

const Step1 = () => {
    const classes = useStyles();
    const [coinsToBuy, setCoinsToBuy] = useState(0);

    return (
        <Grid xs={12} sm={12} md={12}>
            <FormControl className={classes.formControl}>
                <TextField
                    id="coinsToBuy"
                    name="coinsToBuy"
                    type="number"
                    labelId="coinsToBuy"
                    value={coinsToBuy}
                    onChange={(event) => setCoinsToBuy(event.currentTarget.value)}
                    label="Cantidad"
                    placeholder="Cantidad"/>
            </FormControl>
        </Grid>
    );
}

export default Step1;