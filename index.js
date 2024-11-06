window.onload = function () {

    populatorArray()
    sunmoon = "";
    document.getElementById("playablearea").addEventListener("dragstart", dragStartOther);
    document.getElementById("chordboard").addEventListener("dragstart", dragStartOther);
    document.getElementById("chordoptions").addEventListener("dragstart", dragStartOther);
    

}

document.onmousedown = function() {
    console.log("onmousedown");
    window.getSelection().removeAllRanges();
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
                console.log("hi");

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

                optionsymbol = document.querySelector("#chordoptiondisplay"+String(i+1));
                imgElement = card.querySelector(".imagesize");
                var imgName = imgElement ? imgElement.id : null;
                optionsymbol.innerHTML=getChord(key, imgName);

                
            }  


    }

    // Major Populator
    function populatorArraymoon (){
        var backnames = 
            ["Moon 1 Maj.png", "Moon 2 Maj.png", "Moon b3 Min.png", "Moon 4 Maj.png", "Moon 5 Maj.png", "Moon b6 Min.png", "Moon b7 Min.png"]
        var imagenames = 
            ["Moon 1 Min.png", "Moon 2 Dim.png", "Moon b3 Maj.png", "Moon 4 Min.png","Moon 5 Min.png", "Moon b6 Maj.png", "Moon b7 Maj.png"]
            
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

                optionsymbol = document.querySelector("#chordoptiondisplay"+String(i+1));
                imgElement = card.querySelector(".imagesize");
                var imgName = imgElement ? imgElement.id : null;
                optionsymbol.innerHTML=getChord(key,imgName);
            }  
        
    }

    

// CONSTS --------------------------------------------------------------------------

var key = "";

var chordsByKey = 

