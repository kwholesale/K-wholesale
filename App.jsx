import React, { useState, useEffect } from "react";

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // تحميل البيانات
  useEffect(() => {
    const data = localStorage.getItem("vendors");
    if (data) setVendors(JSON.parse(data));
  }, []);

  // حفظ البيانات
  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);

  const addVendor = () => {
    if (!name.trim()) return;
    setVendors([...vendors, { name, payments: [] }]);
    setName("");
  };

  const addPayment = (index) => {
    if (!amount) return;
    const updated = [...vendors];
    updated[index].payments.push(Number(amount));
    setVendors(updated);
    setAmount("");
  };

  const totalAll = vendors.reduce(
    (sum, v) => sum + v.payments.reduce((a, b) => a + b, 0),
    0
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>K Wholesale System</h1>

      <h2>Total Payments: ${totalAll}</h2>

      <h3>Add Vendor</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Vendor Name"
      />
      <button onClick={addVendor}>Add</button>

      <h3 style={{ marginTop: 20 }}>Vendors</h3>

      {vendors.map((v, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <strong>{v.name}</strong>

          <div>
            <input
              type="number"
              placeholder="Payment Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={() => addPayment(i)}>Add Payment</button>
          </div>

          <ul>
            {v.payments.map((p, idx) => (
              <li key={idx}>${p}</li>
            ))}
          </ul>

          <p>
            Total Paid: $
            {v.payments.reduce((a, b) => a + b, 0)}
          </p>
        </div>
      ))}
    </div>
  );
}
