import { sleep } from "k6";
import http from "k6/http";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
	vus: 5,
	duration: "5s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
	},
};

export default function () {
	// having more VUs will result in having same credentials - so the below is bad practice
	// const credentials = {
	// 	username: "test_" + Date.now(),
	// 	password: "secret_" + Date.now(),
	// };

	// So, using a randomString is better
	const credentials = {
		username: "test_" + randomString(8),
		password: "secret_" + randomString(4),
	};

	console.log(credentials);
	// http.get("http://localhost:8000/public/crocodiles");
	sleep(2);
}
