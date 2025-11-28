import { check, sleep, groups, group } from "k6";
import http from "k6/http";

export const options = {
	thresholds: {
		http_req_duration: ["p(95)<60"],
		"group_duration{group:::Main Page}": ["p(95)<250"],
		"group_duration{group:::Main Page::Assets}": ["p(95)<150"],
	},
};

export default function () {
	group("Main Page", function () {
		let res = http.get("https://quickpizza.grafana.com/test.k6.io/");
		check(res, {
			"status is 200": (r) => r.status === 200,
		});

		// sub group
		group("Assets", function () {
			// requesting assets
			http.get(
				"https://quickpizza.grafana.com/test.k6.io/static/css/site.css"
			);
		});
	});

	group("News Page", function () {
		http.get("https://quickpizza.grafana.com/news.php");
	});

	sleep(1);
}
