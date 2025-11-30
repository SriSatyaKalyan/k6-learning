import { sleep } from "k6";
import http from "k6/http";

export const options = {
	vus: 5,
	duration: "5s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
	},
};

export default function () {
	http.get("http://localhost:8000/public/crocodiles");
	sleep(0);
}
