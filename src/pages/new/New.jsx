import React, { useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axios, { axiosImgUpload } from "../../config/axios";
import { useNavigate } from "react-router-dom";

function New({ inputs, title }) {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [reqLoad, setReqLoad] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setInfo((pre) => {
      return { ...pre, [e.target.id]: e.target.value };
    });
  }

  async function handleClick(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axiosImgUpload.post(
        "https://api.cloudinary.com/v1_1/ddwxojll7/upload",
        data
      );
      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };
      setReqLoad(true);
      await axios.post("/auth/register", newUser);
      setReqLoad(false);
      navigate("/users");
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
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {inputs.map((input, i) => {
                return (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                );
              })}
              {!reqLoad && <button onClick={handleClick}>Send</button>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
