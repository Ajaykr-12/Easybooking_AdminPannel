import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="Container">
        <Navbar />
        <div className="title">
          <h2>Easy booking Admin pannel</h2>
        </div>
        <div className="listContainer">
          <Link to="/users">
            <div className="users">
              <AccountCircleOutlinedIcon className="icon" />
              Users Data
            </div>
          </Link>
          <Link to="/rooms">
            <div className="rooms">
              <Inventory2RoundedIcon className="icon" />
              Rooms Data
            </div>
          </Link>
          <Link to="/hotels">
            <div className="hotels">
              <SingleBedIcon className="icon" />
              Hotels Data
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
