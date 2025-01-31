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



/*function dragElement(element) {
    let isDragging = false;
    let startX, startY;
  
    element.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX - element.offsetLeft;
      startY = e.clientY - element.offsetTop;
    });
  
    element.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
  
      e.preventDefault(); // Prevent text selection while dragging
  
      const x = e.clientX - startX;
      const y = e.clientY - startY;
  
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    });
  
    element.addEventListener('mouseup', () => {
      isDragging = false;
    });

    element.addEventListener('click', () => {
        if(isDragging) {
            return;
        } else {
            window.location.href='spinach.html'
        }
    })
  }*/
const items = [
    {"name": "spinach", "image": "images/spinach.png","password": "spinach", "isVisible":false, "description": '"I love to eat spinach with greek yogurt!"'},
    {"name": "boots", "image": "images/boots.jpg","password": "boots", "isVisible":false, "description": '"Where did you get those boots? I remember my 65-year old uncle wearing a similar pair!"'},
    {"name": "cupid", "image": "images/cupid.jpeg","password": "cupid", "isVisible":false, "description": '"placeholder"'},
    {"name": "glasses", "image": "images/glasses.jpg","password": "glasses", "isVisible":false, "description": '"placeholder"'},
    {"name": "green_apple", "image": "images/green_apple.jpg","password": "green apple", "isVisible":false, "description": '"placeholder"'},
    {"name": "red_ribbon", "image": "images/red_ribbon.webp","password": "red ribbon", "isVisible":false, "description": '"placeholder"'},
    {"name": "penguin", "image": "images/penguin.webp","password": "penguin", "isVisible":false, "description": '"placeholder"'},
    {"name": "gorilla", "image": "images/gorilla.jpg","password": "gorilla", "isVisible":false, "description": '"placeholder"'},
    {"name": "baby_doll", "image": "images/baby_doll.jpg","password": "baby doll", "isVisible":false, "description": '"placeholder"'},
    {"name": "caution", "image": "images/caution.jpg","password": "caution", "isVisible":false, "description": '"placeholder"'},
    {"name": "phone", "image": "images/phone.jpg","password": "telephone", "isVisible":false, "description": '"placeholder"'}
]
 let activeIndex = 0;
localStorage.setItem("items", JSON.stringify(items))

class Box {
  constructor(item, index) {
    this.item = item;
    this.index = index;
    this.x = Math.random() * (1600 - 0) + 0;
    this.y = Math.random() * (800 - 0) + 0;
  }
  display(){
    //below is added segment//
    /*if (!this.item.isVisible) return; //skip rendering if not visible */

    const div1 = document.createElement('div')
    div1.id = "mydiv"
    const div2 = document.createElement('div')
    div2.id = 'mydivheader'

    //below is added segment 
    /* if (this.item.isVisible) {
      const img = document.createElement('img');
      img.src = this.item.image; // Set the image source from the item data
      img.alt = this.item.name;
      div2.innerHTML = ''; // Clear the header
      div2.appendChild(img); // Add the image to the header
  } else {
      div2.innerText = this.index; // Default text (if not visible)
  } 
*/


    div2.innerText = this.index 
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
  items.forEach((obj, index) => {
    const b = new Box(obj, index);
    b.display();
  })
}
addBoxes();

      