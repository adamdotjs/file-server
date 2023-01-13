import soap from "soap";
import { readAttachment } from "./readAttachment.js";

const readFile = async (id) => {
  const URL = `${process.env.BASE_URL}/ReadObject?wsdl`;
  const args = {
    inventoryItem: { id: id },
  };

  const client = await soap.createClientAsync(URL);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );

  const response = await client.readInventoryItemAsync(args);
  const file = await response[0].out;
  const preview = await readAttachment(file.thumbnail);
  const printFile = await readAttachment(file.document);

  return { ...file, preview, printFile };
};

const readFiles = async (req, res) => {
  const URL = `${process.env.BASE_URL}/FindObjects?wsdl`;
  const args = {
    in0: "InventoryItem",
    in1: "@inventoryItemType=19&@active=true",
  };

  const client = await soap.createClientAsync(URL);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );

  const response = await client.findAsync(args);
  const files = response[0].out.string.map(async (id) => {
    return readFile(id);
  });
  const results = await Promise.all(files).then((results) => results);

  //send back a list of customers with existing files so the user can filter them if needed
  const allCustomers = [...new Set(results.map((result) => result.customer))];

  res.render("files.ejs", { files: results, customers: allCustomers });
};

export { readFiles };
