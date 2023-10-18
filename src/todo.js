import React, { useState, useEffect } from 'react';


const TodoList = () => {
  //to store the tasks in local storage so that the tasks do not get remove after
  //refreshing the page.
  const [tasks, setTasks] = useState(() =>{
    const save_tasks = localStorage.getItem("tasks");

  if(save_tasks) {
    return JSON.parse(save_tasks);
  } else {
    return [];
  }
  });
  

  
  const [task, setTask] = useState('');

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const [dueDate, setDueDate] = useState('');

//to add the task in the list with the due date.

  const add_task = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { text: task, dueDate,completed: false }]);
      setTask('');
      setDueDate('');
    }
  };

  //to toggle the completion status of the task
  const completed_tasks = (index) => {
    const update_tasks = [...tasks];
    update_tasks[index].completed = !update_tasks[index].completed;
    setTasks(update_tasks);
  };
// to delete the task from the list
  const delete_task = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

//to filter the tasks according to the status like completion and pending. 
  const [filter, setFilter] = useState('all');
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });


  
  
  return (
    <div className="todo-list">
      <h1>Your To-Do List</h1>
      <div className="input-container">
            <input
            type="text"
            placeholder="Add your task in the list"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            />
            {/* input field to enter the due date*/ } 
            <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            />

            <button onClick={add_task}>Add</button>
        </div>
        {/* filter buttons */}
      <div className="filter-buttons mt-3">
        <button
          className={`btn btn-light ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn btn-light ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`btn btn-light ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>
      <ul className="task-list">
        {/* creating new array by using map method to display all the tasks*/}
            {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
                <span>{task.text}</span>
                {task.dueDate && <span className="due-date">Due Date: {task.dueDate}</span>}
                <div className="buttons">
                <button onClick={() => completed_tasks(index)}>
                    Completed
                </button>
                <button onClick={() => delete_task(index)}>Delete</button>
                </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
