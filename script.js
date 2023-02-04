const taskListEl = document.getElementById("task-list")
const input = document.getElementById("add-input")
const button = document.getElementById("add")

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
    buildTask(task.title, index)
})


function loadFromLocal() {

    const json = localStorage.getItem('tasks')

    if (!json) return

    tasks = JSON.parse(json)
    
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

    label.classList.add('task__title')
    label.setAttribute('for', `task-${index}__check`)
    label.innerHTML = title

    deleteBtn.classList.add('task__delete')
    deleteBtn.innerHTML = 'delete'

    deleteBtn.addEventListener('click', (e) => {
        tasks.splice(index, 1);
        taskListEl.removeChild(div);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    div.appendChild(checkbox)
    div.appendChild(label)
    div.appendChild(deleteBtn)

    taskListEl.append(div)
}

button.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log(tasks)
    const index = tasks.push({
        title: input.value,
        done: false
    }) - 1

    buildTask(input.value, index)
    localStorage.setItem('tasks', JSON.stringify(tasks))
})
