const process = require("process");
const fs = require("fs");
const axios = require("axios");

const cat = (path, out) => {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
		}
		handleOutput(data, out);
	});
};

const webCat = async (url, out) => {
	try {
		const response = await axios.get(url);
		handleOutput(response.data, out);
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
	}
};

const handleOutput = (text, out) => {
	if (out) {
		fs.writeFile(out, text, "utf8", (err) => {
			if (err) {
				console.error(`Couldn't write ${out}: ${err}`);
				process.exit(1);
			}
		});
	} else {
		console.log(text);
	}
};

let out;
let path;

if (process.argv[2] === "--out") {
	out = process.argv[3];
	path = process.argv[4];
} else {
	path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
	webCat(path, out);
} else {
	cat(path, out);
}
