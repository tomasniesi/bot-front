import React, { useState, useEffect, useContext } from 'react';

import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import MaterialTable from "material-table";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { BotContext } from 'context';
import useSound from 'use-sound';

import dbzPrologue from '../../assets/sounds/dbzprologue.mp3';

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

const JumpSimulator = () => {
  const classes = useStyles();
  const [ play, { stop } ] = useSound(dbzPrologue);
  const { jumpsSimulations, getJumpSimulation, coinsNames, fetching } = useContext(BotContext);
  const [selectedCoin, setSelectedCoin] = useState();
  const [percentage, setPercentage] = useState(0);
  const [investment, setInvestment] = useState(0);
  //const [sinceDate, setSinceDate] = useState();
  //const [endDate, setEndDate] = useState();

  useEffect(() => {
    if(fetching){
      document.getElementById("soundEffect").click();
    }else{
      stop();
    }
  }, [stop, fetching]);

  const handleConfirm = () => {
    if(percentage && investment){
      const coinName = selectedCoin ? selectedCoin.name : undefined;
      getJumpSimulation(percentage, investment, coinName);
    }
  }

  return (
    <GridContainer>
      <button id="soundEffect" type="button" style={{display: 'none'}} onClick={play}></button>
      {!fetching && <GridItem xs={12} sm={12} md={6} lg={12}>
          <Card>
              <CardHeader>
              <h4 className={classes.cardTitle}>Simulador de Saltos</h4>
              </CardHeader>
              <CardBody>
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
                        id="investment"
                        name="investment"
                        type="number"
                        labelId="investment"
                        value={investment}
                        onChange={(event) => setInvestment(event.currentTarget.value)}
                        label="Inversión"
                        placeholder="Inversión"/>
                </FormControl>

                  {/*<FormControl className={classes.formControl}>
                    <TextField
                      id="sinceDate"
                      label="Fecha desde"
                      value={sinceDate}
                      onChange={(event) => setSinceDate(event.currentTarget.value)}
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      id="endDate"
                      label="Fecha hasta"
                      value={endDate}
                      onChange={(event) => setEndDate(event.currentTarget.value)}
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    </FormControl>*/}
              </CardBody>
              <CardFooter className={classes.footer}>
                  <Button type="button" color="info" onClick={handleConfirm}>Actualizar</Button>
              </CardFooter>
          </Card>
      </GridItem>}

      {fetching && 
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <center>
          <h4><strong>Reuniendo información solicitada...<br/><small>(Este proceso es lento y puede demorar varios minutos)</small></strong></h4><br/>
          <img src="https://i.pinimg.com/originals/da/c9/51/dac951cdf125995d0860b4d89af8422f.gif"></img>
        </center>
      </GridItem>
      }
      {!fetching && 
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardHeader>
            <h4 className={classes.cardTitle}>Resultado de la Simulación</h4>
          </CardHeader>
          <CardBody>
            <MaterialTable
              columns={[
                { title: "Simbolo", field: "symbol" },
                { title: "Compras", field: "falls", type: "numeric" },
                { title: "Ventas", field: "rises", type: "numeric" },
                { title: "Cotizacion Inicial", field: "initialValue", type: "numeric" },
                { title: "Cotizacion Final", field: "finalValue", type: "numeric" },
                { title: "Porcentaje", field: "percentage", type: "numeric" },
                { title: "Ganacia Cotizacion", field: "cotizationGain", type: "numeric" },
                { title: "Ganacia Bot", field: "botGain", type: "numeric" },
                { title: "Ganancia absoluta", field: "absoluteGain", type: "numeric" },
              ]}
              data={jumpsSimulations}
              options={{
                exportButton: true
              }}
              title=""
            />
          </CardBody>
        </Card>
      </GridItem>
      }
  </GridContainer>
  );
}

export default JumpSimulator;