import React from "react";
import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DataTable from "../../components/dataTable/DataTable";

function List({ column }) {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable column={column} />
      </div>
    </div>
  );
}

export default List;
