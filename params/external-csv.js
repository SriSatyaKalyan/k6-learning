import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

const userCreds = new SharedArray("external csv data", function () {
	// header:true is to mention that there is a header row in the CSV file
	return papaparse.parse(open("./users.csv"), { header: true }).data;
});

// console.log(userCreds);

export default function () {
	userCreds.forEach((item) => {
		console.log(item.username, item.password);
	});
}
