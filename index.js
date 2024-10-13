
// set a constant for the king card
// references the html document, queryselector references any elements with classname chordcard after '.'

// pick out the squares, all means select all elements with class square
const squares = document.querySelectorAll(".square")
//console.log(squares)
const chordsquares = document.querySelectorAll(".chordsquare")
const swapbuttons = document.querySelectorAll(".swapbutton")
const flipbuttons = document.querySelectorAll(".flipbutton")
console.log(swapbuttons)

// pick out the info display, select element with ID info after '#info'
const infoDisplay = document.querySelector("#info")


var imagearray = [];
var imagearrayminor = [];



function populatorArray (){
    var imagenames = ["Sun-1-Maj.png", "Sun-2-Min.png", "Sun-3-Min.png", "Sun-4-Maj.png",
        "Sun-5-Maj.png", "Sun-6-Min.png", "Sun-7-Dim.png"]
        for (i=0; i<7; i++) {
            let img = document.createElement('img');
            img.src = "cards/" + imagenames[i]
            img.classList.add("chess-piece")
            img.setAttribute("id", imagenames[i].split(".png")[0])
            img.setAttribute("draggable", true)
            img.addEventListener("drag", dragging)
            img.addEventListener("dragstart", dragStart)
            imagearray.push(img)
            //console.log(img)
            mydiv = document.querySelector("#chordsquare" + (i+1))
            //console.log(mydiv)
            mydiv.appendChild(img)
            //mydiv.append(img)
            //console.log(img)

        }   
}

function populatorArray (){
    var cardcontainer = ["front", "back"]
    var backnames = ["Sun 1 Min.png", "Sun 2 Maj.png", "Sun 3 Maj.png", "Sun 4 Min.png",
        "Sun 5 Min.png", "Sun 6 Maj.png", "Sun 7 Maj.png"]
    var imagenames = ["Sun 1 Maj.png", "Sun 2 Min.png", "Sun 3 Min.png", "Sun 4 Maj.png",
        "Sun 5 Maj.png", "Sun 6 Min.png", "Sun 7 Dim.png"]
        
        for (i=0; i<7; i++) {
            let card = document.createElement('div');

            card.classList.add("chess-piece");
            card.setAttribute("draggable", true);
            card.addEventListener("drag", dragging);
            card.addEventListener("dragstart", dragStart);
            cardinner = document.createElement('div');
            
            cardfront = document.createElement('div');
            cardback = document.createElement('div');
            cardinner.classList.add("cardinner");
            
            cardfront.classList.add("cardinnerfront");
            cardfront.classList.add("cardface");
            cardback.classList.add("cardinnerback");
            cardback.classList.add("cardface");


            cardinner.appendChild(cardfront);
            cardinner.appendChild(cardback);

            let imgfront = document.createElement('img');
            let imgback = document.createElement('img');

            imgfront.classList.add("imagesize");
            imgback.classList.add("imagesize");

            imgfront.setAttribute("draggable", false);
            imgback.setAttribute("draggable", false);

            cardfront.appendChild(imgfront);
            cardback.appendChild(imgback);

            imgfront.src = "cards2/" + imagenames[i];
            imgback.src = "cards2/" + backnames[i];

            imgfront.setAttribute("id", imagenames[i].split(".png")[0])
            imgback.setAttribute("id", backnames[i].split(".png")[0])

            card.appendChild(cardinner);



  
            //img.src = "cards/" + imagenames[i]
            //img.classList.add("chess-piece")
            //img.setAttribute("id", imagenames[i].split(".png")[0])
            //img.setAttribute("draggable", true)
            //img.addEventListener("drag", dragging)
            //img.addEventListener("dragstart", dragStart)
            //imagearrayminor.push(img)
            //console.log(img)
            
            //cardinner.addEventListener("click", () => {
                //cardinner.classList.toggle("cardinner__isflipped");
            //});
            
            mydiv = document.querySelector("#chordsquare" + (i+1))
            //console.log(mydiv)
            mydiv.appendChild(card)



            console.log(mydiv)
            //mydiv.append(img)
            //console.log(img)

        }  

 
        
}

