
import json
import urllib.request

agency_code = ""

alarm_data = urllib.request.urlopen("https://access.active911.com/interface/js.php?" + agency_code).read().decode('utf-8')

alarms = alarm_data.split("a91.data=",1)[-1]

alarmFile = open("current_alarms.txt", "w")
alarmFile.write(alarms)
alarmFile.close()

