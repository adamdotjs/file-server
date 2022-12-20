import soap from "soap";

const readAttachment = async (key) => {
  const url = `${process.env.BASE_URL}/AttachmentService?wsdl`;
  const args = { in0: key };

  const client = await soap.createClientAsync(url);
  client.setSecurity(
    new soap.BasicAuthSecurity(process.env.AUTH_USER, process.env.AUTH_PW)
  );

  const response = await client.getAttachmentFromKeyAsync(args);
  return response[0].out;
};

export { readAttachment };
