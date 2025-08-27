// Main Todo App Class
var TodoApp = /** @class */ (function () {
    function TodoApp() {
        var _this = this;
        this.todos = [];
        this.taskList = document.getElementById("taskList");
        this.taskInput = document.getElementById("taskInput");
        var addBtn = document.getElementById("addBtn");
        addBtn.addEventListener("click", function () { return _this.addTask(); });
    }
    // Add a new task
    TodoApp.prototype.addTask = function () {
        var taskText = this.taskInput.value.trim();
        if (taskText === "")
            return;
        var newTask = {
            id: Date.now(),
            task: taskText,
        };
        this.todos.push(newTask);
        this.taskInput.value = "";
        this.renderTasks();
    };
    // Edit task
    TodoApp.prototype.editTask = function (id) {
        var task = this.todos.find(function (t) { return t.id === id; });
        if (!task)
            return;
        var newTaskText = prompt("Edit task:", task.task);
        if (newTaskText && newTaskText.trim() !== "") {
            task.task = newTaskText.trim();
            this.renderTasks();
        }
    };
    // Delete task
    TodoApp.prototype.deleteTask = function (id) {
        this.todos = this.todos.filter(function (t) { return t.id !== id; });
        this.renderTasks();
    };
    // Display tasks
    TodoApp.prototype.renderTasks = function () {
        var _this = this;
        this.taskList.innerHTML = "";
        this.todos.forEach(function (todo) {
            var li = document.createElement("li");
            li.textContent = todo.task;
            var btnContainer = document.createElement("div");
            btnContainer.className = "task-btns";
            var editBtn = document.createElement("button");
            editBtn.textContent = "✏️ Edit";
            editBtn.className = "editBtn";
            editBtn.onclick = function () { return _this.editTask(todo.id); };
            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑️ Delete";
            deleteBtn.className = "deleteBtn";
            deleteBtn.onclick = function () { return _this.deleteTask(todo.id); };
            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);
            li.appendChild(btnContainer);
            _this.taskList.appendChild(li);
        });
    };
    return TodoApp;
}());
// Run App
var app = new TodoApp();
