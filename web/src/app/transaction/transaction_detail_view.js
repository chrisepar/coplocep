import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import moment from 'moment';

//Apps
import Layout from "app/core/layout/layout.js";
import MemberDetails from "app/membership/member_detail_view.js";

import TransactionDetail from "app/transaction/transaction_detail.js";

// Styles
import useStyles from 'app/membership/styles/_memberDetailsView.js';

function MemberDetailsContainer(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.accordionHeading}>Personal Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <MemberDetails isModule={true} />
            </AccordionDetails>
        </Accordion>
    );
};

function LoanDetailsContainer(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);

    const handleChange = (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.accordionHeading}>Loans</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TransactionDetail category="Loan" categoryTitle="Loan" />
            </AccordionDetails>
        </Accordion>
    );
};

function InterestDetailsContainer(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);

    const handleChange = (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.accordionHeading}>Interests</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TransactionDetail category="Interest" categoryTitle="Interest" />
            </AccordionDetails>
        </Accordion>
    );
};

function DepositDetailsContainer(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);

    const handleChange = (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.accordionHeading}>Deposits</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TransactionDetail category="Deposit" categoryTitle="Deposit" />
            </AccordionDetails>
        </Accordion>
    );
};

function TransactionDetailViewContainer(props) {
    const classes = useStyles();
    return (
        <Layout appName={props.appName}>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <MemberDetailsContainer {...props} />
                </Grid>
                <Grid item xs={12}>
                    <LoanDetailsContainer  {...props} />
                </Grid>
                <Grid item xs={12}>
                    <InterestDetailsContainer {...props} />
                </Grid>
                <Grid item xs={12}>
                    <DepositDetailsContainer {...props} />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default TransactionDetailViewContainer;