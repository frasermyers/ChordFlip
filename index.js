window.onload = function () {
    populatorArray()
    sunmoon = "";
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

    // Minor Populator
    function populatorArraymoon (){
        var backnames = 
            ["Moon 1 Maj.png", "Moon 2 Maj.png", "Moon b3 Min.png", "Moon 4 Maj.png", "Moon 5 Maj.png", "Moon b6 Min.png", "Moon b7 Min.png"]
        var imagenames = 
            ["Moon 1 Min.png", "Moon 2 Dim.png", "Moon b3 Maj.png", "Moon 4 Min.png","Moon 5 Min.png", "Moon b6 Maj.png", "Moon b7 Maj.png"]
            
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
                
                mydiv = document.querySelector("#chordsquare" + (i+1))
                mydiv.appendChild(card)
            }        
    }


// CONSTS --------------------------------------------------------------------------

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
}
)

squares.forEach(square => {
    square.addEventListener("dragover", dragOver)
    square.addEventListener("drop", dragDrop)
}
)

chordsquares.forEach(chordsquare => {
    chordsquare.addEventListener("drop", dragDrop)
}
)

// ACTIONS -----------------------------------------------------------------------

function sunclick(){
    sunmoon = "sun"
    chordsquares.forEach(chordsquare => {
        chordsquare.innerHTML=""})
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
    beingDragged = e.target}

function dragging(e){}

function dragOver (e) {
    e.preventDefault()}

function dragDrop(e) {
    e.preventDefault();

    let targetSquare = e.target.closest('.square, .smallsquare');

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

function dragEnd (e) {
}









