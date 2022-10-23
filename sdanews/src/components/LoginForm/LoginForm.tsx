import React from 'react';
import {Card, Typography, TextField, Button} from "@mui/material";
import {useForm} from "react-hook-form";
import { auth } from "../../helpers/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoginFormData } from '../../helpers/interfaces';


const LoginForm = () => {

    const {register, handleSubmit} = useForm<LoginFormData> ()
    const submitHandler = ({email,password}:LoginFormData) => {
        signInWithEmailAndPassword(auth,email,password)
        .then(() => console.log("Success"))
        .catch((err)=> console.error(err.message));
    }

    return (
    <Card>
        <form 
            style={{display: "flex", flexDirection:"column" }}
            onSubmit= {handleSubmit(submitHandler)} 
        >
            <Typography
                variant="h2" align="center"
                sx={{fontSize:"2rem", my:".5rem"}}
            >Log in</Typography>
            <TextField 
                variant="outlined" type="email" placeholder="email" 
                sx={{display:"block", my:".5rem", mx:"auto",}}
                {...register("email",{required:true})}
            />
            <TextField 
                variant="outlined" type="password" placeholder="password" 
                sx={{display:"block", my:".8rem", mx:"auto",}}
                {...register("password",{required:true})}
            />
            <Button 
                variant="contained" type="submit" 
                sx={{display:"block", mx:"auto", marginBottom:"1rem"}}
            >Log in</ Button>

        </form>

    </Card>
    )
}

export default LoginForm

//Napisz komponent LOGINFORM:
// 1. Wywołaj useForm i wyciągnij z niego odpowiedni funkcje
// 2. JSX: 
// a) wszystkie elementy będą obwinięte w <form> onSubmit ustawić aby działało z handleSubmit i submitHandlerem, w atrybucie style display: flex, flexDirection:column
//  w <form> 
// b) TextField variant outlined, type email, placeholder email, w sx: display:block, my 0.5rem, mx:auto, zarejestruj input pod nazwą email
// c) TextField variant outlined, type password, placeholder password, w sx: display:block, my 0.8rem, mx:auto, zarejestruj input pod nazwą password
// 3) Button type submit, variant contained, sx : display:block, mx:auto, margines dolny 1rem
// stwóz interface LoginFormData dla useForm i parametru submitHandler
// 4. Napisz funkcję submitHandler i wywołaj signInWIthEmailAndPassword z odpowiednimi argumentami
// 5. Na signIn dodaj then z console.log(Succsess! )