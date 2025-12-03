import { sleep } from "k6";
import http from "k6/http";

export const options = {
	vus: 1,
	duration: "3s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
	},
};

console.log(" -- init stage -- ");

export default function (data) {
	console.log(" --VU stage -- ");
	console.log(data);
	sleep(1);
}

export function setup() {
	console.log(" -- setup stage -- ");
	sleep(2);
	const data = { foo: "bar" };
	return data;
}

export function teardown() {
	console.log(" -- teardown stage -- ");
}
