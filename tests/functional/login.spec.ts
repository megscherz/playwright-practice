import { test, expect } from "@playwright/test";
import { before } from "node:test";

test.describe("Login functionality", () => {
  test.beforeEach("Go to login page", async ({ page }) => {
    // launch URL and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page).toHaveURL(
      "https://katalon-demo-cura.herokuapp.com/profile.php#login",
    );
  });

  test("Should login successfully", async ({ page }) => {
    // login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should prevent login with incorrect credentials", async ({ page }) => {
    // login
    await page.getByLabel("Username").fill("John Smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
