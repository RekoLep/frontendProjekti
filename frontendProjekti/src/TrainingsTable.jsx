import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import AddTrainings from "./AddTrainings";
import EditTrainings from "./EditTrainings";
import { addTraining, updateTraining } from "./TrainingsApi";

// Tuodaan vain ne moduulit, joita tarvitaan
ModuleRegistry.registerModules([AllCommunityModule]);



export function TrainingsTable({ trainings, removeTraining, loadTrainings }) {
  const colDefs = useMemo(() => [
    { field: "date", headerName: "Date" },
    { field: "duration", headerName: "Duration (min)" },
    { field: "activity", headerName: "Activity" },
    {
      cellRenderer: (params) => (
        <EditTrainings
          updateTraining={updateTraining}
          params={params}
          loadTrainings={loadTrainings}
        />
      ),
    },
    {
      cellRenderer: (params) => {
        const training = params.data;
        return (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => removeTraining(training)}
          >
            Delete
          </Button>
        );
      },
      width: 120,
    },
  ], [loadTrainings]);

  return (
    <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h6">Trainings ({trainings.length})</Typography>
      <AddTrainings addTraining={addTraining} loadTrainings={loadTrainings} />
      <Box sx={{ flexGrow: 1, width: "100%", height: 500 }}>
        <AgGridReact rowData={trainings} columnDefs={colDefs} />
      </Box>
    </Stack>
  );
}

export default TrainingsTable;
