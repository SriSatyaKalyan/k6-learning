import { check, sleep } from "k6";
import http from "k6/http";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { SharedArray } from "k6/data";

const userCredentials = new SharedArray("users with creds", function () {
	return JSON.parse(open("./users.json")).users;
});

console.log(userCredentials);

// export const options = {
// 	vus: 5,
// 	duration: "5s",
// 	thresholds: {
// 		http_req_duration: ["p(95)<60"],
// 	},
// };

export default function () {
	const randCred = randomItem(userCredentials);

	userCredentials.forEach((item) => {
		const credentials = {
			username: item.username,
			password: item.password,
		};

		let res = http.post(
			"http://localhost:8000/user/register/",
			JSON.stringify(credentials),
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		// sleep(2);

		check(res, {
			"status is 201": (r) => r.status === 201,
		});
	});

	let res = http.post(
		"http://localhost:8000/auth/token/login/",
		JSON.stringify({
			username: randCred.username,
			password: randCred.password,
		}),
		{
			headers: { "Content-Type": "application/json" },
		}
	);

	sleep(2);
	check(res, {
		"status is 200": (r) => r.status === 200,
		"has access token": (r) => r.json() != undefined,
	});

	const accessToken = res.json().access;
	console.log(`Access token: ${accessToken}`);
}
