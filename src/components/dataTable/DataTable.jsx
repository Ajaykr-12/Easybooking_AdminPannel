import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "../../config/axios";

function DataTable({ column }) {
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading, error, reFetch } = useFetch(`/${path}`);

  useEffect(() => {
    reFetch();
  }, [path]);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  async function handleDelete(id) {
    if (path === "rooms") {
      try {
        const hotels = await axios.get("/hotels");

        const hotelId = hotels.data.map((hotel) => {
          const isTrue = hotel.rooms.some((roomId) => {
            return roomId === id;
          });
          if (isTrue) {
            return hotel._id;
          }
        });

        Promise.all(
          hotelId.map(async (hotelId) => {
            if (hotelId) {
              await axios.delete(`/rooms/${id}/${hotelId}`);
            }
          })
        );
        setUserData(data.filter((user) => user._id !== id));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.delete(`/${path}/${id}`);
        setUserData(data.filter((user) => user._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/id`} style={{ textDecoration: "none" }}>
              <div className="viewBtn">View</div>
            </Link>
            <div
              className="deleteBtn"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        {path.toUpperCase()}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        "loading"
      ) : (
        <>
          <DataGrid
            className="dataGrid"
            rows={userData}
            columns={column.concat(actionColumn)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </>
      )}
    </div>
  );
}

export default DataTable;
