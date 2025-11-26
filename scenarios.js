import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";
import exec from "k6/execution";

export const options = {
	vus: 10,
	duration: "5s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
		http_req_duration: ["max<2000"],
		http_req_failed: ["rate<0.01"],
		http_reqs: ["count>20"],
		http_reqs: ["rate>3"],
		vus: ["value>9"],
		checks: ["rate>=0.95"],
	},
};

export default function () {
	const res = http.get(
		"https://quickpizza.grafana.com/test.k6.io/" +
			(exec.scenario.iterationInTest === 1 ? "foo" : "")
	);
	// console.log(exec.scenario.iterationInTest);

	// adding assertions to validate response
	check(res, {
		//status assertion
		"status is 200": (r) => r.status === 200,
		// page text assertion
		"page is startpage": (r) =>
			r.body.includes("Note that this is a shared testing environment"),
	});
	sleep(2);
}
