window.onload = function () {

    populateCards(SUN_CARDS); // populate playing cards
    sunmoon = ""; // make key-less to begin
}

document.onmousedown = function() {
    console.log("onmousedown");
    window.getSelection().removeAllRanges();
}


// LOADING SECTION 2: THE CHORDBOARD ------------------------------------------------------------------------------

const board = document.getElementById("board"); // Define chordboard, where you drop cards
const numberofrows = 3; // Number of rows you want in the chordboard
const barsPerRow = 4; // Number of bars you want per row
const beatsperbar = 4; // Number of beats in a bar
const totalBars = barsPerRow * numberofrows; // Total number of bars in the chordboard

let line;

for (let bar = 1; bar <= totalBars; bar++) {
    // Check if we need to create a new line container
    if ((bar - 1) % barsPerRow === 0) {
        line = document.createElement("div");
        line.classList.add("line");
        line.id = `line${Math.ceil(bar / barsPerRow)}`;
        board.appendChild(line); // Append new line to chordboard
    }

    // Create a div to represent each bar with the "bar" class
    const barContainer = document.createElement("div");
    barContainer.classList.add("bar");
    barContainer.id = `bar${bar}`;

    for (let beat = 1; beat <= beatsperbar; beat++) {
        // Create the individual beat div
        const beatDiv = document.createElement("div");
        beatDiv.classList.add("beat");
        beatDiv.id = `bar${bar}beat${beat}`; // ID format: barXbeatY

        // Create the chord display div
        const chordDisplay = document.createElement("div");
        chordDisplay.classList.add("symbol");
        chordDisplay.id = `chorddisplay${bar}${beat}`; // ID format: chorddisplayXbarY

        // Add "firstbeat" class for the first beat in each bar
        if (beat === 1) {
            chordDisplay.classList.add("firstbeat");
        }

        // Create the cardslot div
        const cardslot = document.createElement("div");
        cardslot.classList.add("cardslot");
        cardslot.id = `chordboard${bar}${beat}`; // ID format: chordboardXbarY
        cardslot.dataset.box = `bar${bar}beat${beat}`;
        cardslot.draggable = false;

        // Add "firstbeat" and "firstbeatdrop" classes for the first beat in each bar
        if (beat === 1) {
            cardslot.classList.add("firstbeat", "firstbeatdrop");
        }

        // Append the chord display and cardslot divs to the beat div
        beatDiv.appendChild(chordDisplay);
        beatDiv.appendChild(cardslot);

        // Append each beat div to the bar container
        barContainer.appendChild(beatDiv);
    }

    // Append the bar container to the current line
    line.appendChild(barContainer);
}



// POPULATOR --------------------------------------------------------------------

    const SUN_CARDS = {
        backnames: ["Sun 1 Min.png", "Sun 2 Maj.png", "Sun 3 Maj.png", "Sun 4 Min.png", "Sun 5 Min.png", "Sun 6 Maj.png", "Sun 7 Maj.png"],
        imagenames: ["Sun 1 Maj.png", "Sun 2 Min.png", "Sun 3 Min.png", "Sun 4 Maj.png", "Sun 5 Maj.png", "Sun 6 Min.png", "Sun 7 Dim.png"]
    };
    
    const MOON_CARDS = {
        backnames: ["Moon 1 Maj.png", "Moon 2 Maj.png", "Moon b3 Min.png", "Moon 4 Maj.png", "Moon 5 Maj.png", "Moon b6 Min.png", "Moon b7 Min.png"],
        imagenames: ["Moon 1 Min.png", "Moon 2 Dim.png", "Moon b3 Maj.png", "Moon 4 Min.png", "Moon 5 Min.png", "Moon b6 Maj.png", "Moon b7 Maj.png"]
    };

function populateCards(cardSet) {
    const { imagenames, backnames } = cardSet;
    const isSun = cardSet === SUN_CARDS; // Check if it's the Sun (Major) scale

    for (let i = 0; i < 7; i++) {
        // Create card container
        let card = document.createElement('div');
        card.classList.add("playingcard");
        card.id = "playingcard-" + (i + 1);
        card.setAttribute("unselectable", true);

        // Check if this card should be transparent and uninteractable
        const isTransparentCard = (isSun && i === 6) || (!isSun && i === 1);

        if (!isTransparentCard) {
            // Only make it draggable if it's not a transparent card
            card.setAttribute("draggable", true);
            card.addEventListener("drag", dragging);
            card.addEventListener("dragstart", dragStart);
            
            /*
            card.addEventListener("click", function() {
                flipCard(card); // Call flipCard function on click
            });

            */
        } else {
            // If it’s a transparent card, set it as "uninteractable"
            card.setAttribute("unselectable", true);
            card.style.opacity = "0.08"; // Apply transparency
            card.style.pointerEvents = "none"; // Disable interactions
        }

        // Create inner card structure
        let cardinner = document.createElement('div');
        cardinner.setAttribute("unselectable", true);
        cardinner.classList.add("cardinner");

        let cardfront = document.createElement('div');
        cardfront.setAttribute("unselectable", true);
        cardfront.classList.add("cardinnerfront", "cardface");

        let cardback = document.createElement('div');
        cardback.setAttribute("unselectable", true);
        cardback.classList.add("cardinnerback", "cardface");

        // Append card fronts and backs to inner structure
        cardinner.appendChild(cardfront);
        cardinner.appendChild(cardback);

        // Create image elements for front and back
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

        // Set image sources and IDs
        imgfront.src = "cards2/" + imagenames[i];
        imgback.src = "cards2/" + backnames[i];
        imgfront.setAttribute("id", imagenames[i].split(".png")[0]);
        imgback.setAttribute("id", backnames[i].split(".png")[0]);

        // Append card inner structure to the main card element
        card.appendChild(cardinner);

        // Find the target cardslot and append the card
        let mydiv = document.querySelector("#chordsquare" + (i + 1));
        mydiv.appendChild(card);

        // Make all children of the card non-draggable and unselectable
        let cardChildren = card.getElementsByTagName("*");
        for (let ii = 0; ii < cardChildren.length; ++ii) {
            cardChildren[ii].draggable = false;
            cardChildren[ii].unselectable = true;
        }

        // Update option symbol display
        let optionsymbol = document.querySelector("#chordoptiondisplay" + (i + 1));
        let imgElement = card.querySelector(".imagesize");
        let imgName = imgElement ? imgElement.id : null;
        optionsymbol.innerHTML = getChord(key, imgName);
    }
}

    
    
    
    
     

