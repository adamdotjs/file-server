import soap from "soap";
import { createAttachment } from "./createAttachment.js";

const readExistingValues = async (req, res) => {
  const URL = `${process.env.BASE_URL}/ReadObject?wsdl`;
  const args = {
    inventoryItem: { id: req.params.id },
  };

  const client = await soap.createClientAsync(URL);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );
  const response = await client.readInventoryItemAsync(args);

  res.render("updateFile.ejs", { file: response[0].out });
};

const updateFile = async (req, res) => {
  const URL = `${process.env.BASE_URL}/UpdateObject?wsdl`;
  const args = {
    inventoryItem: {
      id: req.params.id,
      dateLastPriceChg: new Date().toISOString(),
      ...req.body,
    },
  };

  const client = await soap.createClientAsync(URL);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );
  const response = await client.updateInventoryItemAsync(args);

  if (req.files.length === 1) {
    await createAttachment(response[0].out.id, req.files[0]);
  }

  if (req.files.length === 2) {
    await createAttachment(response[0].out.id, req.files[0]);
    await createAttachment(response[0].out.id, req.files[1]);
  }

  console.log(response[0].out);
  res.redirect("/files");
};

export { readExistingValues, updateFile };
