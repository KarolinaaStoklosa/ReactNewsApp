import { useContext, useState } from 'react';
import { ArticleProps } from '../../helpers/interfaces';
import { Card, ListItem, ListItemText } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { authContext } from '../../helpers/authContext';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, firestore } from '../../helpers/firebaseConfig';

const Article: React.FC<ArticleProps> = ({ art }: ArticleProps) => {
	const loggedIn = useContext(authContext);
	const [liked, setLiked] = useState(false);

	const iconStyle = {
		float: 'right',
		mr: '3px',
		my: '3px',
		color: liked ? 'red' : 'black',
	};

	const likeTheArticle = void (async () => {
		if (loggedIn && auth.currentUser) {
			await setDoc(doc(firestore, auth.currentUser.uid, art.title), art);
			setLiked(true);
		}
	})();
	const unlikeTheArticle = void (async () => {
		if (loggedIn && auth.currentUser) {
			await deleteDoc(doc(firestore, auth.currentUser.uid, art.title));
			setLiked(false);
		}
	})();
	return (
		<ListItem>
			<Card
				variant="outlined"
				sx={{ mb: '10px', display: 'block', mx: 'auto', width: '80%' }}
			>
				<a
					href={art.url}
					target="_blank"
					style={{ textDecoration: 'none' }}
					rel="noreferrer"
				>
					<img src={art.urlToImage} alt={art.title} style={{ width: '100%' }} />
					<ListItemText sx={{ color: 'black' }}> {art.title}</ListItemText>
				</a>

				{loggedIn && (
					<>
						{liked ? (
							<FavoriteIcon onClick={unlikeTheArticle} sx={iconStyle} />
						) : (
							<FavoriteBorderIcon onClick={likeTheArticle} sx={iconStyle} />
						)}
					</>
				)}
			</Card>
		</ListItem>
	);
};

export default Article;
