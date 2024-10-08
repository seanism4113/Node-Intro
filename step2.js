const process = require("process");
const fs = require("fs");
const axios = require("axios");

const cat = (path) => {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.log(`Error reading ${path}: ${err}`);
		}
		console.log(data);
	});
};

const webCat = async (url) => {
	try {
		const response = await axios.get(url);
		console.log(response.data);
	} catch (err) {
		console.log(`Error fetching ${url}: ${err}`);
	}
};

const path = process.argv[2];

if (path.slice(0, 4) === "http") {
	webCat(path);
} else {
	cat(path);
}