// CONSTS --------------------------------------------------------------------------

var key = "";

var chordsByKey = 

{
    "C": {
        // Sun Scale Normal
        "Sun 1 Maj": "C",
        "Sun 2 Min": "Dm",
        "Sun 3 Min": "Em",
        "Sun 4 Maj": "F",
        "Sun 5 Maj": "G",
        "Sun 6 Min": "Am",
        "Sun 7 Dim": "",

        // Sun Scale Inverse
        "Sun 1 Min": "Cm",
        "Sun 2 Maj": "D",
        "Sun 3 Maj": "E",
        "Sun 4 Min": "Fm",
        "Sun 5 Min": "Gm",
        "Sun 6 Maj": "A",
        "Sun 7 Maj": "B",

        // Moon Scale Normal
        "Moon 1 Min": "Cm",
        "Moon 2 Dim": "",
        "Moon b3 Maj": "Eb",
        "Moon 4 Min": "Fm",
        "Moon 5 Min": "Gm",
        "Moon b6 Maj": "Ab",
        "Moon b7 Maj": "Bb",

        // Moon Scale Inverse
        "Moon 1 Maj": "C",
        "Moon 2 Maj": "D",
        "Moon b3 Min": "Ebm",
        "Moon 4 Maj": "F",
        "Moon 5 Maj": "G",
        "Moon b6 Min": "Abm",
        "Moon b7 Min": "Bbm"
    },
    "C#": {
        // Sun Scale Normal
        "Sun 1 Maj": "C#",
        "Sun 2 Min": "D#m",
        "Sun 3 Min": "E#m",
        "Sun 4 Maj": "F#",
        "Sun 5 Maj": "G#",
        "Sun 6 Min": "A#m",
        "Sun 7 Dim": "B#o",

        // Sun Scale Inverse
        "Sun 1 Min": "C#m",
        "Sun 2 Maj": "D#",
        "Sun 3 Maj": "E#",
        "Sun 4 Min": "F#m",
        "Sun 5 Min": "G#m",
        "Sun 6 Maj": "A#",
        "Sun 7 Maj": "B#",

        // Moon Scale Normal
        "Moon 1 Min": "C#m",
        "Moon 2 Dim": "D#o",
        "Moon b3 Maj": "E",
        "Moon 4 Min": "F#m",
        "Moon 5 Min": "G#m",
        "Moon b6 Maj": "A",
        "Moon b7 Maj": "B",

        // Moon Scale Inverse
        "Moon 1 Maj": "C#",
        "Moon 2 Maj": "D#",
        "Moon b3 Min": "Em",
        "Moon 4 Maj": "F#",
        "Moon 5 Maj": "G#",
        "Moon b6 Min": "Am",
        "Moon b7 Min": "Bm"
    },
    "D": {
        // Sun Scale Normal
        "Sun 1 Maj": "D",
        "Sun 2 Min": "Em",
        "Sun 3 Min": "F#m",
        "Sun 4 Maj": "G",
        "Sun 5 Maj": "A",
        "Sun 6 Min": "Bm",
        "Sun 7 Dim": "C#o",

        // Sun Scale Inverse
        "Sun 1 Min": "Dm",
        "Sun 2 Maj": "E",
        "Sun 3 Maj": "F#",
        "Sun 4 Min": "Gm",
        "Sun 5 Min": "Am",
        "Sun 6 Maj": "B",
        "Sun 7 Maj": "C#",

        // Moon Scale Normal
        "Moon 1 Min": "Dm",
        "Moon 2 Dim": "Eo",
        "Moon b3 Maj": "F",
        "Moon 4 Min": "Gm",
        "Moon 5 Min": "Am",
        "Moon b6 Maj": "Bb",
        "Moon b7 Maj": "C",

        // Moon Scale Inverse
        "Moon 1 Maj": "D",
        "Moon 2 Maj": "E",
        "Moon b3 Min": "Fm",
        "Moon 4 Maj": "G",
        "Moon 5 Maj": "A",
        "Moon b6 Min": "Bbm",
        "Moon b7 Min": "Cm"
    },
    "Eb": {
        // Sun Scale Normal
        "Sun 1 Maj": "Eb",
        "Sun 2 Min": "Fm",
        "Sun 3 Min": "Gm",
        "Sun 4 Maj": "Ab",
        "Sun 5 Maj": "Bb",
        "Sun 6 Min": "Cm",
        "Sun 7 Dim": "Do",

        // Sun Scale Inverse
        "Sun 1 Min": "Ebm",
        "Sun 2 Maj": "F",
        "Sun 3 Maj": "G",
        "Sun 4 Min": "Abm",
        "Sun 5 Min": "Bbm",
        "Sun 6 Maj": "C",
        "Sun 7 Maj": "D",

        // Moon Scale Normal
        "Moon 1 Min": "Ebm",
        "Moon 2 Dim": "Fo",
        "Moon b3 Maj": "Gb",
        "Moon 4 Min": "Abm",
        "Moon 5 Min": "Bbm",
        "Moon b6 Maj": "Cb",
        "Moon b7 Maj": "Db",

        // Moon Scale Inverse
        "Moon 1 Maj": "Eb",
        "Moon 2 Maj": "F",
        "Moon b3 Min": "Gbm",
        "Moon 4 Maj": "Ab",
        "Moon 5 Maj": "Bb",
        "Moon b6 Min": "B",
        "Moon b7 Min": "Db"
    },
    "E": {
        // Sun Scale Normal
        "Sun 1 Maj": "E",
        "Sun 2 Min": "F#m",
        "Sun 3 Min": "G#m",
        "Sun 4 Maj": "A",
        "Sun 5 Maj": "B",
        "Sun 6 Min": "C#m",
        "Sun 7 Dim": "D#o",

        // Sun Scale Inverse
        "Sun 1 Min": "Em",
        "Sun 2 Maj": "F#",
        "Sun 3 Maj": "G#",
        "Sun 4 Min": "Am",
        "Sun 5 Min": "Bm",
        "Sun 6 Maj": "C#",
        "Sun 7 Maj": "D#",

        // Moon Scale Normal
        "Moon 1 Min": "Em",
        "Moon 2 Dim": "F#o",
        "Moon b3 Maj": "G",
        "Moon 4 Min": "Am",
        "Moon 5 Min": "Bm",
        "Moon b6 Maj": "C",
        "Moon b7 Maj": "D",

        // Moon Scale Inverse
        "Moon 1 Maj": "E",
        "Moon 2 Maj": "F#",
        "Moon b3 Min": "Gm",
        "Moon 4 Maj": "A",
        "Moon 5 Maj": "B",
        "Moon b6 Min": "Cm",
        "Moon b7 Min": "D"
    },
    "F": {
        // Sun Scale Normal
        "Sun 1 Maj": "F",
        "Sun 2 Min": "Gm",
        "Sun 3 Min": "Am",
        "Sun 4 Maj": "Bb",
        "Sun 5 Maj": "C",
        "Sun 6 Min": "Dm",
        "Sun 7 Dim": "Eo",

        // Sun Scale Inverse
        "Sun 1 Min": "Fm",
        "Sun 2 Maj": "G",
        "Sun 3 Maj": "A",
        "Sun 4 Min": "Bbm",
        "Sun 5 Min": "Cm",
        "Sun 6 Maj": "D",
        "Sun 7 Maj": "E",

        // Moon Scale Normal
        "Moon 1 Min": "Fm",
        "Moon 2 Dim": "Go",
        "Moon b3 Maj": "Ab",
        "Moon 4 Min": "Bbm",
        "Moon 5 Min": "Cm",
        "Moon b6 Maj": "Db",
        "Moon b7 Maj": "Eb",

        // Moon Scale Inverse
        "Moon 1 Maj": "F",
        "Moon 2 Maj": "G",
        "Moon b3 Min": "Abm",
        "Moon 4 Maj": "Bb",
        "Moon 5 Maj": "C",
        "Moon b6 Min": "Dbm",
        "Moon b7 Min": "Eb"
    },
    "F#": {
        // Sun Scale Normal
        "Sun 1 Maj": "F#",
        "Sun 2 Min": "G#m",
        "Sun 3 Min": "A#m",
        "Sun 4 Maj": "B",
        "Sun 5 Maj": "C#",
        "Sun 6 Min": "D#m",
        "Sun 7 Dim": "E#o",

        // Sun Scale Inverse
        "Sun 1 Min": "F#m",
        "Sun 2 Maj": "G#",
        "Sun 3 Maj": "A#",
        "Sun 4 Min": "Bm",
        "Sun 5 Min": "C#m",
        "Sun 6 Maj": "D#",
        "Sun 7 Maj": "E#",

        // Moon Scale Normal
        "Moon 1 Min": "F#m",
        "Moon 2 Dim": "G#o",
        "Moon b3 Maj": "A",
        "Moon 4 Min": "Bm",
        "Moon 5 Min": "C#m",
        "Moon b6 Maj": "D",
        "Moon b7 Maj": "E",

        // Moon Scale Inverse
        "Moon 1 Maj": "F#",
        "Moon 2 Maj": "G#",
        "Moon b3 Min": "Am",
        "Moon 4 Maj": "B",
        "Moon 5 Maj": "C#",
        "Moon b6 Min": "Dm",
        "Moon b7 Min": "E"
    },

    "G": {
        // Sun Scale Normal
        "Sun 1 Maj": "G",
        "Sun 2 Min": "Am",
        "Sun 3 Min": "Bm",
        "Sun 4 Maj": "C",
        "Sun 5 Maj": "D",
        "Sun 6 Min": "Em",
        "Sun 7 Dim": "F#o",

        // Sun Scale Inverse
        "Sun 1 Min": "Gm",
        "Sun 2 Maj": "A",
        "Sun 3 Maj": "B",
        "Sun 4 Min": "Cm",
        "Sun 5 Min": "Dm",
        "Sun 6 Maj": "E",
        "Sun 7 Maj": "F#",

        // Moon Scale Normal
        "Moon 1 Min": "Gm",
        "Moon 2 Dim": "Ao",
        "Moon b3 Maj": "Bb",
        "Moon 4 Min": "Cm",
        "Moon 5 Min": "Dm",
        "Moon b6 Maj": "Eb",
        "Moon b7 Maj": "F",

        // Moon Scale Inverse
        "Moon 1 Maj": "G",
        "Moon 2 Maj": "A",
        "Moon b3 Min": "Bbm",
        "Moon 4 Maj": "C",
        "Moon 5 Maj": "D",
        "Moon b6 Min": "Ebm",
        "Moon b7 Min": "Fm"
    },
    "Ab": {
        // Sun Scale Normal
        "Sun 1 Maj": "Ab",
        "Sun 2 Min": "Bbm",
        "Sun 3 Min": "Cm",
        "Sun 4 Maj": "Db",
        "Sun 5 Maj": "Eb",
        "Sun 6 Min": "Fm",
        "Sun 7 Dim": "Go",

        // Sun Scale Inverse
        "Sun 1 Min": "Abm",
        "Sun 2 Maj": "Bb",
        "Sun 3 Maj": "C",
        "Sun 4 Min": "Dbm",
        "Sun 5 Min": "Ebm",
        "Sun 6 Maj": "F",
        "Sun 7 Maj": "G",

        // Moon Scale Normal
        "Moon 1 Min": "Abm",
        "Moon 2 Dim": "Bbo",
        "Moon b3 Maj": "Cb",
        "Moon 4 Min": "Dbm",
        "Moon 5 Min": "Ebm",
        "Moon b6 Maj": "Fb",
        "Moon b7 Maj": "Gb",

        // Moon Scale Inverse
        "Moon 1 Maj": "Ab",
        "Moon 2 Maj": "Bb",
        "Moon b3 Min": "Cm",
        "Moon 4 Maj": "Db",
        "Moon 5 Maj": "Eb",
        "Moon b6 Min": "Fm",
        "Moon b7 Min": "Gm"
    },
    "A": {
        // Sun Scale Normal
        "Sun 1 Maj": "A",
        "Sun 2 Min": "Bm",
        "Sun 3 Min": "C#m",
        "Sun 4 Maj": "D",
        "Sun 5 Maj": "E",
        "Sun 6 Min": "F#m",
        "Sun 7 Dim": "G#o",

        // Sun Scale Inverse
        "Sun 1 Min": "Am",
        "Sun 2 Maj": "B",
        "Sun 3 Maj": "C#",
        "Sun 4 Min": "Dm",
        "Sun 5 Min": "Em",
        "Sun 6 Maj": "F#",
        "Sun 7 Maj": "G#",

        // Moon Scale Normal
        "Moon 1 Min": "Am",
        "Moon 2 Dim": "Bo",
        "Moon b3 Maj": "C",
        "Moon 4 Min": "Dm",
        "Moon 5 Min": "Em",
        "Moon b6 Maj": "F",
        "Moon b7 Maj": "G",

        // Moon Scale Inverse
        "Moon 1 Maj": "A",
        "Moon 2 Maj": "B",
        "Moon b3 Min": "Cm",
        "Moon 4 Maj": "D",
        "Moon 5 Maj": "E",
        "Moon b6 Min": "Fm",
        "Moon b7 Min": "Gm"
    },
    "Bb": {
        // Sun Scale Normal
        "Sun 1 Maj": "Bb",
        "Sun 2 Min": "Cm",
        "Sun 3 Min": "Dm",
        "Sun 4 Maj": "Eb",
        "Sun 5 Maj": "F",
        "Sun 6 Min": "Gm",
        "Sun 7 Dim": "Ao",

        // Sun Scale Inverse
        "Sun 1 Min": "Bbm",
        "Sun 2 Maj": "C",
        "Sun 3 Maj": "D",
        "Sun 4 Min": "Ebm",
        "Sun 5 Min": "Fm",
        "Sun 6 Maj": "G",
        "Sun 7 Maj": "A",

        // Moon Scale Normal
        "Moon 1 Min": "Bbm",
        "Moon 2 Dim": "Co",
        "Moon b3 Maj": "Db",
        "Moon 4 Min": "Ebm",
        "Moon 5 Min": "Fm",
        "Moon b6 Maj": "Gb",
        "Moon b7 Maj": "Ab",

        // Moon Scale Inverse
        "Moon 1 Maj": "Bb",
        "Moon 2 Maj": "C",
        "Moon b3 Min": "Dbm",
        "Moon 4 Maj": "Eb",
        "Moon 5 Maj": "F",
        "Moon b6 Min": "Gbm",
        "Moon b7 Min": "Abm"
    },
    "B": {
        // Sun Scale Normal
        "Sun 1 Maj": "B",
        "Sun 2 Min": "C#m",
        "Sun 3 Min": "D#m",
        "Sun 4 Maj": "E",
        "Sun 5 Maj": "F#",
        "Sun 6 Min": "G#m",
        "Sun 7 Dim": "A#o",

        // Sun Scale Inverse
        "Sun 1 Min": "Bm",
        "Sun 2 Maj": "C#",
        "Sun 3 Maj": "D#",
        "Sun 4 Min": "Em",
        "Sun 5 Min": "F#m",
        "Sun 6 Maj": "G#",
        "Sun 7 Maj": "A#",

        // Moon Scale Normal
        "Moon 1 Min": "Bm",
        "Moon 2 Dim": "C#o",
        "Moon b3 Maj": "D",
        "Moon 4 Min": "Em",
        "Moon 5 Min": "F#m",
        "Moon b6 Maj": "G",
        "Moon b7 Maj": "A",

        // Moon Scale Inverse
        "Moon 1 Maj": "B",
        "Moon 2 Maj": "C#",
        "Moon b3 Min": "Dm",
        "Moon 4 Maj": "E",
        "Moon 5 Maj": "F#",
        "Moon b6 Min": "Gm",
        "Moon b7 Min": "Am"
    }
    // Additional keys (G, Ab, A, Bb, B) should follow the same pattern.
}

