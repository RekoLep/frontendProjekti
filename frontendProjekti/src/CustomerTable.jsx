import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { addCustomer, updateCustomer } from "./customerApi";

ModuleRegistry.registerModules([AllCommunityModule]);

export function CustomerTable({ customers, removeCustomer, loadCustomers }) {

  const colDefs = useMemo(() => [
    { field: "firstname", headerName: "First Name" },
    { field: "lastname", headerName: "Last Name" },
    { field: "streetaddress", headerName: "Street Address" },
    { field: "postcode", headerName: "Postcode" },
    { field: "city", headerName: "City" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
    {
      cellRenderer: (params) => (
        <EditCustomer 
          updateCustomer={updateCustomer}
          params={params}
          loadCustomers={loadCustomers}
        />
      )
    },
    {
      cellRenderer: (params) => {
        const customer = params.data;
        return (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => removeCustomer(customer)}
          >
            Delete
          </Button>
        );
      },
      width: 120,
    },
  ], [loadCustomers]);

  return (
    <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h6">Customers ({customers.length})</Typography>
      <AddCustomer addCustomer={addCustomer} loadCustomers={loadCustomers} />
      <Box sx={{ flexGrow: 1, width: "100%", height: 100 }}>
        <AgGridReact rowData={customers} columnDefs={colDefs} />
      </Box>
    </Stack>
  );
}
