import selenium from 'selenium-webdriver'
import chromedriver from 'chromedriver'
import require from 'requirejs'
const chrome = require('selenium-webdriver/chrome')

const TIMEOUT_IN_MS = 1500
const CHROME_REMOTE_DEBUG_PORT = 9222

const { until, By } = selenium

//attach to existing running chrome instance where we are already logged in to Tinder
const options = new chrome.Options()
options.options_['debuggerAddress'] = `localhost:${CHROME_REMOTE_DEBUG_PORT}`

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

const driver = new selenium.Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build()

const likeButtonXPath = By.xpath(`//*[@id="content"]/div/div[1]/div/main/div[1]/div/div/div[1]/div/div[2]/button[3]`)

const popUpAddTinderToHomeScreen = By.xpath(`//*[@id="modal-manager"]/div/div/div[2]/button[2]`)

const getRandomTimeout = () => {
  return Math.random() * TIMEOUT_IN_MS + TIMEOUT_IN_MS / 2
}
// the pace of clicking the like button is throttled by TIMEOUT_IN_MS
const clickLikeButton = async () => {
  return new Promise(resolve =>
    setTimeout(async () => {
      console.log('waiting for like button')
      try {
        await driver.wait(until.elementLocated(likeButtonXPath), 5000)
        driver.findElement(likeButtonXPath).click()
        console.log('clicked like button')
      } catch (error) {
        driver.findElement(popUpAddTinderToHomeScreen).click()
      }
      resolve()
    }, getRandomTimeout()),
  )
}
const main = async () => {
  driver.get('https://tinder.com/')

  let NUMBER_OF_LIKES_PERFORMED = 0
  while (true) {
    await clickLikeButton()
    NUMBER_OF_LIKES_PERFORMED++
    console.log(`Number of likes performed ${NUMBER_OF_LIKES_PERFORMED}`)
  }
}

main()
