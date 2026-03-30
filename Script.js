document.addEventListener('DOMContentLoaded', function() {
    fetch('recipes.json')
        .then(response => response.json())
        .then(data => {
            console.log('Recipes loaded:', data);
            displayRecipes(data.recipes);
        })
        .catch(error => console.error('Error loading recipes:', error));
});

function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    
    recipes.forEach(recipe => {
        const recipeHTML = `
            <article class="recipe-card">
                <h2>${recipe.navn}</h2>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.tid}</span>
                    <span>🍽️ Serveringer: ${recipe.serveringer}</span>
                </div>
                <img src="images/logo.png"></img>
                <table>
                    <tr>
                        <th>
                            <h3>Ingredisenser:</h3>
                        </th>
                        <th class="tb_column">
                            <h3>Instruksjoner:</h3>
                        </th>
                    <tr>
                        <td>
                            <ul>
                            ${recipe.ingredienser.map(ingredienser => `<li>${ingredienser}</li>`).join('')}
                            </ul>
                        </td>
                        <td class="tb_column">
                            <ol>
                            ${recipe.instruksjoner.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </td>
                    </tr>
                    </tr>
                </table>
            </article>
        `;
        
        container.innerHTML += recipeHTML;
    });
}