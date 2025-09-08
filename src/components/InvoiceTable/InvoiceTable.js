import React, { useState } from "react";
import "./invoiceTable.scss";
import { FaPlus, FaTrash } from "react-icons/fa";

const categories = ["Dental", "Ortho", "Surgery"];
const procedures = {
  Dental: ["Cleaning", "Filling", "X-Ray"],
  Ortho: ["Braces", "Retainer"],
  Surgery: ["Extraction", "Implant"]
};

const InvoiceTable = () => {
  const [rows, setRows] = useState([
    { id: 1, category: "", procedure: "", description: "", quantity: 1, price: "" }
  ]);
  const [discountPercent, setDiscountPercent] = useState("");

  const handleRowChange = (id, field, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleAddRow = () => {
    setRows([...rows, {
      id: Date.now(),
      category: "",
      procedure: "",
      description: "",
      quantity: 1,
      price: ""
    }]);
  };

  const handleDeleteRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const total = rows.reduce((sum, row) => sum + (parseFloat(row.price) || 0) * row.quantity, 0);
  const discountValue = (total * discountPercent) / 100;
  const grandTotal = total - discountValue;
  const paid = 0;

  return (
    <div className="container-fluid py-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4">Invoice</h2>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle w-100">
              <thead className="table-light text-center">
                <tr>
                  <th>Category</th>
                  <th>Procedure (CPT)</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Sub Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.id}>
                    <td>
                      <select
                        className="form-select"
                        value={row.category}
                        onChange={e => handleRowChange(row.id, "category", e.target.value)}
                      >
                        <option value="">Select</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={row.procedure}
                        onChange={e => handleRowChange(row.id, "procedure", e.target.value)}
                      >
                        <option value="">Select</option>
                        {(procedures[row.category] || []).map(proc => (
                          <option key={proc} value={proc}>{proc}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.description}
                        onChange={e => handleRowChange(row.id, "description", e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        className="form-control text-center"
                        value={row.quantity}
                        disabled
                      />
                    </td>
                    <td className="text">
                      <input
                        type="number"
                        className="form-control"
                        value={row.price}
                        onChange={e => handleRowChange(row.id, "price", parseFloat(e.target.value) || "")}
                      />
                    </td>
                    <td className="text">
                      {(parseFloat(row.price) * row.quantity || 0).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <button className="btn btn-success btn-sm me-1" onClick={handleAddRow}>
                        <FaPlus />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteRow(row.id)}
                        hidden={rows.length <= 1}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row g-3 mt-4 justify-content-end">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="mb-2">
                <label className="form-label fw-bold">Total:</label>
                <input type="text" className="form-control text-end" value={total.toFixed(2)} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label fw-bold mb-0">Discount (%):</label>
                <input
                  type="number"
                  className="form-control"
                  value={discountPercent}
                  onChange={e => setDiscountPercent(parseFloat(e.target.value) || "")}
                />
                <input type="text" className="form-control text-end" value={discountValue.toFixed(2)} disabled />
              </div>
              <div className="mb-2">
                <label className="form-label fw-bold">Grand Total:</label>
                <input type="text" className="form-control text-end" value={grandTotal.toFixed(2)} disabled />
              </div>
              <div>
                <label className="form-label fw-bold">Paid:</label>
                <input type="text" className="form-control text-end" value={paid.toFixed(2)} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
