import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { getCustomers } from "./customerApi"; // Tämä olettaa, että funktio on CustomersApi-tiedostossa.

export default function AddTraining({ addTraining, loadTrainings }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: '',
    customer: '',
  });
  const [customers, setCustomers] = useState([]);

  // Hakee asiakkaat, kun dialogi avataan
  useEffect(() => {
    if (open) {
      const fetchCustomers = async () => {
        try {
          const customerData = await getCustomers();
          setCustomers(customerData); // Oletuksena data._embedded.customers
        } catch (error) {
          console.error("Error fetching customers:", error);
          setCustomers([]); // Jos virhe, aseta tyhjä lista
        }
      };
      fetchCustomers();
    }
  }, [open]);

  const handleInputChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!training.customer) {
      alert("Please select a customer!");
      return;
    }
    try {
      await addTraining(training);
      loadTrainings();
      setOpen(false);
      setTraining({
        date: '',
        duration: '',
        activity: '',
        customer: '',
      });
    } catch (error) {
      console.error("Error saving training:", error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Training
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="datetime-local"
            value={training.date}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Duration (minutes)"
            name="duration"
            value={training.duration}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            select
            margin="dense"
            label="Customer"
            name="customer"
            value={training.customer}
            onChange={(e) => setTraining({ ...training, customer: e.target.value })}
            fullWidth
          >
            {customers.length === 0 && <MenuItem disabled>No customers available</MenuItem>}
            {customers.map((customer) => (
              <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                {customer.firstname} {customer.lastname}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
