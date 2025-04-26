import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCustomer({ updateCustomer, params, loadCustomers }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({ ...params.data });

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const id = customer._links.customer.href.split('/').pop(); // ottaa ID linkistä
    await updateCustomer(id, customer);
    loadCustomers();
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>Edit</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Customer</DialogTitle>
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
