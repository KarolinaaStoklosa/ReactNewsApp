import axios from 'axios';
import {useState, useEffect} from 'react'
import SearchForm from '../SearchForm/SearchForm';
import { API_KEY } from '../../helpers/helpers';
import { List } from '@mui/material';
import Article from '../Article/Article';
import { ArticleObj } from '../../helpers/interfaces';

const SearchPage = () => {

    const [keyword, setKeyword] = useState('');
    // lub useState<string>('') -> generic type, zwykle 

    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        if (keyword){
            const today = new Date ();
            const month = today.getMonth();
            const day = today.getDay();
            const year = today.getFullYear();
            const startDate = `${year}-${month<10 ? `0${month}` : month}-${day}`;
            
            axios.get(`
            https://newsapi.org/v2/everything?q=${keyword}&from=${startDate}&language=en&sortBy=popularity&apiKey=${API_KEY}`
            )
            .then((response)=>
                setArticles(response.data.articles)
            )
            .catch((err) => console.log(err.message));
        }
    },[keyword]);


    return (
        <>
            <SearchForm setKeyword={setKeyword}/>
            <List sx={{width:'100%', bgcolor:'Background.paper', alignContent:"center"}}>
            {   articles.map((art:ArticleObj)=>{
                return <Article art={art} key={art.title}></Article>
            })}
            </List>
        </>
    )
}

export default SearchPage

// 1. Stwórz stan articles, wartość początkowa []
// 2. Wywołaj useEffect, ma reagować na zmianę stanu keyword
// 3. W useEffect:
// 3. Jeżeli keyword jest prawdziwy (istnieje, nie jest pusty) wywołaj axios get dla url'a: 
// https://newsapi.org/v2/everything?
// parametry: a) q, jest parametrem odpowiadającym za filtrowanie artykułow wg słowa kluczowego, q=jakasWartosc
//            b) from , parametr odpowiadający za datę, od której mają bć ściągane artykuły np from=2022-10-01, format yyyy-mm-dd
//            c) language, parametr odpowiadającym za jezyk pobieranych artykułów, language=en
//            d) sortBy, w zależności od wartości sortuje artykuły w odpowiedni sposób, np "popularity"
//            e) apiKey, podajemy klucz do api
// 4. Na axios get przypnij then, w then wrzuć zwrócone przez axios artykuły (UWAGA: lista artykułów jest zagnieżdżona na 2 poziomach w zwróconym obiekcie)
// 5. Na zmiennej stanowej (tak naprawdę liście) articles wywołaj metodę map,
// W map zwracaj komponent Article przekazując props artykuł po którym aktualnie iterujesz