"use strict";

let passengerArray = [];
let id = 1;
let select = document.getElementById("passengers");

class Passenger {
    constructor(firstName, lastName, dob, leavingCity, arrivingCity, leaveDate, returnDate, bags, meal, extras){
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.leavingCity = leavingCity;
        this.arrivingCity = arrivingCity;
        this.leaveDate = leaveDate;
        this.returnDate = returnDate;
        this.bags = bags;
        this.meal = meal;
        this.extras = extras;
        this.id = id;
        id++;

        // Can drink?
        let birthDate = Date.parse(dob);
        let currentDay = Date.now();
        let age = (currentDay - birthDate)/31536000000;
        this.age = Math.floor(age)
        if(age < 21){
            this.canDrink = false;
        }else{
            this.canDrink = true;
        }

        // Extra Cost
        this.extraCost = (extras.length * 10) + (bags * 20);

        //Time Gone
        let leaveTime = Date.parse(leaveDate);
        let returnTime = Date.parse(returnDate);

        this.DaysGone = (returnTime - leaveTime) / 86400000;
    }
}

function compareFirstName(user1, user2){
    let firstName1 = user1.firstName.toUpperCase();
    let firstName2 = user2.firstName.toUpperCase();
    if(firstName1 == firstName2){
        let lastName1 = user1.lastName.toUpperCase();
        let lastName2 = user1.lastName.toUpperCase();
        if(lastName1 > lastName2){
            return 1;
        }else if(lastName1 < lastName2){
            return -1;
        }else{
            return 0;
        }
    }
    if (firstName1 > firstName2){
        return 1;
    }else{
        return -1;
    }
}

function compareLastName(user1, user2){
    let lastName1 = user1.lastName.toUpperCase();
    let lastName2 = user2.lastName.toUpperCase();
    if(lastName1 == lastName2){
        let compare = compareFirstName(user1, user2);
        if(compare == 1){
            return 1;
        }else if(compare == -1){
            return -1;
        }else{
            return 0;
        }
    }
    if (lastName1 > lastName2){
        return 1;
    }else{
        return -1;
    }
}

function compareID(user1, user2){
    let id1 = user1.id;
    let id2 = user2.id;
    if (id1 > id2){
        return 1;
    }else{
        return -1;
    }
}

function submitInfo(){
    // Basic Information
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let dob = document.getElementById("dob").value;
    let leavingCity = document.getElementById("leavingCity").value;
    let arrivingCity = document.getElementById("arrivingCity").value;
    let leaveDate = document.getElementById("leaveDate").value;
    let returnDate = document.getElementById("returnDate").value;
    let bags = document.getElementById("bags").value;
    let meal = "";
    let extras = []

    // Select Meal
    let radios = document.getElementsByName('meal');
    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            meal = radios[i].id;
            break;
        }
    }

    // Select Extras
    let checks = document.getElementsByName("extras");
    for(let i = 0; i < checks.length; i++){
        if(checks[i].checked){
            extras.push(checks[i].id);
        }
    }
    
    let passenger;

    if(firstName && lastName && dob && leavingCity && arrivingCity && leave`Date` && returnDate){
        passenger = new Passenger(firstName, lastName, dob, leavingCity, arrivingCity, leaveDate, returnDate, bags, meal, extras);
        passengerArray.push(passenger);
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("leavingCity").value = "";
        document.getElementById("arrivingCity").value = "";
        document.getElementById("leaveDate").value = "";
        document.getElementById("returnDate").value = "";
        document.getElementById("bags").value = "";
        console.log(passengerArray)

        let elems = document.getElementsByName("extras");
        for(let i = 0; i < elems.length; i++){
            elems[i].checked = false;
        }
        elems = document.getElementsByName("meal");
        for(let i = 0; i < elems.length; i++){
            elems[i].checked = false;
        }

        let opt = document.createElement(`option`);
        opt.textContent = `${firstName} ${lastName}`;
        opt.className += " option"
        select.appendChild(opt);
    }else{
        alert(`You are missing some fields`)
    }
}
let opt = document.createElement(`option`);

