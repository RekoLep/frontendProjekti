// customerApi.js

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers';

// Hakee kaikki asiakkaat
export async function getCustomers() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded.customers;
}

// Hakee yhden asiakkaan ID:llä (ei välttämätön jos et tarvitse yksittäishakuja)
export async function getCustomerById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Lisää uuden asiakkaan
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

// Päivittää asiakkaan tiedot
export async function updateCustomer(id, customer) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Palautetaan päivitetty asiakas
}

// Poistaa asiakkaan
export async function deleteCustomer(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true; // Poisto onnistui
}
