import { sleep } from "k6";
import http from "k6/http";

export const options = {
	// vus: 5,
	// duration: "5s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
	},
};

export default function () {
	// k6 run --http-debug="full" -e BASE_URL="http://localhost:8000" env-vars.js
	console.log(__ENV.BASE_URL);
	http.get(__ENV.BASE_URL + "/public/crocodiles");
	// http.get(`${__ENV.BASE_URL}/public/crocodiles`);
	sleep(0);
}
