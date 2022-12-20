import soap from "soap";
import { createAttachment } from "./createAttachment.js";

const createFile = async (req, res) => {
  const url = `${process.env.BASE_URL}/CreateObject?wsdl`;
  const args = {
    inventoryItem: {
      ...req.body,
      inventoryItemType: 19,
      dateLastPriceChg: new Date().toISOString(),
    },
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );
  const response = await client.createInventoryItemAsync(args);
  const newFile = response[0].out;

  // create attachments for thumbnail and document
  // this is a separate operation from creating the file itself due to API limitations,
  // so we needto wait and grab the id from the initial create file response
  // TODO: there may be perf optimizations here, look into this further
  await createAttachment(newFile.id, req.files[0]);
  await createAttachment(newFile.id, req.files[1]);

  res.redirect("/files");
};

export { createFile };
