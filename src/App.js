// import logo from './logo.svg';
import './App.css';
// import Test from './components/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from "../src/components/TaskForm/TaskForm";
import Counter from "../src/components/Counter/Counter";
import InvoiceTable from "../src/components/InvoiceTable/InvoiceTable";
// import SimpleForm from "./components/SampleForm/Test";
import AddCart  from "../src/components/AddCart/Cart";



function App() {
  return (
    <Router>
    <div className="text-3xl font-bold text-blue-600">
        {/* Navigation Links */}
        <nav className='navbar'>
          <Link to="/invoice" style={{ margin: "0 10px" }}>Invoice Table</Link>
          <Link to="/cart" style={{ margin: "0 10px" }}>Add to Cart</Link>
          <Link to="/task" style={{ margin: "0 10px" }}>Task Form</Link>
          <Link to="/counter" style={{ margin: "0 10px" }}>Counter</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/invoice" element={<InvoiceTable />} />
          <Route path="/cart" element={<AddCart />} />
          <Route path="/task" element={<TaskForm />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>
      </div>
        </Router>
  );
}
export default App;
