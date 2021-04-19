import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LinkCard from './LinkCard';
import { getAllLinks } from '../api';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Links = ({links, setLinks}) => {

    const classes = useStyles();

    useEffect(() => {
        try {
            Promise.all([getAllLinks()]).then(([data]) => {
                setLinks(data);
                console.log(data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

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
