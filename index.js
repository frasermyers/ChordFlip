window.onload = function () {

    populatorArray()
    sunmoon = "";
    document.getElementById("playablearea").addEventListener("dragstart", dragStartOther);
    document.getElementById("chordboard").addEventListener("dragstart", dragStartOther);
    document.getElementById("chordoptions").addEventListener("dragstart", dragStartOther);

}

// POPULATORS --------------------------------------------------------------------


    // Major Populator
    function populatorArray (){
        var backnames = 
            ["Sun 1 Min.png", "Sun 2 Maj.png", "Sun 3 Maj.png", "Sun 4 Min.png","Sun 5 Min.png", "Sun 6 Maj.png", "Sun 7 Maj.png"]
        var imagenames = 
            ["Sun 1 Maj.png", "Sun 2 Min.png", "Sun 3 Min.png", "Sun 4 Maj.png","Sun 5 Maj.png", "Sun 6 Min.png", "Sun 7 Dim.png"]
            
            for (i=0; i<7; i++) {
                let card = document.createElement('div');

                card.classList.add("chess-piece");
                card.id = "chess-piece-" + (i+1);
                card.setAttribute("unselectable", true);
                card.setAttribute("draggable", true);
                card.addEventListener("drag", dragging);
                card.addEventListener("dragstart", dragStart);
                cardinner = document.createElement('div');
                cardinner.setAttribute("unselectable", true);
                
                cardfront = document.createElement('div');
                cardfront.setAttribute("unselectable", true);
                cardback = document.createElement('div');
                cardback.setAttribute("unselectable", true);
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
                imgfront.setAttribute("unselectable", true);
                imgback.setAttribute("unselectable", true);

                imgfront.setAttribute("draggable", false);
                imgback.setAttribute("draggable", false);

                cardfront.appendChild(imgfront);
                cardback.appendChild(imgback);

                imgfront.src = "cards2/" + imagenames[i];
                imgback.src = "cards2/" + backnames[i];

                imgfront.setAttribute("id", imagenames[i].split(".png")[0])
                imgback.setAttribute("id", backnames[i].split(".png")[0])

                card.appendChild(cardinner);
                mydiv = document.querySelector("#chordsquare" + (i+1))
                cardChildren = card.getElementsByTagName("*");
                for (ii = 0; ii < cardChildren.length; ++ii ) {
                   cardChildren[ii].draggable = false;
                   cardChildren[ii].unselectable = true;
                }

                mydiv.appendChild(card)
            }  
        
    }

    // Minor Populator
    function populatorArraymoon (){
        var backnames = 
            ["Moon 1 Maj.png", "Moon 2 Maj.png", "Moon b3 Min.png", "Moon 4 Maj.png", "Moon 5 Maj.png", "Moon b6 Min.png", "Moon b7 Min.png"]
        var imagenames = 
            ["Moon 1 Min.png", "Moon 2 Dim.png", "Moon b3 Maj.png", "Moon 4 Min.png","Moon 5 Min.png", "Moon b6 Maj.png", "Moon b7 Maj.png"]
            
            for (i=0; i<7; i++) {
                let card = document.createElement('div');

                card.classList.add("chess-piece");
                card.id = "chess-piece-" + (i+1);
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
                
                mydiv = document.querySelector("#chordsquare" + (i+1))
                mydiv.appendChild(card)
            }        
    }


// CONSTS --------------------------------------------------------------------------

var key = "C";
var chords = ["C", "Dm", "Em", "F", "G", "Am", "Bdim"];


// Squares in Chord Placement Area
const squares = document.querySelectorAll(".square, .smallsquare");

// Chords in Chord Start Deck Area 
const chordsquares = document.querySelectorAll(".chordsquare")

// SCALE BUTTONS
const sunmoonbuttons  = document.querySelectorAll(".sunmoonbutton")
    // Major Scale Button
    const sunbutton = document.querySelector("#sunbutton")
    // Minor Scale Button
    const moonbutton = document.querySelector("#moonbutton")

// EVENT LISTENERS ---------------------------------------------------------------

sunbutton.addEventListener("click", sunclick);
moonbutton.addEventListener("click", moonclick);

sunmoonbuttons.forEach(sunmoonbutton => {
    sunmoonbutton.addEventListener("mouseover",hoverhighlighter)
    sunmoonbutton.addEventListener("click",hoverclick)
    sunmoonbutton.addEventListener("mouseleave",hoverleave)
    sunmoonbutton.addEventListener("dragstart", dragStartOther);
}
)

squares.forEach(square => {
    square.addEventListener("dragover", dragOver)
    square.addEventListener("drop", dragDrop)
    square.addEventListener("dragend", dragEnd);
    square.addEventListener("dragstart", dragStartOther);
    square.setAttribute("draggable", false);
    square.setAttribute("unselectable", true);
    square.draggable = false;

}
)

chordsquares.forEach(chordsquare => {
    chordsquare.addEventListener("drop", dragDrop);
    chordsquare.setAttribute("draggable", false);
    chordsquare.setAttribute("unselectable", true);
    chordsquare.addEventListener("dragstart", dragStartOther);
}
)

// ACTIONS -----------------------------------------------------------------------

function sunclick(){
    sunmoon = "sun"
    chordsquares.forEach(chordsquare => {
        chordsquare.innerHTML="";
        chordsquare.setAttribute("unselectable", "on");
    })
    populatorArray()}

function moonclick(){
    sunmoon = "moon"
    chordsquares.forEach(chordsquare =>{chordsquare.innerHTML= ""})
    populatorArraymoon()}

function hoverhighlighter (e){
    e.target.classList.add("hoverhighlighter")}

function hoverclick (e) {
    e.target.classList.remove("hoverhighlighter")}

function hoverleave(e){
    e.target.classList.remove("hoverhighlighter")}

let beingDragged

function dragStart (e) {

    console.log("Drag starting. Drag target class is: " + e.target.className + " id is: " + e.target.id);
    beingDragged = e.target;


}

function dragStartOther(e) {
    console.log("something else is being dragged. It is: " + e.target.className+ "id is: " + e.target.id);
}

function dragging(e){

}

function dragOver (e) {
   e.preventDefault()
}

function dragDrop(e) {
    if (beingDragged == null) {
        console.log("Nothing being dragged");
    }
    else {
        console.log("Being dragged class: " + beingDragged.className + " id: " + beingDragged.id);
    }
    console.log("Dropping target class: "+ e.target.className + " id: " + e.target.id);
    let targetSquare = e.target.closest('.square, .smallsquare');

    if (targetSquare) {
        if (beingDragged != null) {
            targetSquare.innerHTML = "";
            targetSquare.append(beingDragged);
            var num = Number(beingDragged.id.charAt(beingDragged.id.length-1));
            document.getElementById("chordname").innerHTML = chords[num-1];
            beingDragged = null;
        }
    }
    
    chordsquares.forEach(chordsquare => {
        chordsquare.innerHTML = "";
    })
    e.target.classList.remove("highlight")

    if (sunmoon == "moon"){
        populatorArraymoon()}
    else populatorArray()
}

function dragEnd (e) {
    beingDragged = null;
}









