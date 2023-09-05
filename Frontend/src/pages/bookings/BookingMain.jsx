import React, {useCallback, useMemo,useEffect,useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import AddBooking from './AddBooking'
import UpdateBooking from './UpdateBooking';
import DeleteBooking from './DeleteBooking';


import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';



const TestBookings = () => {
    const { data, loading, error, setData } = useFetch(
        `http://localhost:8880/api/booking`
      );
  
      const [tableData, setTableData] =useState([]); //Current table data
      const [validationErrors, setValidationErrors] = useState({});
      const [createModalOpen, setCreateModalOpen] = useState(false);
  
      useEffect(() => {
          setTableData(data);  //Set table data: data is the returning mongodb values after fetching database
        }, [data]
      );


      const handleCreateNewRow = async (values) => {
        try {
          // Assuming AddBooking returns the newly created booking data
          const responseData = await AddBooking(values);
      
          // Update the tableData state with the new data
          setTableData((prevData) => [...prevData, values]);
      
          // Close the create modal or perform other necessary actions
          setCreateModalOpen(false);
        } catch (error) {
          console.error('Error creating a new row:', error);
          // Handle the error appropriately, e.g., show an error message to the user
        }
      };
      

      // const handleCreateNewRow = (values) => {
      // tableData.push(values);
      //  const responseData=AddBooking(values); //After updating mongo db database return that values to here
      //  setTableData((prevData) => [...prevData, responseData]);//using mongodb returning values we update our table data
      // };

      const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
          const updatedTableData = [...tableData]; // Create a copy of the original data
          updatedTableData[row.index] = values; // Update the specific row
          setTableData(updatedTableData); // Update the state with the modified data
          const responseData = UpdateBooking(values);
          // Optionally, you can handle errors here and revert the change in case of an error
          exitEditingMode();
        }
      };
      

      const handleCancelRowEdits = () => {
        setValidationErrors({});
      };

      const handleDeleteRow = useCallback(
        async (row) => {
          if (!window.confirm(`Are you sure you want to delete ${row.getValue('_id')}`)) {
            return;
          }
          try {
            // Make the delete request here, and then update the tableData if successful
            await DeleteBooking(row.getValue('_id'));
            const updatedTableData = [...tableData];
            updatedTableData.splice(row.index, 1); // Remove the deleted row
            setTableData(updatedTableData); // Update the state with the modified data
          } catch (error) {
            console.error('Error deleting row:', error);
            // Handle the error if the delete operation fails
          }
        },
        [tableData],
      );

      const getCommonEditTextFieldProps = useCallback(
        (cell) => {
          return {
            error: !!validationErrors[cell.id],
            helperText: validationErrors[cell.id],
            onBlur: (event) => {
              const isValid =
                  validateRequired(event.target.value);
              if (!isValid) {
                //set validation error for cell if invalid
                setValidationErrors({
                  ...validationErrors,
                  [cell.id]: `${cell.column.columnDef.header} is required`,
                });
              } else {
                //remove validation error for cell if valid
                delete validationErrors[cell.id];
                setValidationErrors({
                  ...validationErrors,
                });
              }
            },
          };
        },
        [validationErrors],
      );
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id', 
        header: 'Record ID',
        size: 50,
      },
      {
        accessorKey: 'bookingId', 
        header: 'Booking ID',
        size: 100,
      },
      {
        accessorKey: 'customerId', 
        header: 'Customer ID',
        size: 50,
      },
      {
        accessorKey: 'roomId', 
        header: 'Room ID',
        size: 100,
      },
      {
        accessorKey: 'checkInDate',
        header: 'Check-In Date',
        size: 150,
      },
      {
        accessorKey: 'checkOutDate',
        header: 'Check-Out Date',
        size: 150,
      },
      {
        accessorKey: 'totalPrice',
        header: 'Total Price',
        size: 150,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        size: 150,
        hidden: true,
        
      },
    ],
    [getCommonEditTextFieldProps],
  );

    const exportToCsv = () => {
    const csvData = [];

    // Add header row
    const headerRow = columns.map((column) => column.header);
    csvData.push(headerRow);

    // Add data rows
    tableData.forEach((row) => {
      const rowData = columns.map((column) => row[column.accessorKey]);
      csvData.push(rowData);
    });

    // Convert to CSV string
    const csvContent = csvData.map((row) => row.join(',')).join('\n');

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'bookings.csv';
    link.click();
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div style={{ maxWidth: '100%' }}>
        <>
          <MaterialReactTable
            displayColumnDefOptions={{
              'mrt-row-actions': {
                muiTableHeadCellProps: {
                  align: 'center',
                },
                size: 120,
              },
            }}
            columns={columns}
            data={tableData}
            initialState={{ columnVisibility: { _id: false, updatedAt:false, totalPrice:false }}}
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            disableRowSelection
            enableStickyHeader
            positionToolbarAlertBanner="bottom"
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            renderDetailPanel={({ row }) => (
              <Box
                sx={{
                  display: 'grid',
                  margin: 'auto',
                  gridTemplateColumns: '1fr 1fr',
                  width: '100%',
                }}
              >
                <Typography>Record ID: {row.original._id}</Typography>
                <Typography>Total Price: {row.original.totalPrice}</Typography>
                <Typography>Updated At: {row.original.updatedAt}</Typography>

              </Box>
            )}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={({ table }) => (
              <Box
                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
              >
                <Button
                  color="secondary"
                  onClick={() => setCreateModalOpen(true)}
                  startIcon={<AddIcon />}
                  variant="contained"
                >
                  Add Booking
                </Button>
                <Button
                  color="primary"
                  onClick={exportToCsv}
                  startIcon={<FileDownloadIcon />}
                  variant="contained"
                >
                  Export All Data
                </Button>
                {/* Other buttons for exporting */}
              </Box>
            )}

          />
          <CreateNewAccountModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </>
        </div>
      </div>
    </div>
  );
};



//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );
  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  // Define the columns you want to include in the form
  const includedColumns = columns.filter((column) => {
    // Include columns except 'updatedAt' and 'totalPrice'
    return column.accessorKey !== '_id' && column.accessorKey !== 'updatedAt';
  });

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add New Booking</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {includedColumns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const validateRequired = (value) => !!value.length;

export default TestBookings;
