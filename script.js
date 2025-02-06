const boxes = document.querySelector('.boxes')
function makeDraggable(elmnt, clickCallback) {
  let startX = 0, startY = 0, currentX = 0, currentY = 0;
  let isDragging = false;
  const threshold = 5;
  elmnt.style.position = "absolute";
  elmnt.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    currentX = elmnt.offsetLeft;
    currentY = elmnt.offsetTop;
    isDragging = false;

    const onPointerMove = (moveEvent) => {
      let dx = moveEvent.clientX - startX;
      let dy = moveEvent.clientY - startY;

      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
        isDragging = true;
        elmnt.style.left = `${currentX + dx}px`;
        elmnt.style.top = `${currentY + dy}px`;
      }
    };

    const onPointerUp = () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);

      if (!isDragging && typeof clickCallback === "function") {
        clickCallback();
      }
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  });

  elmnt.ondragstart = () => false;
}

let items = [
    {"name": "spinach", "image": "images/spinach.png","password": "spinach", "isVisible":false, "description": 'I love eating spinach with greek yogurt!'},
    {"name": "boots", "image": "images/boots.jpg","password": "boots", "isVisible":false, "description": 'Where did you get those boots? I remember my 65-year old uncle wearing a similar pair!'},
    {"name": "cupid", "image": "images/cupid.jpeg","password": "cupid", "isVisible":false, "description": 'I think Cupid is what brought my boyfriend and me together!'},
    {"name": "glasses", "image": "images/glasses.jpg","password": "glasses", "isVisible":false, "description": 'The legs of my glasses broke, so I have been using them with tapes on the sides.'},
    {"name": "green_apple", "image": "images/green_apple.jpg","password": "green apple", "isVisible":false, "description": 'I accidentally dropped my green apple, and now it has a dent. How could this happen to me???'},
    {"name": "red_ribbon", "image": "images/red_ribbon.jpg","password": "red ribbon", "isVisible":false, "description": 'I found a red ribbon tied to my door this morning... do you think that means something, or...?'},
    {"name": "penguin", "image": "images/penguin.jpg","password": "penguin", "isVisible":false, "description": 'So I was watching this documentary about penguins, and actually, they can swim faster than most fish, you know?'},
    {"name": "gorilla", "image": "images/gorilla.jpg","password": "gorilla", "isVisible":false, "description": "My armpits are hairy as a gorilla's. Do you wanna smell check? "},
    {"name": "baby_doll", "image": "images/baby_doll.jpg","password": "baby doll", "isVisible":false, "description": 'I was playing with my baby doll but then the head fell off. So I put the head in a trophy case. Do you wanna come see it?'},
    {"name": "caution", "image": "images/caution.jpg","password": "caution", "isVisible":false, "description": 'There was a yellow caution sign at the Met but I bumped into it. Do you think anyone saw?'},
    {"name": "phone", "image": "images/phone.jpg","password": "telephone", "isVisible":false, "description": 'My cat accidentally dialed my ex-boyfried... '},
    {"name": "keychain", "image": "images/keychain.jpg", "password": "keychain", "isVisible":false, "description": "My ex give me this keychain. I don't know what to do with it. Should I keep it? "},
    {"name": "cake", "image": "images/cake.jpeg", "password": "cake", "isVisible":false, "description": "My girlfriend bought a strawberry shortcake for my birthday, but I think she forgot that I am allergic to strawberries..."},
    {"name": "chihuahua", "image": "images/chihuahua.jpeg", "password": "chihuahua", "isVisible":false, "description": 'Everyone thinks chihuahuas are ugly, but I think otherwise.'},
    {"name": "clock", "image": "images/clock.jpeg", "password": "clock", "isVisible":false, "description": '"My alarm clock broke, so I was late to work, and I think my boss will fire me :( '},
    {"name": "crayon", "image": "images/crayon.jpeg", "password": "crayon", "isVisible":false, "description": "I ran out of eyeliner so I used a crayon instead. "},
    {"name": "omelette", "image": "images/omelette.jpeg", "password": "omelette", "isVisible":false, "description": "I like omelette!"}
  
]

//localStorage.removeItem("items");
//localStorage.setItem("items", JSON.stringify(items)); //comment it out after done with editing descriptions


 let activeIndex = 0;
  let newItems = JSON.parse(localStorage.getItem('items')) //what jakob added; he also changed "const items" to "let items" 
  if(newItems && newItems.length > 0) {
    items = newItems;
  } else {
    localStorage.setItem("items", JSON.stringify(items))

  } 
class Box {
  constructor(item, index) {
    this.item = item;
    this.index = index;
    this.x = Math.random() * (1600 - 0) + 0;
    this.y = Math.random() * (800 - 0) + 0;
  }
  display(){
    //below is added segment for visibility of image//
    /*if (!this.item.isVisible) return; //skip rendering if not visible */

    const div1 = document.createElement('div')
    div1.id = "mydiv"
    const div2 = document.createElement('div')
    div2.id = 'mydivheader'

    //replacing the image with mydivheader
     if (this.item.isVisible) {
      const img = document.createElement('img');
      img.src = this.item.image; // Set the image source from the item data
      img.alt = this.item.name;
      div2.innerHTML = ''; // Clear the header
      div2.appendChild(img); // Add the image to the header
  } else {
      div2.innerText = this.index; // Default text (if not visible)
  } 

    
    div1.appendChild(div2)
    div1.style.left = this.x+'px'
    div1.style.top = this.y+'px'
    boxes.appendChild(div1)

    makeDraggable(div1, () => {
      activeIndex = this.index;
      localStorage.setItem("activeIndex", activeIndex)
      window.location.href = "spinach.html"; // Change to your desired URL
    });
  }
}
function addBoxes(){
  boxes.innerHTML = '';  // Clear any existing boxes
  items.forEach((obj, index) => {
    const b = new Box(obj, index);
    b.display();
  })
}
addBoxes();

// reseting the boxes 


function resetBoxes() {
  items.forEach(item => item.isVisible = false); // Reset all items (all items to be hidden )
  localStorage.setItem("items", JSON.stringify(items)); // Save reset state (updating the state in local storage)
  addBoxes(); // Re-render the boxes by re-calling the function 
}

// Create Reset Button
const resetButton = document.createElement("button");
resetButton.innerText = "Reset";
resetButton.classList.add("reset_button");//adds css class 
resetButton.addEventListener("click", resetBoxes); //if the user clicks on the resetButton, the function 'resetBoxes' will run.

document.body.appendChild(resetButton);


 
