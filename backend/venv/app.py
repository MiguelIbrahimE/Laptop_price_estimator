from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/generate-price', methods=['POST'])
def generate_price():
    data = request.json
    cpu = data.get('cpu')
    gpu = data.get('gpu')
    ram = data.get('ram')
    ssd = data.get('ssd')
    make = data.get('make')

    # Fetch the CPU price online
    cpu_price = fetch_cpu_price(cpu)
    
    # Fetch the laptop price online based on specifications
    laptop_price = fetch_laptop_price(make, cpu, gpu, ram, ssd)

    # Combine or average the prices as needed
    final_price = (cpu_price + laptop_price) / 2

    return jsonify({'price': final_price})

def fetch_cpu_price(cpu_name):
    try:
        # Example of a search for CPU price on a specific site
        search_url = f"https://www.example.com/search?q={cpu_name.replace(' ', '+')}"
        response = requests.get(search_url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # This will depend on the structure of the website you're scraping
        price_tag = soup.find('span', {'class': 'price'})
        price = float(price_tag.text.strip().replace('$', ''))

        return price
    except Exception as e:
        print(f"Error fetching CPU price: {e}")
        return 0

def fetch_laptop_price(make, cpu, gpu, ram, ssd):
    try:
        # Example of a search for laptop price on a specific site
        search_url = f"https://www.example.com/search?q={make}+{cpu}+{gpu}+{ram}+{ssd}".replace(' ', '+')
        response = requests.get(search_url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # This will depend on the structure of the website you're scraping
        price_tag = soup.find('span', {'class': 'price'})
        price = float(price_tag.text.strip().replace('$', ''))

        return price
    except Exception as e:
        print(f"Error fetching laptop price: {e}")
        return 0

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
