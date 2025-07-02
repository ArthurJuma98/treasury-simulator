# 💸 Treasury Movement Simulator

A simple web-based tool that simulates treasury workflows for moving funds between multiple virtual accounts in different currencies.

---

## 🚀 Live Demo

🔗 [Click here to view the live app](https://transcendent-valkyrie-85c1ee.netlify.app/)

---

## 📦 Features

- 💰 View 10 virtual accounts with balances in **KES, USD, and NGN**
- 🔄 Transfer money between accounts with:
  - Amount and optional note
  - Validation for sufficient source balance
- 💱 FX conversion for cross-currency transfers using static rates
- 📋 Real-time transaction log (with timestamp and notes)
- 🔍 Filter transactions by **account** or **currency**
- 🗓️ Optional **future-dated transfers** (UI only, no logic)

---

## 🧠 Assumptions

- FX Rates are hardcoded:
  - 1 USD = 135 KES
  - 1 USD = 1000 NGN
  - 1 NGN = 0.135 KES
- All data is stored in the browser memory (no backend)
- Future-dated transfers are for demonstration purposes only
- Built using **vanilla HTML, CSS, and JavaScript**

---

## 🖥️ How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/ArthurJuma98/treasury-simulator.git

# 2. Open the folder
cd treasury-simulator

# 3. Open index.html in a browser
