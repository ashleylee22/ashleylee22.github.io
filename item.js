let items = JSON.parse(localStorage.getItem('items'))
let activeIndex = Number(localStorage.getItem('activeIndex'))
console.log( activeIndex, items[activeIndex])
const image = document.querySelector('.spinach')

image.src = items[activeIndex].image

console.log("Active Index:", activeIndex);
console.log("Selected Item:", items[activeIndex]);


//sketch animation s//
var circles = []
var total = 200; //speed of drawing
var img;

function preload(){
    img = loadImage(items[activeIndex].image)
}
function setup(){
    createCanvas(img.width, img.height)
    background(255)

    for(var i =0; i<total; i++){
        circles[i] = {};
        circles[i].prevPos = {x: width/2, y: height/2}
        circles[i].pos = {x: width/2, y: height/2}
		circles[i].dir = random() > 0.5 ? 1 : -1
		circles[i].radius = random(3, 10)
		circles[i].angle = 0
	}
}

function draw() {
	for(var i = 0; i < total; i++){
		var circle = circles[i]
		circle.angle += 1 / circle.radius * circle.dir

		circle.pos.x += cos(circle.angle) * circle.radius
		circle.pos.y += sin(circle.angle) * circle.radius
		if(brightness(img.get(round(circle.pos.x), round(circle.pos.y))) > 70 || circle.pos.x < 0 || circle.pos.x > width || circle.pos.y < 0 || circle.pos.y > height){
			circle.dir *= -1
			circle.radius = random(3, 10)
			circle.angle += PI
		}
		stroke(img.get(circle.pos.x, circle.pos.y))
		line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y)

		circle.prevPos.x = circle.pos.x
		circle.prevPos.y = circle.pos.y
	}
} 

//getting user input//

function handleSubmit(event) {
    event.preventDefault(); // Prevents page refresh
    let inputValue = document.getElementById("userInput").value.trim();
    let messageElement = document.getElementById("message");

    if (inputValue === items[activeIndex].password) {  
        messageElement.textContent = items[activeIndex].description;
        messageElement.style.color = "green";

        items[activeIndex].isVisible = true; //mark item as visible if input value is correct
        localStorage.setItem("items", JSON.stringify(items)); // Save updated items
        console.log(items)
        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to index.html
        }, 9000); 
    } 
    
    else {
        messageElement.textContent = "Incorrect. Try again!";
        messageElement.style.color = "red";
    }
    messageElement.style.display = "block"; // Show message
}