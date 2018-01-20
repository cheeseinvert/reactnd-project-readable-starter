const AUTH_TOKEN = "myAuthToken";
const SERVER_URL = "http://localhost:3001";

export function capitalize(str = "") {
  return typeof str !== "string" ? "" : str[0].toUpperCase() + str.slice(1);
}

// RFC4122 version 4 compliant uuid generator
export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  // Pad the day, month, minutes and seconds with leading zeros, if required
  date = (date < 10 ? "0" : "") + date;
  month = (month < 10 ? "0" : "") + month;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;
  var time = `${hour}:${min}:${sec} ${month} ${date}, ${year}`;
  return time;
}

export function doHttpGet(url) {
  return fetch(`${SERVER_URL}/${url}`, {
    headers: {
      Authorization: AUTH_TOKEN
    }
  }).then(res => res.json());
}

export function doHttpPost(url, data) {
  //console.log(`data is ${JSON.stringify(data)}`)
  return fetch(`${SERVER_URL}/${url}`, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data),
    headers: {
      Authorization: AUTH_TOKEN,
      "Content-Type": "application/json"
    }
  }).then(res => res.json()); //
  // .catch(error => console.error('Error:', error))
  // .then(response => console.log('Success:', response));
}

export function doHttpPut(url, data) {
  return fetch(`${SERVER_URL}/${url}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: AUTH_TOKEN,
      "Content-Type": "application/json"
    }
  }).then(res => res.json()); //
  // .catch(error => console.error('Error:', error))
  // .then(response => console.log('Success:', response));
}

export function doHttpDelete(url) {
  return fetch(`${SERVER_URL}/${url}`, {
    method: "DELETE",
    headers: {
      Authorization: AUTH_TOKEN
    }
  }).then(res => res.json()); //
  // .catch(error => console.error('Error:', error))
  // .then(response => console.log('Success:', response));
}
