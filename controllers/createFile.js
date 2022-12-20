import soap from "soap";

const createFile = async (req, res) => {
  const url = `${process.env.BASE_URL}/CreateObject?wsdl`;
  const args = {
    inventoryItem: {
      ...req.body,
      dateLastPriceChg: new Date().toISOString(),
    },
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );
  const response = await client.addInventoryItemAsync(args);

  console.log(response[0].out);
  res.redirect("/files");
};

export { createFile };
