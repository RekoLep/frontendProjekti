import dayjs from "dayjs";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import AddTrainings from "./AddTrainings";
import EditTrainings from "./EditTrainings";
import { addTraining, updateTraining } from "./TrainingsApi";

ModuleRegistry.registerModules([AllCommunityModule]);

export function TrainingsTable({ trainings, removeTraining, loadTrainings }) {
  const colDefs = useMemo(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) =>
          dayjs(params.value).format("DD.MM.YYYY HH:mm"), 
      },
      { field: "duration", headerName: "Duration (min)" },
      { field: "activity", headerName: "Activity" },
      {
        field: "customer",
        headerName: "Customer",
        valueGetter: (params) => {
          const customer = params.data?.customer;
          return customer
            ? `${customer.firstname} ${customer.lastname}`
            : "Unknown Customer"; // Palautetaan oletusarvo, jos asiakastietoja ei ole
        },
      },
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
    ],
    [loadTrainings]
  );

  return (
    <Stack
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      <Typography variant="h6">Trainings ({trainings.length})</Typography>
      <AddTrainings addTraining={addTraining} loadTrainings={loadTrainings} />
      <Box sx={{ flexGrow: 1, width: "100%", height: 500 }}>
        <AgGridReact rowData={trainings} columnDefs={colDefs} />
      </Box>
    </Stack>
  );
}

export default TrainingsTable;
