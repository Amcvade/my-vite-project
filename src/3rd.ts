import { getTasks } from "./2nd";

  export async function deleteTask(task: number): Promise<void> {
    try {
        await fetch(`http://localhost:3000/tasks/${task}`, { method: 'DELETE' });
        getTasks();// Refresh list
    } catch (error) {
        console.error('Error deleting task:', error);
    }
  }
  
  getTasks(); // Call this to populate the list