import React, { useState } from "react";

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");

  const addVendor = () => {
    if (!name.trim()) return;
    setVendors([...vendors, { name }]);
    setName("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>K Wholesale System</h1>

      <h3>Add Vendor</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Vendor Name"
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={addVendor} style={{ padding: 8 }}>
        Add
      </button>

      <h3 style={{ marginTop: 20 }}>Vendors List</h3>
      <ul>
        {vendors.map((v, i) => (
          <li key={i}>{v.name}</li>
        ))}
      </ul>
    </div>
  );
}
