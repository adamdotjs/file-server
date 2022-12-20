import soap from "soap";

const createAttachment = async (key, file) => {
  const url = `${process.env.BASE_URL}/AttachmentService?wsdl`;
  const args = {
    in0: "InventoryItem",
    in1: key,
    in2: file.fieldname,
    in3: {
      content: file.buffer.toString("base64"),
      fileExtension: file.mimetype.split("/")[1],
      mimeType: file.mimetype,
      name: file.originalname,
    },
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );

  const response = await client.addAttachmentAsync(args);
  return response[0].out;
};

export { createAttachment };