{
    "C": {
        "Sun 1 Maj": "C",
        "Sun 2 Min": "Dm",
        "Sun 3 Min": "Em",
        "Sun 4 Maj": "F",
        "Sun 5 Maj": "G",
        "Sun 6 Min": "Am",
        "Sun 7 Dim": "Bo",

        "Moon 1 Min": "Cm",
        "Moon 2 Dim": "Do",
        "Moon b3 Maj": "Eb",
        "Moon 4 Min": "Fm",
        "Moon 5 Min": "Gm",
        "Moon b6 Maj": "Ab",
        "Moon b7 Maj": "Bb"
    },
    "C#": {
        "Sun 1 Maj": "C#",
        "Sun 2 Min": "D#m",
        "Sun 3 Min": "E#m",
        "Sun 4 Maj": "F#",
        "Sun 5 Maj": "G#",
        "Sun 6 Min": "A#m",
        "Sun 7 Dim": "B#o",

        "Moon 1 Min": "C#m",
        "Moon 2 Dim": "D#o",
        "Moon b3 Maj": "E",
        "Moon 4 Min": "F#m",
        "Moon 5 Min": "G#m",
        "Moon b6 Maj": "A",
        "Moon b7 Maj": "B"
    },
    "D": {
        "Sun 1 Maj": "D",
        "Sun 2 Min": "Em",
        "Sun 3 Min": "F#m",
        "Sun 4 Maj": "G",
        "Sun 5 Maj": "A",
        "Sun 6 Min": "Bm",
        "Sun 7 Dim": "C#o",

        "Moon 1 Min": "Dm",
        "Moon 2 Dim": "Eo",
        "Moon b3 Maj": "F",
        "Moon 4 Min": "Gm",
        "Moon 5 Min": "Am",
        "Moon b6 Maj": "Bb",
        "Moon b7 Maj": "C"
    },
    "Eb": {
        "Sun 1 Maj": "Eb",
        "Sun 2 Min": "Fm",
        "Sun 3 Min": "Gm",
        "Sun 4 Maj": "Ab",
        "Sun 5 Maj": "Bb",
        "Sun 6 Min": "Cm",
        "Sun 7 Dim": "Do",

        "Moon 1 Min": "Ebm",
        "Moon 2 Dim": "Fo",
        "Moon b3 Maj": "Gb",
        "Moon 4 Min": "Abm",
        "Moon 5 Min": "Bbm",
        "Moon b6 Maj": "Cb",
        "Moon b7 Maj": "Db"
    },
    "E": {
        "Sun 1 Maj": "E",
        "Sun 2 Min": "F#m",
        "Sun 3 Min": "G#m",
        "Sun 4 Maj": "A",
        "Sun 5 Maj": "B",
        "Sun 6 Min": "C#m",
        "Sun 7 Dim": "D#o",

        "Moon 1 Min": "Em",
        "Moon 2 Dim": "F#o",
        "Moon b3 Maj": "G",
        "Moon 4 Min": "Am",
        "Moon 5 Min": "Bm",
        "Moon b6 Maj": "C",
        "Moon b7 Maj": "D"
    },
    "F": {
        "Sun 1 Maj": "F",
        "Sun 2 Min": "Gm",
        "Sun 3 Min": "Am",
        "Sun 4 Maj": "Bb",
        "Sun 5 Maj": "C",
        "Sun 6 Min": "Dm",
        "Sun 7 Dim": "Eo",

        "Moon 1 Min": "Fm",
        "Moon 2 Dim": "Go",
        "Moon b3 Maj": "Ab",
        "Moon 4 Min": "Bbm",
        "Moon 5 Min": "Cm",
        "Moon b6 Maj": "Db",
        "Moon b7 Maj": "Eb"
    },
    "F#": {
        "Sun 1 Maj": "F#",
        "Sun 2 Min": "G#m",
        "Sun 3 Min": "A#m",
        "Sun 4 Maj": "B",
        "Sun 5 Maj": "C#",
        "Sun 6 Min": "D#m",
        "Sun 7 Dim": "E#o",

        "Moon 1 Min": "F#m",
        "Moon 2 Dim": "G#o",
        "Moon b3 Maj": "A",
        "Moon 4 Min": "Bm",
        "Moon 5 Min": "C#m",
        "Moon b6 Maj": "D",
        "Moon b7 Maj": "E"
    },
    "G": {
        "Sun 1 Maj": "G",
        "Sun 2 Min": "Am",
        "Sun 3 Min": "Bm",
        "Sun 4 Maj": "C",
        "Sun 5 Maj": "D",
        "Sun 6 Min": "Em",
        "Sun 7 Dim": "F#o",

        "Moon 1 Min": "Gm",
        "Moon 2 Dim": "Ao",
        "Moon b3 Maj": "Bb",
        "Moon 4 Min": "Cm",
        "Moon 5 Min": "Dm",
        "Moon b6 Maj": "Eb",
        "Moon b7 Maj": "F"
    },
    "Ab": {
        "Sun 1 Maj": "Ab",
        "Sun 2 Min": "Bbm",
        "Sun 3 Min": "Cm",
        "Sun 4 Maj": "Db",
        "Sun 5 Maj": "Eb",
        "Sun 6 Min": "Fm",
        "Sun 7 Dim": "Go",

        "Moon 1 Min": "Abm",
        "Moon 2 Dim": "Bbo",
        "Moon b3 Maj": "Cb",
        "Moon 4 Min": "Dbm",
        "Moon 5 Min": "Ebm",
        "Moon b6 Maj": "Fb",
        "Moon b7 Maj": "Gb"
    },
    "A": {
        "Sun 1 Maj": "A",
        "Sun 2 Min": "Bm",
        "Sun 3 Min": "C#m",
        "Sun 4 Maj": "D",
        "Sun 5 Maj": "E",
        "Sun 6 Min": "F#m",
        "Sun 7 Dim": "G#o",

        "Moon 1 Min": "Am",
        "Moon 2 Dim": "Bo",
        "Moon b3 Maj": "C",
        "Moon 4 Min": "Dm",
        "Moon 5 Min": "Em",
        "Moon b6 Maj": "F",
        "Moon b7 Maj": "G"
    },
    "Bb": {
        "Sun 1 Maj": "Bb",
        "Sun 2 Min": "Cm",
        "Sun 3 Min": "Dm",
        "Sun 4 Maj": "Eb",
        "Sun 5 Maj": "F",
        "Sun 6 Min": "Gm",
        "Sun 7 Dim": "Ao",

        "Moon 1 Min": "Bbm",
        "Moon 2 Dim": "Co",
        "Moon b3 Maj": "Db",
        "Moon 4 Min": "Ebm",
        "Moon 5 Min": "Fm",
        "Moon b6 Maj": "Gb",
        "Moon b7 Maj": "Ab"
    },
    "B": {
        "Sun 1 Maj": "B",
        "Sun 2 Min": "C#m",
        "Sun 3 Min": "D#m",
        "Sun 4 Maj": "E",
        "Sun 5 Maj": "F#",
        "Sun 6 Min": "G#m",
        "Sun 7 Dim": "A#o",

        "Moon 1 Min": "Bm",
        "Moon 2 Dim": "C#o",
        "Moon b3 Maj": "D",
        "Moon 4 Min": "Em",
        "Moon 5 Min": "F#m",
        "Moon b6 Maj": "G",
        "Moon b7 Maj": "A"
    }
}






function getChord(key, imgName) {
    // Check if the key and imgName mappings exist
    if (chordsByKey[key] && chordsByKey[key][imgName]) {
        return chordsByKey[key][imgName];
    } else {
        console.warn("Chord not found for key:", key, "and imgName:", imgName);
        return null; // Return null or a default value if not found
    }
}



