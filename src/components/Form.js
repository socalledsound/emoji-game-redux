import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
// import { addUser } from '../redux/users/users.slice';
// import { connectToTwilio } from '../redux/twilio/twilio.middleware';
// import { submitForm } from './FormSlice';
import { checkAnswer } from '../Game';
// import { create_UUID } from '../utils';
import {
    Grid,
    TextField,
    Button,
  } from "@material-ui/core";
// import { connectToTwilio } from '../redux/twilio/twilio.middleware';



  const styles = {
    header: {},
    grid: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    card: { padding: 40 },
    textField: { width: 400 },
    gridItem: { paddingTop: 12, paddingBottom: 12 },
    button: { width: 300, marginBottom : '40px'},
    icon : { fontSize: 120, marginLeft: 20}
  };


const Form = () => {
    const dispatch = useDispatch();
    const useForm = (initialState = {}, onSubmit) => {
    const [formData, setFormData] = useState(initialState);
      
    const handleInputChange = (e) => {      
            
        setFormData({ 
                ...formData, 
                [e.target.name]: e.target.value, 
            })
        }
      
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formData);
            onSubmit?.(formData);
        }
      
        return { formData, handleInputChange, handleSubmit };
    }
    
    
    
    const { formData, handleInputChange, handleSubmit } = useForm(
        {
            guess: " ",
        },
        (formData) => dispatch(checkAnswer(formData))
    );
    
    const { guess } = formData;

    return ( 
        <Grid item style={styles.container}>
            <form onSubmit={handleSubmit}>
            
                <Grid>
                    <TextField
                        name="guess"
                        required
                        style={styles.textField}
                        label="(two words, all lowercase letters)"
                        variant="outlined"
                        type="text"
                        value={guess}
                        onChange={handleInputChange}
                    />
        
                </Grid>

                <Grid item style={styles.gridItem}>

                    <Button
                        color="primary"
                        variant="contained"
                        style={styles.button}
                        type="submit"
                    >
                   submit response
                    </Button>
    
                </Grid>
            </form>
        </Grid>

     );
}
 
export default Form

