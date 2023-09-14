import React, {useCallback, useMemo,useEffect,useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import useFetch from "../../hooks/useFetch";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import AddRoom from './AddRoom';
import UpdateRoom from './UpdateRoom';
import DeleteRoom from './DeleteRoom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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

const Rooms = () => {
    const { data, loading, error, setData } = useFetch(
        `http://localhost:8880/api/room`
      );
  
      const [tableData, setTableData] =useState([]); //Current showing table data
      const [validationErrors, setValidationErrors] = useState({});
      const [createModalOpen, setCreateModalOpen] = useState(false);
  
      useEffect(() => {
          setTableData(data);  //Set table data: data is the returning mongodb values after fetching database
        }, [data]
      );


      const handleCreateNewRow = async (values) => {//This function creates a new row and sync with mongodb
        try {

          const responseData = await AddRoom(values);
      
          // Update the tableData state with the new data
          setTableData((prevData) => [...prevData, values]);
      
          // Close the create modal or perform other necessary actions
          setCreateModalOpen(false);
        } catch (error) {
          console.error('Error creating a new row:', error);
          // Handle the error appropriately, e.g., show an error message to the user
        }
      };
      
      const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {//This function updates row and sync with mongodb
        if (!Object.keys(validationErrors).length) {
          const updatedTableData = [...tableData]; // Create a copy of the original data
          updatedTableData[row.index] = values; // Update the specific row
          setTableData(updatedTableData); // Update the state with the modified data
          const responseData = UpdateRoom(values);
          exitEditingMode();
        }
      };
      

      const handleCancelRowEdits = () => {
        setValidationErrors({});
      };

      const handleDeleteRow = useCallback( //This function is used to delete a row
        async (row) => {
          if (!window.confirm(`Are you sure you want to delete ${row.getValue('_id')}`)) {
            return;
          }
          try {
            // Make the delete request here, and then update the tableData if successful
            await DeleteRoom(row.getValue('_id'));
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

  const columns = useMemo(
    () => [ 
      {
        accessorKey: '_id', 
        header: 'Record ID',
        size: 50,
        hidden: true,
      },
      {
        accessorKey: 'room_No', 
        header: 'Room Number',
        size: 100,
      },
      {
        accessorKey: 'room_type', 
        header: 'Room Type',
        size: 50,
      },
      {
        accessorKey: 'room_ac', 
        header: 'AC',
        size: 100,
      },
      {
        accessorKey: 'price',
        header: 'Price Per Night',
        size: 150,
      },
      {
        accessorKey: 'availability',
        header: 'Availability',
        size: 150,
      },
      {
        accessorKey: 'no_of_beds',
        header: 'Number of Beds',
        size: 150,
        hidden: true,
      },
      {
        accessorKey: 'no_of_chairs',
        header: 'Number of Chairs',
        size: 150,
        hidden: true,
      },
      {
        accessorKey: 'tv',
        header: 'Tv',
        size: 150,
        hidden: true,
      },
      {
        accessorKey: 'balcony',
        header: 'Balcony',
        size: 150,
        hidden: true,
      },
      {
        accessorKey: 'wifi',
        header: 'Wifi',
        size: 150,
        hidden: true,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        size: 150,
        hidden: true, ////////////////Update: Meken column eka hide karanna puluwan
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
    link.download = 'Room_Report.csv';
    link.click();
  };

  return ( //Full Table is handle by here
    <div className="home">
      <div className="homeContainer">
          <AppBar position="static" color="default">
              <Toolbar>
                  <Typography variant="h4" align="center" style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold', color: 'black', fontSize: '40px', fontFamily: 'Helvetica Neue, sans-serif' }}>
                      Rooms
                  </Typography>
                  <div style={{ marginLeft: 'auto' }}>
                      <Button color="primary" component={Link} to={`/home`} >Home</Button>
                      <Button color="primary" component={Link} to={`/`}>Logout</Button>
                  </div>
              </Toolbar>
          </AppBar>
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

            columns={columns} //These are the options for table. By refering https://www.material-react-table.com/ you can choose options
            data={tableData} //tableData will show as the data in the table
            initialState={{ columnVisibility: { _id: false, no_of_beds: false, no_of_chairs: false, tv: false, balcony: false, wifi: false, updatedAt: false}}}

            editingMode="modal" 
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
                <Typography>Number of Beds: {row.original.no_of_beds}</Typography>
                <Typography>Number of Chairs: {row.original.no_of_chairs}</Typography>
                <Typography>Tv: {row.original.tv}</Typography>
                <Typography>Balcony: {row.original.balcony}</Typography>
                <Typography>Wifi: {row.original.wifi}</Typography>
                <Typography>Updated At: {row.original.updatedAt}</Typography>
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
                  Add Room
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



export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );
  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      onSubmit(values);
      onClose();
    }
    
  };

  const [validationErrors, setValidationErrors] = useState({});
  const validateForm = () => {
    const errors = {};
  
    includedColumns1.forEach((column) => {
      if (!values[column.accessorKey]) {
        errors[column.accessorKey] = `${column.header} is required`;
      }
    });
  
    includedColumns2.forEach((column) => {
      if (!values[column.accessorKey]) {
        errors[column.accessorKey] = `${column.header} is required`;
      }
    });
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const includedColumns1 = columns.filter((column) => {
    return column.accessorKey !== '_id' && column.accessorKey !== 'room_type' && column.accessorKey !== 'room_ac' && column.accessorKey !== 'availability' && column.accessorKey !== 'tv' && column.accessorKey !== 'balcony' && column.accessorKey !== 'wifi' && column.accessorKey !== 'updatedAt';
  });
  const includedColumns2 = columns.filter((column) => {
      return column.accessorKey !== '_id' && column.accessorKey !== 'room_No' && column.accessorKey !== 'price' && column.accessorKey !== 'no_of_beds' && column.accessorKey !== 'no_of_chairs' && column.accessorKey !== 'updatedAt' && column.accessorKey !== 'room_ac' && column.accessorKey !== 'availability' && column.accessorKey !== 'tv' && column.accessorKey !== 'balcony' && column.accessorKey !== 'wifi' ;
  });
  const includedColumns3 = columns.filter((column) => {
    return column.accessorKey !== '_id' && column.accessorKey !== 'room_No' && column.accessorKey !== 'room_type' && column.accessorKey !== 'price' && column.accessorKey !== 'no_of_beds' && column.accessorKey !== 'no_of_chairs' && column.accessorKey !== 'updatedAt' ;
  });

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add New Room</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {includedColumns1.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                error={validationErrors[column.accessorKey] ? true : false}
                helperText={validationErrors[column.accessorKey]}
              />
            ))}
            {includedColumns2.map((column) => (
              <FormControl key={column.accessorKey}>
                <InputLabel>{column.header}</InputLabel>
                <Select
                  label={column.header}
                  name={column.accessorKey}
                  value={values[column.accessorKey]}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  error={validationErrors[column.accessorKey] ? true : false}
                  helperText={validationErrors[column.accessorKey]}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Double">Double</MenuItem>
                  <MenuItem value="Tribal">Tribal</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                </Select>
              </FormControl>
            ))}
              {includedColumns3.map((column) => (
                  <FormControl key={column.accessorKey}>
                      <InputLabel>{column.header}</InputLabel>
                      <Select
                          label={column.header}
                          name={column.accessorKey}
                          value={values[column.accessorKey]}
                          onChange={(e) =>
                              setValues({ ...values, [e.target.name]: e.target.value })
                          }
                          error={validationErrors[column.accessorKey] ? true : false}
                          helperText={validationErrors[column.accessorKey]}
                      >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                      </Select>
                  </FormControl>
              ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">

          Add New Room

        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;

export default Rooms;