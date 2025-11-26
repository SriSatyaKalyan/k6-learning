import http from "k6/http";
import { sleep } from "k6";

export const options = {
	stages: [
		{ //starting from 0 to 10 users in 10 seconds
			duration: "5m",
			target: 10,
		},
		{ //stay at 10 users for 40 seconds
			duration: "5h",
			target: 10,
		},
		{ //down from 10 to 0 users in 10 seconds
			duration: "5m",
			target: 0,
		},
	],
};

export default function () {
	http.get("https://quickpizza.grafana.com/test.k6.io/");
	sleep(1); // wait 1 second between requests
	http.get("https://quickpizza.grafana.com/contacts.php");
	sleep(2); // wait 1 second between requests
	http.get("https://quickpizza.grafana.com/news.php");
	sleep(2); // wait 1 second between requests
}
