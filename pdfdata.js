// script.js
document.getElementById('submitBtn').addEventListener('click',() => {
    Swal.fire({
        title: 'Enter Name and Phone Number',
        html:
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="phone" class="swal2-input" placeholder="Phone Number">',
        confirmButtonText: 'Submit',
        preConfirm: () => {
            return {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
            };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            // Send data to your server using AJAX or Fetch API
            fetch('https://dark-pink-eagle-tux.cyclic.cloud/pdfdata/addpdfdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result.value),
            })
            .then(response => {
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {   
                    window.open('Apple_Country_Brochure.pdf', '_blank') ;
            })
            .catch(error => {
                console.error(error);
                Swal.fire('Error', 'An error occurred while processing your request.', 'error');
            });
        }
    });
});
