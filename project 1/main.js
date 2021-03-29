function save(event) {
    try {
        event.preventDefault();

        const myForm = document.getElementById("myForm");
        const text = myForm.taskInfo.value;
        const date = myForm.targetDate.value;
        const time = myForm.targetTime.value;
        const fullDateTime = new Date(date + " " + time);

        if (text == "" || text == " ") {
            throw new Error(text + " not valid, text box must not be empty");
        }
        if (fullDateTime < new Date().getTime()) {
            throw new Error(fullDateTime + " not valid, date and time must not be in the past or empty");
        }
        const newTask = {
            taskInfo: text,
            targetTime: fullDateTime,
            timeStamp: new Date().getTime()
        }
        const id = (new Date().getTime()).toString() + "R"
            + (Math.floor(Math.random() * 10000)).toString()
            + newTask.taskInfo.replace(/(\r\n|\n|\r)/gm, "") + newTask.targetTime;
        localStorage.setItem(id, JSON.stringify(newTask));
    } catch (err) {
        alert("Error: " + err.message);

    }
}
function load() {
    const taskList = document.getElementById("taskList");
    const orderList = [];

    taskList.innerHTML = "";
    for (let taskKey in localStorage) {
        const obj = localStorage.getItem(taskKey);
        if (obj !== null) {
            orderList.push(taskKey);
        }
    }
    orderList.sort((a, b) => {
        let timeStampEndA = a.indexOf("R");
        let timeStampEndB = b.indexOf("R");
        let aCopy = a.substring(0, timeStampEndA);
        let bCopy = b.substring(0, timeStampEndB);
        return aCopy - bCopy;
    });
    for (const Key in orderList) {
        const taskKey = orderList[Key];
        const obj = localStorage.getItem(taskKey);
        if (obj !== null) {
            let newLi = createListItemView(JSON.parse(obj), taskKey);
            taskList.appendChild(newLi);
        }
    }
}

function removeTaskFromList(event) {
    const clickedButtonId = event.srcElement.id;
    const clickedObject = JSON.parse(localStorage[clickedButtonId]);

    localStorage.removeItem(clickedButtonId);
}

function createListItemView(taskObject, key) {
    const li = document.createElement("li");
    const newTaskView = createTaskView(taskObject, key);

    li.appendChild(newTaskView);
    li.className = "list-item";

    return li;
}

function createTaskView(taskObject, key) {
    let newTaskDiv = document.createElement("div");
    let newButton = creatDoneBtn(key);
    let newInputInfo = document.createElement("textarea");
    let newInputDate = document.createElement("input");

    newTaskDiv.className = "list-item-div fade-in";
    newInputInfo.className = "task-view task-view-info ";
    newInputInfo.disabled = true;
    newInputInfo.value = taskObject.taskInfo;
    newInputDate.className = "task-view task-view-date";
    newInputDate.disabled = true;

    const date = new Date(taskObject.targetTime).toLocaleDateString();
    const time = new Date(taskObject.targetTime).toLocaleTimeString();

    newInputDate.value = date + "  " + time;
    newTaskDiv.appendChild(newButton);
    newTaskDiv.appendChild(newInputInfo);
    newTaskDiv.appendChild(newInputDate);

    return newTaskDiv;
}

function creatDoneBtn(key) {
    const removeButton = document.createElement("button");
    const spanImage = document.createElement("span");

    spanImage.className = "glyphicon glyphicon-remove";
    spanImage.id = key;
    removeButton.className = "task-view task-view-btn btn  ";
    removeButton.onclick = removeTaskFromList;
    removeButton.addEventListener("click", load);
    removeButton.appendChild(spanImage);

    return removeButton;
}

document.addEventListener("DOMContentLoaded", load);

