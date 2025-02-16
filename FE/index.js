function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        // TODO
        // add event listener to delete button
        deleteButton.addEventListener("click",(e) => {
          e.preventDefault();
          deleteEmployee(item.id);
        })
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const sumbitButton = document.getElementById("submit")
sumbitButton.addEventListener("click",(e) => {
  e.preventDefault();
  
  createEmployee();
  
})


// TODO
function createEmployee (){
  // get data from input field
  const inputName = document.getElementById("name").value;
  const inputId = document.getElementById("id").value;
  if(!inputName || !inputId){
    alert("please enter a name or id")
  }else{
  // send data to BE
  fetch('http://localhost:3000/api/v1/employee',{
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name:inputName,id:inputId})
  }
  )
  .then(response => response.json())
  .then(() => {
  // call fetchEmployees
    fetchEmployees();
  }
  )
    .catch(error => console.error("Error creating employee:", error));
  }
}

// TODO
function deleteEmployee (id){
  // get id
  // send id to BE
    fetch(`http://localhost:3000/api/v1/employee/${id}`,{
    method: "Delete",
  }
  )
  .then(response => response.json())
  .then(() => {
  // call fetchEmployees
    fetchEmployees();
  }
  )
  .catch(error => console.error("Error deleting employee:", error));
}

fetchEmployees()
