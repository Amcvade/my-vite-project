
//imports
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
import {} from "./3rd";
import {} from "./2nd";






type Task = {
  id: number;
  name: string;
  completed: boolean;
};

 async function getTasks(): Promise<void> {
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

document.getElementById('task-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const taskInput = document.getElementById('task-input') as HTMLInputElement;
  const newTask: Omit<Task, 'id'> = { name: taskInput.value, completed: false };

  try {
      await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask),
      });

      taskInput.value = ''; // Clear input
      getTasks(); // Refresh the list
  } catch (error) {
      console.error('Error adding task:', error);
  }
});

  async function deleteTask(task: number): Promise<void> {
  try {
      await fetch(`http://localhost:3000/tasks/${task}`, { method: 'DELETE' });
      getTasks(); // Refresh list
  } catch (error) {
      console.error('Error deleting task:', error);
  }
}

getTasks(); // Call this to populate the list
