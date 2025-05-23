import { Route, Routes } from "react-router-dom";
import Customer from "./pages/Customer";
import AddCustomer from "./pages/AddCustomer/Index";
import Arcive from "./pages/Arcive";
import Error from "./pages/Error";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <>
      <div className="flex ">
        <Navbar />
        <div className="bg-[#FAF5FF] w-full pl-[20px]">
          <Routes>
            <Route path="/" Component={AddCustomer} />
            <Route path="/all-customer" Component={Customer} />
            <Route path="/arcive" Component={Arcive} />
            <Route path="*" Component={Error} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
