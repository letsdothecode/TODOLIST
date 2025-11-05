class TodoList {
    constructor() {
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.todosContainer = document.getElementById('todosContainer');
        this.taskSuggestions = document.getElementById('taskSuggestions');
       
        this.todoForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.todoInput.addEventListener('input', () => this.handleInput());
        
         
        this.customSuggestions = new Set();
        
        this.displayWelcomeMessage();
    }

    displayWelcomeMessage() {
        const welcomeElement = document.createElement('div');
        welcomeElement.className = 'todo-item';
        welcomeElement.innerHTML = `
            <div class="todo-content">
                <div class="todo-text">Welcome! Add your first task to get started.</div>
                <div class="todo-date">${new Date().toLocaleString()}</div>
            </div>
        `;
        this.todosContainer.appendChild(welcomeElement);
        
        // Remove welcome message when first task is added
        this.firstTask = true;
    }

    handleSubmit(e) {
        e.preventDefault();
        const text = this.todoInput.value.trim();
        if (!text) return;
 
        if (this.firstTask) {
            this.todosContainer.innerHTML = '';
            this.firstTask = false;
        }

         
        if (!this.customSuggestions.has(text)) {
            this.customSuggestions.add(text);
            this.addSuggestion(text);
        }

        this.createTodoElement(text);
        this.todoInput.value = '';
        this.todoInput.focus();
    }

    handleInput() {
        const input = this.todoInput.value.trim();
        
    }

    addSuggestion(text) {
        const option = document.createElement('option');
        option.value = text;
        this.taskSuggestions.appendChild(option);
    }

    createTodoElement(text) {
        const todoElement = document.createElement('div');
        todoElement.className = 'todo-item';
        
        const content = `
            <div class="todo-content">
                <label class="checkbox-wrapper">
                    <input type="checkbox" class="task-checkbox">
                    <span class="checkmark"></span>
                </label>
                <div class="task-content">
                    <div class="todo-text">${text}</div>
                    <div class="todo-date">${new Date().toLocaleString()}</div>
                </div>
            </div>
            <div class="todo-actions">
                <button class="save-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        todoElement.innerHTML = content;

        // Event handlers for checkbox, edit and delete
        const deleteBtn = todoElement.querySelector('.delete-btn');
        const editBtn = todoElement.querySelector('.save-btn');
        const todoText = todoElement.querySelector('.todo-text');
        const checkbox = todoElement.querySelector('.task-checkbox');

        deleteBtn.addEventListener('click', () => {
            todoElement.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                todoElement.remove();
                // Show welcome message if no tasks left
                if (this.todosContainer.children.length === 0) {
                    this.firstTask = true;
                    this.displayWelcomeMessage();
                }
            }, 300);
        });

        editBtn.addEventListener('click', () => {
            if (todoText.contentEditable === 'true') {
                // Save mode
                todoText.contentEditable = 'false';
                editBtn.textContent = 'Edit';
                
                // Add to suggestions if it's a new text
                const newText = todoText.textContent.trim();
                if (!this.customSuggestions.has(newText)) {
                    this.customSuggestions.add(newText);
                    this.addSuggestion(newText);
                }
            } else {
                // Edit mode
                todoText.contentEditable = 'true';
                todoText.focus();
                editBtn.textContent = 'Save';
            }
        });

        // Add checkbox event listener
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                todoText.classList.add('completed');
            } else {
                todoText.classList.remove('completed');
            }
        });

        // Add slide-in animation
        todoElement.style.animation = 'slideIn 0.3s ease';
        this.todosContainer.prepend(todoElement);
    }
}

// Initialize the todo list when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoList();
});