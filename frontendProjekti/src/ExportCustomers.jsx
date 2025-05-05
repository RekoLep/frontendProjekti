import React from "react";
import { Button } from "@mui/material";

function ExportCustomers({ customers }) {
  const exportToCSV = () => {
    if (!customers || customers.length === 0) {
      alert("No customers available to export.");
      return;
    }

    const csvHeader = ["Firstname", "Lastname", "Street Address", "Postcode", "City", "Email", "Phone"];
    const csvRows = customers.map(customer => [
      customer.firstname,
      customer.lastname,
      customer.streetaddress,
      customer.postcode,
      customer.city,
      customer.email,
      customer.phone
    ]);

    const csvContent = [
      csvHeader.join(","),
      ...csvRows.map(row => row.map(field => `"${field}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="contained" color="primary" onClick={exportToCSV}>
      Export Customers to CSV
    </Button>
  );
  
}
export default ExportCustomers;