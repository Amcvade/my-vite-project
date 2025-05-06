import { deleteTask } from "./3rd";

type Task = {
    id: number;
    name: string;
    completed: boolean;
  };



export async function getTasks(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks: Task[] = await response.json();
  
        const taskList = document.getElementById('task-list') as HTMLUListElement;
        taskList.innerHTML = ''; // Clear previous list
  
        tasks.forEach((task: Task) => {
            const li = document.createElement('li');
            li.textContent = `${task.name} `;
  
            // Add Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTask(task.id);
  
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
  }