function populatorArraymoon (){
    var cardcontainer = ["front", "back"]
    var backnames = ["Moon 1 Maj.png", "Moon 2 Maj.png", "Moon b3 Min.png", "Moon 4 Maj.png",
        "Moon 5 Maj.png", "Moon b6 Min.png", "Moon b7 Min.png"]
    var imagenames = ["Moon 1 Min.png", "Moon 2 Dim.png", "Moon b3 Maj.png", "Moon 4 Min.png",
        "Moon 5 Min.png", "Moon b6 Maj.png", "Moon b7 Maj.png"]
        
        for (i=0; i<7; i++) {
            let card = document.createElement('div');

            card.classList.add("chess-piece");
            card.setAttribute("draggable", true);
            card.addEventListener("drag", dragging);
            card.addEventListener("dragstart", dragStart);
            cardinner = document.createElement('div');
            
            cardfront = document.createElement('div');
            cardback = document.createElement('div');
            cardinner.classList.add("cardinner");
            
            cardfront.classList.add("cardinnerfront");
            cardfront.classList.add("cardface");
            cardback.classList.add("cardinnerback");
            cardback.classList.add("cardface");


            cardinner.appendChild(cardfront);
            cardinner.appendChild(cardback);

            let imgfront = document.createElement('img');
            let imgback = document.createElement('img');

            imgfront.classList.add("imagesize");
            imgback.classList.add("imagesize");

            imgfront.setAttribute("draggable", false);
            imgback.setAttribute("draggable", false);

            cardfront.appendChild(imgfront);
            cardback.appendChild(imgback);

            imgfront.src = "cards2/" + imagenames[i];
            imgback.src = "cards2/" + backnames[i];

            imgfront.setAttribute("id", imagenames[i].split(".png")[0])
            imgback.setAttribute("id", backnames[i].split(".png")[0])

            card.appendChild(cardinner);



  
            //img.src = "cards/" + imagenames[i]
            //img.classList.add("chess-piece")
            //img.setAttribute("id", imagenames[i].split(".png")[0])
            //img.setAttribute("draggable", true)
            //img.addEventListener("drag", dragging)
            //img.addEventListener("dragstart", dragStart)
            //imagearrayminor.push(img)
            //console.log(img)
            
            //cardinner.addEventListener("click", () => {
                //cardinner.classList.toggle("cardinner__isflipped");
            //});
            
            mydiv = document.querySelector("#chordsquare" + (i+1))
            //console.log(mydiv)
            mydiv.appendChild(card)



            console.log(mydiv)
            //mydiv.append(img)
            //console.log(img)

        }  

 
        
}



        


window.onload = function () {
    populatorArray()
    sunmoon = "";


}

var sunmoon = "";

const sunbutton = document.querySelector("#sunbutton")
const moonbutton = document.querySelector("#moonbutton")
const sunmoonbuttons  = document.querySelectorAll(".sunmoonbutton")

sunbutton.addEventListener("click", sunclick);
moonbutton.addEventListener("click", moonclick);

function sunclick(){
    sunmoon = "sun"
    chordsquares.forEach(chordsquare => {
        chordsquare.innerHTML=""
    })
    populatorArray()
}

function moonclick(){
    sunmoon = "moon"
    chordsquares.forEach(chordsquare =>{
        chordsquare.innerHTML= ""
    }
    )
    populatorArraymoon()
}


// addEvent method works by attaching it to an element (king is an element)
// listening for a drag event on the king element, and if so, calls a function called dragging

squares.forEach(square => {
    square.addEventListener("dragstart", dragStart)
    square.addEventListener("dragover", dragOver)
    square.addEventListener("dragenter", dragEnter)
    square.addEventListener("dragleave", dragLeave)
    square.addEventListener("drop", dragDrop)
    //square.addEventListener("dragend", dragEnd)
}
)

swapbuttons.forEach(swapbutton => {
    swapbutton.addEventListener("mouseover",hoverhighlighter)
    swapbutton.addEventListener("click",hoverclick)
    swapbutton.addEventListener("mouseleave",hoverleave)
}
)

sunmoonbuttons.forEach(sunmoonbutton => {
    sunmoonbutton.addEventListener("mouseover",hoverhighlighter)
    sunmoonbutton.addEventListener("click",hoverclick)
    sunmoonbutton.addEventListener("mouseleave",hoverleave)
}
)

flipbuttons.forEach(flipbutton => {
    flipbutton.addEventListener("mouseover",hoverhighlighter)
    flipbutton.addEventListener("click",hoverclick)
    flipbutton.addEventListener("mouseleave",hoverleave)
}
)


