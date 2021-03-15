import React from 'react';
import {
    Grid,
    Typography,
  } from "@material-ui/core";

const style = {
    container : {},
    glyph : {fontSize: 80}
}

const Question = ({glyph}) => {
    return ( 
        <Grid style={style.container}>
            <Typography style={style.glyph}>{glyph}</Typography>
        </Grid>
     );
}
 
export default Question;