import http from "k6/http";
import { sleep } from "k6";
import { Counter, Trend } from "k6/metrics";

export const options = {
	vus: 5,
	duration: "5s",
	thresholds: {
		http_req_duration: ["p(95)<60"],
		my_counter: ["count>10"],
		response_time_news_page: ["p(95)<50"],
	},
};

let myCounter = new Counter("my_counter");
let newsPageRespTrend = new Trend("response_time_news_page");

export default function () {
	let res = http.get("https://quickpizza.grafana.com/test.k6.io/");
	myCounter.add(1);
	sleep(1);

	res = http.get("https://quickpizza.grafana.com/news.php");
	newsPageRespTrend.add(res.timings.duration);
	sleep(1);
}
