import { Route, Routes } from "react-router-dom";
import Customer from "./pages/Customer";
import AddCustomer from "./pages/AddCustomer/Index";
import Arcive from "./pages/Arcive";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <>
      <div className="flex ">
        <Navbar />
        <div className="bg-[#FAF5FF] w-full pl-[20px]">
          <Routes>
            <Route path="/all-customer" Component={AddCustomer} />
            <Route path="/addcustomer" Component={Customer} />
            <Route path="/arcive" Component={Arcive} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
