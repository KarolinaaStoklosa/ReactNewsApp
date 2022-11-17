import { useContext, useState } from 'react';
import { ArticleProps } from '../../helpers/interfaces'
import { Card, ListItem, ListItemText} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { authContext } from '../../helpers/authContext';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, firestore } from '../../helpers/firebaseConfig';

// 2 propsy
const Article: React.FC<ArticleProps> = ({art}) => {
    const loggedIn = useContext(authContext);
    const [liked, setLiked] = useState(false);

    const iconStyle = {
        float: "right",
        mr: "3px",
        my: "3px",
        color: liked? "red" : "black",
    }

    const likeTheArticle = async () => {
        if (loggedIn && auth.currentUser) {
            await setDoc( doc (firestore, auth.currentUser.uid, art.title), art )
            setLiked(true)
        }
    }
    const unlikeTheArticle = async () => {
        if (loggedIn && auth.currentUser) {
            await deleteDoc( doc (firestore, auth.currentUser.uid, art.title))
            setLiked(false)
        }
    }
    // variant: outlined - żeby była obwódka(kreska)
    return (
        <ListItem>
            <Card variant="outlined" sx={{mb: '10px', display:"block", mx:"auto", width:"80%"}}>
                <a 
                    href={art.url} 
                    target="_blank" 
                    style={{ textDecoration: "none"}}
                >
                    <img src ={art.urlToImage} alt={art.title} style={{width:"100%"}} />
                    <ListItemText sx={{color: "black"}}> {art.title}</ListItemText>
                </a>

                {loggedIn && 
                    <>
                        {liked ? <FavoriteIcon onClick={unlikeTheArticle}
                                sx={iconStyle}/> 
                                : <FavoriteBorderIcon onClick={likeTheArticle}
                                sx={iconStyle}/>
                        }
                    </>
                }   
                </Card> 
        </ListItem>
    )
}

export default Article;

//1. Stwórz obiekt ze stylami dla ikonek, w obiekcie zawrzyj float right, mr 3px, my 3px, color w zależności od stanu liked, jeżeli liked jest true, color:red, gdy false black
// const x = { y:a?'b':'c'}
// 2. Stwórz stan liked, wart. początkowa false, będzie przechowywać boolean
// 3. Ściągnij context loggedIn, 
// 4. Za <a> (l.20) stwóz renderowanie warunkowe, w zależności od stanu loggedIn
// 5. Prawą stroną operatora && z pkt4 będzie react fragment z kolejnym renderowaniem warunkowym, tym razem typu 2 (?:).
//  W tym rw sprawdzamy, czy stan liked jest true, jeśli tak to wyświetl ikonkę FavouriteIcon i nałóż na nią sx przy wykorzystaniu obiektu z p1,
// jeśli stan liked jest false to FavouriteBorderIcon i nałóż sx przy wykorzystaniu obiektu z p1
// 6. Przy kliknięciu na FavoriteBorderIcon ustaw stan liked na true, przy kliknięciu na FavoriteIcon ustaw stan liked na false
// 
// LIKEARTICLE
// 1. Sprawdź czy loggedIn i auth.currentUser true
// 2. W ifie: Wywołaj funkcję setDoc (z awaitem, funkcja z firestore), funkcja przyjmuje 2 argumenty, 1 arg to wywołanie funkcji doc (firebase/firestore). Funkcja doc przyjmuje 3 argumenty: obiekt referencyjny do firestora (firebaseconfig.ts), nazwę kolekcji (uid aktualnie zalogowanego użytkownika) oraz tytuł dokumentu (tytuł artykułu)
// 3. Po wywołaniu setDoc, w nowej linii ustaw stan liked na false 
// UNLIKEARTICLE
// jw, w ifie wywołaj funkcję deleteDoc , po wywołanoi deleteDoc ustaw liked na true


// 3.