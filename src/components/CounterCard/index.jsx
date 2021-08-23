import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

const CounterCard = ({ title, value, icon, color }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader color={color} stats icon>
                <CardIcon color={color}>
                <Icon>{icon}</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>{title}</p>
                <h3 className={classes.cardTitle}><small>{ value }</small></h3>
            </CardHeader>
        </Card>
    );
}

export default CounterCard;