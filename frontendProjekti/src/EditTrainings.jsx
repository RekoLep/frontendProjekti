import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function EditTraining({ updateTraining, params, loadTrainings }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({ ...params.data });

  const handleInputChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const id = training.id; // Assuming `id` is directly available in the training object
    await updateTraining(id, training);
    loadTrainings();
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>Edit</Button>
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
            margin="dense"
            label="Customer Link"
            name="customer"
            value={training.customer}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
