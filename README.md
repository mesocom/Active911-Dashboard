# Active911 Dashboard
 Active911 Recent Alarm Dashboard

Display your Active911 agency's most recent alarm data with mapping information.

## Requirements
- Active911 RSS Code (retrieve from Agency tab on the Active911 website)
- Google Maps API Key


## Setup
- Download your agency logo and place it in the main directory as "department_logo.png"
- Configure your agency information JS variables in "main.js"
- Insert your Active911 code in the "active_pull.py" script
- Configure the Python script to run as desired (via Cron, task scheduler, system service, etc.)
- Set up your desired local web server to serve the display files (Apache, PHP, etc.)

For example, if running this software on a Raspberry Pi, one might use Apache to serve the files, a system service to run the active_pull script at the desired update interval (i.e. 10 seconds), and Chromium in kiosk mode to display the page.


### __This software is still under development. Suggestions and changes are welcome.__