const chordInversions = {
    "C": ["C", "C/E", "C/G"],
    "Dm": ["Dm", "Dm/F", "Dm/A"],
    "Em": ["Em", "Em/G", "Em/B"],
    "F": ["F", "F/A", "F/C"],
    "G": ["G", "G/B", "G/D"],
    "Am": ["Am", "Am/C", "Am/E"],
    "Bo": ["Bo", "Bo/D", "Bo/F"],

    "Cm": ["Cm", "Cm/Eb", "Cm/G"],
    "Do": ["Do", "Do/F", "Do/Ab"],
    "Eb": ["Eb", "Eb/G", "Eb/Bb"],
    "Fm": ["Fm", "Fm/Ab", "Fm/C"],
    "Gm": ["Gm", "Gm/Bb", "Gm/D"],
    "Ab": ["Ab", "Ab/C", "Ab/Eb"],
    "Bb": ["Bb", "Bb/D", "Bb/F"],

    "C#": ["C#", "C#/F", "C#/G#"],
    "D#m": ["D#m", "D#m/F#", "D#m/A#"],
    "E#m": ["E#m", "E#m/G#", "E#m/B"],
    "F#": ["F#", "F#/A#", "F#/C#"],
    "G#": ["G#", "G#/C", "G#/D#"],
    "A#m": ["A#m", "A#m/C#", "A#m/F"],
    "B#o": ["B#o", "B#o/D#", "B#o/G#"],

    "C#m": ["C#m", "C#m/E", "C#m/G#"],
    "D#o": ["D#o", "D#o/F#", "D#o/A"],
    "E": ["E", "E/G#", "E/B"],
    "F#m": ["F#m", "F#m/A", "F#m/C#"],
    "G#m": ["G#m", "G#m/B", "G#m/D#"],
    "A": ["A", "A/C#", "A/E"],
    "B": ["B", "B/D#", "B/F#"],

    "D": ["D", "D/F#", "D/A"],
    "Bm": ["Bm", "Bm/D", "Bm/F#"],
    "C#o": ["C#o", "C#o/E", "C#o/G"],

    "Eo": ["Eo", "Eo/G", "Eo/Bb"],
    "Gb": ["Gb", "Gb/Bb", "Gb/Db"],
    "Bbm": ["Bbm", "Bbm/Db", "Bbm/F"],
    "Cb": ["Cb", "Cb/Eb", "Cb/Gb"],
    "Db": ["Db", "Db/F", "Db/Ab"],

    "E": ["E", "E/G#", "E/B"],
    "F#o": ["F#o", "F#o/A", "F#o/C"],
    "Ao": ["Ao", "Ao/C", "Ao/E"],

    "F#": ["F#", "F#/A#", "F#/C#"],
    "G#m": ["G#m", "G#m/B", "G#m/D#"],
    "E#o": ["E#o", "E#o/G#", "E#o/B"],

    "G": ["G", "G/B", "G/D"],
    "Am": ["Am", "Am/C", "Am/E"],
    "F#o": ["F#o", "F#o/A", "F#o/C"],

    "Abm": ["Abm", "Abm/Cb", "Abm/Eb"],
    "Bbo": ["Bbo", "Bbo/Db", "Bbo/F"],

    "A": ["A", "A/C#", "A/E"],
    "Bm": ["Bm", "Bm/D", "Bm/F#"],
    "G#o": ["G#o", "G#o/B", "G#o/D"],
    "Bo": ["Bo", "Bo/D", "Bo/F"],
    "Dbm": ["Dbm", "Dbm/Fb", "Dbm/Ab"],
    
    "Ab": ["Ab", "Ab/C", "Ab/Eb"],
    "B": ["B", "B/D#", "B/F#"],
    "C#m": ["C#m", "C#m/E", "C#m/G#"],
    "A#o": ["A#o", "A#o/C#", "A#o/E"],
    "C#o": ["C#o", "C#o/E", "C#o/G"],
};






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


