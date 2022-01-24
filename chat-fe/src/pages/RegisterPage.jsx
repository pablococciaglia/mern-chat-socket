import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert2';

import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
	const { register } = useContext(AuthContext);

	const initialState = {
		email: '',
		password: '',
		name: '',
	};

	const [form, setForm] = useState(initialState);

	const onChange = ({ target }) => {
		const { name, value } = target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const { email, password, name } = form;

		const { ok, msg } = await register(email, name, password);

		if (!ok) {
			swal.fire('Error', msg);
		}
	};

	const formEmpty = () => {
		return form.email.length > 0 &&
			form.password.length > 0 &&
			form.name.length > 0
			? false
			: true;
	};
	return (
		<form
			className='login100-form validate-form flex-sb flex-w'
			onSubmit={onSubmit}
		>
			<span className='login100-form-title mb-3'>Chat - Register</span>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='text'
					name='name'
					placeholder='Name'
					value={form.name}
					onChange={onChange}
				/>
				<span className='focus-input100'></span>
			</div>

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
				<div className='col text-right'>
					<NavLink to='/auth/login.html' className='txt1'>
						Do you already have an account?
					</NavLink>
				</div>
			</div>

			<div className='container-login100-form-btn m-t-17'>
				<button className='login100-form-btn' disabled={formEmpty()}>
					Create account
				</button>
			</div>
		</form>
	);
};

export default RegisterPage;
