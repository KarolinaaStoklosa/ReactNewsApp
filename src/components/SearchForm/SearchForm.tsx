import { TextField, Button } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form'
import { SearchFormProps, SearchFormData } from '../../helpers/interfaces';

const SearchForm:React.FC<SearchFormProps> = ({setKeyword}) => {
    const {register, handleSubmit} = useForm<SearchFormData> ()
    const submitHandler = (data:SearchFormData) => {
        setKeyword(data.keyword)
    };

    return (
        <>
        <form 
            onSubmit={handleSubmit(submitHandler)}
            style={{display:"flex", flexDirection:"column"}}
        >
            <TextField placeholder="Keyword" 
                {...register("keyword",{required:true})}
                sx={{my:".5rem", display:'block', mx:"auto"}}
            />
            <Button
                variant="contained"
                type ="submit"
                sx={{display:"block", mx:"auto"}}
            >Search</Button>

        </form>
        </>
        
    )
}

export default SearchForm