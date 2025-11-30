import { sleep, check } from "k6";
import http from "k6/http";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
	vus: 1,
	duration: "1s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
	},
};

export default function () {
	let res = http.get("http://localhost:8000/public/crocodiles");
	const crocs = res.json();
	const crocId = crocs[0].id;
	const crocIds = crocs.map((item) => item.id);
	console.log(crocIds);

	const randomCrocId = randomItem(crocIds);

	res = http.get(
		"http://localhost:8000/public/crocodiles/" + randomCrocId + "/"
	);
	sleep(4);

	check(res, {
		"status is 200": (r) => r.status === 200,
		"croc has correct ID": (r) => r.json().id === crocId,
	});
}
