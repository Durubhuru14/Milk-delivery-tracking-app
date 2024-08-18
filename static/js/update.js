document.addEventListener('DOMContentLoaded', function() {
    const updateDeliveryForm = document.getElementById('updateDeliveryForm');

    // Handle form submission
    updateDeliveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const customer = document.getElementById('customer').value;
        const date = document.getElementById('date').value;
        const status = document.getElementById('status').value;

        fetch('/update_date_delivery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customer: customer, date: date, status: status })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Delivery status updated successfully!');
            }
        });
    });
});
