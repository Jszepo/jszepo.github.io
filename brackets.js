//window.addEventListener('load', renderHTML);
window.addEventListener("load", init);
// DOM

const titleMessage = document.getElementById("title-message");
const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
/*
These are now obsolete as there is no html for them to look for on startup
const round1 = document.getElementById('round-1');
const round2 = document.getElementById('round-2');
const round3 = document.getElementById('round-3');
const round4 = document.getElementById('round-4');
const round5 = document.getElementById('round-5');
const round6 = document.getElementById('round-6');
const round7 = document.getElementById('round-7');
*/

// vars
// the rounds
let g_roundSet = [];
// current round
let g_round = 0;
// items for the next round
let g_roundArray = [];

function init() {
  titleMessage.innerHTML = localStorage.title;
  size = localStorage.bracketSize;
  addRounds();
  items = localStorage.itemArray.split(",");
  renderHTML();
  fillRound();
}

// There must be an easier way to do this
function addRounds() {
  if (size == 64) {
    g_roundSet = [
      "round-1",
      "round-2",
      "round-3",
      "round-4",
      "round-5",
      "round-6",
      "round-7",
    ];
  } else if (size == 32) {
    g_roundSet = [
      "round-1",
      "round-2",
      "round-3",
      "round-4",
      "round-5",
      "round-6",
    ];
  } else if (size == 16) {
    g_roundSet = ["round-1", "round-2", "round-3", "round-4", "round-5"];
  } else if (size == 8) {
    g_roundSet = ["round-1", "round-2", "round-3", "round-4"];
  } else if (size == 4) {
    g_roundSet = ["round-1", "round-2", "round-3"];
  }
}

// dynamically creates the HTML
function renderHTML() {
  let r = 0;
  let q = 0;
  // loops once per round
  for (r = 0; r < g_roundSet.length; r++) {
    let currentRound = "round-" + (r + 1);
    let roundUl = document.createElement("ul");
    // I used this itemNumber variable to clean up to for loops and ifs later on.
    // It is showing the number of items in a round
    let itemNumber = 2 ** (g_roundSet.length - (r + 1));
    roundUl.setAttribute("class", "round " + currentRound);
    roundUl.setAttribute("id", currentRound);
    document.getElementById("tournament").appendChild(roundUl);
    // loops once per item in each round
    // itemNumber is over 2 because I am creating the top and bottom space on each loop.
    for (q = 0; q < itemNumber / 2; q++) {
      // This is to make sure the last round only has one line
      // No bottom option
      if (r === g_roundSet.length - 1) {
        let roundLi1 = document.createElement("li");
        roundLi1.setAttribute("class", "spacer");
        roundLi1.innerHTML = "&nbsp;";
        roundUl.appendChild(roundLi1);

        let roundLi2 = document.createElement("li");
        roundLi2.setAttribute("class", "game game-top  ");
        roundLi2.appendChild(document.createElement("span"));
        roundUl.appendChild(roundLi2);

        let roundLi3 = document.createElement("li");
        roundLi3.setAttribute("class", "spacer");
        roundLi3.innerHTML = "&nbsp;";
        roundUl.appendChild(roundLi3);
      }
      // this is to make the last item in the round have an extra space at the bottom
      else if (q === itemNumber / 2 - 1) {
        let roundLi1 = document.createElement("li");
        roundLi1.setAttribute("class", "spacer");
        roundLi1.innerHTML = "&nbsp;";
        roundUl.appendChild(roundLi1);

        let roundLi2 = document.createElement("li");
        roundLi2.setAttribute("class", "game game-top  ");
        roundLi2.appendChild(document.createElement("span"));
        roundUl.appendChild(roundLi2);

        let roundLi3 = document.createElement("li");
        roundLi3.setAttribute("class", "game game-spacer");
        roundLi3.innerHTML = "&nbsp;";
        roundUl.appendChild(roundLi3);

        let roundLi4 = document.createElement("li");
        roundLi4.setAttribute("class", "game game-bottom ");
        roundLi4.appendChild(document.createElement("span"));
        roundUl.appendChild(roundLi4);

        let roundLi5 = document.createElement("li");
        roundLi5.setAttribute("class", "spacer");
        roundLi5.innerHTML = "&nbsp;";
        roundUl.appendChild(roundLi5);
      } else {
        let roundLi1 = document.createElement("li");
        roundLi1.setAttribute("class", "spacer");
        roundLi1.innerHTML = "&nbsp;";
        roundUl.appendChild(roundLi1);

        let roundLi2 = document.createElement("li");
        roundLi2.setAttribute("class", "game game-top  ");
        roundLi2.appendChild(document.createElement("span"));
        roundUl.appendChild(roundLi2);

        let roundLi3 = document.createElement("li");
        roundLi3.setAttribute("class", "game game-spacer");
        roundLi3.innerHTML = "&nbsp;";
        roundUl.appendChild(roundLi3);

        let roundLi4 = document.createElement("li");
        roundLi4.setAttribute("class", "game game-bottom ");
        roundLi4.appendChild(document.createElement("span"));
        roundUl.appendChild(roundLi4);
      }
    }
  }
}

