import React from 'react';
import { useDispatch } from 'react-redux';
import { newQuestion, guessAgain } from '../Game';
import {
    Grid,
    Button,
    Typography,
  } from "@material-ui/core";

const styles = {
    gridItem: { paddingTop: 12, paddingBottom: 12 },
    button: { width: 300, marginBottom : '40px'},  
  };

const Answer = ({response, isCorrect, gameOver, currentAnswer, remainingGuesses}) => {

    const dispatch = useDispatch();
    return ( 
        <Grid item style={styles.gridItem}>
            
            {remainingGuesses > 0 ?
                isCorrect ? 
                    <Grid>
                        <Typography >{response}</Typography>
                        <Button
                        color="primary"
                        variant="contained"
                        style={styles.button}
                        onClick={() => dispatch(newQuestion())}
                        >
                          try another one?
                        </Button>
                    </Grid>  
                  : 
                    <Grid>
                        <Typography >{response}</Typography>
                        <Button
                        color="primary"
                        variant="contained"
                        style={styles.button}
                        onClick={() => dispatch(guessAgain())}
                        >
                          Guess Again?  
                        </Button>
                    </Grid>  
 
            :

              <Grid>
                <Typography >Whoopsie Daisie, you ran out of guesses.  The answer was {currentAnswer}.  Try Another One?</Typography>
                <Button
                color="primary"
                variant="contained"
                style={styles.button}
                onClick={() => dispatch(newQuestion())}
                >
                  try another one
                </Button>
              </Grid>  
            }


    </Grid>
     );
}
 
export default Answer;