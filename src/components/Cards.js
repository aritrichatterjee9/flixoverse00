import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { ProgressBar } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);

      const formattedData = _data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setData(formattedData);
      setLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Use flex to ensure content pushes footer */}
      <div className="flex-grow p-3 mt-3">
        {loading ? (
          <div className="w-full flex justify-center items-center h-96">
            <ProgressBar height={333} color="white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((e, i) => (
              <Link to={`/detail/${e.id}`} key={i}>
                <div className="card shadow-lg p-2 hover:-translate-y-4 cursor-pointer font-medium mt-6 transition-all duration-300">
                  <img className="h-60 md:h-72 mx-auto" src={e.image} alt={e.title} />
                  <h1>
                    <span className="text-blue-500 justify-items-start">
                      Name :
                    </span>
                    {e.title}
                  </h1>
                  <div className="flex justify-center">
                    <h1 className="flex items-center">
                      <span className="text-blue-500 mr-1">Rating :</span>
                      <ReactStars
                        size={20}
                        half={true}
                        value={e.rating / e.rated}
                        edit={false}
                      />
                    </h1>
                  </div>

                  <h1>
                    <span className="text-blue-500">Year :</span>
                    {e.year}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cards;
