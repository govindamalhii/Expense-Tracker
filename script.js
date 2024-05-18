const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table');
const expenseTableBody = expenseTable.getElementsByTagName('tbody')[0];

// Function to create a new table row for an expense
function createExpenseRow(expense) {
  const row = document.createElement('tr');
  const amountCell = document.createElement('td');
  amountCell.textContent = expense.amount.toFixed(2); // Format amount with two decimal places
  row.appendChild(amountCell);

  const categoryCell = document.createElement('td');
  categoryCell.textContent = expense.category;
  row.appendChild(categoryCell);

  const dateCell = document.createElement('td');
  const formattedDate = new Date(expense.date).toLocaleDateString(); // Format date for user's locale
  dateCell.textContent = formattedDate;
  row.appendChild(dateCell);

  // Optional action column (e.g., delete button)
  const actionCell = document.createElement('td');
  actionCell.classList.add('action');  // Add class for styling
  // Implement logic for a delete button or functionality here
  row.appendChild(actionCell);

  return row;
}

// Function to handle form submission and add new expense
function handleAddExpense(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  // Basic validation (optional)
  if (!amount || !category || !date) {
    alert('Please fill in all fields.');
    return;
  }

  const newExpense = { amount, category, date };

  // Store expenses in local storage (consider using a database for persistence)
  let expenses = [];
  if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
  }
  expenses.push(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Add new row to the table
  const newRow = createExpenseRow(newExpense);
  expenseTableBody.appendChild(newRow);

  // Clear the form for new entries
  expenseForm.reset();
}

// Add event listener for form submission
expenseForm.addEventListener('submit', handleAddExpense);

// Function to load existing expenses from local storage (optional)
function loadExpenses() {
  let expenses = [];
  if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
  }

  for (const expense of expenses) {
    const newRow = createExpenseRow(expense);
    expenseTableBody.appendChild(newRow);
  }
}

// Call loadExpenses on page load to display any existing data
loadExpenses();
