document.addEventListener("DOMContentLoaded", function() {
  var breadOptions = {
    "White Bread": 2.50,
    "Wheat Bread": 2.50,
    "Italian Herbs & Cheese": 3.00,
    "Honey Oat": 3.00,
    "Parmesan Oregano": 3.50
  };

  var toppingOptions = {
    "Lettuce": 0.50,
    "Tomato": 0.50,
    "Onion": 0.50,
    "Cucumber": 0.50,
    "Bell Pepper": 0.50,
    "Olives": 0.75,
    "Pickles": 0.75,
    "Jalapenos": 0.75,
    "Spinach": 0.75,
    "Avocado": 1.00,
    "Bacon": 1.00,
    "Ham": 1.00,
    "Turkey": 1.00,
    "Chicken": 1.00,
    "Salami": 1.00,
    "Cheese": 1.00
  };

  var subContainer = document.getElementById("sub-container");
  var selectedSubsList = document.getElementById("selected-subs");
  var totalCostElement = document.getElementById("total-cost");
  
  let totalCost = 0;

  function redirect(){
    window.location.href = "checkout.html";
  }

  // Function to calculate the cost of a sub
  function calculateSubCost(subForm) {
    var checkboxes = subForm.querySelectorAll('input[type="checkbox"]:checked');
    let subCost = 0;

    checkboxes.forEach(function(checkbox) {
      var value = checkbox.value;
      subCost += toppingOptions[value];
    });

    var breadRadio = subForm.querySelector('input[name^="bread"]:checked');
    var breadValue = breadRadio.value;
    subCost += breadOptions[breadValue];

    return subCost.toFixed(2);
  }

  // Function to update the total cost and display the selected subs
  function updateTotalCostAndDisplaySubs() {
    totalCost = 0;
    selectedSubsList.innerHTML = "";

    var subForms = document.querySelectorAll(".sub");

    subForms.forEach(function(subForm) {
      var subNameInput = subForm.querySelector('input[name^="sub-name"]');
      var subName = subNameInput.value;

      var subCost = calculateSubCost(subForm);
      totalCost += parseFloat(subCost);

      var listItem = document.createElement("li");
      listItem.textContent = subName + " - $" + subCost;
      selectedSubsList.appendChild(listItem);
    });

    totalCostElement.textContent = "$" + totalCost.toFixed(2);
  }

  /* Event listener for form submission
  document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();*/

    // Store the order details in local storage
    localStorage.setItem("orderDetails", JSON.stringify({
       Name : subName,
       Cost : totalCost
    }))
  });

  // Event listener for checkboxes and select element
  subContainer.addEventListener("change", function(event) {
    if (event.target.matches('input[type="checkbox"]') || event.target.matches("select")) {
      updateTotalCostAndDisplaySubs();
    }
  });
});
