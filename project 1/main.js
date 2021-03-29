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
function getKeysFromLocalStorage(){
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
function printDataToScreen(orderList){
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
    let filteredList = array.filter((value/*, index, arr*/) => {
        const localData = JSON.parse(localStorage.getItem(value));
        if (value === undefined || localData === undefined) {
            console.log("Local Storage data is not compatible");
        }
        let fullDateTime = new Date(localData.targetTime);
        const isToday = isItToday(fullDateTime);
        const today = new Date();
        //logTheDay(fullDateTime);
        console.log(fullDateTime.getTime() + " is today " + isToday + " and in the future " + (fullDateTime.getTime() > today.getTime()))
        return (fullDateTime.getTime() > today.getTime() ||
            isToday);
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
    const today = new Date()
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

document.addEventListener("DOMContentLoaded", filterTasksAndStorage);

