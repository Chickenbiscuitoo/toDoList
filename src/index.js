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

    static displayProjects() {
        const projects = Store.getProjects()
        projects.forEach((project) => {
            UI.addProjectToList(project)
        });
    }

    static displayTasks(project) {
        const tasks = Store.getTasks()
        tasks.forEach((task) => {
            if (task.projectName == project) {
                UI.addTaskToList(task)
            }
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
        const projectDeleteBtn = document.createElement('button')

        projectsListDiv.innerHTML = `<button class="btn-projects btn-basic">${title}</button>`
        projectsListDiv.classList = 'div-project'
        projectDeleteBtn.classList = 'btn-del-project'
        projectDeleteBtn.innerText = '✖'

        projectsList.appendChild(projectsListDiv)
        projectsListDiv.appendChild(projectDeleteBtn)
    }

    static deleteTask(target) {
        if (target.classList.contains('btn-delete-task')) {
            target.parentElement.parentElement.remove();
        }
    }

    static deleteProject(target) {
        if (target.classList.contains('btn-del-project')) {
            target.parentElement.remove();
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
        document.getElementById('input-projectname').value = ''

        if (!document.getElementById('input-title').value === null && 
            !document.getElementById('input-duedate').value === null) {
                document.getElementById('input-title').value = ''
                document.getElementById('input-duedate').value = ''
            }
    }
}

class Store {
    static getTasks() {
        let tasks
        if (localStorage.getItem('tasks') === null) {
            tasks = []
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }

        return tasks
    }

    static addTask(task) {
        const tasks = Store.getTasks()
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    static removeTask(title) {
        const tasks = Store.getTasks()

        tasks.forEach((task, index) => {
            if (task.title === title) {
                tasks.splice(index, 1);
            }
        })

        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    static getProjects() {
        let projects
        if (localStorage.getItem('projects') === null) {
            projects = []
        } else {
            projects = JSON.parse(localStorage.getItem('projects'))
        }

        return projects
    }

    static addProject(project) {
        const projects = Store.getProjects()
        projects.push(project)
        localStorage.setItem('projects', JSON.stringify(projects))
    }

    static removeProject(title) {
        const projects = Store.getProjects()
        const tasks = Store.getTasks()

        projects.forEach((project, index) => {
            if (project === title) {
                projects.splice(index, 1);
            }
        })

        tasks.forEach((task) => {
            if (task.projectName === title) {
                Store.removeTask(task.title)
            }
        });

        localStorage.setItem('projects', JSON.stringify(projects))
    }
}

UI.displayProjects()

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
        Store.addProject(inputProjectTitle)

        UI.doPopup(e.target.parentElement.parentElement)
        UI.doClearForm()
    }
})

// EVENT: OPEN PROJECT
const projectMenu = document.getElementById('menu-projects')
projectMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-projects')) {
        UI.displayProjectPage(e.target.innerText)
        UI.displayTasks(e.target.innerText)
    } else if (e.target.classList.contains('btn-del-project')){
        Store.removeProject(e.target.previousElementSibling.innerText)
        UI.deleteProject(e.target)
    }
})

// EVENT: ADD TASK AND REMOVE TASK
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