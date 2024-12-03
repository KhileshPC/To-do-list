const getInputFormElement = ({ nameValue, ageValue, inputType, inputName }) => {
  return `<label for="username">Name</label>
          <input
            type='text'
            name='username'
            id='username'
            class="input-data"
            value="${nameValue}"
            required 
            disabled />
          <label for="username">Age</label>
          <input
            type='number'
            name='userage'
            id='userage'
            class="input-data"
            value="${ageValue}"
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

function addListItem(e) {
  if (e.preventDefault) e.preventDefault();

  
  const listCollection = document.getElementsByClassName("list-item");
  for (const list of listCollection) {
    const isEditing = list.id === id;

    // Highlight and enable fields for the currently edited item
    list.style.background = isEditing
      ? "linear-gradient(90deg, #E91E63 0%, #00BCD4 100%)"
      : "#cce5ff";

    // changing style - disable
    list.querySelector("input#username").disabled = !isEditing;
    list.querySelector("input#userage").disabled = !isEditing;

    //get updated aname & age
    const name = list.querySelector("input#username");
    const age = list.querySelector("input#userage");

    // toggle edit-update button on
    let changeCTA = list.querySelector(`#edit-btn`);
    if (isEditing) {
      changeCTA.textContent = "Update";
      changeCTA.onclick = () => {
        const updatedName = name.value;
        const updatedAge = age.value;

        const updatedData = localuserData.map((el) => {
          if (el.id === id) {
            return { ...el, name: updatedName, age: updatedAge }; // Update only the edited item
          }
          return el;
        });

        localStorage.setItem("userData", JSON.stringify(updatedData));
        localuserData = updatedData;

        editing = null;
        editListItem({ id: null });
      };
    } else {
      changeCTA.textContent = "Edit";
    }
  }

  }
  let name = document.getElementById("username").value;
  let age = document.getElementById("userage").value;

  validAge(age);

  const localuserData = JSON.parse(localStorage.getItem("userData")) || [];

  // Check if in edit mode

  // Create a new entry
  const id = new Date().getTime().toString();
  if (!name || !age) return;
  localuserData.push({ id, name, age });
  localStorage.setItem("userData", JSON.stringify(localuserData));

  // Clear input fields
  document.getElementById("username").value = "";
  document.getElementById("userage").value = "";
  displayList(); // Refresh the display
}

editing = null;
const editListItem = ({ id }) => {
  // Update the display for editing mode
  const listCollection = document.getElementsByClassName("list-item");
  for (const list of listCollection) {
    const isEditing = list.id === id;

    // Highlight and enable fields for the currently edited item
    list.style.background = isEditing
      ? "linear-gradient(90deg, #E91E63 0%, #00BCD4 100%)"
      : "#cce5ff";

    // changing style - disable
    list.querySelector("input#username").disabled = !isEditing;
    list.querySelector("input#userage").disabled = !isEditing;

    //get updated aname & age
    const name = list.querySelector("input#username");
    const age = list.querySelector("input#userage");

    // toggle edit-update button on
    let changeCTA = list.querySelector(`#edit-btn`);
    if (isEditing) {
      changeCTA.textContent = "Update";
      changeCTA.onclick = () => {
        const updatedName = name.value;
        const updatedAge = age.value;

        const updatedData = localuserData.map((el) => {
          if (el.id === id) {
            return { ...el, name: updatedName, age: updatedAge }; // Update only the edited item
          }
          return el;
        });

        localStorage.setItem("userData", JSON.stringify(updatedData));
        localuserData = updatedData;

        editing = null;
        editListItem({ id: null });
      };
    } else {
      changeCTA.textContent = "Edit";
    }
  }
};

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

function validAge(checkAge) {
  // Ensure age is a number and greater than 0
  const age = Number(checkAge); // Use `Number` to handle numeric values and strings

  if (isNaN(age) || age <= 0) {
    alert("Please enter a valid age greater than 0.");
    throw new Error("Invalid age input.");
  }

  return true; // Valid age
}
