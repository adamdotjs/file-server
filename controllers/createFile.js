import soap from "soap";

const url = `http://${process.env.EPACE_HOST}/rpc/services/ReadObject?wsdl`;

const createFile = async (req, res) => {
  try {
    const client = await soap.createClientAsync(url);
    const result = await client.CreateFile({}, () => {});
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { createFile };
