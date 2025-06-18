document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save updated task list to localStorage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the list and optionally to localStorage
    function addTask(taskText, save = true) {
        if (!taskText) return;

        // Create task list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task when button clicked
        removeBtn.onclick = function () {
            taskList.removeChild(listItem);

            // Remove task from localStorage
            let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks = tasks.filter(task => task !== taskText);
            saveTasksToLocalStorage(tasks);
        };

        // Append button and list item to task list
        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Save to localStorage if needed
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            saveTasksToLocalStorage(tasks);
        }
    }

    // Handle add button click
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        addTask(taskText);
        taskInput.value = '';
    });

    // Handle Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Load tasks on page load
    loadTasks();
});
