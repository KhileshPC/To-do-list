const getInputFormElement = ({ nameValue, ageValue, inputType, inputName }) => {
  return `<label for="username">Name</label>
          <input
            type='text'
            name='username'
            id='username'
            class="input-data"
            value=${nameValue}
            required 
            disabled />
          <label for="username">Age</label>
          <input
            type='number'
            name='userage'
            id='userage'
            class="input-data"
            value=${ageValue}
            required 
            disabled />`;
};

const displayList = (e) => {
  document.querySelector(".list-col").innerHTML = "";
  const localuserData = JSON.parse(localStorage.getItem("userData")) || [];

  localuserData.forEach((el, i) => {
    if (!el) {
      document.querySelector(".list-col").innerHTML =
        "user data not proper, clearing data. Please try again";
      localStorage.removeItem("userData");
      return "user data not proper";
    }
    const { id, name, age } = el;
    let li = document.createElement("li");
    li.id = id ? `${id}` : "def";
    // li.appendChild(document.createTextNode(`Name: ${name} Age: ${age}`));
    li.innerHTML = getInputFormElement({
      name: "Name",
      inputType: "text",
      inputName: "username",
      ageValue: age,
      nameValue: name,
    });
    //create edit btn
    let editbtn = document.createElement("button");
    //creatin class for btn
    editbtn.className = "list-btn";
    editbtn.id = "edit-btn";
    editbtn.textContent = "Edit";
    editbtn.onclick = () => editListItem({ li, id, name, age });
    //delete btn
    let deletebtn = document.createElement("button");
    //create class for btn
    deletebtn.className = "list-btn";
    deletebtn.id = "delete-btn";
    deletebtn.textContent = "Delete";
    deletebtn.onclick = () => deleteListItem({ id, name, age });
    // append buttons
    li.appendChild(editbtn);
    li.appendChild(deletebtn);
    li.className = "list-item";
    // Finally, append "li" into ul
    document.querySelector(".list-col").appendChild(li);
  });
  return "";
};

let editing = null;

function addListItem({ name, age }) {
  // check if it is in edit mode
  if (editing) {
    validAge(age);
    // get current list value from localstorage
    const currData = JSON.parse(localStorage.getItem("userData")) || [];
    // update list item of selected ID
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
  let _name = document.getElementById("username").value;
  let _age = document.getElementById("userage").value;
  validAge(_age);
  if (!id || !_name || !_age) return "";
  //push data to local
  localuserData.push({ id, _name, _age });
  localStorage.setItem("userData", JSON.stringify(localuserData));
  displayList();
  return "";
}

function editListItem({ li, id, name, age }) {
  // reset
  displayList();
  // set editing flag/ value
  editing = id;
  // li.style.background = "linear-gradient(90deg, #E91E63 0%, #00BCD4 100%)"
  // add color for editing list
  const listCollection = document.getElementsByClassName("list-item");
  for (const list of listCollection) {
    list.style.background =
      list?.id == editing
        ? "linear-gradient(90deg, #E91E63 0%, #00BCD4 100%)"
        : "#cce5ff";

    list.querySelector("input#username").disabled =
      list?.id == editing ? false : true;
    list.querySelector("input#userage").disabled =
      list?.id == editing ? false : true;
    let changeCTA = list.querySelector(`#edit-btn`);
    if (list?.id == editing) {
      changeCTA.textContent = "Update";
      changeCTA.onclick = () => addListItem({ name, age });
    } else {
      changeCTA.textContent = "Edit";
    }
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
  parseInt(checkAge, 10) > 0 ? " " : alert("error in page");
}
