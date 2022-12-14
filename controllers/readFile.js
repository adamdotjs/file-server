import soap from "soap";

const url = `https://internet:47tig7D@epace.tigerpress.com/rpc/services/ReadObject?wsdl`;

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

const readFile = (req, res) => {
  const args = {
    inventoryItem: {
      id: req.params.id,
    },
  };

  soap.createClient(url, {}, function (err, client) {
    if (client) {
      client.setSecurity(new soap.BasicAuthSecurity("internet", "47tig7D"));
      client.readInventoryItem(args, function (err, result) {
        res.render("file.ejs", { file: result.out });
      });
    } else {
      console.log(err);
    }
  });
};

export { readFiles, readFile };
