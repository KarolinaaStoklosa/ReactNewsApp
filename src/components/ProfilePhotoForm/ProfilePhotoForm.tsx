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