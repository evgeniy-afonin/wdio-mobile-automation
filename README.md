#  WDIO Mobile Automation Framework

This project is a starter template for mobile UI automation on **Android** using:

- **WebDriverIO**
- **Appium**
- **TypeScript**
- **Allure Reporter**
- **Jasmine Framework**

---

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/wdio-mobile-automation.git
cd wdio-mobile-automation
```

2. Install dependencies:
```bash
npm install
```

3. Make sure Appium server is running:
```bash
appium
```

4. Launch your Android emulator or connect a real device.

> ⚠️ The config file (`wdio.conf.ts`) expects a device with `udid: "emulator-5554"`. Adjust if needed.

---

## Run Tests

```bash
npm run wdio
```

---

## 📂 Project Structure

```
.
├── apps/                      # Android .apk file under test
├── test/
│   └── specs/                 # Test scenarios
├── pageobjects/               # Page Object models
├── wdio.conf.ts               # WebdriverIO config file
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project metadata and scripts
└── README.md                  # This file
```

---

## Test Scenarios

### Input Field Test
- Enters text into the `Type something` field.
- Verifies it appears in the `You have typed` section.

### Switch Toggle Test
- Verifies the toggle switch's default text.
- Clicks the switch and validates updated text.

---

## Tech Stack

| Component           | Version     | Purpose                             |
|---------------------|-------------|-------------------------------------|
| WebdriverIO         | ^9.17.0     | Main test automation framework      |
| Appium              | ^2.19.0     | Mobile automation engine            |
| Jasmine             | ^5.1.8      | Test framework                      |
| TypeScript          | ^5.5.3      | Typed JavaScript                    |
| Allure Reporter     | ^9.17.0     | Generate beautiful test reports     |

---

## Allure Reporting

1. Generate the report:
```bash
npx npx allure generate allure-results -o allure-report
```

2. Open the report:
```bash
npx npx allure open allure-report
```


## Notes

- The app under test (`.apk`) is located in the `apps/` directory.
- Framework uses **Jasmine**.
- Page Object Model + Allure steps are already integrated.
- Tests are written in modern **async/await** style.

---