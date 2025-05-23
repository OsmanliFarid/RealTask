import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Customer = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [User2, SetUser2] = useState([]);
  useEffect(() => {
    axios.get(url + "/archive").then(({ data }) => {
      SetUser2(data);
    });
  }, []);
  const [status, Setstatus] = useState(false);

  return (
    <>
      {User2 && (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Arxivlenmis Müştərilər</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {User2.map((user) => {
              return (
                <>
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
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Customer;
