import React, { useState, useEffect, useContext } from 'react';

import moment from 'moment-timezone';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import AddAlert from "@material-ui/icons/AddAlert";

import Snackbar from "components/Snackbar/Snackbar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import MaterialTable from "material-table";


import { BinanceContext } from '../../context/';

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
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  
  const [symbol, setSymbol] = useState('select');
  const [side, setSide] = useState('select');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [messageAlert, setMessageAlert] = useState('');

  const { getMyTrades, myTrades, createNewOrder } = useContext(BinanceContext);

  const handleShowConfirmModal = () => {
    let message = {
      style: 'danger',
      text: ''
    };
    let error = false;
    if(symbol === 'select'){
      message.text = 'El Simbolo es requerido.';
      error = true;
    }else if(side === 'select'){
      message.text = 'El Tipo es requerido.';
    }else if(!quantity){
      message.text = 'La cantidad es requerida.';
    }else if(!price){
      message.text = 'El precio es requerido.';
    }
    if(!error){
      showAlert('danger', 'El precio es requerido.');
    }else{
      setOpen(true);
    }
  };

  const handleConfirm = () => {
    createNewOrder(symbol, side, quantity, price);
    setOpen(false);
    resetInputs();
    showAlert('info', 'Orden creada exitosamente.');
  }

  const onCancel = () => {
    resetInputs();
    setOpen(false);
  }

  const showAlert = (color, message) => {
    setOpenAlert(true);
    setAlertColor(color);
    setMessageAlert(message);
    
    setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
  }

  const resetInputs = () => {
    setSymbol('select');
    setSide('select');
    setQuantity(0);
    setPrice(0);
  }

  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader>
                <h4 className={classes.cardTitle}>Crear nueva Orden</h4>
              </CardHeader>
              <CardBody>
                <FormControl className={classes.formControl}>
                  <InputLabel id="lblSymbol">Simbolo</InputLabel>
                  <Select
                    id="symbol"
                    name="symbol"
                    labelId="symbol"
                    value={symbol}
                    onChange={(event) => setSymbol(event.target.value)}
                    required>
                    <MenuItem value="select">Seleccione</MenuItem>
                    <MenuItem value="BTCUSDT">BTCUSDT</MenuItem>
                    <MenuItem value="DENTUSDT">DENTUSDT</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="lblSide">Tipo</InputLabel>
                  <Select
                    id="side"
                    name="side"
                    labelId="side"
                    value={side}
                    onChange={(event) => setSide(event.target.value)}
                    required>
                    <MenuItem value="select">Seleccione</MenuItem>
                    <MenuItem value="SELL">SELL</MenuItem>
                    <MenuItem value="BUY">BUY</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="quantity"
                    name="quantity"
                    type="number"
                    labelId="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.currentTarget.value)}
                    label="Cantidad"
                    placeholder="Cantidad"/>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="price"
                    name="price"
                    labelId="price"
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.currentTarget.value)}
                    label="Precio"
                    placeholder="Precio"/>
                </FormControl>
              </CardBody>
              <CardFooter className={classes.footer}>
                <Button type="button" onClick={handleShowConfirmModal}color="info">Crear Orden</Button>
              </CardFooter>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitle}>Histórico de Ordenes</h4>
              <FormControl className={classes.formControl}>
                  <InputLabel id="lblSymbol">Simbolo</InputLabel>
                  <Select
                    id="symbol"
                    name="symbol"
                    labelId="symbol"
                    value={symbol}
                    onChange={(event) => getMyTrades(event.target.value)}
                    required>
                    <MenuItem value="select">Seleccione</MenuItem>
                    <MenuItem value="BTCUSDT">BTCUSDT</MenuItem>
                    <MenuItem value="DENTUSDT">DENTUSDT</MenuItem>
                    <MenuItem value="STORJUSDT">STORJUSDT</MenuItem>
                    <MenuItem value="LTCUPUSDT">LTCUPUSDT</MenuItem>
                    <MenuItem value="XLMUPUSDT">XLMUPUSDT</MenuItem>
                  </Select>
                </FormControl>
            </CardHeader>
            <CardBody>
            <MaterialTable
                columns={[
                    { title: "Simbolo", field: "symbol", type: "string", sortable: true },
                    { title: "Precio", field: "price", type: "numeric", sortable: true },
                    { title: "Cantidad", field: "qty", type: "numeric", sortable: true },
                    { title: "Comisión", field: "commission", type: "numeric", sortable: true },
                    { title: "Fecha", field: "time", type: "string", defaultSort: 'desc', sortable: true, render: rowData => moment(rowData.time).format('DD/MM/YYYY HH:mm') },
                    { title: "Operación", field: "isBuyer", type: "boolean", render: rowData =>  rowData.isBuyer ? 'COMPRA' : 'VENTA', },
                ]}
                data={myTrades}
                options={{
                    sorting: true,
                    exportButton: true
                }}
                title="" />
            </CardBody>
          </Card>
        </GridItem>
        <Dialog onClose={onCancel} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={onCancel}>
              Confirmar Orden
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                <div className={classes.root}>Símbolo: {symbol}</div>
                <div className={classes.root}>Tipo: {side}</div>
                <div className={classes.root}>Cantidad: {quantity}</div>
                <div className={classes.root}>Precio: {price}</div>
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button 
                autoFocus 
                onClick={handleConfirm} 
                color="info">Confirmar
              </Button>
              <Button 
                autoFocus 
                onClick={onCancel} 
                color="info">Cancelar</Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            place="tr"
            color={alertColor}
            icon={AddAlert}
            message={messageAlert}
            open={openAlert}
            close />
      </GridContainer>
  );
}

export default Dashboard;