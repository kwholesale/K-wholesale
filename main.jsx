const deleteVendor = async (index) => {
  const vendor = vendors[index];

  await supabase
    .from("vendors")
    .delete()
    .eq("id", vendor.id);

  fetchVendors();
};
