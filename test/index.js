const { Builder, By, Key } = require('selenium-webdriver');
require('chromedriver');

(async function() {
  // Create an instance of the WebDriver
  const driver = await new Builder().forBrowser('chrome').build();

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
    await driver.quit();
  }
})();
