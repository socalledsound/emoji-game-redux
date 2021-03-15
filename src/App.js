import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initGame } from './Game';
import {
    Grid,
    Card,
    Typography,
  } from "@material-ui/core";
import Question from './components/Question';
import Form from './components/Form';
import Answer from './components/Answer';

const styles = {
    appContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    mainCard: { padding: 40 },
  };
  

const App = () => {

    const game = useSelector(state => state.game);
    const { currentGlyph, response, asking, gameOver, isCorrect, currentAnswer, remainingGuesses, correctAnswers, glyphs } = game;
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(game);
        if(!game.started){
            dispatch(initGame());
        }    
    })

    return ( 

        <Grid
        style={styles.appContainer}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
            <Card style={styles.mainCard} elevation={10}>
                <Typography>Score : {correctAnswers}</Typography>
                {  
                    gameOver ? 
                        <Grid>
                            <Typography>
                                    Thanks for playing!  You got {correctAnswers} out of {glyphs.length}!
                            </Typography>
                        </Grid>
                    :
                    asking ? 
                    <Grid>
                        <Question 
                            glyph={currentGlyph}
                        />
                        <Form />
                    </Grid>
 
                    :

                    <Grid>
                        <Answer 
                            response={response} 
                            isCorrect={isCorrect} 
                            gameOver={gameOver} 
                            currentAnswer={currentAnswer} 
                            remainingGuesses={remainingGuesses}/>
                    </Grid>

                }

               
            </Card>
        </Grid>
        );
}
 
export default App;