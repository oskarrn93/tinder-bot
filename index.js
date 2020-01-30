import selenium from 'selenium-webdriver'
import chromedriver from 'chromedriver'
import require from 'requirejs'
const chrome = require('selenium-webdriver/chrome')

const TIMEOUT_IN_MS = 1500
const CHROME_REMOTE_DEBUG_PORT = 9222

const { until, By } = selenium

const likeButtonXPath = By.xpath(`//*[@id="content"]/div/div[1]/div/main/div[1]/div/div/div[1]/div/div[2]/button[3]`)

const getRandomTimeoutBetweenClicks = timeout => {
  return Math.random() * timeout + timeout / 2 //[0,1] * 1500 + 750, fastest = 750ms, slowest = 2250ms
}

const getDriver = () => {
  //attach to existing running chrome instance where we are already logged in to Tinder
  const options = new chrome.Options()
  options.options_['debuggerAddress'] = `localhost:${CHROME_REMOTE_DEBUG_PORT}`

  chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())
  const driver = new selenium.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()
  return driver
}

// perform throttled swiping right / liking on Tinder
const clickLikeButton = async driver => {
  return new Promise(resolve =>
    setTimeout(async () => {
      await driver.wait(until.elementLocated(likeButtonXPath), 5000)
      driver.findElement(likeButtonXPath).click()
      resolve()
    }, getRandomTimeoutBetweenClicks(TIMEOUT_IN_MS)),
  )
}

const main = async () => {
  const driver = getDriver()
  driver.get('https://tinder.com/')

  let NUMBER_OF_LIKES_PERFORMED = 0
  while (true) {
    await clickLikeButton(driver)
    NUMBER_OF_LIKES_PERFORMED++
    console.log(`Number of likes performed ${NUMBER_OF_LIKES_PERFORMED}`)
  }
}

main()