// cardslot in Chord Placement Area
const squares = document.querySelectorAll(".cardslot");

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

const chorddisplays = document.querySelectorAll(".symbol");

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

squares.forEach(cardslot => {
    cardslot.addEventListener("dragover", dragOver)
    //square.addEventListener("dragleave", dragLeave)
    cardslot.addEventListener("drop", dragDrop)
    cardslot.addEventListener("dragend", dragEnd);
    cardslot.addEventListener("dragstart", dragStartOther);
    cardslot.setAttribute("draggable", false);
    cardslot.setAttribute("unselectable", true);
    cardslot.draggable = false;

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

function keyclick(e) {
    // Update the current key based on the clicked button
    key = e.target.id.split("-")[0]; 

    // Update each chord display in the beat slots
    chorddisplays.forEach(chorddisplay => {
        const displayId = chorddisplay.id.match(/\d+/g); // Get beat slot identifier
        const targetbox = document.querySelector(`#chordboard${displayId}`);
        const imgElement = targetbox ? targetbox.querySelector(".imagesize") : null;
        const imgName = imgElement ? imgElement.id : null;

        if (imgName) {
            const rootChord = getChord(key, imgName); // Get the root chord for the selected key

            // Retrieve the inversion index for this card, defaulting to root position (0) if not set
            const card = targetbox.querySelector(".playingcard");
            const inversionIndex = card ? parseInt(card.dataset.inversionIndex) || 0 : 0;

            // Get the correct inversion based on the inversion index
            const inversionChord = chordInversions[rootChord]?.[inversionIndex] || rootChord;

            // Update the chord display in the beat slot with the inversion chord
            chorddisplay.innerHTML = inversionChord;
            console.log(`Updated chord display for beat slot ${displayId} with chord: ${inversionChord}`);
        }
    });

    // Update each chord option label in the chord start deck
    for (let i = 0; i < 7; i++) {
        const optionsymbol = document.querySelector(`#chordoptiondisplay${i + 1}`);
        const chordsquareid = document.querySelector(`#chordsquare${i + 1}`);
        const imageElement = chordsquareid ? chordsquareid.querySelector(".imagesize") : null;
        const imgName = imageElement ? imageElement.id : null;

        if (imgName) {
            const rootChord = getChord(key, imgName); // Get the root chord for the selected key

            // Retrieve the inversion index for this card, defaulting to root position (0) if not set
            const card = chordsquareid.querySelector(".playingcard");
            const inversionIndex = card ? parseInt(card.dataset.inversionIndex) || 0 : 0;

            // Get the correct inversion based on the inversion index
            const inversionChord = chordInversions[rootChord]?.[inversionIndex] || rootChord;

            // Update the chord option display with the inversion chord
            optionsymbol.innerHTML = inversionChord;
            console.log(`Updated chord option display for option ${i + 1} with chord: ${inversionChord}`);
        }
    }
    refreshSymbols();
}


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
    populateCards(SUN_CARDS);}

function moonclick(){
    sunmoon = "moon"
    chordsquares.forEach(chordsquare =>{chordsquare.innerHTML= ""})
    populateCards(MOON_CARDS);}


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

function refreshSymbols() {
    console.log("Starting refreshSymbols");

    const boardCardslots = document.querySelectorAll(".cardslot");

    boardCardslots.forEach(cardslot => {
        const card = cardslot.querySelector(".playingcard");
        const beatContainer = cardslot.closest(".beat");
        if (!beatContainer) {
            console.warn(`No .beat container found for cardslot: ${cardslot.id}`);
            return;
        }

        const symbolDisplay = beatContainer.querySelector(".symbol");

        if (symbolDisplay) {
            if (card) {
                // Check if the card is flipped and determine the correct image name
                const cardInner = card.querySelector(".cardinner");
                const isFlipped = cardInner && cardInner.classList.contains("flipped");
                const visibleImage = isFlipped
                    ? card.querySelector(".cardinnerback img")  // Use back image if flipped
                    : card.querySelector(".cardinnerfront img"); // Use front image if not flipped

                const imgName = visibleImage ? visibleImage.id : null;

                if (imgName) {
                    const chordSymbol = getChord(key, imgName);
                    symbolDisplay.innerHTML = chordSymbol;
                    console.log(`Updated symbol for ${cardslot.id}: ${chordSymbol}`);
                } else {
                    symbolDisplay.innerHTML = ""; // Clear symbol if no valid image ID
                }
            } else {
                // Clear the symbol display if there's no card in the cardslot
                symbolDisplay.innerHTML = "";
                console.log(`Cleared symbol for empty cardslot: ${cardslot.id}`);
            }
        }
    });

    console.log("Completed refreshSymbols");
}








function dragDrop(e) {
    if (beingDragged == null) {
        console.log("Nothing being dragged");
        return;
    }

    console.log("Being dragged class: " + beingDragged.className + " id: " + beingDragged.id);
    console.log("Dropping target class: " + e.target.className + " id: " + e.target.id);

    let targetSquare = e.target.closest('.cardslot, .trashcan');

    if (targetSquare) {
        if (targetSquare.classList.contains("trashcan")) {
            // Handle drop in the trashcan
            targetSquare.innerHTML = "";
            targetSquare.append(beingDragged);

            // Clear the trashcan contents after a short delay
            setTimeout(() => {
                targetSquare.innerHTML = "";
            }, 500); // Adjust delay time as needed (500ms = 0.5 seconds)
            
            beingDragged = null; // Discard the reference to the dragged element
        } else {
            // Move the dragged element to the new cardslot
            targetSquare.innerHTML = "";      // Clear the targetSquare content
            targetSquare.append(beingDragged); // Move the card to the targetSquare

            // Extract the bar and beat from data-box attribute
            const boxId = targetSquare.dataset.box;
            const [bar, beat] = boxId.match(/\d+/g); // Extracts bar and beat numbers

            // Check if the card is flipped and determine the correct image name
            const isFlipped = beingDragged.querySelector(".cardinner").classList.contains("flipped");
            const visibleImage = isFlipped 
                ? beingDragged.querySelector(".cardinnerback img") 
                : beingDragged.querySelector(".cardinnerfront img");

            var imgName = visibleImage ? visibleImage.id : null;

            // Update the symbol display based on the visible side
            if (imgName) {
                const symbolDisplay = document.getElementById(`chorddisplay${bar}${beat}`);
                symbolDisplay.innerHTML = getChord(key, imgName);

                // Set color based on flip status
              //  if (isFlipped) {
                  //  symbolDisplay.style.color = "black"; // Color for the back side
              //  } else {
                   // symbolDisplay.style.color = "rgb(120, 213, 216)"; // Color for the front side (change as needed)
             //   }

                console.log(`Updated chord display for bar ${bar}, beat ${beat} with chord: ${symbolDisplay.innerHTML}`);
                console.log(`Updated color for chord display: ${symbolDisplay.style.color}`);
            }
            
            beingDragged = null;  // Clear the dragged element reference after moving
        }
    }

    // Clear chord displays for all chord squares in the bottom chord options
    chordsquares.forEach(chordsquare => {
        chordsquare.innerHTML = "";
    });

    e.target.classList.remove("highlight");

    // Repopulate cards in the chord options based on sun/moon mode
    if (sunmoon === "moon") {
        populateCards(MOON_CARDS);
    } else {
        populateCards(SUN_CARDS);
    }

    // Refresh all symbols on the chordboard after the drop
    refreshSymbols(); // Update all symbols based on their corresponding cards
}





function dragEnd (e) {
    beingDragged = null;
}






/*
// Function to rotate the card within a cardslot and update chord symbol
function rotateCardInCardSlot(cardslot) {
    // Find a card inside the cardslot
    const card = cardslot.querySelector(".playingcard");

    if (card) {
        // Get the current rotation position (0, 90, or 180), defaulting to 0 if not set
        let currentRotation = parseInt(card.dataset.rotation) || 0;

        // Cycle through three positions: 0 -> 90 -> 180 -> back to 0
        if (currentRotation === 0) {
            currentRotation = 90;
        } else if (currentRotation === 90) {
            currentRotation = 180;
        } else {
            currentRotation = 0; // Reset to upright after 180
        }

        // Apply the new rotation to the card
        card.style.transform = `rotate(${currentRotation}deg)`;
        
        // Update the data attribute to store the current rotation
        card.dataset.rotation = currentRotation;

        // Calculate and store the inversion index in the card's dataset
        const inversionIndex = currentRotation / 90;
        card.dataset.inversionIndex = inversionIndex;

        // Get the descriptive chord name from the card image (e.g., "Sun 1 Maj")
        const imgElement = card.querySelector(".imagesize");
        if (imgElement) {
            const descriptiveChordName = imgElement.id; // e.g., "Sun 1 Maj"

            // Use getChord to fetch the actual root chord based on the key and descriptive name
            const rootChord = getChord(key, descriptiveChordName);
            console.log("Root chord:", rootChord);

            // Look up the chord inversion based on root chord and inversion index
            const inversionChord = chordInversions[rootChord]?.[inversionIndex];
            console.log("Inversion chord:", inversionChord);

            // Extract bar and beat numbers directly from the cardslot's dataset
            const [bar, beat] = cardslot.dataset.box.match(/\d+/g); // Extract bar and beat numbers

            // Find the symbol display element based on the bar and beat numbers
            const chordDisplay = document.getElementById(`chorddisplay${bar}${beat}`);
            
            if (chordDisplay) {
                // Update the display with the new inversion chord
                console.log(`Updating chord display for bar ${bar}, beat ${beat} with chord: ${inversionChord}`);
                chordDisplay.innerHTML = inversionChord;
            } else {
                console.warn(`Chord display element not found for bar ${bar}, beat ${beat}`);
            }
        } else {
            console.warn("No image element found in this card to identify root chord");
        }
    } else {
        console.warn("No card found in this cardslot");
    }
}*/




/*

// Add event listeners to all squares within the chordboard
const boardsquares = document.querySelectorAll("#chordboard .cardslot");
boardsquares.forEach(cardslot => {
    cardslot.addEventListener("click", function() {
        rotateCardInCardSlot(cardslot);
    });
});

*/

/*
card.addEventListener("click", function() {
    flipCard(card); // Call flipCard function when the card is clicked
});

*/

/*

// Function to flip the card and update the symbol based on the visible side
function flipCard(card) {
    const cardInner = card.querySelector(".cardinner");
    if (cardInner) {
        cardInner.classList.toggle("flipped"); // Toggle the flipped class

        // Delay to wait for the flip animation to complete (adjust as needed)
        setTimeout(() => {
            updateSymbol(card); // Call the symbol update function after flip
        }, 0); // Adjust delay time as needed based on animation duration
    }
}

*/

function updateSymbol(card) {
    const isFlipped = card.querySelector(".cardinner").classList.contains("flipped");
    const visibleImage = isFlipped 
        ? card.querySelector(".cardinnerback img") 
        : card.querySelector(".cardinnerfront img");

    if (visibleImage) {
        const imageName = visibleImage.id; // Use the ID of the image as the name
        console.log("Image name for symbol update:", imageName); // For debugging

        // Get the closest .beat container that contains both .cardslot and .symbol
        const beatContainer = card.closest(".beat");
        if (!beatContainer) {
            console.warn("No .beat container found for this card.");
            return;
        }
        
        // Now, look for the .symbol within this beat container
        const symbolDisplay = beatContainer.querySelector(".symbol");
        if (symbolDisplay) {
            const symbol = getChordSymbol(imageName);
            symbolDisplay.innerHTML = symbol; // Display the corresponding symbol

            // Change the color based on whether the card is flipped
           // if (isFlipped) {
                //symbolDisplay.style.color = "black"; // Set to blue (or any color) when flipped
       //     } else {
               // symbolDisplay.style.color = "rgb(120, 213, 216)"; // Set to black (or any color) when not flipped
       //     }

            console.log("Updated symbol display to:", symbol); // For debugging
        } else {
            console.warn("Symbol display element (.symbol) not found within the beat container for the card.");
        }
    } else {
        console.warn("Visible image element not found for symbol update.");
    }
}



// Function to map image names to chord symbols using the chordsByKey table
function getChordSymbol(imageName) {
    if (key && chordsByKey[key]) {
        const symbol = chordsByKey[key][imageName];
        if (symbol) {
            console.log("Chord symbol found:", symbol, "for key:", key, "and image name:", imageName);
            return symbol; // Return the chord symbol if found
        } else {
            console.warn("Chord symbol not found for image name:", imageName, "in key:", key);
            return ""; // Return empty string if symbol not found for the image name
        }
    } else {
        console.warn("Key or chord mapping not found for key:", key, "and image name:", imageName);
        return ""; // Return an empty string if key or mapping doesn't exist
    }
}


/*

// Add the click event to flip the card and update the symbol
document.querySelectorAll(".playingcard").forEach(card => {
    card.addEventListener("click", function() {
        flipCard(card); // Flip the card and update the symbol on click
    });
});

*/
// Select the modal and close button

// Select the modal, front and back images, and popup container
const cardPopup = document.getElementById("cardPopup");
const popupFrontImage = document.getElementById("popupFrontImage");
const popupBackImage = document.getElementById("popupBackImage");

// Variable to store the triggering cardslot for later replacement
let triggeringSlot = null;

// Function to show the popup and store the triggering cardslot
function showPopup(cardInfo = '', cardFrontSrc = '', cardBackSrc = '', slot = null) {
    triggeringSlot = slot; // Store the triggering cardslot

    // Set the content and image sources
    popupFrontImage.src = cardFrontSrc;
    popupBackImage.src = cardBackSrc;

    // Show or hide the images based on their sources
    popupFrontImage.style.display = cardFrontSrc ? 'block' : 'none';
    popupBackImage.style.display = cardBackSrc ? 'block' : 'none';

    // Show the popup in the center of the page
    cardPopup.classList.remove("hidden");
    cardPopup.classList.add("visible");
}

// Function to hide the popup
function hidePopup() {
    cardPopup.classList.remove("visible");
    cardPopup.classList.add("hidden");
    triggeringSlot = null; // Clear the reference to the triggering slot
}

// Add event listeners to each .cardslot to open the popup only if it contains a .playingcard
document.querySelectorAll(".cardslot").forEach(cardslot => {
    cardslot.addEventListener("click", function() {
        // Check if the cardslot contains a playingcard
        const playingCard = cardslot.querySelector(".playingcard");

        if (playingCard) {
            const cardInfo = `Details about ${playingCard.id}`; // Customize as needed

            // Get the front and back images within the playing card
            const frontImage = playingCard.querySelector(".cardinnerfront img");
            const backImage = playingCard.querySelector(".cardinnerback img");

            const frontImageSrc = frontImage ? frontImage.src : '';
            const backImageSrc = backImage ? backImage.src : '';

            // Show the popup with the card details and images
            showPopup(cardInfo, frontImageSrc, backImageSrc, cardslot);
        }
    });
});

popupFrontImage.addEventListener("click", () => {
    console.log(`Front image clicked! Image name: ${popupFrontImage.src}`);
    if (triggeringSlot) {
        console.log("Setting isFlipped to false for front image.");
        replaceCardInSlot(triggeringSlot, popupFrontImage.src, false); // Not flipped
        hidePopup();
    }
});

popupBackImage.addEventListener("click", () => {
    console.log(`Back image clicked! Image name: ${popupBackImage.src}`);
    if (triggeringSlot) {
        console.log("Setting isFlipped to true for back image.");
        replaceCardInSlot(triggeringSlot, popupBackImage.src, true); // Flipped
        hidePopup();
    }
});


// Function to replace the card in the specified cardslot and apply flipping based on clicked image
function replaceCardInSlot(cardslot, newImageSrc, isFlipped) {
    const card = cardslot.querySelector(".playingcard");
    const cardInner = card ? card.querySelector(".cardinner") : null;

    if (card && cardInner) {
        console.log(`Replacing image in ${cardslot.id} with ${newImageSrc}`);
        
        // Find the correct image element to update based on isFlipped
        const targetImage = isFlipped
            ? card.querySelector(".cardinnerback img")
            : card.querySelector(".cardinnerfront img");

        if (targetImage) {
            targetImage.src = newImageSrc;
            console.log(`Updated ${isFlipped ? "back" : "front"} image in ${cardslot.id}`);
        }

        // Apply or remove the flipped class based on the clicked image
        if (isFlipped) {
            cardInner.classList.add("flipped");
        } else {
            cardInner.classList.remove("flipped");
        }

        // Refresh symbols to reflect the updated image and flipped state
        refreshSymbols();
    }
}

// Update the popup image click handlers to include flipping logic
popupFrontImage.addEventListener("click", () => {
    console.log(`Front image clicked! Image name: ${popupFrontImage.src}`);
    if (triggeringSlot) {
        replaceCardInSlot(triggeringSlot, popupFrontImage.src, false); // Not flipped
        hidePopup();
        refreshSymbols();
    }
});

popupBackImage.addEventListener("click", () => {
    console.log(`Back image clicked! Image name: ${popupBackImage.src}`);
    if (triggeringSlot) {
        replaceCardInSlot(triggeringSlot, popupBackImage.src, true); // Flipped
        hidePopup();
        refreshSymbols();
    }
});




// Close the popup when clicking outside the popup content
window.onclick = function(event) {
    if (event.target === cardPopup) {
        hidePopup();
    }
};





