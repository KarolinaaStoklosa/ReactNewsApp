import LoginForm from '../LoginForm/LoginForm';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
	return (
		<>
			<LoginForm />
			<Typography
				variant="h6"
				sx={{ fontWeight: '100', textAlign: 'center', my: '.5rem' }}
			>
				Don&apos;t have an account yet? Register now!
			</Typography>
			<Link to="/register" style={{ textDecoration: 'none' }}>
				<Button variant="outlined" sx={{ display: 'block', mx: 'auto' }}>
					Register
				</Button>
			</Link>
		</>
	);
};

export default LoginPage;
