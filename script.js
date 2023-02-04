const taskListEl = document.getElementById("task-list")
const input = document.getElementById("add-input")
const button = document.getElementById("add")
const taskTotalEl = document.getElementById("task-total")
const taskDoneEl = document.getElementById("task-done")
const taskOngoingEl = document.getElementById('task-ongoing')
let totalDone = 0;
let totalOngoing = 0;

let tasks = [
    {
        title: "Tugas 1",
        done: false
    }
]

// hapus semua data di localStorage
// localStorage.clear()

loadFromLocal()

tasks.forEach((task, index) => {
    task.done ? totalDone += 1 : totalOngoing += 1
    buildTask(task.title, index)
})

updateStatus()


function updateStatus() {
    taskTotalEl.innerHTML = tasks.length
    taskDoneEl.innerHTML = totalDone.toString()
    taskOngoingEl.innerHTML = totalOngoing.toString()
}


function loadFromLocal() {

    const json = localStorage.getItem('tasks')

    if (!json) return

    tasks = JSON.parse(json)

}

function saveFromLocal() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function refreshTask() {
    taskListEl.innerHTML = ''
    totalDone = 0
    totalOngoing = 0
    updateStatus()
    tasks.forEach((task, index) => {
        task.done ? totalDone += 1 : totalOngoing += 1
        buildTask(task.title, index)
    })
}

function buildTask(title, index) {
    const div = document.createElement("div")
    const checkbox = document.createElement('input')
    const label = document.createElement('label')
    const deleteBtn = document.createElement('div')

    div.classList.add('task')

    checkbox.classList.add('task__check')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.id = `task-${index}__check`
    tasks[index].done ? checkbox.checked = true : checkbox.checked = false

    checkbox.addEventListener('click', (e) => {

        if (!tasks[index].done) {
            tasks[index].done = true
            totalDone += 1
            totalOngoing -= 1
        }
        else {
            tasks[index].done = false
            totalDone -= 1
            totalOngoing += 1
        }

        saveFromLocal()
        updateStatus()
    })

    label.classList.add('task__title')
    label.setAttribute('for', `task-${index}__check`)
    label.innerHTML = title

    deleteBtn.classList.add('task__delete')
    deleteBtn.innerHTML = 'delete'

    deleteBtn.addEventListener('click', (e) => {
        tasks.splice(index, 1);
        taskListEl.removeChild(div);
        saveFromLocal()
        refreshTask()
    })

    div.appendChild(checkbox)
    div.appendChild(label)
    div.appendChild(deleteBtn)

    taskListEl.append(div)
    updateStatus()
}

button.addEventListener('click', (e) => {
    e.preventDefault()
    const index = tasks.push({
        title: input.value,
        done: false
    }) - 1
    totalOngoing += 1
    buildTask(input.value, index)
    saveFromLocal()
})
