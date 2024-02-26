import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { allUserAction } from "../../redux/actions/userAction";

const DashUsers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  useEffect(() => {
    dispatch(allUserAction());
  }, []);

  const { users, loading } = useSelector((state) => state.allUsers);
  let data = [];
  data = users !== undefined && users.length > 0 ? users : [];

  console.log(selectedData);

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
      editable: true,
    },

    {
      field: "email",
      headerName: "E_mail",
      width: 150,
    },

    {
      field: "role",
      headerName: "User status",
      width: 150,
      renderCell: (params) =>
        params.row.role === 1 ? "Admin" : "Regular user",
    },

    {
      field: "createdAt",
      headerName: "Creation date",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button
            onClick={(e) => {
              setOpen(true);
              setSelectedData(values.row);
            }}
            variant="contained"
            color="primary"
          >
            View
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          All users
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            {" "}
            Create user
          </Button>
        </Box>
        <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "white",
                },
                color: "white",
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) =>
                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                    theme.palette.secondary.main,
                },
                button: {
                  color: "#ffffff",
                },
              }}
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </Paper>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
         >
          <div className="p-5 w-[600px] h-screen">
            <div className="card-user">
              <span className="small-text">User Details</span>
              <span className="title">
                {selectedData?.firstName} {selectedData?.lastName}
              </span>
              <span className="desc">{selectedData?.email}</span>
            </div>

            <div className="border border-slate-400 p-2 mt-2">
              {selectedData?.jobsHistory?.map((e, index) => (
                <div className="task" draggable="true" key={index}>
                  <div className="tags">
                    <span className="tag">{e?.location}</span>
                  </div>
                  <h5>{e?.title}</h5>
                  <p>{e?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Dialog>
      </Box>
    </>
  );
};

export default DashUsers;