let passenger = new Passenger(`Rick`, `Astley`, `1966-02-06`, `Los Angeles, CA`, `Paris`, `2021-04-06`, `2021-04-10`,12, `fish`, [`headphones`, `window seat`]);
passengerArray.push(passenger);
opt.textContent = `Rick Astley`;
opt.className = `option`;
select.appendChild(opt);

passenger = new Passenger(`Jimmy`, `V`, `2005-04-12`, `Phoenix, AZ,`, `Japan`, `2021-09-18`, `2021-09-20`, 3, `chicken`, [`legroom`, `extra food`]);
passengerArray.push(passenger);
opt = document.createElement(`option`);
opt.textContent = `Jimmy V`;
opt.className = `option`;
select.appendChild(opt);

passenger = new Passenger(`Jimmy`, `B`, `2001-10-31`, `Dallas`, `Tokyo`, `2021-12-03`, `2021-12-05`, 10, `vegetarian`, []);
passengerArray.push(passenger);
opt = document.createElement(`option`);
opt.textContent = `Jimmy B`;
opt.className = `option`;
select.appendChild(opt);

function searchArray(search){
    if(search == "Name"){
        console.log(`Yes`)
        return false;
    }
    
    let query = "";
    if(!search){
        query = document.getElementById("searchBar").value;
    }else{
        query = search;
    }


    console.log(query)
    let match = "";
    query = query.split(" ");

    for(let i = 0; i < passengerArray.length; i++){
        if(passengerArray[i].firstName== query[0]){
            if(passengerArray[i].lastName == query[1]){
                match = passengerArray[i];
                break;
            }
        }
    }
    if(!match){
        alert("No passenger matches that name, please check the spelling")
    }
    return match;
}

function print(query){
    let match = searchArray(query)
    if(!match){
        return;
    }
    document.getElementById("firstNameOutput").value = match.firstName;
    document.getElementById("lastNameOutput").value = match.lastName;
    document.getElementById("bagsOutput").value = match.bags;
    document.getElementById("dobOutput").value = match.dob;
    document.getElementById("departingOutput").value = match.leavingCity;
    document.getElementById("arrivingOutput").value = match.arrivingCity;
    document.getElementById("leavingOutput").value = match.leaveDate;
    document.getElementById("returningOutput").value = match.returnDate;
    document.getElementById("durationOutput").value = `${match.DaysGone} days`;
    document.getElementById("mealOutput").value = match.meal;
    document.getElementById("ageOutput").value = match.age;
    document.getElementById("costOutput").value = `$${match.extraCost}`;
    document.getElementById("extrasOutput").value = match.extras;
    document.getElementById("idOutput").value = match.id;
}

function selectOption(){
    let value = select.options[select.selectedIndex].textContent;
    print(value);
}

