button = document.getElementById("btn");
let form = undefined;

let colors = [`#009687f5`, `#dc7657f5`, `#4bb3c1fa`, `#fac069f9`, `#67a866f9`, `#b94169fa`, `#7f62b3fa`, `#9fc376f9`, `#677bcbfa`];

const DINOS = [{
        species: "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        species: "Tyrannosaurus Rex",
        weight: 11905,
        height: 144,
        diet: "carnivor",
        where: "North America",
        when: "Late Cretaceous",
        fact: "The largest known skull measures in at 5 feet long."
    },
    {
        species: "Anklyosaurus",
        weight: 10500,
        height: 55,
        diet: "herbavor",
        where: "North America",
        when: "Late Cretaceous",
        fact: "Anklyosaurus survived for approximately 135 million years."
    },
    {
        species: "Brachiosaurus",
        weight: 70000,
        height: "372",
        diet: "herbavor",
        where: "North America",
        when: "Late Jurasic",
        fact: "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        species: "Stegosaurus",
        weight: 11600,
        height: 79,
        diet: "herbavor",
        where: "North America, Europe, Asia",
        when: "Late Jurasic to Early Cretaceous",
        fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines."
    },
    {
        species: "Elasmosaurus",
        weight: 16000,
        height: 59,
        diet: "carnivor",
        where: "North America",
        when: "Late Cretaceous",
        fact: "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        species: "Pteranodon",
        weight: 44,
        height: 20,
        diet: "carnivor",
        where: "North America",
        when: "Late Cretaceous",
        fact: "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        species: "Pigeon",
        weight: 0.5,
        height: 9,
        diet: "herbavor",
        where: "World Wide",
        when: "Holocene",
        fact: "All birds are living dinosaurs."
    }
]

// Create Dino Constructor
class Dino {
    Constructor({ species, height, weight, diet, where, when, fact }) {
        this.species = species;
        this.diet = diet;
        this.weight = weight;
        this.height = height;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

}
// Create Dino Objects

let dinoList = [];

for (let dinoNum = 0; dinoNum < DINOS.length; dinoNum++) {
    dinoList.push(DINOS[dinoNum]);
}


// Create Human Object
function human() {
    this.humanName = document.getElementById("name").value;
    this.inches = document.getElementById("inches").value;
    this.feet = document.getElementById("feet").value;
    this.weight = document.getElementById("weight").value;
    this.diet = document.getElementById("diet");
    this.diet = this.diet.options[this.diet.selectedIndex].text;
    let select = function inchOrFeet() {
        if (this.inches == '') {
            return this.feet * 12;
        } else {
            return this.inches
        }
    };
    // Use IIFE to get human data from form
    return {
        humanName: this.humanName,
        height: select(),
        weight: this.weight,
        diet: this.diet,
        compareHeight: compareHeight,
        compareWeight: compareWeight,
        compareDiet: compareDiet
    };
}

let you = human;

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 

function compareHeight(human, dinosaur) {
    if (human.height > dinosaur.height) {
        return `you need ${human.height/dinosaur.height} ${dinosaur.name}s to have same height`;
    }
    return `you need ${dinosaur.height/human.height} times taller to see ${dinosaur.name}'s head`;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(human, dinosaur) {
    if (human.weight > dinosaur.weight) {
        return `you are heavier ${human.weight/dinosaur.weight} times than ${dinosaur.name}`;
    }
    return `you need ${dinosaur.weight/human.weight} times your weight to equal ${dinosaur.name}'s weight`;
}

// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(human, dinosaur) {
    if (human.diet === dinosaur.diet) {
        return `you can have dinner with ${dinosaur.name} 😋`;
    }
    return `${dinosaur.name} will refuse to eat your food 😋`;
}

// Generate Tiles for each Dino in Array
function createDinoTile(creature, color) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let fact = document.createElement("p");
    let header = document.createElement("h3");
    header.innerText = creature.species;
    div.appendChild(header);
    img.src = "images/" + creature.species + ".png";
    div.appendChild(img);
    fact.innerText = creature.fact;
    div.appendChild(fact);
    div.classList = "grid-item";
    div.style.background = color;
    return div;
}

//Generate tile for human
function createHumanTile(human, color) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let fact = document.createElement("p");
    let header = document.createElement("h3");
    header.innerText = `Mr. ${human.humanName}`;
    div.appendChild(header);
    img.src = "images/human.png";
    div.appendChild(img);
    fact.innerText = "Most weak, yet most powerfull creature";
    div.appendChild(fact);
    div.classList = "grid-item";
    div.style.background = color;
    return div;
}

// Add tiles to DOM
function addDinoToDom(creature, color) {
    let main = document.getElementById("grid");
    main.appendChild(createDinoTile(creature, color));
}

//Add Human to DOM
function addHumanToDom(human, color) {
    let main = document.getElementById("grid");
    main.insertBefore(createHumanTile(human, color), main.children[4]);
}

// Remove form from screen
function removeForm() {
    document.getElementById("dino-compare").style.display = "none";
}

// Show form
function returnForm() {
    document.getElementById("dino-compare").style.display = "";
    document.getElementById("grid").textContent = "";

}

//randomize array
function shuffle(array) {
    let temp;
    let randomVal;
    for (let i = 0; i < array.length; i++) {
        temp = array[i];
        randomVal = Math.floor(Math.random() * array.length);
        array[i] = array[randomVal];
        array[randomVal] = temp;
    }
    return array;
}

function copy(array) {
    let copyArray = [];
    for (let index = 0; index < array.length; index++) {
        copyArray.push(array[index]);
    }
    return copyArray;
}

// On button click, prepare and display infographic
button.addEventListener("click", function() {
    let name = document.getElementById("name").value == "";
    let height = document.getElementById("inches").value == "" && document.getElementById("feet").value == "";
    let weight = document.getElementById("weight").value == "";
    if (!(name || height || weight)) {
        you = human();
        removeForm();
        dinoList = shuffle(dinoList);
        let newColors = shuffle(copy(colors));
        dinoList.forEach(element => {
            addDinoToDom(element, newColors.pop());
        });
        addHumanToDom(you, newColors.pop());
    } else {
        if (name) {
            document.getElementById("name").style.border = "solid 1px red";
        } else {
            document.getElementById("name").style.border = "0";
        }
        if (height) {
            document.getElementById("inches").style.border = "solid 1px red";
            document.getElementById("feet").style.border = "solid 1px red";
        } else {
            document.getElementById("inches").style.border = "0";
            document.getElementById("feet").style.border = "0";
        }
        if (weight) {
            document.getElementById("weight").style.border = "solid 1px red";
        } else {
            document.getElementById("weight").style.border = "0";
        }
    }
});