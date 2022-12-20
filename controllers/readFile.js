import soap from "soap";
import { readAttachment } from "./readAttachment.js";

const readFile = async (req, res) => {
  const url = `${process.env.BASE_URL}/ReadObject?wsdl`;
  const args = {
    inventoryItem: { id: req.params.id },
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );
  const response = await client.readInventoryItemAsync(args);

  const file = await response[0].out;
  const preview = await readAttachment(file.thumbnail);
  const printFile = await readAttachment(file.document);
  res.render("file.ejs", { file: { ...file, preview, printFile } });
};

export { readFile };
