import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Customer = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [User, SetUser] = useState([]);
  useEffect(() => {
    axios.get(url + "/customer").then(({ data }) => {
      SetUser(data);
    });
  }, []);
  const [status, Setstatus] = useState(false);
  const ClickShow = (user) => {
    const a = {
      status: !user.status,
    };
    axios.patch(url + "/customer" + "/" + user.id, a).then(({ data }) => {
      SetUser((item) =>
        item.map((ite) =>
          ite.id === user.id ? { ...ite, status: data.status } : ite
        )
      );
    });
  };
  const ShowDelete = (user) => {
    axios.post(url + "/archive", user).then(({ data }) => {});
    axios.delete(url + "/customer" + "/" + user.id).then(({ data }) => {
      const data2 = User.filter((item) => item.id !== user.id);
      SetUser(data2);
    });
  };
  const [Edit, SetEdit] = useState(false);
  const [id, Setid] = useState("");
  const ShowEdit = (user) => {
    SetEdit(!Edit);
    SetName(user.name);
    SetSurname(user.surname);
    SetNumber(user.phone);
    SetDepartment(user.department);
    SetNote(user.note);
    Setid(user.id);
  };
  const [Name, SetName] = useState("");
  const [Surname, SetSurname] = useState("");
  const [Number, SetNumber] = useState("");
  const [Department, SetDepartment] = useState("");
  const [Note, SetNote] = useState("");
  const SubmitShow = (e) => {
    e.preventDefault();
    SetEdit(!Edit);
    let newa = {
      name: Name,
      surname: Surname,
      phone: Number,
      department: Department,
      note: Note,
    };
    axios.patch(url + "/customer" + "/" + id, newa).then(({ data }) => {
      SetUser((user) =>
        user.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
    });
  };
  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Bütün Müştərilər</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {User.map((user) => {
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
                      {user.status ? "elaqe qurulub" : "Əlaqə qurulmayıb"}
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
              </>
            );
          })}
        </div>
        <div className="">
          {Edit ? (
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
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Customer;
