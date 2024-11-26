const displayList = (e) => {
  document.querySelector(".list-col").innerHTML = "";
  const localuserData = JSON.parse(localStorage.getItem("userData")) || [];

  for (const el of localuserData) {
    if (!el) {
      document.querySelector(".list-col").innerHTML =
        "user data not proper, clearing data. Please try again";
      localStorage.removeItem("userData");
      return "user data not proper";
    }
    const { id, name, age } = el;
    let li = document.createElement("li");
    li.id = id ? `${id}` : "def";
    li.appendChild(document.createTextNode(`Name: ${name} Age: ${age}`));
    //create edit btn
    let editbtn = document.createElement("button");
    //creatin class for btn
    editbtn.className = "list-btn";
    editbtn.textContent = "Edit";
    editbtn.onclick = () => editListItem({ li, id, name, age });
    //delete btn
    let deletebtn = document.createElement("button");
    //create class for btn
    deletebtn.className = "list-btn";
    deletebtn.textContent = "Delete";
    deletebtn.onclick = () => deleteListItem({ id, name, age });
    // append buttons
    li.appendChild(editbtn);
    li.appendChild(deletebtn);
    // Finally, append "li" into ul
    document.querySelector(".list-col").appendChild(li);
  }
  return "";
};

let editing = null;

function addListItem(e) {
  //veirfy age is greater than 0
  let checkAge = document.getElementById("userage").value;
  if (!validAge(checkAge)) {
    alert("error in age");
    return;
  }
  // check if it is in edit mode
  if (editing) {
    // get current list value from localstorage
    const currData = JSON.parse(localStorage.getItem("userData")) || [];
    // update list item of selected ID
    let name = document.getElementById("username").value;
    let age = document.getElementById("userage").value;

    const newData = currData.map((el) => {
      if (el.id == editing) {
        el.name = name;
        el.age = age;
      }
      return el;
    });
    localStorage.setItem("userData", JSON.stringify(newData));
    displayList();
    editing = null;
    return "";
    //code
  }

  // for creating unique ID
  const timeStamp = new Date().getTime().toString();
  const localuserData = JSON.parse(localStorage.getItem("userData")) || [];
  const id = timeStamp;
  let name = document.getElementById("username").value;
  let age = document.getElementById("userage").value;
  if (!id || !name || !age) return "";
  //push data to local
  localuserData.push({ id, name, age });
  localStorage.setItem("userData", JSON.stringify(localuserData));
  displayList();
  return "";
}

function editListItem({ li, id, name, age }) {
  editing = id;
  currentLi = li;
  document.getElementById("username").value = name;
  document.getElementById("userage").value = age;

  // currentLi.style.background =
  //   "linear-gradient(90deg, #E91E63 0%, #00BCD4 100%)";

  let changeCTA = document.getElementById("submitbtn");
  if (changeCTA.innerHTML == "Save") {
    changeCTA.innerHTML = "Save";
  } else {
    changeCTA.innerHTML = "Update";
  }

  return "";
}

function deleteListItem({ id, name, age }) {
  // get current list value from localstorage
  const currData = JSON.parse(localStorage.getItem("userData")) || [];
  // filter out this "id" from above list
  const newData = currData.filter((el) => el.id !== id);
  // set this filtered data into userData in localStorage
  localStorage.setItem("userData", JSON.stringify(newData));
  displayList();
  return "";
}

displayList();

//age validation
function validAge(checkAge) {
  // let checkAge = document.getElementById("userage").value;
  checkAge = parseInt(checkAge, 10);
  return checkAge > 0;
}
