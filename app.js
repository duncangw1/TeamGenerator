const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Creating array to hold objects for each team member
const myTeam = [];

// Function to add the team manager's info and push to the myTeam array
function teamManager() {
  console.log("Please build your team");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your manager's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your manager's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
      },
    ])
    .then((data) => {
      let name = data.name;
      let id = data.id;
      let email = data.email;
      let officeNumber = data.officeNumber;
      let newManager = new Manager(name, id, email, officeNumber);
      myTeam.push(newManager);
      // Calling otherMembers function to get info about the other team members
      otherMembers();
    });
}

// Function that allows the user to choose which role the next team member has, then calls an appropriate function to gather specific info depending upon the role
function otherMembers() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
        name: "otherMember",
      },
    ])
    .then((data) => {
      switch (data.otherMember) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        case "I don't want to add any more team members":
          createHTML();
          break;
      }
    });
}

// Function to gather info for the Engineer role
function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your engineer's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your engineer's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your engineer's Github username?",
        name: "github",
      },
    ])
    .then((data) => {
      let name = data.name;
      let id = data.id;
      let email = data.email;
      let github = data.github;
      let newEngineer = new Engineer(name, id, email, github);
      myTeam.push(newEngineer);
      otherMembers();
    });
}

// Function to gather info for the Intern role
function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "school",
      },
    ])
    .then((data) => {
      let name = data.name;
      let id = data.id;
      let email = data.email;
      let school = data.school;
      let newIntern = new Intern(name, id, email, school);
      myTeam.push(newIntern);
      otherMembers();
    });
}

// Function to create new HTML file with the info gathered from the user
function createHTML() {
  let newHtml = render(myTeam);
  fs.writeFile(outputPath, newHtml, function (err) {
    if (err) return console.log(err);
    console.log("Success! team.html has been created inside the output folder");
  });
}

teamManager();
