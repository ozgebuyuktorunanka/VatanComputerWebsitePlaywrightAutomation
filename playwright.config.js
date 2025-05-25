import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

//** 📄 For detailed configuration, check -----> configSummary.md
// 🌍 Environmental Variable.
// 📌 `.env` file set
dotenv.config({
    path: `.env`,
    override: true,
});

// 🖥️ Headless mode (always true)
const headless = false;

// 📌 Use `globalSetup` and `globalTeardown` in UI tests, remove them in API tests
const globalSetup = "./tests/globalFiles/globalSetup.js";
const globalTeardown = "./tests/globalFiles/globalTeardown.js";

// 📌 This module exports browser settings for various web browsers including Chromium, 
// Firefox, WebKit, and Edge. Each setting is configured with device specifications and the option 
// to run in headless mode.
const browserSettings = {
    chromium: { ...devices["Desktop Chrome"], browserName: "chromium", headless },
    firefox: { ...devices["Desktop Firefox"], browserName: "firefox", headless },
    webkit: { ...devices["Desktop Safari"], browserName: "webkit", headless },
    edge: { ...devices["Desktop Edge"], browserName: "chromium", channel: "msedge", headless },
};

// 📌This module defines common settings for browser automation, 
// including viewport dimensions, download acceptance, tracing options, 
// screenshot settings, and timeouts for actions and navigation.
const commonSettings = {
    viewport: { width: 1680, height: 900 },
    acceptDownloads: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 45000, // Action timeout
    navigationTimeout: 90000, // Navigation timeout
};

export default defineConfig({
    testDir: "./tests", // 📌 RootDir for Test Spec JS
    testMatch: ["**/*.spec.js"],
    headless:headless,
    // 🌐 Parallel Tests ve CI/CD settings
    fullyParallel: false,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : undefined,
    maxFailures: process.env.CI ? 75 : undefined,
    reporter: [
        ["list"],
        ["html", { open: "never" }],
        ["allure-playwright"]
    ],
    use: {
        headless,
        args: ["--use-gl=egl", "--disable-web-security"],
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [
        {
            name: "chromium",
            use: {
                ...browserSettings.chromium,
                ...commonSettings,
            },
        }, /*
        {
            name: 'edge',
            use: {
                ...browserSettings.edge,
                ...commonSettings
            }
        },
       
        {
            name: 'webkit',
            use: {
                ...browserSettings.webkit,
                ...commonSettings }
        },
        {
            name: 'firefox',
            use: {
                ...browserSettings.firefox,
                ...commonSettings
            }
        },*/
    ],
});
