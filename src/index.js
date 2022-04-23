class Task {
    constructor(title, dueDate, projectName) {
        this.title = title,
        this.dueDate = dueDate,
        this.projectName = projectName;
    }
}

class UI {
    static displayProjectPage(project) {
        const mainContent = document.getElementById('main-content')

        mainContent.innerHTML = ''

        const projectNameDiv = document.createElement('div')
        projectNameDiv.id = 'project-name'
        projectNameDiv.innerText = `${project}`

        const taskListDiv = document.createElement('div')
        taskListDiv.id = 'task-list'

        const addTaskBtnElement = document.createElement('button')
        addTaskBtnElement.id = 'btn-addtask'
        addTaskBtnElement.className = 'btn-basic'
        addTaskBtnElement.innerText = '+ Add task'

        const popupDiv = document.createElement('div')
        popupDiv.className = 'popup-hidden'
        popupDiv.innerHTML = `
            <div class="div-inputs"> 
                <input type="text" id="input-title" placeholder="Task Name">
                <input type="text" id="input-duedate" placeholder="Due Date">
            </div>
            <div class="div-submit-btn">
                <button id="btn-submit-form" class="btn-submit">Submit</button>
            </div>
        `;

        mainContent.appendChild(projectNameDiv)
        mainContent.appendChild(taskListDiv)
        mainContent.appendChild(addTaskBtnElement)
        mainContent.appendChild(popupDiv)
    }

    static displayTasks() {
        const tasks = Store.getTasks()

        tasks.forEach((task) => {
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

    static addProjectToList(title) {
        const projectsList = document.getElementById('menu-projects')
        const projectsListDiv = document.createElement('div')
        projectsListDiv.innerHTML = `<button class="btn-projects btn-basic">${title}</button>`
        projectsList.appendChild(projectsListDiv)
    }

    static deleteTask(target) {
        if (target.classList.contains('btn-delete-task')) {
            target.parentElement.parentElement.remove();
        }
    }

    static deleteProject(target) {
        if (target.classList.contains('btn-delete-project')) {
            target.parentElement.parentElement.remove();
        }
    }

    static doPopup(target) {
        if (target.classList.contains('popup-hidden') ) {
            target.classList.replace('popup-hidden', 'popup-visible')
        } else if (target.classList.contains('popup-visible')) {
            target.classList.replace('popup-visible', 'popup-hidden')
        }
    }

    static doClearForm() {
        document.getElementById('input-title').value = ''
        document.getElementById('input-duedate').value = ''
        document.getElementById('input-projectname').value = ''
    }
}

class Store {
    static projects = new Array()
    static tasks = new Array()

    static getTasks() {
        return Store.tasks
    }

    static getProjects() {
        return Store.projects
    }

    static addTask(task) {
        const tasks = Store.getTasks()
        tasks.push(task)
    }

    static addProject(project) {
        const projects = Store.getProjects()
        projects.push(project)
    }

    static removeTask(title) {
        const tasks = Store.getTasks()

        tasks.forEach((task, index) => {
            if (task.title === title) {
                tasks.splice(index, 1);
            }
        })
    }

    static removeProject(title) {
        const projects = Store.getProjects()

        projects.forEach((project, index) => {
            if (project.title === title) {
                project.splice(index, 1);
            }
        })
    }
}

// EVENT: ADD PROJECT
const addProjectBtn = document.getElementById('btn-addproject')

addProjectBtn.addEventListener('click', (e) => {
    UI.doPopup(e.target.parentElement.nextElementSibling)
})

const submitProjectButton = document.getElementById('btn-submit-project')

submitProjectButton.addEventListener('click', (e) => {
    if (!document.getElementById('input-projectname').value == '') {
        let inputProjectTitle = document.getElementById('input-projectname').value

        UI.addProjectToList(inputProjectTitle)
        UI.doClearForm()
        UI.doPopup(e.target.parentElement.parentElement)
    }
})

// EVENT: OPEN PROJECT
const projectMenu = document.getElementById('menu-projects')
projectMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-projects')) {
        UI.displayProjectPage(e.target.innerText)
    }
})


// EVENT: ADD TASK
const mainContent = document.getElementById('main-content')

mainContent.addEventListener('click', (e) => {
    if (e.target.id === 'btn-addtask') {
        UI.doPopup(e.target.nextElementSibling)
    } else if (e.target.id === 'btn-submit-form') {
        if (
            !document.getElementById('input-title').value == '' && 
            !document.getElementById('input-duedate').value == ''
        ) {
            let inputTaskTitle = document.getElementById('input-title').value
            let inputTaskDuedate = document.getElementById('input-duedate').value

            const task = new Task(inputTaskTitle, inputTaskDuedate, mainContent.firstElementChild.textContent)
    
            UI.addTaskToList(task)
    
            Store.addTask(task)
    
            UI.doClearForm()
            UI.doPopup(e.target)
        }
    } else if (e.target.classList.contains('btn-delete-task')) {
        UI.deleteTask(e.target);
        Store.removeTask(e.target.previousElementSibling.previousElementSibling.textContent)
    }
})