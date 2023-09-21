// Script for fetching and populating contact data
const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    if (!token || email !== "info@usnbuilders.com") {
        window.location.href = "./login.html";
    }

document.addEventListener('DOMContentLoaded', () => {
    const contactTable = document.querySelector('.main_admin_content_contact_table table tbody');
  
    // Function to create table rows for contact data
    const createContactTableRow = (data, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${data.finaldate}</td>
        <td>${data.finaltime}</td>
        <td>${data.name}</td>
        <td>${data.phone}</td>
        <td>${data.email}</td>
        <td class="Contact_message_td">${data.message}</td>
        <td>
          <select class="Contact_us_Action" data-contact-id="${data._id}">
            <option value="acnt">Action Not Taken</option>
            <option value="act">Action Taken</option>
          </select>
        </td>
      `;
  
      // Set the background color based on the status
      if (data.status === "act") {
        row.style.background = "#009688";
      }
  
      return row;
    };
  
    // Function to fetch contact data from an API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dark-pink-eagle-tux.cyclic.cloud/contact/"
        );
        const contactData = await response.json();
  
        // Add table rows for each contact entry
        contactData.reverse().forEach((data, index) => {
          contactTable.appendChild(createContactTableRow(data, index));
        });
      } catch (error) {
        console.error("Error:", error);
        // Handle error states if necessary
      }
    };
  
    // Initial data fetching
    fetchData();
  
    // Function to handle status change
    const handleStatusChange = async (event) => {
      const newStatus = event.target.value;
      const contactId = event.target.getAttribute("data-contact-id");
  
      try {
        const response = await fetch(
          `https://dark-pink-eagle-tux.cyclic.cloud/contact/editcontact/${contactId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );
  
        if (response.status === 200) {
          // Update the status in the table row
          const row = event.target.parentElement.parentElement;
          row.style.background = newStatus === "act" ? "#009688" : "";
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error states if necessary
      }
    };
  
    // Event delegation for status change
    contactTable.addEventListener('change', (event) => {
      if (event.target.classList.contains('Contact_us_Action')) {
        handleStatusChange(event);
      }
    });
  });
  
