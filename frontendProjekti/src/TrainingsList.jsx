import { useEffect, useState } from "react";
import { getTrainings, deleteTraining, addTraining } from "./TrainingsApi"; // Kaikki samasta tiedostosta
import TrainingsTable from "./TrainingsTable"; // Oletetaan että tämä on treenien taulukkomponentti
import AddTrainings from "./AddTrainings"; // Lisää treeni
import { Container, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";

function TrainingsManagement() {
  const [trainings, setTrainings] = useState([]);

  const loadTrainings = async () => {
    try {
      const data = await getTrainings();
      setTrainings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTraining = async (training) => {
    if (window.confirm(`Delete training on ${training.date}?`)) {
      const id = training.id;
      await deleteTraining(id);
      await loadTrainings();
    }
  };

  useEffect(() => {
    loadTrainings();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Training Management 🏋️‍♂️
      </Typography>
      <Typography variant="h5" gutterBottom>
        <Link to="/#/">Link to Customers Management</Link>
      </Typography>
      <TrainingsTable
        trainings={trainings}
        removeTraining={removeTraining}
        loadTrainings={loadTrainings}
      />
    </Container>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<TrainingsManagement />} />
      <Route path="/TrainingsList" element={<TrainingsManagement />} />
    </Routes>
  );
}

export default App;
