import { useState, useEffect } from 'react';
import { Typography, List } from '@mui/material';
import { API_KEY } from '../../helpers/helpers';
import axios from 'axios';
import Article from '../Article/Article';
import { ArticleObj } from '../../helpers/interfaces';

const HomePage = () => {
	const [todaysArticles, setTodaysArticles] = useState([]);
	useEffect(() => {
		const today = new Date();
		const day = today.getDate();
		const month = today.getMonth();
		const year = today.getFullYear();

		const date = `${year}-${month < 9 ? `0${month + 1}` : month + 1}-${
			day - 1
		}`;
		axios
			.get(
				`
        https://newsapi.org/v2/everything?q=world&from=${date}&language=en&sortBy=popularity&apiKey=${API_KEY}`
			)
			.then((response) => {
				setTodaysArticles(response.data.articles);
			})
			.catch((err) => console.error(err.message));
	}, []);

	return (
		<>
			<Typography
				variant="h2"
				align="center"
				sx={{ my: '.8rem', fontSize: '2rem' }}
			>
				Today's hottest news:
			</Typography>
			<List sx={{ width: '100%', alignContent: 'center' }}>
				{todaysArticles.length !== 0 &&
					todaysArticles.map((art: ArticleObj) => {
						return <Article art={art} key={art.title} />;
					})}
			</List>
		</>
	);
};

export default HomePage;
