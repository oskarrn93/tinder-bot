# tinder-bot

Written in NodeJS and it is using Selenium together with Google Chrome.


## How to use it

### Start Google Chrome with remote debug port by running the command 

```sh
npm run chrome
``` 
or 
```sh
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/selenium
```

Then proceed to login into Tinder and make sure you are logged in, this script will not handle the login part.

Keep this shell running

### Start the script by running the command

In a seperate shell

```sh
npm run start
``` 
or 
```sh
node index.js
```

This will keep on running until something breaks :) 

Exit the script by using `ctrl + c`
