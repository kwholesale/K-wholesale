const addVendor = async () => {
  if (!name.trim()) return;

  const { data } = await supabase
    .from("vendors")
    .insert([{ name, payments: [] }])
    .select();

  setVendors([...vendors, ...data]);
  setName("");
};
