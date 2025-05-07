

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers';


export async function getCustomers() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded.customers;
}


export async function getCustomerById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}


export async function addCustomer(customer) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Palautetaan luotu asiakas
}


export async function updateCustomer(id, customer) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); 
}


export async function deleteCustomer(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true; 
}
