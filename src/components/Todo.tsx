import React, { useState, useRef, useEffect } from 'react';
import './styles/Todo.scss';
import { Model } from '../model';
import { MdEdit, MdDone, MdDelete } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
	index: number;
	todo: Model;
	todos: Model[];
	setTodos: React.Dispatch<React.SetStateAction<Model[]>>;
}

const Todo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						todo: editTodo,
					};
				}
				return todo;
			})
		);
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const handleDone = (id: number) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) {
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

	return (
		<>
			<Draggable
				draggableId={todo.id.toString()}
				index={index}
			>
				{(provided) => (
					<form
						className='todo'
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						onSubmit={(e) => {
							handleEdit(e, todo.id);
						}}
					>
						<div className='todo__text'>
							{edit ? (
								<input
									ref={inputRef}
									type='input'
									className='todo__text__input'
									value={editTodo}
									onChange={(e) => setEditTodo(e.target.value)}
								/>
							) : (
								<p className={`todo__text__p ${todo.isDone ? 'todo__text__p-done' : ''}`}>{todo.todo}</p>
							)}
						</div>
						<div className='todo__icons'>
							<span
								onClick={() => {
									if (!edit && !todo.isDone) {
										setEdit(!edit);
									}
								}}
							>
								{!edit && !todo.isDone && (
									<MdEdit
										color='#89664e'
										size='1.1rem'
										className='todo__icons__icon'
									/>
								)}
							</span>
							<span
								onClick={() => {
									handleDelete(todo.id);
								}}
							>
								<MdDelete
									color='#89664e'
									size='1.1rem'
									className='todo__icons__icon'
								/>
							</span>
							<span
								onClick={() => {
									handleDone(todo.id);
								}}
							>
								{!todo.isDone ? (
									<MdDone
										color='#89664e'
										size='1.25rem'
										className='todo__icons__icon'
									/>
								) : (
									<RxCross2
										color='#89664e'
										size='1.25rem'
										className='todo__icons__icon'
									/>
								)}
							</span>
						</div>
					</form>
				)}
			</Draggable>
		</>
	);
};

export default Todo;
