import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Customer = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [User2, SetUser2] = useState([]);
  const [allUser, SetallUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seacrh, Setsearch] = useState("");

  useEffect(() => {
    axios.get(url + "/archive").then(({ data }) => {
      SetUser2(data);
      SetallUser(data);
      setLoading(false);
    });
  }, []);

  const SearchShow = (title) => {
    Setsearch(title);
    const filtered = allUser.filter((item) =>
      item.name.toLowerCase().includes(title.toLowerCase())
    );
    SetUser2(filtered);
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{
              width: 50,
              height: 50,
              border: "5px solid #ccc",
              borderTop: "5px solid #3498db",
              borderRadius: "50%",
            }}
          />
        </div>
      )}

      {!loading && (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Arxivlənmiş Müştərilər</h1>
          <div className="mb-[30px]">
            <form method="get">
              <input
                value={seacrh}
                type="text"
                className="outline-1 outline-gray-600 w-[500px] h-[40px] rounded-[20px]"
                placeholder="Ada görə axtarış"
                onChange={(e) => SearchShow(e.target.value)}
              />
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {User2.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-md p-5 w-[350px] space-y-2 font-sans"
              >
                <p>
                  <strong>Ad Soyad:</strong> {user.name} {user.surname}
                </p>
                <p>
                  <strong>Telefon:</strong> {user.phone}
                </p>
                <p>
                  <strong>Şöbə:</strong> {user.department}
                </p>
                <p>
                  <strong>Qeydlər:</strong> {user.note}
                </p>

                <p className="flex items-center gap-2 cursor-pointer">
                  <strong>Status:</strong>
                  <span
                    className={`${
                      user.status ? "bg-green-400" : "bg-yellow-400"
                    }  text-white text-sm font-semibold px-3 py-1 rounded-full`}
                  >
                    {user.status ? "elaqe qurulub" : "Əlaqə qurulmayıb"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Customer;
