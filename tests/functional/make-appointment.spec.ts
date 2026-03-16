import { test, expect } from "@playwright/test";

test.describe("Make appointment functionality", () => {
  test.beforeEach("Login and go to appointment page", async ({ page }) => {
    // launch URL and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page).toHaveURL(
      "await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');",
    );

    //Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("should verify make appointment form", async ({ page }) => {
    await expect(page.getByText("Facility")).toBeVisible();
    await page.goto('https://katalon-demo-cura.herokuapp.com/#appointment');
    await expect(page.getByText("Healthcare Program")).toBeVisible();
    await expect(page.getByText("Visit Date (Required)")).toBeVisible();
    await expect(page.getByText("Comment")).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Apply for hospital readmission' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Medicare' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Medicaid' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'None' })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Visit Date (Required)" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Comment" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Book Appointment" })).toBeVisible();
  });

  test("should fill out appointment form", async ({ page }) => {
    await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
    await page.getByRole('radio', { name: 'Medicaid' }).check();
    await page.locator('.input-group-addon').click();
    await page.getByRole('cell', { name: '28' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Comment' }).click();
    await page.getByRole('textbox', { name: 'Comment' }).fill('hello my name is meghan');
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    await expect(page.locator('h2')).toContainText('Appointment Confirmation');
  });

    test("should forget to fill out required visit date", async ({ page }) => {
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    await expect(page.locator('#appointment')).toContainText('Please fill out this field.');
  });
});

//await expect(page.getByLabel('Facility')).toBeVisible();