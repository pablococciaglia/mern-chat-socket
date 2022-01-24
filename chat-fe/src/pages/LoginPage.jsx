import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
	const { login } = useContext(AuthContext);
	const initialState = {
		email: '',
		password: '',
		rememberme: false,
	};

	const [form, setForm] = useState(initialState);

	const onChange = ({ target }) => {
		const { name, value } = target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const togglecheck = () => {
		setForm({
			...form,
			rememberme: !form.rememberme,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		form.rememberme
			? localStorage.setItem('email', form.email)
			: localStorage.removeItem('email');

		const { email, password } = form;

		const { ok, msg } = await login(email, password);

		if (!ok) {
			swal.fire('Error', msg);
		}
	};

	useEffect(() => {
		const emailOnLocalStorage = localStorage.getItem('email');
		if (emailOnLocalStorage) {
			setForm((form) => ({
				...form,
				email: emailOnLocalStorage,
				rememberme: true,
			}));
		}
	}, []);

	const formEmpty = () => {
		return form.email.length > 0 && form.password.length > 0 ? false : true;
	};

	return (
		<form
			className='login100-form validate-form flex-sb flex-w'
			onSubmit={onSubmit}
		>
			<span className='login100-form-title mb-3'>Chat - Login</span>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='email'
					name='email'
					placeholder='Email'
					value={form.email}
					onChange={onChange}
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='password'
					name='password'
					placeholder='Password'
					value={form.password}
					onChange={onChange}
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='row mb-3'>
				<div className='col' onClick={() => togglecheck()}>
					<input
						className='input-checkbox100'
						id='ckb1'
						type='checkbox'
						name='rememberme'
						checked={form.rememberme}
						readOnly
					/>
					<label className='label-checkbox100'>Recordarme</label>
				</div>

				<div className='col text-right'>
					<NavLink to='/auth/register' className='txt1'>
						Don´t you have an account?
					</NavLink>
				</div>
			</div>

			<div className='container-login100-form-btn m-t-17'>
				<button className='login100-form-btn' disabled={formEmpty()}>
					Ingresar
				</button>
			</div>
		</form>
	);
};

export default LoginPage;
