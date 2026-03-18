useEffect(() => {
  fetchVendors();
}, []);

const fetchVendors = async () => {
  const { data } = await supabase.from("vendors").select("*");
  if (data) setVendors(data);
};
