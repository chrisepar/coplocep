import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import moment from 'moment';

//Apps
import Layout from "app/core/layout/layout.js";
import MemberDetails from "app/membership/member_detail_view.js";

// Loan list for member
import LoanView from "app/transaction/components/loan/loan_view.js";
import DepositView from "app/transaction/components/deposit/deposit_view.js";

// Styles
import useStyles from 'app/membership/styles/_memberDetailsView.js';

function MemberDetailsContainer(props) {
    const { classes } = useStyles();
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
    console.log("Load Loan List for Member")
    const { classes } = useStyles();
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
                <LoanView />
            </AccordionDetails>
        </Accordion>
    );
};

function DepositDetailsContainer(props) {
    const { classes } = useStyles();
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
                <DepositView />
            </AccordionDetails>
        </Accordion>
    );
};

function TransactionDetailViewContainer(props) {
    const { classes } = useStyles();
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
                    <DepositDetailsContainer {...props} />
                </Grid>
            </Grid>
        </Layout>
    );
};
//Note: Loan_view.js > loan_table.js > loan_details.js
export default TransactionDetailViewContainer;