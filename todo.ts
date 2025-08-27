// Define Todo Item Interface
interface Todo {
  id: number;
  task: string;
}

// Main Todo App Class
class TodoApp {
  private todos: Todo[] = [];
  private taskList: HTMLElement;
  private taskInput: HTMLInputElement;

  constructor() {
    this.taskList = document.getElementById("taskList")!;
    this.taskInput = document.getElementById("taskInput") as HTMLInputElement;

    const addBtn = document.getElementById("addBtn")!;
    addBtn.addEventListener("click", () => this.addTask());
  }

  // Add a new task
  addTask(): void {
    const taskText = this.taskInput.value.trim();
    if (taskText === "") return;

    const newTask: Todo = {
      id: Date.now(),
      task: taskText,
    };

    this.todos.push(newTask);
    this.taskInput.value = "";
    this.renderTasks();
  }

  // Edit task
  editTask(id: number): void {
    const task = this.todos.find((t) => t.id === id);
    if (!task) return;

    const newTaskText = prompt("Edit task:", task.task);
    if (newTaskText && newTaskText.trim() !== "") {
      task.task = newTaskText.trim();
      this.renderTasks();
    }
  }

  // Delete task
  deleteTask(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.renderTasks();
  }

  // Display tasks
  renderTasks(): void {
    this.taskList.innerHTML = "";

    this.todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.task;

      const btnContainer = document.createElement("div");
      btnContainer.className = "task-btns";

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ Edit";
      editBtn.className = "editBtn";
      editBtn.onclick = () => this.editTask(todo.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️ Delete";
      deleteBtn.className = "deleteBtn";
      deleteBtn.onclick = () => this.deleteTask(todo.id);

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);

      li.appendChild(btnContainer);
      this.taskList.appendChild(li);
    });
  }
}

// Run App
const app = new TodoApp();
