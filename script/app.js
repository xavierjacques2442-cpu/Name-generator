let firstNameElement = document.getElementById("firstName");
let lastNameElement = document.getElementById("lastName");
let emailCodeElement = document.getElementById("emailCode");
let emailPersonalElement = document.getElementById("emailPersonal");
let userBtn = document.getElementById("userBtn");

let historyList = document.getElementById("historyList");
let historyListArray = []; 

function getData() {
    return fetch("../data/data.json")
        .then(response => response.json())
        .then(data => {
            return data.students;
        });
}

function randomizeData(students) {
    let randomIndex = Math.floor(Math.random() * students.length);
    return students[randomIndex];
}

function updateHistoryList() {
    historyList.innerHTML = ""; 

    historyListArray.forEach((student) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${student.firstName} ${student.lastName} - ${student.emailCode} - ${student.emailPersonal}`;
        historyList.appendChild(listItem);
    });
}

userBtn.addEventListener("click", () => {
    getData().then((students) => {
        let randomStudent = randomizeData(students);

        firstNameElement.innerText = randomStudent.firstName;
        lastNameElement.innerText = randomStudent.lastName;
        emailCodeElement.innerText = randomStudent.emailCode;
        emailPersonalElement.innerText = randomStudent.emailPersonal;

      
        historyListArray.unshift(randomStudent);

        if (historyListArray.length > 5) {
            historyListArray.pop();
        }

        updateHistoryList();
    });
});