function submitChanges(){
    let id = document.getElementById("idOutput").value;
    let match = "";
    if(id == ""){
        return false;
    }

    for(let i = 0; i < passengerArray.length; i++){
        if(passengerArray[i].id == id){
            match = passengerArray[i]
        }
    }

    if(!match){
        console.log(`no`)
        return;
    }

    let options = document.getElementsByClassName("option");
    console.log(options)
    for(let i = 0; i < options.length; i++){
        console.log(`something`)
        if(options[i].textContent == `${match.firstName} ${match.lastName}`){
            options[i].textContent = `${document.getElementById("firstNameOutput").value} ${document.getElementById("lastNameOutput").value}`
            break;
        }
    }

    match.firstName = document.getElementById("firstNameOutput").value;
    match.lastName = document.getElementById("lastNameOutput").value;
    match.bags = document.getElementById("bagsOutput").value;
    match.dob = document.getElementById("dobOutput").value;
    match.leavingCity = document.getElementById("departingOutput").value;
    match.arrivingCity = document.getElementById("arrivingOutput").value;
    match.leaveDate = document.getElementById("leavingOutput").value;
    match.returnDate = document.getElementById("returningOutput").value;
    match.meal = document.getElementById("mealOutput").value;

    let extras = document.getElementById("extrasOutput").value;
    if(extras == []){
        match.extras = [];
    }else{
    extras = extras.split(",");
    match.extras = extras;
    }

    // Can drink?
    let birthDate = Date.parse(match.dob);
    let currentDay = Date.now();
    let age = (currentDay - birthDate)/31536000000;
    match.age = Math.floor(age)
    document.getElementById("ageOutput").value = match.age;

    if(age < 21){
        match.canDrink = false;
    }else{
        match.canDrink = true;
    }

    // Extra Cost
    match.extraCost = (match.extras.length * 10) + (match.bags * 20);
    document.getElementById("costOutput").value = `$${match.extraCost}`;

    //Time Gone
    let leaveTime = Date.parse(match.leaveDate);
    let returnTime = Date.parse(match.returnDate);

    match.DaysGone = (returnTime - leaveTime) / 86400000;
    document.getElementById("durationOutput").value = `${match.DaysGone} days`;

    
}

function printList(arr) {
    let ul = document.getElementById("nameList");

    ul.innerHTML = "";

    for(let i = 0; i<arr.length; i++){
        let li = document.createElement("li");
        li.onclick = function(){print(`${arr[i].firstName} ${arr[i].lastName}`)};
        ul.appendChild(li);
        li.className += "listItem name";

        let listName = document.createElement("p");
        listName.textContent = `${arr[i].firstName} ${arr[i].lastName}`;
        listName.className += "nameListItem";
        li.appendChild(listName);

        let listID = document.createElement("p");
        listID.textContent = `${arr[i].id}`;
        listID.className += "listID";
        li.appendChild(listID);
    }
}

function printNames(){
    let ul = document.getElementById("nameList");

    ul.innerHTML = "";

    let select = document.getElementById("sort");
    
    if(select.options[select.selectedIndex].value == "ID"){
        let sortedArr = passengerArray;
        for(let i = 0; i < passengerArray.length - 1;){
            if(compareID(sortedArr[i], sortedArr[i+1]) == 1){
                let temp = sortedArr[i];
                sortedArr[i] = sortedArr[i+1];
                sortedArr[i+1] = temp;
                if(i > 0){
                    --i;
                    continue;
                }
            }else{
                i++;
            }
        }
        printList(sortedArr)
    }
    if(select.options[select.selectedIndex].textContent == "Last Name"){
        let sortedArr = passengerArray;
        for(let i = 0; i < passengerArray.length - 1;){
            if(compareLastName(sortedArr[i], sortedArr[i+1]) == 1){
                let temp = sortedArr[i];
                sortedArr[i] = sortedArr[i+1];
                sortedArr[i+1] = temp;
                if(i > 0){
                    --i;
                    continue;
                }
            }else{
                i++;
            }
        }
        printList(sortedArr)
    }

    if(select.options[select.selectedIndex].textContent == "First Name"){
        let sortedArr = passengerArray;
        for(let i = 0; i < passengerArray.length - 1;){
            if(compareFirstName(sortedArr[i], sortedArr[i+1]) == 1){
                let temp = sortedArr[i];
                sortedArr[i] = sortedArr[i+1];
                sortedArr[i+1] = temp;
                if(i > 0){
                    --i;
                    continue;
                }
            }else{
                i++;
            }
        }
        printList(sortedArr)
    }
}

// Random Passenger Generator

