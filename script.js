
const apiUrl = "https://nettuts.hu/jms/belu7111/cinema";

async function fetchCinemaData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Hiba történt az adatok lekérésekor: ${response.statusText}`);
    }
    const data = await response.json();
    generateTable(data);
  } catch (error) {
    console.error("Hiba:", error);
  }
}

function generateTable(data) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");

  
  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
    tableHeader.appendChild(th);
  });

 
  const actionTh = document.createElement("th");
  actionTh.textContent = "Műveletek";
  tableHeader.appendChild(actionTh);

 
  data.forEach(item => {
    const tr = document.createElement("tr");

    headers.forEach(header => {
      const td = document.createElement("td");
      td.textContent = item[header];
      tr.appendChild(td);
    });

   
    const actionTd = document.createElement("td");
    const viewButton = document.createElement("button");
    viewButton.className = "btn btn-info btn-sm me-2";
    viewButton.innerHTML = '<i class="fa fa-eye"></i>';
    viewButton.title = "Megtekintés";

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.title = "Törlés";

    
    deleteButton.addEventListener("click", () => {
      const confirmed = confirm("Biztosan törölni szeretné?");
      if (confirmed) {
        deleteCinemaItem(item.id);
      }
    });

    actionTd.appendChild(viewButton);
    actionTd.appendChild(deleteButton);
    tr.appendChild(actionTd);

    tableBody.appendChild(tr);
  });
}

async function deleteCinemaItem(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Hiba történt a törlés során: ${response.statusText}`);
    }

    alert("Sikeresen törölve.");
    document.getElementById("table-body").innerHTML = ""; 
    fetchCinemaData(); 
  } catch (error) {
    console.error("Hiba:", error);
  }
}


document.addEventListener("DOMContentLoaded", fetchCinemaData);