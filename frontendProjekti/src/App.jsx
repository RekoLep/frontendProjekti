import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "./customerApi";
import { CustomerTable } from "./CustomerTable";
import { Container, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import ExportCustomers from "./ExportCustomers";
import CalendarView from "./CalendarView";
import TrainingsList from "./TrainingsList";

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeCustomer = async (customer) => {
    if (window.confirm(`Delete customer ${customer.firstname} ${customer.lastname}?`)) {
      const id = customer._links.customer.href.split("/").pop();
      await deleteCustomer(id);
      loadCustomers();
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Customer Management 🏃‍♀️‍➡️
      </Typography>
      <Typography variant="h5" gutterBottom>
        <Link to="/TrainingsList">Link to Training Management</Link>
      </Typography>
      <ExportCustomers customers={customers} />
      <Typography variant="h5" gutterBottom>
        <Link to="/CalendarView">Calendar</Link>
      </Typography>
      <CustomerTable
        customers={customers}
        removeCustomer={removeCustomer}
        loadCustomers={loadCustomers}
      />
    </Container>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerManagement />} />
      <Route path="/TrainingsList" element={<TrainingsList />} />
      <Route path="/CalendarView" element={<CalendarView />} />
    </Routes>
  );
}

export default App;
