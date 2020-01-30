import selenium from 'selenium-webdriver'
import chromedriver from 'chromedriver'
import require from 'requirejs'
const chrome = require('selenium-webdriver/chrome')

const { until, By } = selenium

const options = new chrome.Options()
options.options_['debuggerAddress'] = 'localhost:9222'

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

const driver = new selenium.Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build()
// .withCapabilities(selenium.Capabilities.chrome())

const TIMEOUT_IN_MS = 1500

const likeButtonXPath = By.xpath(`//*[@id="content"]/div/div[1]/div/main/div[1]/div/div/div[1]/div/div[2]/button[3]`)

const clickLikeButton = async () => {
  console.log('creating promise')
  return new Promise(resolve =>
    setTimeout(async () => {
      console.log('waiting for like button')
      await driver.wait(until.elementLocated(likeButtonXPath), 5000)
      driver.findElement(likeButtonXPath).click()
      console.log('clicked like button')
      resolve()
    }, TIMEOUT_IN_MS),
  )
}
const main = async () => {
  driver.get('https://tinder.com/')

  while (true) {
    await clickLikeButton()
  }
}

main()
