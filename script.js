const accounts = [
  { id: 1, name: "M-PESA", currency: "KES", balance: 120000 },
  { id: 2, name: "STANBIC_KE", currency: "KES", balance: 90000 },
  { id: 3, name: "NCBA_KE", currency: "KES", balance: 150000 },
  { id: 4, name: "CHICAGO_US", currency: "USD", balance: 1000 },
  { id: 5, name: "NEVADA_BANK", currency: "USD", balance: 2000 },
  { id: 6, name: "TEXAS_US", currency: "USD", balance: 500 },
  { id: 7, name: "LAGOS_NG", currency: "NGN", balance: 500000 },
  { id: 8, name: "ABUJA_BANK", currency: "NGN", balance: 250000 },
  { id: 9, name: "FEDO_CNK", currency: "NGN", balance: 150000 },
  { id: 10, name: "EBUR_NGN", currency: "NGN", balance: 300000 }
];

const accountList = document.getElementById("account-list");
const fromSelect = document.getElementById("from-account");
const toSelect = document.getElementById("to-account");

function renderAccounts() {
  accountList.innerHTML = "";
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  accounts.forEach(account => {
    const item = document.createElement("p");
    item.textContent = `${account.name} - ${account.currency} ${account.balance.toLocaleString()}`;
    accountList.appendChild(item);

    const option1 = document.createElement("option");
    option1.value = account.id;
    option1.textContent = account.name;
    fromSelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = account.id;
    option2.textContent = account.name;
    toSelect.appendChild(option2);
  });
}

renderAccounts();



const filterAccount = document.getElementById("filter-account");
const filterCurrency = document.getElementById("filter-currency");

// Populate filter dropdown
function renderFilterOptions() {
  filterAccount.innerHTML = `<option value="">-- All --</option>`;
  accounts.forEach(acc => {
    const opt = document.createElement("option");
    opt.value = acc.name;
    opt.textContent = acc.name;
    filterAccount.appendChild(opt);
  });
}




const form = document.getElementById("transfer-form");
const amountInput = document.getElementById("amount");
const noteInput = document.getElementById("note");
const logTable = document.getElementById("log-entries");

const logs = [];

// Handle transfers
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const fromId = parseInt(fromSelect.value);
  const toId = parseInt(toSelect.value);
  const amount = parseFloat(amountInput.value);
  const note = noteInput.value;

  if (fromId === toId) {
    alert("Cannot transfer to the same account.");
    return;
  }

  const fromAccount = accounts.find(acc => acc.id === fromId);
  const toAccount = accounts.find(acc => acc.id === toId);

  // FX Conversion — basic static rate logic
  const rates = {
    KES: { USD: 1 / 135, NGN: 1 / 7 },
    USD: { KES: 135, NGN: 1000 },
    NGN: { USD: 1 / 1000, KES: 7 },
  };

  let convertedAmount = amount;

  if (fromAccount.currency !== toAccount.currency) {
    const rate = rates[fromAccount.currency][toAccount.currency];
    if (!rate) {
      alert("FX conversion not supported between these currencies.");
      return;
    }
    convertedAmount = amount * rate;
  }

  // Balance check
  if (amount > fromAccount.balance) {
    alert("Insufficient balance.");
    return;
  }

  // Perform transfer
  fromAccount.balance -= amount;
  toAccount.balance += convertedAmount;

  // Log transaction
  const now = new Date().toLocaleString();
  const transferDate = document.getElementById("transfer-date").value;
  const dateDisplay = transferDate ? `Scheduled: ${transferDate}` : `Now: ${now}`;

  logs.push({
    from: fromAccount.name,
    to: toAccount.name,
    originalAmount: amount,
    convertedAmount: convertedAmount.toFixed(2),
    currency: `${fromAccount.currency} → ${toAccount.currency}`,
    note,
    time: dateDisplay
  });

  // Update UI
  renderAccounts();
  renderLogs();
  form.reset();
});

function renderLogs() {
  const selectedAccount = filterAccount.value;
  const selectedCurrency = filterCurrency.value;

  logTable.innerHTML = "";

  const filtered = logs.filter(log => {
    const matchesAccount =
      !selectedAccount || log.from === selectedAccount || log.to === selectedAccount;
    const matchesCurrency =
      !selectedCurrency || log.currency.includes(selectedCurrency);
    return matchesAccount && matchesCurrency;
  });

  filtered.forEach(log => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${log.from}</td>
      <td>${log.to}</td>
      <td>${log.convertedAmount}</td>
      <td>${log.currency}</td>
      <td>${log.note}</td>
      <td>${log.time}</td>
    `;
    logTable.appendChild(row);
  });
}


filterAccount.addEventListener("change", renderLogs);
filterCurrency.addEventListener("change", renderLogs);
renderFilterOptions();