let names = [`Yvie Stuart`,`Amy Wiggins`,`Saba Mcfarland`,`Shanai Mathis`,`Nyah Davie`,`Killian Peters`,`Marcia Frank`,`Abbey Hilton`,`Manal Mcdermott`,`Victor Ireland`,`Mahek Livingston`,`Shayan Cotton`,`Gregory Orr`,`Leia Leal`,`Verity William`,`Amelia-Grace Nixon`,`Antonina Daugherty`,`Lois Vaughn`,`Nikki Salas`,`Ameer Kaufman`,`Phoebe Whitehouse`,`Amy-Louise Nieves`,`Jennifer Humphrey`,`Leo Lee`,`Ronny Hills`,`Faisal Rollins`,`Dillan Bourne`,`Keir Costa`,`Ruby-Rose Leigh`,`Samiya Bains`,`Sayed Eaton`,`Ridwan Ochoa`,`Asiyah Stephenson`,`Shelby Mcpherson`,`Sol Sumner`,`Federico Robson`,`Dane Mata`,`Charis Strickland`,`Sophie Wade`,`Saul Graham`,`Denny Milne`,`Kier Harrison`,`Vihaan Richards`,`Reis Mcgregor`,`Maeve Whittaker`,`Aden Higgins`,`Kingston Gardiner`,`Virgil Gross`,`Roan Everett`,`Simon Morse`]
let firstNames = [];
let lastNames = [];

for(let i = 0; i < names.length; i++){
    let firstName = "";
    let lastName = "";

    [firstName, lastName] = names[i].split(" ");

    firstNames.push(firstName);
    lastNames.push(lastName);
}

let cities = [`Pheonix, AZ`, `Las Vegas, NV`, `Los Angelas, CA`, `Paris, France`, `Atlantis`, `Bikini Bottom`, `Tokyo, Japan`, `Australia`, `Dallas, TX`, `Hawaii`, `Mexcio City, Mexico`]
let meals = [`chicken`, `fish`, `vegetarian`];
let extras = [`extra legroom`,`window seat`,`headphones`,`extra food`];

function createRandomDate(minYear, maxYear){
    let month = Math.ceil(Math.random() * 12);
    let day = Math.ceil(Math.random() * 28);
    let year = Math.floor(Math.random() * (maxYear - minYear) + minYear);
    
    if(day < 10){
        day = "0" + day;
    }
    if(month < 10){
        month = "0" + month;
    }

    return `${year}-${month}-${day}`
}

function createRandomPassenger(){
    let randnum = Math.floor(Math.random() * 49);
    let randFirstName = firstNames[randnum];

    randnum = Math.floor(Math.random() * 49);
    let randLastName = lastNames[randnum];

    randnum = Math.floor(Math.random() * 10);
    let randDeparture = cities[randnum];
    let randnum2 = Math.floor(Math.random() * 10);
    while(randnum == randnum2){
        randnum2 = Math.floor(Math.random() * 10);
    }
    let randArrival = cities[randnum2]

    let randBags = Math.floor(Math.random() * 5);
    
    let randdob = createRandomDate(1960, 2000);
    let randLeaveDate = createRandomDate(2020, 2021)
    let randReturnDate = createRandomDate(2022, 2023)

    randnum = Math.floor(Math.random() * 2);
    let randMeal = meals[randnum];

    let randAmount = Math.floor(Math.random() * 5);
    let randExtras = [];
    if(randAmount == 4){
        randExtras == extras;
    }else{
        for(let i = 0; i < randAmount; i++){
            randnum = Math.floor(Math.random() * 4);
            let dupe = false;
            for(let n = 0; n < randExtras.length; n++){
                if (extras[randnum] == randExtras[n]){
                    dupe = true;
                }
            }
            if(dupe){
                i--;
                continue;
            }
            randExtras.push(extras[randnum])
        }
    }

    let passenger = new Passenger(randFirstName, randLastName, randdob, randDeparture, randArrival, randLeaveDate, randReturnDate, randBags, randMeal, randExtras)
    passengerArray.push(passenger);

    let opt = document.createElement(`option`);
    opt.textContent = `${randFirstName} ${randLastName}`;
    opt.className = `option`;
    select.appendChild(opt);
}

for(let i = 0; i < 7; i++){
    createRandomPassenger();
}