document.addEventListener('DOMContentLoaded', function() {
    const retrieveForm = document.getElementById('retrieveForm');
    const resultsDiv = document.getElementById('results');

    // Handle form submission
    retrieveForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const customer = document.getElementById('customer').value;
        const startDate = document.getElementById('start_date').value;
        const endDate = document.getElementById('end_date').value;

        let url = `/retrieve_status?customer=${customer}`;
        if (startDate && endDate) {
            url += `&start_date=${startDate}&end_date=${endDate}`;
        }

        fetch(url)
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = `<h2>Status for ${customer}</h2>`;
            for (const [date, status] of Object.entries(data)) {
                resultsDiv.innerHTML += `<p>${date}: ${status}</p>`;
            }
        });
    });
});