function fillRound() {
  var r = g_round;
  var i;
  var other;

  for (i = 0, other = 1; i < items.length; i++, other = other + 2) {
    /*fills the values for the round
        adds the click handlers for each item
        on slick, adds the value to the new array and will remove the other item in the pair if it has been clicked
        */
    document.getElementById(g_roundSet[r]).children[other].innerHTML = items[i];
    document.getElementById(g_roundSet[r]).children[other].id = other;

    if (g_round > 0) {
      document.getElementById(g_roundSet[r - 1]).children[other].id = "";
    }

    // Add the Onclick actions to each item
    document.getElementById(g_roundSet[r]).children[other].onclick = function (
      e
    ) {
      // trying to manage the comparison here. Could probably use a seperate function
      /* used the target framewort to allow it to be self aware. It will then remove the winner 
            value two up or two down depending on if it is a bottom value or a top value
            */
      console.log(g_roundArray);
      if (
        e.target.classList.contains("game-top") &&
        !e.target.classList.contains("winner")
      ) {
        // bolds on click
        e.target.classList.add("winner");
        targetID = parseInt(e.target.id);
        compareID = targetID + 2;

        if (document.getElementById(compareID).classList.contains("winner")) {
          // removes winner from the other item in the pair
          document.getElementById(compareID).classList.remove("winner");
          //removes the other item from the pair from the array
          // gets the other value, then the index of that value, deletes it, then adds the new one
          otherValue = document.getElementById(compareID).innerHTML;
          otherIndex = g_roundArray.findIndex(function testValue(item) {
            return item === otherValue;
          });
          delete g_roundArray[otherIndex];
          g_roundArray[otherIndex] = e.target.innerHTML;
          nextRound();
        } else {
          // adds the innterHTML to a new array
          g_roundArray.push(e.target.innerHTML);
          nextRound();
        }
      } else if (
        e.target.classList.contains("game-bottom") &&
        !e.target.classList.contains("winner")
      ) {
        // bolds on click
        e.target.classList.add("winner");
        targetID = parseInt(e.target.id);
        compareID = targetID - 2;

        if (document.getElementById(compareID).classList.contains("winner")) {
          // removes winner from the other item in the pair
          document.getElementById(compareID).classList.remove("winner");
          //removes the other item from the pair from the array
          // gets the other value, then the index of that value, deletes it, then adds the new one
          otherValue = document.getElementById(compareID).innerHTML;
          otherIndex = g_roundArray.findIndex(function testValue(item) {
            return item === otherValue;
          });
          delete g_roundArray[otherIndex];
          g_roundArray[otherIndex] = e.target.innerHTML;
          nextRound();
        } else {
          // adds the innterHTML to a new array
          g_roundArray.push(e.target.innerHTML);
          nextRound();
        }
      }
    };
  }
}

function nextRound() {
  // each click, this functions checks if the array is the corect length. it will run if it is.
  // asks the user to confirm
  if (g_roundArray.length == items.length / 2) {
    let c = confirm(
      "Are you ready to go to the next round?\nYou cannot go back"
    );
    if (c == true) {
      // winner option
      if (g_roundArray.length == 1) {
        items = g_roundArray;
        g_roundArray = [];
        g_round = g_round + 1;
        fillRound();
        alert("The Winner Is:\n" + items[0]);
      } else {
        //stores the current values in items, sets the round to empty, and then runs the round fill again
        items = g_roundArray;
        g_roundArray = [];
        g_round = g_round + 1;
        fillRound();
      }
    } else {
      // ER unhide an "I'm finished" button that runs the next round function on click
    }
  }
}
