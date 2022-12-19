import soap from "soap";

const updateFile = async (req, res) => {
  const url = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/UpdateObject?wsdl`;
  const args = {
    inventoryItem: {
      id: req.params.id,
      ...req.body,
    },
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));
  const response = await client.updateInventoryItemAsync(args);

  console.log(response[0].out);
  res.redirect("/files");
};

export { updateFile };
