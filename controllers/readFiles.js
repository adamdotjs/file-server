import soap from "soap";
import { readAttachment } from "./readAttachment.js";

const readFile = async (id) => {
  const URL = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/ReadObject?wsdl`;
  const args = {
    inventoryItem: { id: id },
  };

  const client = await soap.createClientAsync(URL);
  client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));

  const response = await client.readInventoryItemAsync(args);
  const file = await response[0].out;
  const preview = await readAttachment(file.thumbnail);
  const printFile = await readAttachment(file.document);

  return { ...file, preview, printFile };
};

const readFiles = async (req, res) => {
  const url = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/FindObjects?wsdl`;
  const args = {
    in0: "InventoryItem",
    in1: "@inventoryItemType=19",
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));

  const response = await client.findAsync(args);
  const files = response[0].out.string.map(async (id) => {
    return readFile(id);
  });
  const results = await Promise.all(files).then((results) => results);
  res.render("files.ejs", { files: results });
};

export { readFiles };
