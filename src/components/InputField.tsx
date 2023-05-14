import React from 'react';
import './styles/InputField.scss';

const InputField: React.FC = () => {
	return (
		<>
			<form className='input'>
				<input
					type='input'
					placeholder='Please Enter a Task'
					className='input__box'
				/>
				<button
					type='submit'
					className='input__btn'
				>
					<i className='fa-solid fa-plus input__btn__icon'></i>
				</button>
			</form>
		</>
	);
};

export default InputField;
