import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LinkCard from './LinkCard';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Links = ({links}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={6}>
          {links.map((link, index) => 
          <Grid item xs={6} sm={4}>
            <LinkCard key={index} link={link}></LinkCard>
          </Grid>)}
        </Grid>
    </div> 
    );
}

export default Links;
