//arr for task;
let initialTaskarr = [];

//class for task;
class ToDO {
  task;

  constructor(task) {
    this.task = task;
  }
}

//function for deleting the selected task
function deleteMe(index) {
  let arr2 = JSON.parse(localStorage.getItem("x"));
  console.log("legnth = ", arr2.length);

  let arr3 = [];
  let j = 0;
  for (let i = 0; i < arr2.length; i++) {
    if (i === index) continue;
    else {
      arr3[j] = arr2[i];
      j++;
    }
  }

  //console.log("arr2 inside delete", arr3);

  initialTaskarr = arr3;
  if (initialTaskarr.length === 0) {
    console.log("legnth = ", initialTaskarr.length);
    clearAll();
    return;
  }
  //console.log("inint", intin)
  localStorage.setItem("x", JSON.stringify(initialTaskarr));
  tableBody.innerHTML = " ";
  display.show();
  // display.show();
}

//class for all display related tasks
//valid, show, msg

class Display {
  valid(task) {
    if (task.task.length > 2) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    let retrieveData = localStorage.getItem("x");
    let taskArr = JSON.parse(retrieveData);
    if (retrieveData !== null) {
      let clearallButton = document.getElementById("clearallButton");
      clearallButton.disabled = false;
      initialTaskarr = taskArr.slice();
    } else {
      clearallButton.disabled = true;
    }

    //console.log("yeh hai arr", taskArr[0]);

    for (let i = 0; i < initialTaskarr.length; i++) {
      let tableBody = document.getElementById("tableBody");
      let id = i;
      let row = `<tr>
                              <th scope="row">${i + 1}</th>
                              <td>${initialTaskarr[i].task}</td>
                              <td><button type="button" id=${id} class="btn btn-danger" onclick="deleteMe(${id})">X</button></td>

                         </tr>`;

      tableBody.innerHTML += row;
    }
  }

  clear() {
    // let libraryForm = document.getElementById("libraryform");
    taskinputform.reset();
  }

  msg(messageType, msg) {
    let message = document.getElementById("message");
    message.innerHTML = ` <div class="alert alert-${messageType} alert-dismissible fade show" role="alert">
  <strong>Message !</strong>  ${msg}.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;

    setTimeout(function () {
      message.innerHTML = "";
    }, 5000);
  }

  deleteMe(index) {
    let arr2 = JSON.parse(localStorage.getItem("x"));

    let arr3 = [];
    let j = 0;
    for (let i = 0; i < arr2.length; i++) {
      if (i === index) continue;
      else {
        arr3[j] = arr2[i];
        j++;
      }
    }

    console.log("arr2 inside delete", arr3);

    initialTaskarr = arr3;
    //console.log("inint", intin)
    localStorage.setItem("x", JSON.stringify(initialTaskarr));
    // display.show();
  }
}

// if submit event occurs
let taskinputform = document.getElementById("taskinputform");
taskinputform.addEventListener("submit", tasksubmit);

function tasksubmit(e) {
  e.preventDefault();
  console.dir("okokok");

  let taskname = document.getElementById("taskname").value;
  let taskAdded = new ToDO(taskname);

  if (display.valid(taskAdded)) {
    initialTaskarr.push(taskAdded);
    display.msg("success", "You task has been successfully added");
    localStorage.setItem("x", JSON.stringify(initialTaskarr));
  } else {
    display.msg("warning", "Sorry, task length sholud be more than 2");
  }

  tableBody.innerHTML = " ";
  display.show();

  display.clear();
}

//for first load
const display = new Display();
tableBody.innerHTML = " ";
display.show();

//for clear all button
function clearAll() {
  // console.log("inside cleartall");
  localStorage.removeItem("x");
  initialTaskarr = [];

  tableBody.innerHTML = " ";
  display.show();

  console.log("clear all called intin arar", initialTaskarr);
  //localStorage.setItem("x", initialTaskarr);
}


