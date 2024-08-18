from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

# Load data from JSON file
def load_data():
    with open('data.json', 'r') as f:
        return json.load(f)

# Save data to JSON file
def save_data(data):
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=4)

# Add Page
@app.route('/')
def add():
    data = load_data()
    return render_template('add.html', customers=data['customers'])

# Update delivery status
@app.route('/update_delivery', methods=['POST'])
def update_delivery():
    delivery_data = request.json
    data = load_data()
    date = delivery_data.get('date', datetime.now().strftime("%Y-%m-%d"))
    
    for customer in data['customers']:
        if customer['name'] in delivery_data['delivered_customers']:
            customer['deliveries'][date] = 'Delivered'
        else:
            customer['deliveries'][date] = 'Not Delivered'
    
    save_data(data)
    return jsonify({'status': 'success'})

# Update specific date for a customer
@app.route('/update_date_delivery', methods=['POST'])
def update_date_delivery():
    delivery_data = request.json
    customer_name = delivery_data['customer']
    date = delivery_data['date']
    status = delivery_data['status']
    
    data = load_data()
    
    for customer in data['customers']:
        if customer['name'] == customer_name:
            customer['deliveries'][date] = status
    
    save_data(data)
    return jsonify({'status': 'success'})

# Retrieve delivery status for a date range or specific date
@app.route('/retrieve_status', methods=['GET'])
def retrieve_status():
    customer_name = request.args.get('customer')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    data = load_data()
    delivery_data = {}
    
    for customer in data['customers']:
        if customer['name'] == customer_name:
            if start_date and end_date:
                for date, status in customer['deliveries'].items():
                    if start_date <= date <= end_date:
                        delivery_data[date] = status
            else:
                delivery_data = customer['deliveries']
            break
    
    return jsonify(delivery_data)

# Pages for retrieve and update
@app.route('/retrieve')
def retrieve():
    data = load_data()
    return render_template('retrieve.html', customers=data['customers'])

@app.route('/update')
def update():
    data = load_data()
    return render_template('update.html', customers=data['customers'])

if __name__ == '__main__':
    app.run(debug=True)
