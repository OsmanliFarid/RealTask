import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loader = () => (
  <motion.div
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "5px solid #ccc",
      borderTop: "5px solid #7c3aed",
      margin: "auto",
      position: "absolute",
      top: "50%",
      left: "55%",
    }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
  />
);

const Customer = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [allUser, SetallUser] = useState([]);
  const [User, SetUser] = useState([]);
  const [loader, Setloader] = useState(true);

  useEffect(() => {
    axios.get(url + "/customer").then(({ data }) => {
      SetUser(data);
      Setloader(false);
      SetallUser(data);
    });
  }, []);

  const ClickShow = (user) => {
    const a = { status: !user.status };
    axios.patch(url + "/customer/" + user.id, a).then(({ data }) => {
      SetUser((items) =>
        items.map((item) =>
          item.id === user.id ? { ...item, status: data.status } : item
        )
      );
      if (data.status === true) {
        toast.success("✅ Əlaqə quruldu!");
      } else {
        toast.error("❌ Əlaqə qurulmadı!");
      }
    });
  };

  const ShowDelete = (user) => {
    axios.post(url + "/archive", user).then(() => {
      axios.delete(url + "/customer/" + user.id).then(() => {
        const data2 = User.filter((item) => item.id !== user.id);
        SetUser(data2);
        toast.warn("🗑️ Müştəri silindi!");
      });
    });
  };

  const [Edit, SetEdit] = useState(false);
  const [id, Setid] = useState("");
  const [Name, SetName] = useState("");
  const [Surname, SetSurname] = useState("");
  const [Number, SetNumber] = useState("");
  const [Department, SetDepartment] = useState("");
  const [Note, SetNote] = useState("");

  const ShowEdit = (user) => {
    SetEdit(true);
    SetName(user.name);
    SetSurname(user.surname);
    SetNumber(user.phone);
    SetDepartment(user.department);
    SetNote(user.note);
    Setid(user.id);
  };

  const SubmitShow = (e) => {
    e.preventDefault();
    SetEdit(false);
    const updatedUser = {
      name: Name,
      surname: Surname,
      phone: Number,
      department: Department,
      note: Note,
    };
    axios.patch(url + "/customer/" + id, updatedUser).then(({ data }) => {
      SetUser((users) =>
        users.map((user) => (user.id === id ? { ...user, ...data } : user))
      );
      toast.success("✏️ Məlumat yeniləndi!");
    });
  };

  const [seacrh, Setsearch] = useState("");
  const SearchShow = (title) => {
    Setsearch(title);
    const filtered = allUser.filter((item) =>
      item.name.toLowerCase().includes(title.toLowerCase())
    );
    SetUser(filtered);
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Bütün Müştərilər</h1>
        <div className="mb-[30px]">
          <form method="get">
            <input
              value={seacrh}
              type="text"
              className="outline-1 outline-gray-600 w-[500px] h-[40px] rounded-[20px] px-4"
              placeholder="Ada görə axtarış"
              onChange={(e) => SearchShow(e.target.value)}
            />
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loader ? (
            <Loader />
          ) : (
            User.map((user) => (
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

                <p
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => ClickShow(user)}
                >
                  <strong>Status:</strong>
                  <span
                    className={`${
                      user.status ? "bg-green-400" : "bg-yellow-400"
                    }  text-white text-sm font-semibold px-3 py-1 rounded-full`}
                  >
                    {user.status ? "Əlaqə qurulub" : "Əlaqə qurulmayıb"}
                  </span>
                </p>
                <div className="flex gap-3">
                  <div className="bg-blue-500 w-[35px] rounded-[10px] h-[35px] flex justify-center items-center cursor-pointer">
                    <FaEdit
                      className="text-[25px] text-[#fff]"
                      onClick={() => ShowEdit(user)}
                    />
                  </div>
                  <div className="bg-red-500 w-[35px] rounded-[10px] h-[35px] flex justify-center items-center cursor-pointer">
                    <MdDelete
                      className="text-[25px] text-[#fff]"
                      onClick={() => ShowDelete(user)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {Edit && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h1 className="text-xl font-bold mb-4">Form</h1>
              <form onSubmit={SubmitShow}>
                <div className="mb-3">
                  <label className="block mb-1">Ad</label>
                  <input
                    value={Name}
                    onChange={(e) => SetName(e.target.value)}
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Adınızı daxil edin"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Soyad</label>
                  <input
                    value={Surname}
                    onChange={(e) => SetSurname(e.target.value)}
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Soyadınızı daxil edin"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Telefon</label>
                  <input
                    value={Number}
                    onChange={(e) => SetNumber(e.target.value)}
                    type="tel"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Telefon nömrənizi daxil edin"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Şöbə</label>
                  <input
                    value={Department}
                    onChange={(e) => SetDepartment(e.target.value)}
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Şöbəni daxil edin"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Qeyd</label>
                  <input
                    value={Note}
                    onChange={(e) => SetNote(e.target.value)}
                    className="w-full border rounded px-3 py-2 resize-none"
                    placeholder="Qeyd daxil edin"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
                >
                  Göndər
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

export default Customer;
