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

// Import i wywołanie useForm
// 2. Stwórz pustą funkcję submitHandler
// JSX:
// 3. <form> (HTML) z onSubmit tak jak w innych, style display:flex, flexDirection:column
// W środku form
// 4. TextField placeholder Keyword, zarejestrować pod nazwą keyword, my '.5rem', display block, mx auto
// 5. Button variant contained, type submit, display block, mx auto, textContent Search

// 1. Stwórz nowy komponent SearchPage
// 2. W tym komp. stwórz stan keyword
// 3. Wyświetl w jsx komponent SearchForm, funkcję aktualizujacą stan keyword przekaż propsem do SearchForm
// 4. Stwórz interface dla SearchForm, otypuj submitHandler i useForm
// 5. Wywołaj funkcję aktualizującą stan keyword, do stanu keyword wysyłaj wartość "keyword" z SearchForma

