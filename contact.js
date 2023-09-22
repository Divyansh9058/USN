document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact");
  
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Get form input values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
  
      // Construct the data object
      const data = {
        name,
        email,
        phone,
        message,
        status: "acnt",
      };
  // console.log(data);
      // Send the data to the API using a POST request
      try {
        const response = await fetch(
          "https://dark-pink-eagle-tux.cyclic.cloud/contact/addcontact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  console.log(response)
        if (response.status === 200) {
          // Successfully sent
          alert("Message sent successfully!");
          contactForm.reset(); // Reset the form fields
        } else {
          // Handle other status codes or errors
          alert("Failed to send the message. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error states if necessary
      }
    });
  });
  