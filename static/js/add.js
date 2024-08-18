document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('currentDate').textContent = currentDate;

    const deliveryForm = document.getElementById('deliveryForm');
    
    // Handle form submission
    deliveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const deliveredCustomers = [];
        document.querySelectorAll('input[name="delivered"]:checked').forEach(function(checkbox) {
            deliveredCustomers.push(checkbox.value);
        });

        fetch('/update_delivery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ delivered_customers: deliveredCustomers })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Delivery status updated successfully!');
            }
        });
    });
});
