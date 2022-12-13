const updateFile = async (req, res) => {
	try {
		res.status(200).send("Delete a file");
	} catch (error) {
		res.status(400).send("An error occured");
	}
};

export { updateFile };
