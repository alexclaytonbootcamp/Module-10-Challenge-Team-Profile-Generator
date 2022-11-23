const inquirer = require('inquirer');
const fs = require('fs');
const jest = require('jest');
const path = require('path');

const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const DIST_DIR = path.resolve(__dirname, 'dist');
const outputPathHTML = path.join(DIST_DIR, 'index.html');
const outputPathCSS = path.join(DIST_DIR, 'style.css');
const renderFilesHTML = require('./src/HTML/helperCodeHTML');
const renderFilesCSS = require('./src/CSS/helperCodeCSS');

const teamArr = [];

function init() {

    function addTeamMemeber() {
        console.log("Let's start building your team!");
        
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What is the role of your new team member?',
                    choices:
                        [
                            'Employee',
                            'Engineer',
                            'Intern',
                            'Manager',
                        ],
                    name: 'role'
                }
            ])
            .then(selection => {
                switch (selection.role) {
                    case 'Employee':
                        addEmployee();
                        break;
                    case 'Engineer':
                        addEngineer();
                        break;
                    case 'Intern':
                        addIntern();
                        break;
                    case 'Manager':
                        addManager();
                        break;
                }
            })
    }

    function addNewMember() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Would you like to add another member to your team?',
                    choices:
                        [
                            'Employee',
                            'Engineer',
                            'Intern',
                            'Manager',
                            'No, my team is complete',
                        ],
                    name: 'newRole'
                }
            ])
            .then(selection => {
                switch (selection.newRole) {
                    case 'Employee':
                        addEmployee();
                        break;
                    case 'Engineer':
                        addEngineer();
                        break;
                    case 'Intern':
                        addIntern();
                        break;
                    case 'Manager':
                        addManager();
                        break;
                    case 'No, my team is complete':
                        generateHTML();
                        generateCSS();
                }
            })
    }

    function addEmployee() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "What is the Employee's name?",
                    name: 'employeeName',
                },
                {
                    type: 'input',
                    message: "What is the Employee's ID?",
                    name: 'employeeId',
                },
                {
                    type: 'input',
                    message: "What is the Employee's email address?",
                    name: 'employeeEmail',
                },
            ])
            .then(data => {
                const employee = new Employee(data.employeeName, data.employeeId, data.employeeEmail);
                teamArr.push(employee);
                addNewMember();
            })
    }

    function addEngineer() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "What is the Engineer's name?",
                    name: 'engineerName',
                },
                {
                    type: 'input',
                    message: "What is the Engineer's ID?",
                    name: 'engineerId',
                },
                {
                    type: 'input',
                    message: "What is the Engineer's email address?",
                    name: 'engineerEmail',
                },
                {
                    type: 'input',
                    message: "What is the Engineer's GitHub?",
                    name: 'engineerGithub',
                },
            ])
            .then(data => {
                const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
                teamArr.push(engineer);
                addNewMember();
            })
    }

    function addIntern() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "What is the Intern's name?",
                    name: 'internName',
                },
                {
                    type: 'input',
                    message: "What is the Intern's ID?",
                    name: 'internId',
                },
                {
                    type: 'input',
                    message: "What is the Intern's email address?",
                    name: 'internEmail',
                },
                {
                    type: 'input',
                    message: "What school does the Intern currently attend?",
                    name: 'internSchool',
                },
            ])
            .then(data => {
                const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
                teamArr.push(intern);
                addNewMember();
            })
    }

    function addManager() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "What is the Manager's name?",
                    name: 'managerName',
                },
                {
                    type: 'input',
                    message: "What is the Manager's ID?",
                    name: 'managerId',
                },
                {
                    type: 'input',
                    message: "What is the Manager's email address?",
                    name: 'managerEmail',
                },
                {
                    type: 'input',
                    message: "What is the Manager's office number?",
                    name: 'managerOfficeNumber',
                },
            ])
            .then(data => {
                const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber);
                teamArr.push(manager);
                addNewMember();
            })
    }

    function generateHTML() {
        console.log(teamArr)
        fs.writeFileSync(outputPathHTML, renderFilesHTML(teamArr), 'utf-8')
    }

    function generateCSS() {
        fs.writeFileSync(outputPathCSS, renderFilesCSS())
    }
    
    addTeamMemeber();

}

init();