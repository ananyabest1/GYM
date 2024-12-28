// Base URL of your backend server
const BASE_URL = "http://localhost:6500";

// Fetch available batches and populate the dropdown
document.addEventListener("DOMContentLoaded", async () => {
  const batchDropdown = document.getElementById("batch");

  try {
    const response = await fetch(`${BASE_URL}/api/batches`);
    if (!response.ok) throw new Error("Failed to fetch batches");
    const batches = await response.json();

    // Populate the batch dropdown
    batches.forEach((batch) => {
      const option = document.createElement("option");
      option.value = batch.id; // Use batch ID for value
      option.textContent = batch.name; // Use batch name for display
      batchDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching batches:", error);
    const warning = document.getElementById("batchWarning");
    warning.textContent = "Failed to load batches. Please try again later.";
  }
});

// Handle form submission for registration
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Collect form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    password: document.getElementById("password").value,
    batchId: document.getElementById("batch").value,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      document.getElementById("paymentStatus").textContent = "Registration successful!";
      document.getElementById("paymentStatus").className = "success";
      registrationForm.reset();
    } else {
      throw new Error(result.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    document.getElementById("paymentStatus").textContent = error.message;
    document.getElementById("paymentStatus").className = "error";
  }
});

// Admin Feature: View unpaid fees
document.getElementById("viewUnpaid").addEventListener("click", async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/unpaid`);
    if (!response.ok) throw new Error("Failed to fetch unpaid fees");
    const unpaidUsers = await response.json();

    const output = unpaidUsers
      .map((user) => `${user.name} (${user.email}) owes $${user.amountDue}`)
      .join("\n");

    document.getElementById("bonusOutput").textContent = output || "No unpaid fees.";
  } catch (error) {
    console.error("Error fetching unpaid fees:", error);
    document.getElementById("bonusOutput").textContent = "Failed to fetch unpaid fees.";
  }
});

// Admin Feature: Calculate outstanding dues
document.getElementById("calculateDues").addEventListener("click", async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/dues`);
    if (!response.ok) throw new Error("Failed to calculate dues");
    const dues = await response.json();

    const output = dues
      .map((user) => `${user.name} (${user.email}) owes $${user.totalDue}`)
      .join("\n");

    document.getElementById("bonusOutput").textContent = output || "No outstanding dues.";
  } catch (error) {
    console.error("Error calculating dues:", error);
    document.getElementById("bonusOutput").textContent = "Failed to calculate dues.";
  }
});
