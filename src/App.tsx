import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import { ITask } from './interfaces';
import TodoTask from './components/TodoTask';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setTask(e.target.value)
    } else {
      setDeadline(Number(e.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {taskName: task, deadline: deadline };
    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
  } 

  const completeTask = (taskNameToDelete: string): void => {
    setTodo(todo.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  };

  return <div className="App">
    <div className="header"> 
      <div className="inputContainer">
        <input 
        type="text" 
        placeholder='Task...'
        name='task'
        value={task} 
        onChange={handleChange}
        />
        <input 
        type="number" 
        placeholder='Deadline (in Days)...'
        name='deadline'
        value={deadline} 
        onChange={handleChange} 
        />
      </div>
      <button onClick={addTask}>Add Task</button>
    </div>
    <div className="todoList">
      {todo.map((task: ITask, key: number) => {
        return <TodoTask key={key} task={task} completeTask={completeTask}/>;
      })};
    </div>
  </div>;
};

export default App;
