import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import { API_KEY } from '../../helpers/helpers';
import { List } from '@mui/material';
import Article from '../Article/Article';
import { ArticleObj } from '../../helpers/interfaces';

const SearchPage = () => {
	const [keyword, setKeyword] = useState('');

	const [articles, setArticles] = useState([]);
	useEffect(() => {
		if (keyword) {
			const today = new Date();
			const month = today.getMonth();
			const day = today.getDay();
			const year = today.getFullYear();
			const startDate = `${year}-${month < 10 ? `0${month}` : month}-${day}`;

			axios
				.get(
					`
            https://newsapi.org/v2/everything?q=${keyword}&from=${startDate}&language=en&sortBy=popularity&apiKey=${API_KEY}`
				)
				.then((response) => setArticles(response.data.articles))
				.catch((err) => console.error(err.message));
		}
	}, [keyword]);

	return (
		<>
			<SearchForm setKeyword={setKeyword} />
			<List
				sx={{
					width: '100%',
					bgcolor: 'Background.paper',
					alignContent: 'center',
				}}
			>
				{articles.map((art: ArticleObj) => {
					return <Article art={art} key={art.title}></Article>;
				})}
			</List>
		</>
	);
};

export default SearchPage;
