import { sleep } from "k6";
import http from "k6/http";
import exec from "k6/execution";

export const options = {
	vus: 1,
	duration: "5s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
	},
};

export function setup() {
	console.log("Setup function called");
	let res = http.get("https://quickpizza.grafana.com/some");
	if (res.error) {
		exec.test.abort("Aborting test due to setup failure");
	}
}

export default function () {
	http.get("https://quickpizza.grafana.com/some");
	sleep(0);
}
