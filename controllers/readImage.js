import soap from "soap";

const url = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/AttachmentService?wsdl`;

// const readImage = (key) => {
//   const args = {
//     in0: key,
//   };

//   soap.createClient(url, {}, function (err, client) {
//     if (client) {
//       client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));
//       client.getAttachmentFromKey(args, (err, result) => {
//         console.log(result.out);
//       });
//     } else {
//       console.log(err);
//     }
//   });
// };

const readImage = async (key) => {
  const args = { in0: key };

  const client = await soap.createClientAsync(url);
  client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));

  const response = await client.getAttachmentFromKeyAsync(args);
  return response[0].out;
};

export { readImage };
