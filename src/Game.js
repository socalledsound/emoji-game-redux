export const GameActionTypes = {
    INIT_GAME : 'INIT_GAME',
    CHECK_ANSWER : 'CHECK_ANSWER',
    GAME_OVER : 'GAME_OVER',
    SET_ASKING : 'SET_ASKING',
    NEW_QUESTION : 'NEW_QUESTION',
    GUESS_AGAIN : 'GUESS_AGAIN',
}

export const initGame = () => {
    return {
        type: GameActionTypes.INIT_GAME,
    }
}

export const newQuestion = () => {
    return {
        type: GameActionTypes.NEW_QUESTION,
    }
}

export const guessAgain = () => {
    return {
        type: GameActionTypes.GUESS_AGAIN,
    }
}

export const setAsking = () => {
    return {
        type: GameActionTypes.SET_ASKING,
    }
}

export const checkAnswer = (formData) => {
    console.log(formData);
    return {
        type : GameActionTypes.CHECK_ANSWER,
        payload : {
            formData,
        }
    }
}

const INITIAL_GAME_STATE = {
    totalGuesses : 3,
    remainingGuesses : 3,
    started : false,
    gameOver: false,
    glyphs: [" 👸 🐝",'⭐ 🐠', '🌽 🐶', '🌊 🐴',  '🍯 &#129383'],
    answers: [' queen bee', ' star fish', ' corn dog', ' sea horse', ' honey pie', ],
    gameCount : 0,
    correctAnswers : 0,
    glyph : null,
    answer: null,
    asking: true,
    response : '',
    isCorrect : false,
}


export const gameReducer = (state=INITIAL_GAME_STATE, action) => {
    switch(action.type){

        case GameActionTypes.INIT_GAME :

            return {
                ...state,
                started : true,
                gameCount : 0,
                gameOver: false,
                asking: true,
                currentGlyph : state.glyphs[0],
                currentAnswer : state.answers[0],
                remainingGuesses : state.totalGuesses,
                isCorrect : false,
            }

        case GameActionTypes.NEW_QUESTION :
                let newGameCount, gameOver, newAsking;
                if(state.gameCount < state.glyphs.length -1){
                         newGameCount = state.gameCount + 1;
                         gameOver = false;
                         newAsking = true;
                } else {
                    newGameCount = 0;
                    gameOver = true;
                    newAsking = false;
                }

                return {
                    ...state,
                    gameOver : gameOver,
                    asking: newAsking,
                    gameCount : newGameCount,
                    currentGlyph : state.glyphs[newGameCount],
                    currentAnswer : state.answers[newGameCount],
                    remainingGuesses : state.totalGuesses,
                    isCorrect : false,
                }    

        case GameActionTypes.CHECK_ANSWER :
            // console.log(action.payload.formData.guess, state.currentAnswer);
            let wasCorrect, newRemainingGuesses, generatedResponse, updatedCorrectedAnswers;
            if(action.payload.formData.guess === state.currentAnswer){
                wasCorrect = true; 
                updatedCorrectedAnswers = state.correctAnswers + 1;
                newRemainingGuesses = state.totalGuesses;
                generatedResponse = 'correct!'; 
            } else {
                wasCorrect = false; 
                updatedCorrectedAnswers = state.correctAnswers;
                newRemainingGuesses = state.remainingGuesses - 1;
                generatedResponse = `sorry, that wasn't it!  you have ${newRemainingGuesses} guesses left.`;          
            }

            return {
                ...state,
                asking: false,
                correctAnswers: updatedCorrectedAnswers,
                isCorrect: wasCorrect,
                response : generatedResponse,
                remainingGuesses : newRemainingGuesses,
            
            }

        case GameActionTypes.GUESS_AGAIN :
            return {
                ...state,
                asking: true,
            }    

        case GameActionTypes.GAME_OVER :
            return {
                ...state,
                gameOver: true,
            }

        case GameActionTypes.SET_ASKING :
            return {
                ...state,
                asking : true,
            }    

        default : 
            return {
                ...state
            }
    }
}