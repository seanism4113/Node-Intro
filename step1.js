const process = require("process");
const fs = require("fs");

const cat = (path) => {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.log(`Error reading ${path}: ${err}`);
		}
		console.log(data);
	});
};

cat(process.argv[2]);
