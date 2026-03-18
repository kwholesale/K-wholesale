const addPayment = async (index) => {
  if (!amount) return;

  const vendor = vendors[index];
  const newPayments = [...vendor.payments, Number(amount)];

  await supabase
    .from("vendors")
    .update({ payments: newPayments })
    .eq("id", vendor.id);

  fetchVendors();
  setAmount("");
};
