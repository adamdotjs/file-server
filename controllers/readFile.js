import soap from "soap";
import { readImage } from "./readImage.js";

const url = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/ReadObject?wsdl`;

// const readFile = (req, res) => {
//   const args = {
//     inventoryItem: {
//       id: req.params.id,
//     },
//   };

//   soap.createClient(url, {}, function (err, client) {
//     if (client) {
//       client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));
//       client.readInventoryItem(args, (err, result) => {
//         const image = readImage(result.out.thumbnail);
//         console.log(image);
//         res.render("file.ejs", { file: result.out, image });
//       });
//     } else {
//       console.log(err);
//     }
//   });
// };

const readFile = async (req, res) => {
  const args = {
    inventoryItem: { id: req.params.id },
  };

  const client = await soap.createClientAsync(url);
  client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));

  const response = await client.readInventoryItemAsync(args);
  const image = await readImage(response[0].out.thumbnail);

  res.render("file.ejs", { file: response[0].out, image });
};

export { readFile };
