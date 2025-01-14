const fetchMeals = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
        const data = await response.json();
        displayMeals(data.meals);
        } catch (error) {
        console.error('Error fetching meal data:', error);
    }
};

const displayMeals = (meals) => {
    const mealList = document.querySelector('.mealList');
    mealList.innerHTML = '';

    meals.forEach(meal => {
        const ingredients = getIngredients(meal);
        const mealCard = document.createElement('div');
        mealCard.classList.add('mealContent');

        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strInstructions.substring(0, 150)}...</p>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')} 
            </ul>
            <a href="${meal.strYoutube}" target="_blank">
            <button>Watch Video</button>
            </a>
        `

        mealList.appendChild(mealCard);
    });

}

const getIngredients = (meal) =>{
    let ingredients = [];
    for (let i = 1; i <= 5; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
    }
    return ingredients;
}
fetchMeals();
