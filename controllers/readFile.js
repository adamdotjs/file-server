import soap from "soap";

const url = `http://internet:47tig7D@192.168.1.20/rpc/services/ReadObject?wsdl`;
const auth = "Basic" + Buffer.from("internet:47tig7D").toString("base64");

const readFiles = async (req, res) => {
  const args = {
    name: "readInventoryItem",
    id: req.params.id,
  };
  try {
    const client = await soap.createClientAsync(url);
    const response = await client(args);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send("An error occured");
  }
};

const readFile = async (req, res) => {
  const args = {
    inventoryItem: {
      id: req.params.id,
    },
  };

  soap.createClient(url, {}, function (err, client) {
    client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));
    client.readInventoryItem(args, function (err, result) {
      res.status(200).send(result.out.description);
    });
  });
};

export { readFiles, readFile };
