import { sleep } from "k6";
import http from "k6/http";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
	vus: 5,
	duration: "20s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
	},
};

export default function () {
	http.get("http://localhost:8000/public/crocodiles");

	console.log("-- VU stage --");
	// sleep(3); // hardcoded sleep - bad for simulation
	sleep(randomIntBetween(1, 5)); // sleep between 1 and 5 seconds. - randomized sleep - better for simulation
}
