import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { getCustomers } from "./customerApi"; // Olettaa, että tämä on olemassa

export default function EditTraining({ updateTraining, params, loadTrainings }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({ ...params.data });
  const [customers, setCustomers] = useState([]);

  
  useEffect(() => {
    if (open) {
      const fetchCustomers = async () => {
        try {
          const customerData = await getCustomers();
          setCustomers(customerData);
        } catch (error) {
          console.error("Error fetching customers:", error);
          setCustomers([]);
        }
      };
      fetchCustomers();
    }
  }, [open]);

  const handleInputChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const id = training.id; 
    if (!training.customer) {
      alert("Please select a customer!");
      return;
    }
    try {
      await updateTraining(id, training);
      loadTrainings();
      setOpen(false);
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Training</DialogTitle>
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
