import {useState, useEffect} from 'react';
import {Typography, List} from "@mui/material";
import {API_KEY} from '../../helpers/helpers';
import axios from 'axios';
import Article from '../Article/Article';
import { ArticleObj } from '../../helpers/interfaces';

const HomePage = () => {
    // todays articles
    const [todaysArticles, setTodaysArticles] = useState([]);

    // tu ściągane są dane z api

    useEffect (()=>{
        const today = new Date();
        const day = today.getDate(); // getDay zwraca dzień tygodna(sobota), getToday => dzień miesiąca (22)
        const month = today.getMonth(); // getMonth() => numer miesiąca ale miesiące indeksowane są od 0
        const year = today.getFullYear();

        const date = `${year}-${month<9 ? `0${month+1}` : month+1}-${day-1}` //day-1 bo inna strefa czasowa 
        // potrzebujemy datę 2022-10-22

        // axios vs fetch, React Query

        axios.get(`
        https://newsapi.org/v2/everything?q=world&from=${date}&language=en&sortBy=popularity&apiKey=${API_KEY}`
        )
        .then((response)=> {
            setTodaysArticles(response.data.articles)
        })
        .catch((err) => console.error(err.message));

        // return () { }

    }, [])


    return (
        <>
            <Typography                       
                variant="h2"
                align= "center"              
                sx={{ my: ".8rem", fontSize: '2rem' }}
            >
            Today's hottest news:
          </Typography>
          <List sx={{width:'100%', alignContent:'center'}}>
            {todaysArticles.length !==0 && 
            todaysArticles.map((art:ArticleObj) => {
                return <Article art={art} key={art.title}/>
            })}

          </List>
        </>
    )
}


export default HomePage