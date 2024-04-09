// please help me remove redundant code :)
document
  .getElementsByClassName("search-button")[0]
  .addEventListener("click", handleSearch);

async function handleSearch() {
  const input = document.getElementsByClassName("search-input")[0].value.trim();
  if (input !== "") {
    const instructionList =
      document.getElementsByClassName("instruction-list")[0];
    instructionList.innerHTML = "";
    await fetchData(input.toLowerCase());
  } else {
    console.log("Input cannot be empty");
  }
}

async function fetchData(input) {
  const title = document.getElementsByClassName("recipe-title")[0];
  const ingredientList = document.getElementsByClassName("ingredient-list")[0];
  const instructionList =
    document.getElementsByClassName("instruction-list")[0];
  const mealThumb = document.getElementsByClassName("recipe-image")[0];
  const mealVideo = document.getElementsByClassName("meal-video")[0];
  const mealSrc = document.getElementsByClassName("meal-src")[0];
  const category = document.getElementsByClassName("category")[0];
  const area = document.getElementsByClassName("area")[0];

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    const data = response.data;

    if (data && data.meals !== null) {
      console.log("Data found from external API");

      // Display recipe details
      const recipe = data.meals[0];

      title.innerHTML = recipe.strMeal;
      ingredientList.innerHTML = "";
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if (ingredient) {
          const listItem = document.createElement("li");
          listItem.textContent = ingredient;
          ingredientList.appendChild(listItem);
        } else {
          break;
        }
      }

      const steps = recipe.instructions.split("\n");
      steps.forEach((step) => {
        const stepText = step.trim().replace(/^\d+\s*/, "");
        if (stepText !== "") {
          const listItem = document.createElement("li");
          listItem.textContent = stepText;
          instructionList.appendChild(listItem);
        }
      });

      const mealThumbUrl = recipe.strMealThumb;
      const videoThumb = recipe.strYoutube;
      const videoThumbUrl = videoThumb.split("=")[1];
      const newVideoSrc = `https://www.youtube.com/embed/${videoThumbUrl}`;

      mealThumb.src = mealThumbUrl;
      mealVideo.src = newVideoSrc;
      mealSrc.href = recipe.strSource;
      mealSrc.innerHTML = recipe.strSource;
      category.innerHTML = recipe.strCategory;
      area.innerHTML = recipe.strArea;
    } else {
      console.log("Data not found from external API");
      // Fetch data from local server
      const dbResponse = await axios.get(
        `http://127.0.0.1:3000/recipes/${input}`
      );
      const dbData = dbResponse.data;

      console.log(dbData);

      if (dbData) {
        console.log("Data found from local server");

        title.innerHTML = dbData.title;
        ingredientList.innerHTML = "";

        const ingrids = dbData.ingredients.split("\r\n");
        ingrids.forEach((ingrid) => {
          const stepText = ingrid.trim().replace(/^\d+\s*/, "");
          if (stepText !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = stepText;
            ingredientList.appendChild(listItem);
          }
        });

        const steps = dbData.instructions.split("\n");
        steps.forEach((step) => {
          const stepText = step.trim().replace(/^\d+\s*/, "");
          if (stepText !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = stepText;
            instructionList.appendChild(listItem);
          }
        });

        const mealThumbUrl = dbData.thumb;
        const videoThumb = dbData.video;
        const videoThumbUrl = videoThumb.split("=")[1];
        const newVideoSrc = `https://www.youtube.com/embed/${videoThumbUrl}`;

        mealThumb.src = mealThumbUrl;
        mealVideo.src = newVideoSrc;
        mealSrc.href = dbData.source;
        mealSrc.innerHTML = dbData.source;
        category.innerHTML = dbData.category;
        area.innerHTML = dbData.area;
      } else {
        console.log("Error: Recipe not found");
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
