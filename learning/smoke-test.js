import http from "k6/http";
import { sleep } from "k6";

export const options = {
	vus: 1,
	duration: "15s",
};

export default function () {
	http.get("https://quickpizza.grafana.com/test.k6.io/");
	sleep(1); // wait 1 second between requests
	http.get("https://quickpizza.grafana.com/contacts.php");
	sleep(2); // wait 1 second between requests
	http.get("https://quickpizza.grafana.com/news.php");
	sleep(2); // wait 1 second between requests
}
