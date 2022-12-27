import React from 'react';
import { Card, Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { auth } from '../../helpers/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoginFormData } from '../../helpers/interfaces';

const LoginForm = () => {
	const { register, handleSubmit } = useForm<LoginFormData>();
	const submitHandler = ({ email, password }: LoginFormData) => {
		signInWithEmailAndPassword(auth, email, password)
			.then()
			.catch(() => alert('Try again!'));
	};

	return (
		<Card>
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleSubmit(submitHandler)}
			>
				<Typography
					variant="h2"
					align="center"
					sx={{ fontSize: '2rem', my: '.5rem' }}
				>
					Log in
				</Typography>
				<TextField
					variant="outlined"
					type="email"
					placeholder="email"
					sx={{ display: 'block', my: '.5rem', mx: 'auto' }}
					{...register('email', { required: true })}
				/>
				<TextField
					variant="outlined"
					type="password"
					placeholder="password"
					sx={{ display: 'block', my: '.8rem', mx: 'auto' }}
					{...register('password', { required: true })}
				/>
				<Button
					variant="contained"
					type="submit"
					sx={{ display: 'block', mx: 'auto', marginBottom: '1rem' }}
				>
					Log in
				</Button>
			</form>
		</Card>
	);
};

export default LoginForm;
