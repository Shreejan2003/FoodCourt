import Navbar from "./components/Navbar";
import MenuManagement from "./pages/MenuManagement";
import CustomerInfo from "./pages/CustomerInfo";
import OrderMonitoring from "./pages/OrderMonitoring";
import Analytics from "./pages/Analytics";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MenuManagement />} />
          <Route path="/MenuManagement" element={<MenuManagement />} />
          <Route path="/CustomerInfo" element={<CustomerInfo />} />
          <Route path="/OrderMonitoring" element={<OrderMonitoring />} />
          <Route path="/Analytics" element={<Analytics />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
