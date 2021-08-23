import React, { useState, useEffect } from 'react';

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
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';

import Snackbar from "components/Snackbar/Snackbar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

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
    steps: {
        margin: '3em',
    },
    wizardButtons: {
        textAlign: 'right',
        display: 'block'
    },
    ...styles
}));

const FarmConfigurationWizard = ({  }) => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    function getSteps() {
        return ['Orden inicial', 'Configuración de Granja', 'Confirmación'];
    }
    
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <Step1 />;
            case 1:
                return <Step2 />;
            case 2:
                return <Step3 />;
            default:
            return 'Unknown stepIndex';
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <div className={classes.steps}>
                {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>All steps completed</Typography>
                    <Button onClick={handleReset}>Cancelar</Button>
                </div>
                ) : (
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div className={classes.wizardButtons}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            color='primary'>
                            Anterior
                        </Button>
                        <Button variant="contained" color="info" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Button>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default FarmConfigurationWizard;