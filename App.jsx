import { useState } from "react";

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");

  const addVendor = () => {
    if (!name) return;
    setVendors([...vendors, { name }]);
    setName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>K Wholesale System</h1>

      <h3>Add Vendor</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Vendor Name"
      />
      <button onClick={addVendor}>Add</button>

      <h3>Vendors List</h3>
      <ul>
        {vendors.map((v, i) => (
          <li key={i}>{v.name}</li>
        ))}
      </ul>
    </div>
  );
}
