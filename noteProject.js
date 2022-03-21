console.log('Magic Notes');
showNotes();
//If user adds a note, add it to the localstorage......
let addBtn = document.getElementById('addBtn');


addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if(addTxt.value.length == 0){
        alert("write something to add a Task to complete!");
    }
    else if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        notesObj.push(addTxt.value);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
})

//function to show elements from the local storage 
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
               <div class=" noteCard my-2 mx-2 card" style="width: 18rem; background-color: rgb(247, 247, 247);">
                       <div class="card-body">
                           <h5 class="card-title">Task ${index + 1}</h5>
                           <p class="card-text">${element}</p>
                           <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Task</button>
                       </div>
                   </div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h3 style="color:skyblue;">No notes have been added yet!</h3>`

    }

}

//function to delete a note....

function deleteNote(index) {
    // console.log('I am deleting', index);

    let result = confirm("Do you want to delete this Task!");
    if(result){

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
   }
}


//delete all notes....

let deleteAllNotes = document.getElementById('deleteAllBtn');
deleteAllNotes.addEventListener('click', function (element) {

    let result = confirm("Do you really want to delete all the Tasks");
    if (result) {

        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(0, notesObj.length);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
})



//search functionality........

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value;
    // console.log('Input event fired', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

})
