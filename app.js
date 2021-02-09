
// function to show Searched foods

function getSearchResults() {
   
    const getSearchBoxInput = document.getElementById("searchBoxInput").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getSearchBoxInput}`)
        .then(res => res.json())
        .then(data => {
            data.meals.forEach(foodItem => {
                const foodName = foodItem.strMeal;
                const foodImage = foodItem.strMealThumb;
                const foodID = foodItem.idMeal;
                const resultSection = document.createElement('div');
                const result =
                    ` <div class="card shadow rounded " onclick= "displayDetails('${foodID}')" style="width: 18rem;">
                        <img src="${foodImage}" class="card-img-top" alt="Food Thumb">
                        <div class="card-body">
                            <h5 class="card-title">${foodName}</h5>
                        </div>
                    </div> `
                resultSection.innerHTML = result;
                document.getElementById("searchResultSection").appendChild(resultSection);
            });

        })
        .catch(() => {
            const foodStatus = ` <div id="error-box"> <h1 class="text-center" > Sorry!! your searched food is not available now :( <h1> </div>`
            document.getElementById("searchResultSection").innerHTML = foodStatus;
        });

};


// function to show details of CLICKED food-card

function displayDetails(id) {

    document.getElementById('searchResultSection').style.display = "none";
    const searchLink = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
    fetch(`${searchLink}`)
        .then(response => response.json())
        .then(data => {
            const clickedFoodName = data.meals[0].strMeal;
            const clickedFoodImage = data.meals[0].strMealThumb;

            const foodObject = data.meals[0];
            let ingredients = "";
            let measurement = "";
            for (let i = 1; i <= 6; i++) {
                ingredients += `<li> ${foodObject["strIngredient" + i]}</li>`;
            }
            const displaySection = document.createElement('div');
            const foodDetailsCard =
                ` <div class="card shadow rounded " style="width: 25rem;">
                    <img src="${clickedFoodImage}" class="card-img-top" alt="Food Thumb">
                    <div class="card-body">
                        <h4 class="card-title">${clickedFoodName}</h4><br>
                        <h6> Ingredients </h6>
                        <ul>${ingredients}</ul>
                    </div>
                    </div> `
            displaySection.innerHTML = foodDetailsCard;
            document.getElementById("clickedFoodDetailsSection").appendChild(displaySection);

        })
}