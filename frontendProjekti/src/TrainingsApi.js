const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

// Hakee kaikki treenit
export async function getTrainings() {
    const response = await fetch(`${BASE_URL}/gettrainings`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Hakee treenin ID:n perusteella
export async function getTrainingById(id) {
    const response = await fetch(`${BASE_URL}/trainings/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Lisää uuden treenin
export async function addTraining(training) {
    const response = await fetch(`${BASE_URL}/trainings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Palautetaan luotu treeni
}

// Päivittää olemassa olevan treenin
export async function updateTraining(id, training) {
    const response = await fetch(`${BASE_URL}/trainings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Palautetaan päivitetty treeni
}

// Poistaa treenin
export async function deleteTraining(id, loadTrainings) {
    if (window.confirm('Are you sure you want to delete this training?')) {
        const response = await fetch(`${BASE_URL}/trainings/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        loadTrainings(); // Päivitä treenilista poistamisen jälkeen
    }
}