function hoverhighlighter (e){
    e.target.classList.add("hoverhighlighter")
}

function hoverclick (e) {
    e.target.classList.remove("hoverhighlighter")
}

function hoverleave(e){
    e.target.classList.remove("hoverhighlighter")
}




chordsquares.forEach(chordsquare => {
    chordsquare.addEventListener("dragstart", dragStart)
    chordsquare.addEventListener("dragover", dragOver)
    //chordsquare.addEventListener("dragenter", dragEnter)
    //chordsquare.addEventListener("dragleave", dragLeave)
    chordsquare.addEventListener("drop", dragDrop)
    //chordsquare.addEventListener("dragend", dragEnd)
}
)





// let helps us set variables
let beingDragged

// defining the function
// pass in an event and do something
function dragStart (e) {
    beingDragged = e.target
    //console.log(beingDragged)
    //console.log("dragging has started on " + beingDragged.id)
}

// defining the function
// pass in an event and do something
function dragging(e){
        // e.target gives us the target we are dragging
        //console.log(beingDragged.id + " is being dragged")
}

// defining the function
// pass in an event and do something
function dragOver (e) {
    //console.log(e.target)
    e.preventDefault()
    //console.log("You are dragging something over " + e.target.classList)
}

// defining the function
// pass in an event and do something
function dragEnter (e) {
    e.target.classList.add("highlight")
    //console.log("You are entering the space of " + e.target.classList)
}

// defining the function
// pass in an event and do something
function dragLeave (e) {
    //console.log("You are leaving the space of " + e.target.classList)
    e.target.classList.remove("highlight")
}

// defining the function
// pass in an event and do something

/*
function dragDrop (e) {
    //e.stopPropagation()
    e.target.innerHTML = ""
    e.target.append(beingDragged)
    populatorArray()
    e.target.classList.remove("highlight")
}
    */

function dragDrop(e) {
    e.preventDefault();

    let targetSquare = e.target.closest('.square');


    if (targetSquare) {
        targetSquare.innerHTML = "";
        targetSquare.append(beingDragged);

    }
    
    chordsquares.forEach(chordsquare => {
        chordsquare.innerHTML = "";
    })
    e.target.classList.remove("highlight")

    if (sunmoon == "moon"){
        populatorArraymoon()}
    else populatorArray()


}

// defining the function
// pass in an event and do something
function dragEnd (e) {
    //console.log("The drag has ended in " + e.target.classList)
}

const swap1 = document.querySelector("#swap1")
const swap2 = document.querySelector("#swap2")
const swap3 = document.querySelector("#swap3")

swap1.addEventListener("click", swap12)
swap2.addEventListener("click", swap23)
swap3.addEventListener("click", swap34)

function swap12(){

    one = document.querySelector("#chordboard1") 
    two = document.querySelector("#chordboard2")
    console.log(one, two)
    one_inner = one.innerHTML
    two_inner = two.innerHTML
    one.innerHTML = ""
    two.innerHTML = ""
    one.innerHTML = two_inner
    two.innerHTML = one_inner
    
}

function swap23(){
    one = document.querySelector("#chordboard2") 
    two = document.querySelector("#chordboard3")
    one_inner = one.innerHTML
    two_inner = two.innerHTML
    one.innerHTML = ""
    two.innerHTML = ""
    one.innerHTML = two_inner
    two.innerHTML = one_inner
}

function swap34(){
    one = document.querySelector("#chordboard3") 
    two = document.querySelector("#chordboard4")
    one_inner = one.innerHTML
    two_inner = two.innerHTML
    one.innerHTML = ""
    two.innerHTML = ""
    one.innerHTML = two_inner
    two.innerHTML = one_inner
}

document.querySelectorAll('.flipbutton').forEach((button, index) => {
    button.addEventListener('click', () => {
        const card = document.getElementById(`chordboard${index + 1}`).querySelector('.cardinner');
        card.classList.toggle('cardinner__isflipped');
    });
});

//WORK HERE
///const allcards = document.querySelectorAll(".cardinner");


//allcards.forEach(cardindividual => {
  //  cardindividual.addEventListener("click", () => {
    //    cardindividual.classList.toggle('cardinner_isflipped--${index}');
    //})
//});




//one = document.querySelector("#chordsquare1")
//two = document.querySelector("#chordsquare2")











