import React, { useContext } from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddMovie from "./AddMovie";
import { Appstate } from "../App";
import "../App.css";

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div className="sticky top-0 z-50 header text-lg flex justify-between text-red-600 font-bold p-3 border-b-2 border-gray-300">
      <Link to={"/"}>
        <span>
          Flixo<span className="text-white">Verse</span>
        </span>
      </Link>
      {useAppstate.login ? (
        <Link to={"/addMovie"}>
          <h1 className="text-lg text-white flex items-centers cursor-pointer">
            <Button>
              <AddToPhotosIcon className="mr-2" color="seondary" />
              <span className="text-white">Add New</span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h1 className="text-lg bg-green-500 text-white flex items-centers cursor-pointer">
            <button className="fancy-button rounded glow-button">
              <span className="text-white">Login to add</span>
            </button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
