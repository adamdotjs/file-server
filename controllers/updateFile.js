import soap from "soap";
import { readAttachment } from "./readAttachment.js";

const url = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/UpdateObject?wsdl`;

const updateFile = async (req, res) => {
  const args = {
    inventoryItem: { id: req.params.id },
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));

  const response = await client.readInventoryItemAsync(args);
  const file = await response[0].out;
  const image = await readAttachment(file.thumbnail);

  res.render("file.ejs", { file: { ...file, image } });
};

export { updateFile };
