import React, { useContext } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import FarmConfigurationWizard from "components/FarmConfigurationWizard";

import MaterialTable from "material-table";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { BotContext } from 'context';

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

const FarmConfiguration = () => {
    const classes = useStyles();

    const { botConfig, updateBotConfig, coinsNames } = useContext(BotContext);

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <FarmConfigurationWizard />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader>
                        <h4 className={classes.cardTitle}>Granjas Activas</h4>
                    </CardHeader>
                    <CardBody>
                        <MaterialTable
                            columns={[
                                { title: "Simbolo", field: "symbol", type: "string" },
                                { title: "Porcentaje", field: "percentage", type: "numeric" },
                                { title: "Comision", field: "commission", type: "numeric" },
                                { title: "Reinvertir", field: "automaticReinvestment", type: "boolean", 
                                render: rowData =>
                                    <Checkbox
                                        checked={rowData.automaticReinvestment}
                                        onChange={(event) => {
                                            console.log(event)
                                        }}
                                        inputProps={{ 'aria-label': 'info checkbox' }}
                                    /> 
                                }
                            ]}
                            data={botConfig}
                            options={{
                                exportButton: true
                            }}
                            title="" />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

export default FarmConfiguration;