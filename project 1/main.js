function save() {
    
    const newNoteForm = document.getElementById("myForm");
    const newTask ={
        
    }
    localStorage.setItem("taskInfo", myForm.target-time.value);
    localStorage.setItem("targetTime", myForm.task-info.value);
}
function load() {
    const myForm = document.getElementById("myForm");
    myForm.target-time.value = localStorage.getItem("taskInfo");
    myForm.task-info.value = localStorage.getItem("targetTime");
}
function removeTaskFromList(id) {
    localStorage.removeItem(id);
    document.getElementById(id).remove();
}
function addNote(event) {

    event.preventDefault();

    const noteForm = document.getElementById("myForm");
    let newNote = document.getElementById("content-add").value;
    let date = document.getElementById("date-input").value;
    let time = document.getElementById("time-input").value;
    let fullDate = Date.parse(date + " " + time);
    //Validation
    if (newNote === "") {
        alert("Please enter your task details!");
    } else if (fullDate < new Date().getTime()) {
        alert("Please enter correct date !");

    } else if (fullDate === null) {
        alert("The date is empty!");
    } else if (newNote != "" && fullDate >= new Date().getTime() && fullDate != null) {
        localStorage.setItem(
            counter,
            JSON.stringify({ date: fullDate, title: newNote.toString() })
        );
        document.getElementById(
            "list"
        ).innerHTML += `<li id=${counter}><div class="item-div">${JSON.parse(localStorage.getItem(counter)).title
        } </div><input class="input-date" type="text" disabled value=${new Date(
            JSON.parse(localStorage.getItem(counter)).date
        ).toLocaleDateString() +
        "-" +
        new Date(JSON.parse(localStorage.getItem(counter)).date).toTimeString()
            }> <button id=${counter} type="button" class="btn btn-warning btn-add btn-place" onclick="removeItemFromUnOrderList(this.id)"}>
                <span class="add-note">X</span>
            </button></li>`;
        document.getElementById("content-add").value = ``;


        counter++;
    }
}