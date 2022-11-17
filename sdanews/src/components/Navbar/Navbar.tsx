import {useEffect, useState, useContext} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import { NavbarProps } from '../../helpers/interfaces';
import { auth, storage } from "../../helpers/firebaseConfig";
import { ref, getDownloadURL} from "firebase/storage"
import { authContext } from '../../helpers/authContext';
const pages = ['Home', 'Search'];

const Navbar= () => {

  const loggedIn =  useContext(authContext);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

  const [profilePhoto, setProfilePhoto] = useState<string|undefined>('/');

  useEffect(()=> {
    if (loggedIn && auth.currentUser) {
    const storageRef = ref(storage, `/users/${auth.currentUser.uid}/images`);

    getDownloadURL(storageRef)
    .then((url) => {
      setProfilePhoto(url)
      console.log("Profile photo set")})
    .catch((err) => setProfilePhoto(undefined));
    }
  }, [loggedIn])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to="/" style={{textDecoration:"none", color:"black"}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>
              <Link to="/search" style={{textDecoration:"none", color:"black"}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Search</Typography>
                </MenuItem>
              </Link>
            </Menu> 
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto',
              fontWeight: 200,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SDA NEWS
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> {/*menu dla webPage*/}
            <Link to="/" style={{textDecoration:"none"}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >Home
              </Button>
            </Link>
            <Link to="/search" style={{textDecoration:"none"}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >Search
              </Button>
            </Link>
          </Box>
          
          <Typography                       // LOGO PRZY PEŁNEJ STRONIE
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow:1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 200,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SDA NEWS
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
              <Link 
                to={loggedIn ? "/user" : "/login"} 
                style={{textDecoration:"none"}}>
                { loggedIn && 
                  (<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={profilePhoto} />
                  </IconButton>)
                }
                { !loggedIn &&
                  <Button sx={{my:2, color:"white", display:"block"}}
                  >Log in</Button>
                }

              </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar

// RENDEROWANIE WARUNKOWE 
// TYP !
// w zależności od warunku wyświetlamy lub nie wyświetlamy element A
// {jakasWartosc===drugaWartosc && <p>123</p>}
// TYP 2 
// w zależności od warunku renderujemy element A lub element B
// jakasWartosc===drugaWartosc ? <p>123</p> : <p>abc</p>


// Stwórz stan profilePhoto, otypuj got tak żeby móc przechowywać string lub undefined, wartość początkowa '/'
// 2. Wywołaj useEffect, bd działać tylko na 1szym renderze
// w uE:
// 3. Stwóz referencję do storage (taka sama jak w poprzednim zad w ProfilePhotoFOrm)
// 4. Wywołaj getDownloadUREL, funkcje przyjmuje jako argument referencję z pkt 3 i importuje się ją z firebase/storage
// 5. Na getDownloadURL podepnij then i wywołaj w nim funkcję aktualizującą stan profilePhoto (pkt1) i wrzuć do tego stanu to, co zostalo ci zwrócone przez getDownoloadURL
// 6. Dopisz catch
// 7. W avatarze (l144) ustaw src na stan profilePhoto