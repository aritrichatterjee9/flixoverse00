import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { ProgressBar } from "react-loader-spinner";
import Reviews from "./Reviews"; 

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    image: "",
    year: "",
    description: "",
    rating:0,
    rated:0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const _docRef = doc(db, "movies", id); // Replace with your collection name
        const _dataSnapshot = await getDoc(_docRef);

        if (_dataSnapshot.exists()) {
          setData(_dataSnapshot.data());
        } else {
          console.log("Document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }

      setLoading(false);
    }

    getData();
  }, [id]);

  return (
    <div className="p-4 mt-9 flex flex-col md:flex-row justify-center">
      {loading ? (
        <ProgressBar height={96}/>
      ) : (
        <>
          <div className="sticky top-0 aspect-w-3 aspect-h-4"><img
            className="h-75 sticky top-33"
            src={data.image}
            alt="Movie Poster"
          /></div>
          <div className="ml-3 w-1/2 mt-9 items-center md:items-start">
            <h1 className="ml-3 font-bold text-3xl">
              {data.title}
              <span className="text-xl ml-3">{data.year}</span>
            </h1>

            <div className="ml-3">
              <ReactStars size={20} half={true} value={data.rating/data.rated} edit={false} />
            </div>

            <p className="ml-3 mt-6">{data.description}</p>
            <Reviews id={id} prevRating={data.rating} useRated={data.rated}/>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
