import React from 'react'
import { Button, Card, Typography } from '@mui/material';
import { useForm } from 'react-hook-form'
import { ProfilePhotoFormData } from '../../helpers/interfaces';
import { auth, storage } from "../../helpers/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage"

const ProfilePhotoForm = () => {

    const {register, handleSubmit} = useForm<ProfilePhotoFormData>();
    const submitHandler =(data: ProfilePhotoFormData) => {
        const photoFile = data.profilePhoto[0];
        console.log(photoFile);
        
        if (auth.currentUser){
            const storageRef = ref(storage, `/users/${auth.currentUser.uid}/images`);
            uploadBytes(storageRef, photoFile)
            .then(() => console.log('Uploaded a file!'))
            .catch((err) => console.error(err.message));
        }
    }

    return (
        <form
            style = {{display:"flex", flexDirection:"column", marginTop:".5rem"}}
            onSubmit = {handleSubmit(submitHandler)}>
            <Card sx={{p:"1rem", display:"block",mx:"auto"}}>
                <Typography
                    variant="h6" align="center"
                    sx={{fontSize:"1rem"}}
                >Upload your profile picture</Typography>
                <Button 
                    variant="contained" 
                    component = "label"
                    sx={{display:"block", mx:"auto", my:"1rem", alignContent:"center"}}>
                    <Typography 
                        variant="h6" sx={{fontSize:"1rem" }} align="center"
                    >Select a file</Typography>
                    <input 
                        hidden type="file"
                        {...register("profilePhoto",{required:true})}
                    />
                </Button>
                <Button
                    variant="contained" sx={{display:"block", mx:"auto"}}
                    type="submit" 
                >Upload</Button>
            </Card>
        </form>
    )
}

export default ProfilePhotoForm

// 1. import i wywołanie useForm (LoginForm/RegisterForm)
// 2. <form> skonfigurowant tak jak w innych przypadkach użycia useForm
// W środku form: 
// 3. Card(mui) padding 1rem
// W środku Card: 
// 4. Typography variant h6, fontSize 1rem, align center, textContent Upload your profile picture
// 5. Button (MUI) variant contained, display block, mx auto, my 1rem, alignContent center
// W środku buttona: 
// 6. Typography variant h6, fontSize 1rem, align center, textContent Select a file
// 7. Obok: input (zwykły html), hidden <input hidden/> zarejestruj go przy użyciu useForm pod nazwą profilePhoto
// koniec buttona
// 8. Button (MuI) variant contained, display block, mx auto, type submit, tC Upload
// koniec Card
//koniec Form
// 9. Stwórz funkcję submitHandler w której będzie console.log(data)
// Pamiętaj o stworzeniu interface! profilePhoto type:FileList

// W sumbitHandler:
// Wejdź w konsole firebase i włącz storage, pamętaj żeby w rules zmienić false na true
// 2. Wyciągnij zdjęcie z fileListy (przez index i zapisz do zmiennej)
// 3. Jeżeli użytkownik istnieje (auth.currentUser) upload zdjęcia do Storage https://firebase.google.com/docs/storage/web/upload-files, stwórz inną referencję niż w docs, sam storage będzie miał więcej niż 1 poziom zagnieżdżenia, będzie więcej niż 1 slash w refie
// 4. Na funkcję wrzucającą pliki do storage, podepnij then i cach
