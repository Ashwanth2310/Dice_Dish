

function generateRandomMeal() {
    var container = document.getElementById("defaultMealsContainer");
  
    // Clear the container before adding a new meal
    container.innerHTML = '';
  
    // Gets random meal data from the API
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(response => response.json())
      .then(data => {
        var meal = data.meals[0];
  
        // Gets only ingredients from the meal object
        var ingredients = getIngredientsHTML(meal);
        var html = `
          <div class="meal-container">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h2>${meal.strMeal}</h2>
          </div>
        `;
        
        
  
        // Append the meal to the default meals container
        container.innerHTML += html;
      })
      .catch(error => console.error("Error fetching random meal:", error));
  }
  
  document.addEventListener("click", function (event) {
    var modal = document.getElementById("modal");
  
    // Check if the click is outside the modal content
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
  function updateGroupContainers(meals, containerSelector) {
    var containers = document.querySelectorAll(containerSelector);
  
    containers.forEach((container, index) => {
      if (meals && meals[index]) {
        var meal = meals[index];
        container.querySelector(".cat-2-1-icon").src = meal.strMealThumb;
        container.querySelector(".name-of-dish").textContent = meal.strMeal;
        container.style.display = "block"; // Show the container for search result
      } else {
        // Reset the container if there is no corresponding meal data
        container.querySelector(".cat-2-1-icon").src = "";
        container.querySelector(".name-of-dish").textContent = "Name of Dish";
        container.style.display = "none"; // Hide the container if there's no search result
      }
    });
  }
  
  function displaySearchResults(meals) {
    var searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = "";
  
    meals.forEach(meal => {
      var resultContainer = document.createElement("div");
      resultContainer.classList.add("search-result");
  
      resultContainer.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <p>${meal.strMeal}</p>
      `;
  
      // Add a click event listener to each result item
      resultContainer.addEventListener("click", function () {
        // its to create and display a modal similar to the one for "generate random meal"
        openModal(meal);
      });
  
      searchResultsContainer.appendChild(resultContainer);
    });
  }
  
  // Function to open a modal with the given meal data
  function openModal(meal) {
    var modal = document.getElementById("modal");
    var modalContent = document.querySelector(".modal-content");
  
    // Create HTML for modal content
    var html = `
      <div class="left-content">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      </div>
      <div class="right-content">
        <h2>${meal.strMeal}</h2>
        <p>Ingredients:</p>
        <ul>${getIngredientsHTML(meal)}</ul>
        <a href="meal-details.html?mealId=${meal.idMeal}" target="_blank" class="view-instructions-link">View Instructions</a>
      </div>
    `;
  
    // Update modal content with information
    modalContent.innerHTML = html;
  
    // Show the modal
    modal.style.display = "flex";
  }
  
  // Function to generate HTML for ingredients
  function getIngredientsHTML(meal) {
    var ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      } else {
        break;
      }
    }
    return ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
  }
  
  function searchMeals() {
    var searchInput = document.getElementById("searchInput").value;
  
    if (!searchInput) {
      alert("Please enter a search term.");
      return;
    }
  
    var apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        var meals = data.meals;
  
        if (!meals) {
          alert("No meals found. Be more specific.");
          return;
        }
  
        // Update group containers with search results
        updateGroupContainers(meals, ".rectangle-group");
  
        // Display search results
        displaySearchResults(meals);
      })
      .catch(error => console.error("Error fetching search results:", error));
  }
  
  function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
      searchMeals();
    }
  }
  
  document.getElementById("searchInput").addEventListener("keypress", handleSearchKeyPress);
  