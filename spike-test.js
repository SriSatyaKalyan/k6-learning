import http from "k6/http";
import { sleep } from "k6";

export const options = {
	stages: [
		{
			//starting from 0 to 10 users in 10 seconds
			duration: "10s",
			target: 10,
		},
		{
			//stay at 10 users for 40 seconds
			duration: "30s",
			target: 100,
		},
		{
			//spike testing- sudden increase to 500 users
			duration: "10s",
			target: 500,
		},
		{
			//down from 10 to 0 users in 10 seconds
			duration: "10s",
			target: 0,
		},
	],
};

export default function () {
	http.get("https://quickpizza.grafana.com/test.k6.io/");
	sleep(1); // wait 1 second between requests
	http.get("https://quickpizza.grafana.com/contacts.php");
	sleep(2); // wait 1 second between requests
}
