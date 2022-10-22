import React from 'react';
import { ArticleProps } from '../../helpers/interfaces'
import { Card, ListItem, ListItemText} from "@mui/material";

// 2 propsy
const Article: React.FC<ArticleProps> = ({art}) => {

    // variant: outlined - żeby była obwódka(kreska)
    return (
        <ListItem>
            <Card variant="outlined" sx={{mb: '10px'}}>
                <a 
                    href={art.url} 
                    target="_blank" 
                    style={{ textDecoration: "none"}}
                >
                    <img src ={art.urlToImage} alt={art.title} style={{width:"100%"}} />
                    <ListItemText sx={{color: "black"}}> {art.title}</ListItemText>

                </a>
                
                </Card> 

        </ListItem>

    )
}

export default Article;