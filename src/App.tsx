import React, { useState, useEffect } from 'react';
import { Model } from './model';
import { InputField, Todo } from './components';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [todos, setTodos] = useState<Model[]>(() => {
		const storedTodos = localStorage.getItem('todos');
		return storedTodos ? JSON.parse(storedTodos) : [];
	});
	const [todos_incomplete, setTodosIncomplete] = useState<Model[]>([]);
	const [todos_complete, setTodosComplete] = useState<Model[]>([]);

	useEffect(() => {
		setTodosIncomplete(todos.filter((todo) => !todo.isDone));
		setTodosComplete(todos.filter((todo) => todo.isDone));
	}, [todos]);

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

	const setIsDone = (item: Model) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === item.id) {
					return {
						...todo,
						isDone: !todo.isDone,
					};
				}
				return todo;
			})
		);
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;
		if (destination.droppableId === 'todos_incomp' && source.droppableId === 'todos_incomp') return;
		if (destination.droppableId === 'todos_comp' && source.droppableId === 'todos_comp') return;
		if (destination.droppableId === 'todos_incomp') {
			const item = todos_complete[source.index];
			setIsDone(item);
			setTodosComplete((prev) => {
				prev.splice(source.index, 1);
				return prev;
			});
			setTodosIncomplete((prev) => {
				prev.splice(destination.index, 0, item);
				return prev;
			});
		}
		if (destination.droppableId === 'todos_comp') {
			const item = todos_incomplete[source.index];
			setIsDone(item);
			setTodosIncomplete((prev) => {
				prev.splice(source.index, 1);
				return prev;
			});
			setTodosComplete((prev) => {
				prev.splice(destination.index, 0, item);
				return prev;
			});
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='app'>
				<h1>Todo TypeScript</h1>
				<InputField
					todo={todo}
					setTodo={setTodo}
					handleAdd={handleAdd}
				/>
				<div className='app__todolist'>
					<Droppable
						droppableId='todos_incomp'
						key='todos_incomp'
					>
						{(provided) => (
							<div
								className='app__todolist__incomplete'
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								<h1 className='app__todolist__text'>Incomplete Tasks</h1>
								{todos_incomplete.map((todo, index) => (
									<Todo
										key={todo.id}
										index={index}
										todo={todo}
										todos={todos}
										setTodos={setTodos}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					<Droppable
						droppableId='todos_comp'
						key='todos_comp'
					>
						{(provided) => (
							<div
								className='app__todolist__complete'
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								<h1 className='app__todolist__text'>Completed Tasks</h1>
								{todos_complete.map((todo, index) => (
									<Todo
										key={todo.id}
										index={index}
										todo={todo}
										todos={todos}
										setTodos={setTodos}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			</div>
		</DragDropContext>
	);
};

export default App;
