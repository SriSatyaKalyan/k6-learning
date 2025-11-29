import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
	// vus: 5,
	// duration: "5s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
	},
};

export default function () {
	let res = http.get("http://localhost:8000/public/crocodiles/");

	const crocs = res.json();
	console.log(crocs[0]);
	
	const crocId = 7;
	res = http.get(`http://localhost:8000/public/crocodiles/${crocId}`);

	console.log(res.json().name);

	//checks
	check(res, {
		"status is 200": (r) => r.status === 200,
		"croc is sobek": (r) => r.json().name == "Sobek",
	});
}
