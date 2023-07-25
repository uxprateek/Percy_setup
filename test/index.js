const { Builder, By, Key } = require('selenium-webdriver');
//require('chromedriver');
const firefox = require('selenium-webdriver/firefox');
const httpServer = require('http-server');

username = process.env.BROWSERSTACK_USERNAME
accessKey = process.env.BROWSERSTACK_ACCESS_KEY
buildName = process.env.JENKINS_LABEL


const server = httpServer.createServer();

const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;

server.listen(PORT);
console.log(`Server is listening on ${TEST_URL}`);

async function cleanup({ driver, server, isError = 0 }) {
  driver && (await driver.quit());
  server && server.close();

  process.exit(isError);
}


/* var capabilities = {
  'bstack:options' : {
    "os" : "Windows",
    "osVersion" : "10",
    "sessionName" : "BStack Build Name: " + buildName,
    "userName" : username,
    "accessKey" : accessKey,
    "seleniumVersion" : "4.0.0",
  },
    "browserName" : "Chrome",
    "browserVersion" : "100.0",
}

var driver = new webdriver.Builder().
  usingServer("https://hub-cloud.browserstack.com/wd/hub").
  withCapabilities(capabilities).
  build();
 */

(async function() {
  // Create an instance of the WebDriver
  //const driver = await new Builder().forBrowser('chrome').build();

  driver = await new Builder()
      .forBrowser('firefox').setFirefoxOptions(
        new firefox.Options().headless()
      ).build();

  try {
    // Open the HTML form
    await driver.get('http://localhost:8000/');

    // Find the form fields and interact with them
    const nameInput = await driver.findElement(By.id('name'));
    await nameInput.sendKeys('John Doe');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('johndoe@example.com');

    const ageInput = await driver.findElement(By.id('age'));
    await ageInput.sendKeys('25');

    const hobbiesInput = await driver.findElement(By.id('hobbies'));
    await hobbiesInput.sendKeys('Reading, Coding, Sports');

    // Submit the form
    const submitButton = await driver.findElement(By.xpath("//input[@type='submit']"));
    await submitButton.click();


    /* const executorConfig = {
        "action": "setSessionStatus",
        "arguments": {
          "status": "Passed",
          "reason": "The test ran successfully"
        }
      };
    await driver.executeScript('browserstack_executor: ' + JSON.stringify(executorConfig));
 */
    // Wait for a few seconds to observe the submitted form or perform further assertions/validation

  } finally {
    // Close the browser
    // await driver.quit();
    await cleanup({ driver, server });
  }
})();
