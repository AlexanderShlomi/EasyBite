const res = await fetch("http://localhost:8081/");
const html = await res.text();

const start = '<script id="_expo-static-error" type="application/json">';
const end = "</script>";
const i = html.indexOf(start);
if (i < 0) {
  console.log("No expo static error tag found. Status:", res.status);
  process.exit(0);
}

const jStart = i + start.length;
const jEnd = html.indexOf(end, jStart);
const json = html.slice(jStart, jEnd);
const data = JSON.parse(json);
const log = data.logs?.[0];
console.log("Status:", res.status);
console.log(log?.message ?? log?.body ?? "(no message)");

