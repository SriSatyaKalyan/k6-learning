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
	const credentials = {
		username: "test_" + "189", // + Date.now(),
		password: "test",
	};

	const body = JSON.stringify(credentials);

	const params = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// let res = http.post("http://localhost:8000/user/register/", body, params);
	let res = http.post(
		"http://localhost:8000/auth/token/login/",
		body,
		params
	);

	const accessToken = res.json().access;
	console.log("The accessToken is: " + accessToken);

	http.get("http://localhost:8000/my/crocodiles/", {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	const newCrocInfo = JSON.stringify({
		name: "croc_" + Date.now(),
		sex: "F",
		date_of_birth: "1986-02-05",
	});

	res = http.post("http://localhost:8000/my/crocodiles/", newCrocInfo, {
		headers: {
			Authorization: "Bearer " + accessToken,
			"Content-Type": "application/json",
		},
	});

	console.log("The id is: " + res.json().id);
	let crocId = res.json().id;

	res = http.get(`http://localhost:8000/my/crocodiles/${crocId}`, {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	check(res, {
		"status is 200": (r) => r.status === 200,
		"croc is a croc": (r) => r.json().name.includes("croc"),
	});

	res = http.put(
		`http://localhost:8000/my/crocodiles/${crocId}/`,
		JSON.stringify({
			name: "croc_" + "newAddition",
			sex: "F",
			date_of_birth: "1986-02-10",
		}),
		{
			headers: {
				Authorization: "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
		}
	);

	check(res, {
		"status is 200": (r) => r.status === 200,
		"croc is a croc": (r) => r.json().name.includes("newAddition"),
	});

	res = http.patch(
		`http://localhost:8000/my/crocodiles/${crocId}/`,
		JSON.stringify({
			sex: "M",
		}),
		{
			headers: {
				Authorization: "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
		}
	);

	check(res, {
		"status is 200": (r) => r.status === 200,
		"croc is a croc": (r) => r.json().name.includes("newAddition"),
	});

	res = http.del(`http://localhost:8000/my/crocodiles/${crocId}/`, null, {
		headers: {
			Authorization: "Bearer " + accessToken,
			"Content-Type": "application/json",
		},
	});

	check(res, {
		"status is 204": (r) => r.status === 204,
	});
}
