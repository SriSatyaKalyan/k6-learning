import http from "k6/http";
import { sleep } from "k6";

export const options = {
	vus: 1,
	duration: "3s",

	// cloud properties
	// cloud: {
	// 	// Project: Default project
	// 	projectID: 5889142,
	// },
};

export default function () {
	http.get("https://quickpizza.grafana.com/test.k6.io/");
	sleep(1); // wait 1 second between requests
}

// /Users/srisatyakalyankallepalli/Documents/GitHub/k6-learning/learning/first-script.js
