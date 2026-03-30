fetch('recipes.json')
    .then(response => response.json())
    .then(data => {
        displayRecipes(data.recipes);
    })
    .catch(error => console.error('Error loading recipes:', error));

// Function to display recipes
function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    
    recipes.forEach(recipe => {
        const recipeHTML = `
            <article class="recipe-card">
                <h2>${recipe.navn}</h2>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.tid}</span>
                    <span>🍽️ Servings: ${recipe.serveringer}</span>
                </div>
                
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredienser.map(ingredienser => `<li>${ingredienser}</li>`).join('')}
                </ul>
                
                <h3>Instructions:</h3>
                <ol>
                    ${recipe.instruksjoner.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </article>
        `;
        
        container.innerHTML += recipeHTML;
    });
}