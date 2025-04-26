import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCustomer({ addCustomer, loadCustomers }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await addCustomer(customer);
    loadCustomers();
    setOpen(false);
    setCustomer({
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',
      phone: ''
    });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Customer</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="First Name" name="firstname" value={customer.firstname} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Last Name" name="lastname" value={customer.lastname} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Street Address" name="streetaddress" value={customer.streetaddress} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Postcode" name="postcode" value={customer.postcode} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="City" name="city" value={customer.city} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Email" name="email" value={customer.email} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Phone" name="phone" value={customer.phone} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
