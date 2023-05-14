import React from 'react';
import './styles/InputField.scss';

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
	return (
		<>
			<form
				className='input'
				onSubmit={(e) => {
					handleAdd(e);
				}}
			>
				<input
					type='input'
					placeholder='Please Enter a Task'
					className='input__box'
					value={todo}
					onChange={(e) => setTodo(e.target.value)}
				/>
				<button
					type='submit'
					onClick={(e) => {
						handleAdd(e);
					}}
					className='input__btn'
				>
					<i className='fa-solid fa-plus input__btn__icon'></i>
				</button>
			</form>
		</>
	);
};

export default InputField;
