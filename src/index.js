class Task {
    constructor(title, dueDate) {
        this.title = title,
        this.dueDate = dueDate;
        this.complete = () => {
            return true
        }
    }
}

class UI {
    static displayTasks() {
        tasks = Store.getTasks()

        task.forEach((task) => {
            UI.addTaskToList(task)
        });
    }

    static addTaskToList(task) {
        const taskList = document.getElementById('task-list')

        const taskDiv = document.createElement('div')
        taskDiv.classList = 'task'

        const taskSummaryDiv = document.createElement('div')
        taskSummaryDiv.classList = 'task-summary'
        
        const taskInput = document.createElement('input')
        taskInput.setAttribute('type', 'checkbox')
        taskInput.setAttribute('name', `${task.title}`)
        taskInput.classList = 'task-checkbox'

        const taskLabel = document.createElement('label')
        taskLabel.setAttribute('for', `${task.title}`)

        const taskDateDiv = document.createElement('div')
        taskDateDiv.classList = 'task-date'

        const taskDeleteBtn = document.createElement('button')
        taskDeleteBtn.classList = 'btn-delete-task'

        taskList.appendChild(taskDiv)
        taskDiv.appendChild(taskSummaryDiv)
        taskSummaryDiv.appendChild(taskInput)
        taskSummaryDiv.appendChild(taskLabel)
        taskSummaryDiv.appendChild(taskDateDiv)
        taskSummaryDiv.appendChild(taskDeleteBtn)

        taskLabel.innerHTML = `<p>${task.title}</p>`
        taskDateDiv.innerHTML = `<p>${task.dueDate}</p>`
        taskDeleteBtn.innerText = '✖'
    }

    static deleteTask(target) {
        if (target.classList.contains('btn-delete-task')) {
            target.parentElement.parentElement.remove();
        }
    }

    static doPopup() {
        const popup = document.getElementById('popup')

        if (popup.className === 'popup-hidden' ) {
            popup.className = 'popup-visible'
        } else {
            popup.className = 'popup-hidden'
        }
    }

    static doClearForm() {
        document.getElementById('input-title').value = ''
        document.getElementById('input-duedate').value = ''
    }
}

class Store {
    static getTasks() {
        let tasks = [

        ]

        return tasks
    }

    static addTask(task) {
        const tasks = Store.getTasks()
        tasks.push(task)
    }

    static removeTask(title) {
        const tasks = Store.getTasks()

        tasks.forEach((task, index) => {
            if (task.title === title) {
                tasks.splice(index, 1);
            }
        })
    }
}

// EVENT: ADD TASK
const addTaskBtn = document.getElementById('btn-addtask')

addTaskBtn.addEventListener('click', () => {
    UI.doPopup()
})

const submitFormButton = document.getElementById('btn-submit-form')

submitFormButton.addEventListener('click', () => {
    if (
        !document.getElementById('input-title').value == '' && 
        !document.getElementById('input-duedate').value == ''
    ) {
        let inputTaskTitle = document.getElementById('input-title').value
        let inputTaskDuedate = document.getElementById('input-duedate').value

        const task = new Task(inputTaskTitle, inputTaskDuedate)

        UI.addTaskToList(task)

        Store.addTask(task)

        UI.doClearForm()
        UI.doPopup()
    }
})

// EVENT: REMOVE TASK
document.getElementById('task-list').addEventListener('click', (e) => {
    UI.deleteTask(e.target);
    Store.removeTask(e.target.previousElementSibling.previousElementSibling.textContent)
})