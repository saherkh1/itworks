function load() {
    printDataToScreen(sortList(getKeysFromLocalStorage()));
}
function removeTaskFromList(event) {
    localStorage.removeItem(event.srcElement.id);
}
function save(event) {
    try {
        event.preventDefault();

        const myForm = document.getElementById("myForm");
        const text = myForm.taskInfo.value;
        const date = myForm.targetDate.value;
        const time = myForm.targetTime.value;
        const fullDateTime = new Date(date + " " + time);
        const isToday = isItToday(fullDateTime);
        if (text.trim() == "") {
            throw new Error("Text box must not be empty" + text);
        }
        if (date === "" && time === "") {
            throw new Error("Date must not be in the past or empty");
        }
        else if ((!isToday) && fullDateTime < new Date().getTime()) {
            throw new Error(fullDateTime + " Not valid, date must not be in the past or empty");
        }
        if (time !== "" && fullDateTime < new Date().getTime()) {
            throw new Error(fullDateTime + " Not valid, date must not be in the past");
        }
        const newTask = {
            taskInfo: text,
            targetTime: fullDateTime
        }
        const id = (new Date().getTime()).toString() + "R"
            + (Math.floor(Math.random() * 10000)).toString();
        localStorage.setItem(id, JSON.stringify(newTask));
        myForm.reset();
    } catch (err) {
        alert("Error: " + err.message);
    }
}
function getKeysFromLocalStorage() {
    let orderList = [];
    for (let taskKey in localStorage) {
        if (localStorage.getItem(taskKey) !== null) {
            orderList.push(taskKey);
        }
    }
    return orderList;
}
function sortList(list) {
    list.sort((a, b) => {
        let timeStampEndA = a.indexOf("R");
        let timeStampEndB = b.indexOf("R");
        let aTimeStamp = a.substring(0, timeStampEndA);
        let bTimeStamp = b.substring(0, timeStampEndB);
        return aTimeStamp - bTimeStamp;
    });

    return list;
}
function printDataToScreen(orderList) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    for (const Key in orderList) {
        const taskKey = orderList[Key];
        const obj = localStorage.getItem(taskKey);
        if (obj !== null) {
            let newLi = createListItemView(JSON.parse(obj), taskKey);
            taskList.appendChild(newLi);
        }
    }
}
function filterTasksAndStorage() {
    let array = getKeysFromLocalStorage();
    let filteredList = array.filter((value) => {
        const localData = JSON.parse(localStorage.getItem(value));
        const today = new Date();
        if (value !== undefined && localData !== undefined) {
            const fullDateTime = new Date(localData.targetTime);
            const milliseconds = fullDateTime.getTime();
            const isToday = isItToday(fullDateTime);
            return  (fullDateTime.toLocaleTimeString() === "00:00:00" && isToday)
                    || (milliseconds > today.getTime());
        } else {
            console.log(value + " Local Storage data is not compatible");
        }
    });

    const finalList = array.filter((value) => {
        const keepThisItem = filteredList.includes(value);
        if (!keepThisItem) {
            localStorage.removeItem(value);
        }
        return keepThisItem;
    });
    load();
}
function isItToday(someDate) {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear();
}
function createListItemView(taskObject, key) {
    const li = document.createElement("li");
    const newTaskView = createTaskView(taskObject, key);

    li.appendChild(newTaskView);
    li.className = "fade-in list-item";

    return li;
}
function createTaskView(taskObject, key) {
    const date = new Date(taskObject.targetTime).toLocaleDateString();
    const time = new Date(taskObject.targetTime).toLocaleTimeString();
    let newTaskDiv = document.createElement("div");
    let newInputInfo = document.createElement("textarea");
    let newInputDate = document.createElement("input");

    newInputInfo.className = "task-view task-view-info ";
    newInputInfo.disabled = true;
    newInputInfo.value = taskObject.taskInfo;

    newInputDate.className = "task-view task-view-date";
    newInputDate.disabled = true;
    newInputDate.value = (time === "00:00:00") ? date : date + "  " + time ;

    newTaskDiv.className = "list-item-div fade-in";
    newTaskDiv.appendChild(creatDoneBtn(key));
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
document.addEventListener("DOMContentLoaded", filterTasksAndStorage);

