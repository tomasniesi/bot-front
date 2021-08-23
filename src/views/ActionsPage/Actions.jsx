import React, { useContext } from 'react';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";

import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";
import { BinanceContext } from 'context';

const useStyles = makeStyles(styles);

const Actions = () => {
    const classes = useStyles();
    const { botConfig } = useContext(BinanceContext);

    return (
    <GridContainer>
        
    </GridContainer>
    );
}

export default Actions;