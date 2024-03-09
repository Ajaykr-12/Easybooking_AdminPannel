import React, { useState } from "react";
import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios, { axiosImgUpload } from "../../config/axios";
import { useNavigate } from "react-router-dom";

function NewHotel() {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [reqLoad, setReqLoad] = useState(false);

  const navigate = useNavigate();

  const { loading, data, error } = useFetch("/rooms");

  function handleChange(e) {
    setInfo((pre) => {
      return { ...pre, [e.target.id]: e.target.value };
    });
  }

  function handleSelect(e) {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  }

  async function handleClick(e) {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          setReqLoad(true);
          const uploadRes = await axiosImgUpload.post(
            "https://api.cloudinary.com/v1_1/ddwxojll7/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      const res = await axios.post("/hotels", newHotel);
      setReqLoad(false);
      navigate("/hotels");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Hotels</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Img"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              {hotelInputs.map((input) => {
                return (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  </div>
                );
              })}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectedRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => {
                        return (
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        );
                      })}
                </select>
              </div>
              {!reqLoad && <button onClick={handleClick}>Send</button>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewHotel;
