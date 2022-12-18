import soap from "soap";
import { readAttachment } from "./readAttachment.js";

const url = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/ReadObject?wsdl`;

const readFile = async (req, res) => {
  const args = {
    inventoryItem: { id: req.params.id },
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));

  const response = await client.readInventoryItemAsync(args);
  const file = await response[0].out;
  const image = await readAttachment(file.thumbnail);
  const printFile = await readAttachment(file.document);
  res.render("file.ejs", { file: { ...file, image, printFile } });
};

export { readFile };
