document.addEventListener("DOMContentLoaded", function () {
    // Get parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('mealId');
  
    if (mealId) {
      // Fetch meal details using the mealId
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
          const meal = data.meals[0];
  
          // Update content on the page
          document.getElementById("mealName").textContent = meal.strMeal;
          document.getElementById("mealImage").src = meal.strMealThumb;

  
          // Display instructions
          document.getElementById("mealInstructions").textContent = meal.strInstructions;
  
          // Display YouTube video if available
          // const youtubeContainer = document.getElementById("youtubeContainer");
          // if (meal.strYoutube) {
          //   const youtubeVideo = document.getElementById("youtubeVideo");
          //   const youtubeUrl = `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`;
          //   youtubeVideo.src = youtubeUrl;
          //   youtubeContainer.style.display = "block"; // Show the YouTube container
          // }
        })
        .catch(error => console.error("Error fetching meal details:", error));
    }
  });
  