import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef,usersRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";

const Reviews = ({ id, prevRating, userRated }) => {

  const useAppstate = useContext(Appstate);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [data, setData] = useState([]);

  const sendReview = async () => {
    setLoading(true);
    try {
      await addDoc(reviewsRef, {
        movieId: id,
        name: useAppstate.userName,
        rating: rating,
        thought: form,
        timestamp: new Date().getTime(),
      });

      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });

      setRating(0);
      setForm("");
      swal({
        title: "Successfully reviews sent",
        icon: "success",
        button: false,
        timer: 6000,
      });
      window.location.reload();
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        button: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);

      let quer = query(reviewsRef, where("movieId", "==", id));
      const querySnapshot = await getDocs(quer);
      setReviewsLoading(false);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
    }
    getData();
  }, []);

  return (
    <div className="mt-4 py-3 border-t-2 border-gray w-full">
      <div className="ml-4">
        <ReactStars
          size={25}
          half={true}
          value={rating}
          onChange={(rate) => setRating(rate)}
        />
      </div>

      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full p-2 outline-none header"
      />
      <button
        onClick={sendReview}
        className="bg-green-600 flex justify-center w-full p-2"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>

      {reviewsLoading ? (
        <div className="mt-3 flex justify-center">
          <ThreeDots height={15} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div
                className="border-b bg-gray-900  border-gray-600 p-2 w-full mt-2"
                key={i}
              >
                <div className="flex">
                  <p className="ml-2 text-blue-500">{e.name}</p>
                  <p className="ml-3 text-xs">
                    {new Date(e.timestamp).toLocaleString()}
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <div>
                  <p>
                    <p className="">{e.thought}</p>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
