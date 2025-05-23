import axios from "axios";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddCustomer = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [Name, SetName] = useState("");
  const [Surname, SetSurname] = useState("");
  const [Number, SetNumber] = useState("");
  const [Department, SetDepartment] = useState("");
  const [Note, SetNote] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const SubmitShow = (e) => {
    e.preventDefault();
    let newARR = {
      name: Name,
      surname: Surname,
      phone: Number,
      department: Department,
      note: Note,
      status: false,
    };

    axios.post(url + "/customer", newARR).then((red) => {
      if (
        Name.length > 0 &&
        Surname.length > 0 &&
        Number.length > 0 &&
        Department.length > 0
      ) {
        console.log(red);
        SetName("");
        SetSurname("");
        SetNumber("");
        SetDepartment("");
        SetNote("");
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      }
    });
  };

  return (
    <>
      <h1 className="text-[#000] text-[26px] mt-[20px] font-bold">
        Yeni musteri elave et
      </h1>
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 bg-green-500 text-white font-bold rounded-lg px-6 py-3 shadow-lg"
          >
            Müştəri uğurla əlavə edildi! ✅
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-[#FFF] w-[1170px] p-[20px] rounded-2xl mt-[30px] relative">
        <div className="">
          <form method="get" onSubmit={SubmitShow}>
            <div className="grid grid-cols-2 gap-y-5">
              <div className="">
                <h1>Ad</h1>
                <input
                  value={Name}
                  onChange={(e) => SetName(e.target.value)}
                  type="text"
                  className="outline-1 p-[0px_10px] outline-[#aaaaaa] rounded-[5px] w-[535px] h-[40px]"
                />
              </div>
              <div className="">
                <h1>Soyad</h1>
                <input
                  value={Surname}
                  onChange={(e) => SetSurname(e.target.value)}
                  type="text"
                  className="outline-1 p-[0px_10px] outline-[#aaaaaa] rounded-[5px] w-[535px] h-[40px]"
                />
              </div>
              <div className="">
                <h1>Telefon Nomresi</h1>
                <input
                  value={Number}
                  onChange={(e) => SetNumber(e.target.value)}
                  type="number"
                  className="outline-1 p-[0px_10px] outline-[#aaaaaa] rounded-[5px] w-[535px] h-[40px]"
                />
              </div>
              <div className="">
                <h1>Sobe</h1>
                <input
                  value={Department}
                  onChange={(e) => SetDepartment(e.target.value)}
                  type="text"
                  className="outline-1 p-[0px_10px] outline-[#aaaaaa] rounded-[5px] w-[535px] h-[40px]"
                />
              </div>
            </div>
            <div className="">
              <h1>Qeydler</h1>
              <input
                value={Note}
                onChange={(e) => SetNote(e.target.value)}
                type="text"
                className="outline-1 p-[0px] outline-[#aaaaaa] rounded-[5px] w-[1100px] h-[80px]"
              />
            </div>
            <div className="flex justify-end">
              <input
                type="submit"
                className="bg-purple-700 p-[10px_30px] rounded-[10px] text-[#fff] mt-[20px] mr-[30px]"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
