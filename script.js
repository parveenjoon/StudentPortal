let students = []; // Array to store student data

// Fetching data from JSON file
fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(response => response.json())
    .then(data => {
        students = data; // Storing fetched data in students array
        displayStudents(students); // Displaying students on page load
    });

// Function to display students in the table
function displayStudents(studentArray) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clearing existing data

    studentArray.forEach((student, index) => {
        const passingStatus = student.passing ? 'Passing' : 'Failed';
        const fullName = student.first_name + ' ' + student.last_name;
        const newRow = `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${student.img_src}" alt="${fullName}" width="50">${fullName}</td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${passingStatus}</td>
                <td>${student.email}</td>
            </tr>
        `;
        tableBody.innerHTML += newRow;
    });
}

// Function to search for students
function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.first_name.toLowerCase().includes(searchInput) ||
        student.last_name.toLowerCase().includes(searchInput) ||
        student.email.toLowerCase().includes(searchInput)
    );
    displayStudents(filteredStudents);
}

// Functions for sorting
function sortAZ() {
    students.sort((a, b) => (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name));
    displayStudents(students);
}

function sortZA() {
    students.sort((a, b) => (b.first_name + ' ' + b.last_name).localeCompare(a.first_name + ' ' + a.last_name));
    displayStudents(students);
}

function sortByMarks() {
    students.sort((a, b) => a.marks - b.marks);
    displayStudents(students);
}

function sortByPassing() {
    const passingStudents = students.filter(student => student.passing);
    displayStudents(passingStudents);
}

function sortByClass() {
    students.sort((a, b) => a.class - b.class);
    displayStudents(students);
}

function sortByGender() {
    const femaleStudents = students.filter(student => student.gender.toLowerCase() === 'female');
    const maleStudents = students.filter(student => student.gender.toLowerCase() === 'male');
    displayStudents(femaleStudents);
    displayStudents(maleStudents);
}
