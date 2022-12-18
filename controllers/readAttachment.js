import soap from "soap";

const url = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/AttachmentService?wsdl`;

const readAttachment = async (key) => {
  const args = { in0: key };

  const client = await soap.createClientAsync(url);
  client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));

  const response = await client.getAttachmentFromKeyAsync(args);
  return response[0].out;
};

export { readAttachment };
