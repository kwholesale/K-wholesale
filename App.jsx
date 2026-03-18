return (
  <div style={{
    padding: 20,
    fontFamily: "Arial",
    background: "#f5f7fb",
    minHeight: "100vh"
  }}>
    <h1 style={{ color: "#222" }}>K Wholesale System</h1>

    <h2 style={{ color: "#007bff" }}>
      Total Payments: ${totalAll}
    </h2>

    <div style={{
      background: "#fff",
      padding: 15,
      borderRadius: 10,
      marginTop: 20
    }}>
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
          borderRadius: 5
        }}
      >
        Add
      </button>
    </div>

    <h3 style={{ marginTop: 30 }}>Vendors</h3>

    {vendors.map((v, i) => (
      <div
        key={i}
        style={{
          background: "#fff",
          padding: 15,
          marginBottom: 15,
          borderRadius: 10
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>{v.name}</strong>
          <button
            onClick={() => deleteVendor(i)}
            style={{ color: "red", border: "none", background: "none" }}
          >
            Delete
          </button>
        </div>

        <div style={{ marginTop: 10 }}>
          <input
            type="number"
            placeholder="Payment Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: 10, marginRight: 10 }}
          />
          <button
            onClick={() => addPayment(i)}
            style={{
              padding: 10,
              background: "green",
              color: "#fff",
              border: "none",
              borderRadius: 5
            }}
          >
            Add Payment
          </button>
        </div>

        <ul style={{ marginTop: 10 }}>
          {v.payments.map((p, idx) => (
            <li key={idx}>
              ${p}
              <button
                onClick={() => deletePayment(i, idx)}
                style={{
                  marginLeft: 10,
                  color: "red",
                  border: "none",
                  background: "none"
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <p style={{ fontWeight: "bold" }}>
          Total Paid: ${v.payments.reduce((a, b) => a + b, 0
