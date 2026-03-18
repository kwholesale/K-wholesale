import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "YOUR_URL",
  "YOUR_ANON_KEY"
);

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");

  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("Regions");
  const [date, setDate] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const { data, error } = await supabase.from("vendors").select("*").order("id");
    if (!error && data) setVendors(data);
  };

  const addVendor = async () => {
    if (!name.trim()) return;

    const { error } = await supabase
      .from("vendors")
      .insert([{ name, payments: [] }]);

    if (!error) {
      setName("");
      fetchVendors();
    }
  };

  const deleteVendor = async (id) => {
    const { error } = await supabase.from("vendors").delete().eq("id", id);
    if (!error) fetchVendors();
  };

  const addPayment = async (vendor) => {
    if (!amount || !date || !checkNumber) return;

    const newPayment = {
      amount: Number(amount),
      bank,
      date,
      checkNumber,
      notes,
    };

    const existingPayments = Array.isArray(vendor.payments) ? vendor.payments : [];
    const updatedPayments = [...existingPayments, newPayment];

    const { error } = await supabase
      .from("vendors")
      .update({ payments: updatedPayments })
      .eq("id", vendor.id);

    if (!error) {
      setAmount("");
      setBank("Regions");
      setDate("");
      setCheckNumber("");
      setNotes("");
      fetchVendors();
    }
  };

  const deletePayment = async (vendor, paymentIndex) => {
    const existingPayments = Array.isArray(vendor.payments) ? vendor.payments : [];
    const updatedPayments = existingPayments.filter((_, i) => i !== paymentIndex);

    const { error } = await supabase
      .from("vendors")
      .update({ payments: updatedPayments })
      .eq("id", vendor.id);

    if (!error) fetchVendors();
  };

  const totalAll = vendors.reduce((sum, vendor) => {
    const vendorTotal = (vendor.payments || []).reduce((a, p) => a + Number(p.amount || 0), 0);
    return sum + vendorTotal;
  }, 0);

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#222" }}>K Wholesale Check System</h1>
      <h2 style={{ color: "#007bff" }}>Total Payments: ${totalAll}</h2>

      <div
        style={{
          background: "#fff",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 25,
        }}
      >
        <h3>Add Vendor</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vendor Name"
          style={{ padding: 10, marginRight: 10 }}
        />
        <button
          onClick={addVendor}
          style={{
            padding: 10,
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 5,
          }}
        >
          Add
        </button>
      </div>

      <h3>Vendors</h3>

      {vendors.map((vendor) => {
        const vendorTotal = (vendor.payments || []).reduce(
          (a, p) => a + Number(p.amount || 0),
          0
        );

        return (
          <div
            key={vendor.id}
            style={{
              background: "#fff",
              padding: 15,
              marginBottom: 20,
              borderRadius: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{vendor.name}</strong>
              <button
                onClick={() => deleteVendor(vendor.id)}
                style={{ color: "red", border: "none", background: "none" }}
              >
                Delete
              </button>
            </div>

            <div style={{ marginTop: 12 }}>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ padding: 8, marginRight: 8, marginBottom: 8 }}
              />

              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                style={{ padding: 8, marginRight: 8, marginBottom: 8 }}
              >
                <option value="Regions">Regions</option>
                <option value="Cadence">Cadence</option>
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ padding: 8, marginRight: 8, marginBottom: 8 }}
              />

              <input
                placeholder="Check Number"
                value={checkNumber}
                onChange={(e) => setCheckNumber(e.target.value)}
                style={{ padding: 8, marginRight: 8, marginBottom: 8 }}
              />

              <input
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ padding: 8, marginRight: 8, marginBottom: 8 }}
              />

              <button
                onClick={() => addPayment(vendor)}
                style={{
                  padding: 10,
                  background: "green",
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                }}
              >
                Add Check
              </button>
            </div>

            <ul style={{ marginTop: 10 }}>
              {(vendor.payments || []).map((p, idx) => (
                <li key={idx} style={{ marginBottom: 8 }}>
                  ${p.amount} | {p.bank} | {p.date} | Check #{p.checkNumber}
                  {p.notes ? ` | ${p.notes}` : ""}
                  <button
                    onClick={() => deletePayment(vendor, idx)}
                    style={{
                      marginLeft: 10,
                      color: "red",
                      border: "none",
                      background: "none",
                    }}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>

            <p style={{ fontWeight: "bold" }}>Total Paid: ${vendorTotal}</p>
          </div>
        );
      })}
    </div>
  );
}
