import React, { useState, useEffect } from 'react';
import InputField from './components/InputField';
import { Todo } from './model';

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (todo) {
			setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
			setTodo('');
		}
	};

	return (
		<div className='app'>
			<h1>Todo TypeScript</h1>
			<InputField
				todo={todo}
				setTodo={setTodo}
				handleAdd={handleAdd}
			/>
		</div>
	);
};

export default App;
