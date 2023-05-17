import React, { useState, useEffect } from 'react';
import { Model } from './model';
import { InputField, Todo } from './components';

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [todos, setTodos] = useState<Model[]>(() => {
		const storedTodos = localStorage.getItem('todos');
		return storedTodos ? JSON.parse(storedTodos) : [];
	});

	const todos_incomplete: Model[] = todos.filter((todo) => !todo.isDone);
	const todos_complete: Model[] = todos.filter((todo) => todo.isDone);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const handleAdd = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (todo) {
			setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
			setTodo('');
		}
	};

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<div className='app'>
			<h1>Todo TypeScript</h1>
			<InputField
				todo={todo}
				setTodo={setTodo}
				handleAdd={handleAdd}
			/>
			<div className='app__todolist'>
				<div className='app__todolist__incomplete'>
					<h1 className='app__todolist__text'>Incomplete Tasks</h1>
					{todos_incomplete.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							todos={todos}
							setTodos={setTodos}
						/>
					))}
				</div>
				<div className='app__todolist__complete'>
					<h1 className='app__todolist__text'>Complete Tasks</h1>
					{todos_complete.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							todos={todos}
							setTodos={setTodos}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
