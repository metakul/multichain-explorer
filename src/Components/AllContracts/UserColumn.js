// UserColumns.js
import React from 'react';
import Button from '@mui/material/Button';
import {
    MoreVert as MoreIcon,
  } from "@mui/icons-material";
const UserColumns = (setOpenMenu, setSelectedRowId) => [
    { field: "brahmaId", headerName: "Brahma Id", width: 120, editable: false },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 180,
      editable: false,
    },
    {
      field: "userType",
      headerName: "User Type",
      width: 180,
      editable: false,
    },
    {
      field: "sex",
      headerName: "Sex",
      width: 180,
      editable: false,
    },
    {
      field: "mobileNo",
      headerName: "Mobile No",
      width: 180,
      editable: false,
    },
    {
      field: "mailId",
      headerName: "Mail Id",
      width: 180,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      editable: false,
    },

 
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            onClick={(event) => {
              setOpenMenu(event.currentTarget);
              setSelectedRowId(params.row.brahmaId); // Change made here
            }}
          >
            <MoreIcon />
          </Button>
        </div>
      ),
    },
    
  ];

export default UserColumns;
