import React, { useState, useEffect } from 'react';

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import AddAlert from "@material-ui/icons/AddAlert";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import Snackbar from "../../Snackbar/Snackbar.js";
import GridItem from "../../Grid/GridItem.js";
import Card from "../../Card/Card";
import CardHeader from "../../Card/CardHeader.js";
import CardBody from "../../Card/CardBody.js";
import CardFooter from "../../Card/CardFooter.js";

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

const Step2 = ({ coinsNames }) => {
    const classes = useStyles();
    const [percentage, setPercentage] = useState(0);
    const [commission, setCommission] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState();

    const [openAlert, setOpenAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [open, setOpen] = useState(false);

    const handleShowConfirmModal = () => {
        if(!percentage || percentage == 0){
          showAlert('danger', 'El Porcentaje es requerido.');
        }else if(!commission || commission == 0){
          showAlert('danger', 'La Comisión es requerido.');
        }else{
          setOpen(true);
        }
    };

    const showAlert = (color, message) => {
        setOpenAlert(true);
        setAlertColor(color);
        setMessageAlert(message);
        
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
    }

    return (
        <Grid xs={12} sm={12} md={12}>
            <FormControl className={classes.formControl}>
                <Autocomplete
                    id="name"
                    name="name"
                    value={selectedCoin}
                    onChange={(event, selectedCoin) => {
                    setSelectedCoin(selectedCoin);
                    }}
                    options={coinsNames}
                    getOptionLabel={(coin) => coin.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Coins" variant="outlined" />}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    id="percentage"
                    name="percentage"
                    type="number"
                    labelId="percentage"
                    value={percentage}
                    onChange={(event) => setPercentage(event.currentTarget.value)}
                    label="Porcentaje"
                    placeholder="Porcentaje"/>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    id="commission"
                    name="commission"
                    type="number"
                    labelId="commission"
                    value={commission}
                    onChange={(event) => setCommission(event.currentTarget.value)}
                    label="Comisión"
                    placeholder="Comision"/>
            </FormControl>
            <Snackbar
                place="tr"
                color={alertColor}
                icon={AddAlert}
                message={messageAlert}
                open={openAlert}
                close />
        </Grid>
    );
}

export default Step2;