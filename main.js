

var stationLocation = "Test+Location";
var googleKey = "";
var centerLat = "";
var centerLon = "";
var centerZoomLevel = "";
var lastAlarmID = "";


function alarmColor (d) {
  
  if (d.includes("F/")) {
    return "red";
  }
  
  else if (d.includes("MVA/E")) {
    return "green";
  }
  
  else if (d.includes("MVA")) {
    return "magenta";
  }
  
  else if (d.includes("FR")) {
    return "red";
  }
  
  else if (d.includes("DYSPNEA") || d.includes("ABDMPX") || d.includes("ALM/M")
    || d.includes("SICK") || d.includes("DYSPNEA") || d.includes("Medical")
    || d.includes("FALL") || d.includes("ALLERGY") || d.includes("HEMORRHAGE")
    || d.includes("CARDIAC") || d.includes("SEIZURES") || d.includes("CHEST_PAIN")
    || d.includes("OD") || d.includes("M") || d.includes("ASLT/V")
    || d.includes("SUI/A") || d.includes("FAINTING") || d.includes("DIABETIC")
    || d.includes("UNKMED") || d.includes("BACKPX") || d.includes("TRAUMA")
    || d.includes("STROKE") || d.includes("FULARST") || d.includes("ANMBITE")
    || d.includes("HEADACHE") || d.includes("SHOOT/I") || d.includes("PUBLIC-ASSIST")
    || d.includes("Full Arrest")) {
    return "deepskyblue";
  }
  
  else {
    return "white";
  }
  
}


function updateClock() {
  
  var d = new Date($.now());
  
  var dateString = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()
    + " " + ("0" + d.getHours()).substr(-2) + ":"
    + ("0" + d.getMinutes()).substr(-2) + ":" + ("0" + d.getSeconds()).substr(-2);
  
  $("#clock").text(dateString);
  
}


function updateAlarm() {
  
  // Pull current alarm data
  var active_data = JSON.parse($.ajax({type: "GET", url: "./current_alarms.txt",
    async: false}).responseText);
  
  var alarms = active_data["alarms"];
  
  var i = 0;
  
  // Do nothing if the alarm has not changed
  if (alarms[i]["id"] == lastAlarmID) {
    return false;
  } else {
    lastAlarmID = alarms[i]["id"];
  }
  
  // Set alarm timestamp
  var d = new Date(0);
  d.setUTCSeconds(alarms[i]["stamp"])
  var dateString = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()
    + " " + ("0" + d.getHours()).substr(-2) + ":"
    + ("0" + d.getMinutes()).substr(-2) + ":" + ("0" + d.getSeconds()).substr(-2);
  $("#alarm_time").text(dateString);
  
  // Alarm type
  $("#alarm_type").text(alarms[i]["generic_title"] + " — "
    + alarms[i]["description"]);
  $("#alarm_type").css("color", alarmColor(alarms[i]["description"]));
  
  // Alarm address - filters out alias
  $("#alarm_address").text(alarms[i]["address"].split("alias")[0]);
  $("#alarm_map").attr("src", "https://www.google.com/maps/embed/v1/directions?key=" + googleKey + "&origin="
    + stationLocation + "&destination=" + alarms[i]["lat"] + "+" + alarms[i]["lon"] + "&zoom=" + centerZoomLevel + "&center=" + centerLat + "," + centerLon);
  
  // City code
  $("#alarm_city-code").text(alarms[i]["city"]);
  
  // Place common name (if any)
  $("#alarm_common-name").text(alarms[i]["place"]);
  
  // Time since last alarm
  $("#last_alarm_time").text("Last alarm: " + alarms[i]["pretty_date"]);
  
}


$(document).ready(function() {
  
  updateClock();
  setInterval(updateClock, 1000);
  
  updateAlarm();
  setInterval(updateAlarm, 10000);
  
});
