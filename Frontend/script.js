// Local storage
let tableData = [];

// Pagination
let currentPage = 1;
let rowsPerPage = getRowsPerPage();

document.addEventListener("DOMContentLoaded", getData);

function getData() {
  fetch("http://localhost:5000/api/people", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      tableData = data;
      renderTable();
    })
    .catch((error) => console.error(error));
}

// Function to render table based on pagination
function renderTable(animation = false) {
  const tableBody = document.getElementById("table").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "<tr class='tableHeader'><th>Ime</th><th>Starost</th><th class='delRow'></th></tr>"; // Clear table body

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const pageData = tableData.slice(startIdx, endIdx);

  pageData.forEach((data, index) => {
      let newRow = document.createElement("tr");
      newRow.id = data.id;
      newRow.innerHTML = `<td>${data.name}</td><td>${data.age}</td><td class='delRow'><button onclick="removePerson(${data.id})"><i class="fas fa-close"></i></button></td>`;
      newRow.classList.add(data.server ? "server" : "client");
      // If it's the newest row and appears on this page, add animation
      if (index === 0 && currentPage === 1 && animation)  {
          newRow.classList.add("newRow");
          setTimeout(() => newRow.classList.add("show"), 100);
      }

      tableBody.appendChild(newRow);
  });

  updatePaginationButtons();
}

function nextPage() {
  if (currentPage < tableData.length / rowsPerPage) {
    currentPage++;
    // showData(tableData);
    renderTable();
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    // showData(tableData);
    renderTable();
  }
}

function updatePaginationButtons() {
  const start = (currentPage - 1) * rowsPerPage;
  let end = start + rowsPerPage;
  const totalRows = tableData.length;
  document.getElementById("pageNumber").innerText = currentPage;

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = end >= totalRows;
}

function addPerson(server) {
  const inputName = document.getElementById("name").value;
  const inputAge = document.getElementById("age").value;
  // generate id
  const id = tableData.length > 0 ? tableData[0].id + 1 : 1;
  const warning = document.getElementById("warning");

  // Clear any previous warning message
  warning.textContent = "";

  // validation
  if (inputName == "" || inputAge == "") {
    warning.textContent = "Prosim, izpolnite vsa polja!";
    warning.style.color = "red";
    return; // Stop execution if validation fails
  }

  if (server) {
    fetch("http://localhost:5000/api/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: inputName, age: inputAge, id: id, server: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          tableData.unshift(data[0]);
          renderTable(true);
        }
      })
      .catch((error) => console.error(error));
  } else {
    tableData.unshift({ name: inputName, age: inputAge, id: id, server: false });
    renderTable(true);
  }
}

function removePerson(id) {
  const row = document.getElementById(id);
  const server = row.classList.contains("server");

  if (row) {
    console.log(row);
    row.classList.add("hideRow"); 
    row.classList.add("hide"); // Trigger transition

    setTimeout(() => {
      row.remove(); // Remove from DOM after animation
      tableData = tableData.filter((person) => person.id !== id);
      renderTable();
    }, 500); 

    if (server) {
      fetch(`http://localhost:5000/api/people/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            console.log("Deleted from server");
          }
        })
        .catch((error) => console.error(error));
    }
  }
}

function getRowsPerPage() {
  return window.innerWidth <= 768 ? 5 : 10; // return 5 rows per page on mobile, 10 on desktop
}

// recalculate when window resizes
window.addEventListener("resize", () => {
  let newRowsPerPage = getRowsPerPage();
  if (newRowsPerPage !== rowsPerPage) {
    rowsPerPage = newRowsPerPage;
    renderTable();
  }
});