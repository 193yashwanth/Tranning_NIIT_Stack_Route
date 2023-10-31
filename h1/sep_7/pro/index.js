const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="completeTask(this)">Complete</button>
        <button onclick="removeTask(this)">Remove</button>
    `;

    taskList.appendChild(li);
    taskInput.value = '';
}

function completeTask(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle('completed');
}

function removeTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}