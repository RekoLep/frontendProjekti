import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddTraining({ addTraining, loadTrainings }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: '',
    customer: '',
  });

  const handleInputChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await addTraining(training);
    loadTrainings();
    setOpen(false);
    setTraining({
      date: '',
      duration: '',
      activity: '',
      customer: '',
    });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Training</Button>
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