const optiondisplays = document.querySelectorAll(".chord-option-display");


// Squares in Chord Placement Area
const squares = document.querySelectorAll(".square, .smallsquare");

// Chords in Chord Start Deck Area 
const chordsquares = document.querySelectorAll(".chordsquare")


const keybuttons = document.querySelectorAll(".keybutton")
    const Cbutton = document.querySelector("#Cbutton")
    const Gbutton = document.querySelector("#Gbutton")

// SCALE BUTTONS
const sunmoonbuttons  = document.querySelectorAll(".sunmoonbutton")
    // Major Scale Button
    const sunbutton = document.querySelector("#sunbutton")
    // Minor Scale Button
    const moonbutton = document.querySelector("#moonbutton")

const chorddisplays = document.querySelectorAll(".chord-display");

// EVENT LISTENERS ---------------------------------------------------------------



sunbutton.addEventListener("click", sunclick);
moonbutton.addEventListener("click", moonclick);

document.querySelector("#sunbutton").classList.toggle('pressed');

keybuttons.forEach(keybutton => {
    keybutton.addEventListener("mouseover",hoverhighlighter)
    keybutton.addEventListener("click", function(e) {
        keybuttons.forEach(btn => btn.classList.remove('pressed'));
        keyclick(e);
        keybutton.classList.toggle('pressed')})
    keybutton.addEventListener("mouseleave",hoverleave)
    keybutton.addEventListener("dragstart", dragStartOther)
}

)


sunmoonbuttons.forEach(sunmoonbutton => {
    sunmoonbutton.addEventListener("mouseover",hoverhighlighter)
    sunmoonbutton.addEventListener("click", function(e) {
        sunmoonbuttons.forEach(btn => btn.classList.remove('pressed'));
        sunmoonbutton.classList.toggle('pressed')})
    sunmoonbutton.addEventListener("mouseleave",hoverleave)
    sunmoonbutton.addEventListener("dragstart", dragStartOther);
}
)

squares.forEach(square => {
    square.addEventListener("dragover", dragOver)
    //square.addEventListener("dragleave", dragLeave)
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

function keyclick(e){
    keyholder = (e.target.id).split("-")[0];
    key = keyholder;

    

    chorddisplays.forEach(chorddisplay =>{
        chorddisplay.innerHTML="new"; 
        displaynumber = chorddisplay.id.match(/\d+$/)[0];

        targetbox = document.querySelector(`#chordboard${displaynumber}`);
        var imgElement = targetbox.querySelector(".imagesize");
        var imgName = imgElement ? imgElement.id : null;
        document.getElementById("chorddisplay" + displaynumber).innerHTML = getChord(key, imgName);
        console.log(imgName);


    }
    )

    for (i=0; i<7; i++) {
    optionsymbol = document.querySelector("#chordoptiondisplay"+String(i+1));
    chordsquareid = document.querySelector("#chordsquare"+String((i+1)));
    let imageElement = chordsquareid.querySelector(".imagesize"); // Adjust selector if necessary
    let imageName = imageElement ? imageElement.id : null; // Get the image id as imagename, or null if not found
    optionsymbol.innerHTML = getChord(key, imageName); // Logs the id of the image, which is assumed to be the imagename
    console.log(chordsquareid);

            
}}

function dragLeave(e){
    console.log("leaving");
    chordsquare = e.target.id;
    chordsquarenum = Number(chordsquare.slice(-1));
    chordlabel = document.querySelector(`#chorddisplay${chordsquarenum}`);
    chordlabel.innerHTML="";
    console.log(chordlabel);
    //document.querySelector("#chorddisplay1").innerHTML=""
}

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
    e.target.classList.remove("hoverhighlighter")
    console.log("poo")}

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
            console.log(num);
            var boxnumber = targetSquare.getAttribute("data-box");
            var imgElement = beingDragged.querySelector(".imagesize");
            var imgName = imgElement ? imgElement.id : null;
            console.log(imgName);
            console.log(beingDragged);
            console.log("id of target" +targetSquare.className);
            if (!targetSquare.classList.contains("trashcan")) {
                document.getElementById("chorddisplay" + boxnumber).innerHTML = getChord(key, imgName);
            }
            if (targetSquare.classList.contains("trashcan")){
                document.querySelector(".trashcan").innerHTML="";
            }

            beingDragged = null;
        }
    }
    
    chordsquares.forEach(chordsquare => {
        chordsquare.innerHTML = "";
    })
    e.target.classList.remove("highlight")



    
    if (sunmoon == "moon"){populatorArraymoon()}else populatorArray()
    
}

function dragEnd (e) {
    beingDragged = null;
}



