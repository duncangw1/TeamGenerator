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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
      console.log(myTeam);
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
          //placeholder for call to add engineer
          createEngineer();
          break;
        case "Intern":
          //placeholder for call to add intern
          createIntern();
          break;
        case "I don't want to add any more team members":
          //placeholder to call render function to generate the html
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
      console.log(myTeam);
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
      console.log(myTeam);
      otherMembers();
    });
}

// Function to create new HTML file with the info gathered from the user
function createHTML() {
  let newHtml = render(myTeam);
  console.log(newHtml);
  fs.writeFile(outputPath, newHtml, function (err) {
    if (err) return console.log(err);
    console.log("Success! team.html has been created inside the output folder");
  });
}

teamManager();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
