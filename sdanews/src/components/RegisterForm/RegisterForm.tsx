import React from 'react';
import { Card, Typography, TextField, Button } from "@mui/material";
import {auth} from '../../helpers/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { RegisterFormData } from '../../helpers/interfaces';

// Card - białe pole z obwódką
// TextField - input tekstowy


const RegisterForm = () => {
    const {register, handleSubmit} = useForm<RegisterFormData>();
    //handleSubmit zbiera wartości wszystkich zarejestrowanych inputów w momencie submitu formularza i zlepia te wartości w 1 obiekt (data), po czym wywołuje submitHandler i przekazuje tam jako argument obiekt data
    //data to obiekt który zawiera pary klucz:wartość (nazwaRejstracyjnaInputu:wartośćInputuPrzySubmicie)
    // submit ->handleSubmit() zbiera wartości i tworzy obiekt data=>submitHandler
    // lub z destrukturyzacją: 
    //const submitHandler = ({email, password, password2}:RegisterFormData) =>{}
    const submitHandler = (data:RegisterFormData) => {
        if(data.password===data.password2) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then (() => console.log("Successfully registered"))
            .catch((err) => console.log(err.message));
        } else {
            alert ("Passwords are different!");
        }
    };

    // const data = {
    //     email: abc@abc.pl
    // }


    return (
        <Card sx={{mt: "1rem", display:"block", mx:"auto", p:".5rem", width:"90%"}}>
        <form 
            style={{display:"flex", flexDirection:"column", marginTop:".5rem"}}
            onSubmit = {handleSubmit(submitHandler)}
        >
            <Typography align="center" variant="h2" sx={{fontSize:"1.5rem"}}>Register new account</Typography>
                <TextField 
                    type="email" placeholder="email" 
                    sx={{display:"block", my:".5rem", mx:"auto"}} 
                    {...register("email", {required:true})}
                />
                <TextField
                    type="password" placeholder="password"
                    sx={{display:"block", my:".5rem", mx:"auto"}} 
                    {...register("password",{required:true})}
                />
                <TextField
                    type="password" placeholder="repeat password"
                    sx={{display:"block", my:".5rem", mx:"auto"}} 
                    {...register("password2",{required:true})}
                />
                <Button
                    variant="contained" type="submit" 
                    sx={{display:"block", mx:"auto"}}
                >Register</Button>
        </form>
        </Card>
    )
}

export default RegisterForm

// 1. Głównym elementem rodzicem wszystkich innych będzie zwykły htmlowy <form>, atrybutem style nadaj mu display:flex, flexDirection:column
// W formularzu:
// 2. <Typography>, propy: align: center, variant: h2, w sx'ach fontSize 1.5rem
// 3. <TextField>, type email placeholder email, w sx: display: block, my: .5rem, mx: auto(wyśrodkowanie)
// 4.  <TextField>, type password placeholder password, w sx: display: block, my: .5rem, mx: auto(wyśrodkowanie)
// 5. <TextField>, type password placeholder password, w sx: display: block, my: .5rem, mx: auto(wyśrodkowanie)
// 6. <Button>, variant contained, type submit, w sx'ach display: block, mx: auto, textContent Register

//zad2 
// 1. Zarejestreować resztę inputów; nazwy rejestr: password i password2
// 2. Zaktualizuj odpowiednio interface RegisterFormData
// W submitHandler: 
// 3. Sprawdź czy password===password2 (if)
// 4. Jeżeli true, wywołaj funkcje createUserWithEmailAndPassword z odpowiednimi argumentami
// 5. Na funkcję create... dodaj thena w którym wykonaj console.log("Succsesfully register") i catch z console.log(err.message)