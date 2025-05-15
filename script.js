document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    function renderTasks() {
        taskList.innerHTML = '';
        let completedCount = 0;
        
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTask(index));
            
            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;
            if (task.completed) {
                span.classList.add('completed');
                completedCount++;
            }
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '删除';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
        
        totalTasksSpan.textContent = `总任务: ${tasks.length}`;
        completedTasksSpan.textContent = `已完成: ${completedCount}`;
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }
    
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }
    
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }
    
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    renderTasks();
});