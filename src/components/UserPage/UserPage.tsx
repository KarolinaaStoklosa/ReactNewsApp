import { useState, useContext } from 'react';
import { Typography, Button } from '@mui/material';
import { auth, firestore } from '../../helpers/firebaseConfig';
import { ArticleObj } from '../../helpers/interfaces';
import { signOut } from 'firebase/auth';
import ProfilePhotoForm from '../ProfilePhotoForm/ProfilePhotoForm';
import { authContext } from '../../helpers/authContext';
import { onSnapshot, collection } from 'firebase/firestore';

import Article from '../Article/Article';

const UserPage = () => {
	const loggedIn = useContext(authContext);
	const [likedArticles, setLikedArticles] = useState<ArticleObj[] | []>([]);

	if (loggedIn && auth.currentUser) {
		onSnapshot(collection(firestore, auth.currentUser.uid), (querySnapshot) => {
			const articles: ArticleObj[] = [];
			querySnapshot.forEach((doc) => articles.push(doc.data() as ArticleObj));
			setLikedArticles(articles);
		});
	}

	return (
		<>
			{loggedIn && auth.currentUser && (
				<>
					<Typography
						variant="h2"
						align="center"
						sx={{
							fontSize: '2rem',
							borderBottom: '1px solid #5d85c9',
							my: '1rem',
							pb: '.5rem',
						}}
					>
						Your profile
					</Typography>

					<Typography
						variant="h5"
						align="center"
						sx={{ fontSize: '1rem', my: '1rem', mx: 'auto' }}
					>
						Your email: {auth.currentUser.email}{' '}
					</Typography>

					<ProfilePhotoForm />

					<Button
						onClick={() => signOut(auth)}
						variant="outlined"
						sx={{ display: 'block', mx: 'auto', my: '1rem' }}
					>
						Log out
					</Button>

					<Typography
						variant="h3"
						align="center"
						sx={{
							fontSize: '1.7rem',
							fontWeight: 100,
							borderTop: '1px solid #5d85c9',
							pt: '2rem',
						}}
					>
						Liked posts
					</Typography>
					{likedArticles.map((article: ArticleObj) => {
						return <Article art={article} key={article.title} />;
					})}
				</>
			)}
		</>
	);
};

export default UserPage;
