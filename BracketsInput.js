window.addEventListener("load", init);

// Globals
let items = []; // later used to create the itemArray

// DOM
const numberInput = document.getElementById("number-input");
const titleInput = document.getElementById("title-input");
const itemInput = document.getElementById("item-input");
const inputs = document.getElementById("inputs");
const numberMessage = document.getElementById("number-message");
const titleMessage = document.getElementById("title-message");
const itemMessage = document.getElementById("item-message");
const itemAdd = document.getElementById("item-add");
const submitBracket = document.getElementById("submit-bracket");
const resetBracket = document.getElementById("reset-bracket");
const editBracket = document.getElementById("edit-bracket");
const edit = document.getElementById("edit");
const edits = document.getElementById("edits");
const saveEdits = document.getElementById("save-edits");

// others
numberInput.value = 16;
localStorage.bracketSize = 16;

function init() {
  // add event listener to the input fields
  numberMessage.innerHTML = "16 Items";
  numberInput.addEventListener("change", bracketNumber);
  numberInput.addEventListener("focusout", bracketNumber);
  titleInput.addEventListener("change", displayTitle);
  itemAdd.addEventListener("click", bracketAdd);
  itemAdd.addEventListener("click", editItems); // if the user has the edit window open, this will update it
  submitBracket.addEventListener("click", bracketCreate);
  resetBracket.addEventListener("click", reset);
  editBracket.addEventListener("click", showEdit);
  editBracket.addEventListener("click", editItems);
  saveEdits.addEventListener("click", save);
}

function bracketNumber() {
  numberMessage.innerHTML = numberInput.value + " Items";
  localStorage.bracketSize = numberInput.value;
}

// adds the title input into the title field. Saves to local storage
function displayTitle() {
  titleMessage.innerHTML = titleInput.value;
  localStorage.title = titleInput.value;
  titleInput.value = "";
}

function bracketAdd() {
  // add the inputs at the click of a button to an array
  // will not allow an empty string
  if (items.length == numberInput.value) {
    itemInput.focus();
    alert(
      "You have filled your bracket.\nPlease submit the bracket, or choose a larger size"
    );
  } else if (itemInput.value === "") {
    alert("Please input a non-empty string"); // to be updated later on
    itemInput.value = "";
    itemInput.focus();
  } else {
    items.push(itemInput.value);
    localStorage.itemArray = items;
    itemInput.value = "";
    itemInput.focus();
    itemMessage.innerHTML = items;
    numberMessage.innerHTML =
      items.length + " of " + numberInput.value + " Items";
  }
}

//loads the next page and
function bracketCreate() {
  if (items.length == localStorage.bracketSize) {
    random = randomItems(items);
    window.location.href = "./brackets.html";
  } else {
    alert(
      "Please make sure the bracket size matches the number of inputs.\nYou have " +
        items.length +
        " of " +
        localStorage.bracketSize
    );
    itemInput.value = "";
    itemInput.focus();
  }
}

// should randomly shuffle the array around
function randomItems(array) {
  var i = array.length,
    j = "",
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    // swaps randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// shows the edit field
function showEdit() {
  edit.style.display = "block";
}
// allows the user to edit the items
function editItems() {
  var i;
  for (i = 0; i < items.length; i++) {
    if (i === 0) {
      edits.innerHTML = items[i];
    } else {
      edits.innerHTML = edits.value + "\n" + items[i];
    }
  }
}
// save option for the edit function
function save() {
  if (edits.value.split("\n").length > numberInput.value) {
    edits.focus();
    alert("You have too many items.\nPlease choose a larger size or make cuts");
  } else {
    items = edits.value.split("\n");
    itemInput.focus();
    itemMessage.innerHTML = items;
    localStorage.itemArray = items;
    edit.style.display = "none";
  }
}

// warns the user, prints the old bracket, resets the current bracket
function reset() {
  c = confirm("Please confirm your choice\nThis cannot be undone");
  if (c == true) {
    itemMessage.innerHTML = items;
    items = [];
    localStorage.itemArray = [];
  } else {
  }
}
