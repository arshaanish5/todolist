// Login Page 
document.getElementById("loginButton").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validation of username and password
    if (username === "admin" && password === "12345") {
        // Callback function to redirect to the main page
        redirectToMainPage(() => {
            window.location.href = "./to_do_list_page.html"; // Redirect to the main page
        });
    } else {
        alert("Invalid username or password. Please try again.");
    }
});

function redirectToMainPage(callback) {
    callback(); // Executes the callback function
}

document.addEventListener("DOMContentLoaded", function() {
    // Automatically fetch and display data when the page loads
    ajaxreq();
});

// Function to fetch and display tasks using AJAX
function ajaxreq() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText); // Parse the JSON response
            display(data); // Call display function with the fetched data
        }
    };

    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
}

// Function to display tasks in the table
function display(data) {
    const table1 = document.getElementById("tabledata").getElementsByTagName("tbody")[0]; // Get the table body

    // Clear existing rows before adding new ones
    table1.innerHTML = "";

    // Variable to track checked boxes
    let userCheckedCount = 0;

    data.forEach((item) => {
        const row = table1.insertRow(-1); // Insert a new row at the end

        // Add ID cell
        const cell1 = row.insertCell(0);
        cell1.innerHTML = item.id;

        // Add Title cell
        const cell2 = row.insertCell(1);
        cell2.innerHTML = item.title;

        // Add Checkbox (Status) cell
        const cell3 = row.insertCell(2);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed; // Set checked if task is completed
        checkbox.disabled = false; // Enable checkbox for user interaction
        cell3.appendChild(checkbox);

        // Add event listener to the checkbox
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                userCheckedCount++;
            } else {
                userCheckedCount--;
            }

            // Check if 5 tasks are checked
            if (userCheckedCount === 5) {
                // Promise that resolves after 5 checkboxes are checked
                new Promise((resolve) => {
                    resolve("Congrats. 5 Tasks have been Successfully Completed");
                }).then((message) => {
                    alert(message); // Show alert after Promise resolution
                });
            }
        });
    });
}



