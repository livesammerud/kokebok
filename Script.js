document.addEventListener('DOMContentLoaded', function() {
    fetch('recipes.json')
        .then(response => response.json())
        .then(data => {
            console.log('Recipes loaded:', data);
            const kategori = getCategory();
            const filteredRecipes = data.recipes.filter(r => r.kategori === kategori);
            displayRecipes(filteredRecipes);
            displaySidebar(filteredRecipes);
        })
        .catch(error => console.error('Error loading recipes:', error));
});

function getCategory() {
    // Extract category from current page filename
    const page = window.location.pathname.split('/').pop();
    const categoryMap = {
        'Måltider.html': 'Måltider',
        'Kaker.html': 'Kaker',
        'Kjeks.html': 'Kjeks',
        'Gjærbakst.html': 'Gjærbakst',
        'Desserter.html': 'Desserter'
    };
    return categoryMap[page] || 'Måltider';
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    
    recipes.forEach(recipe => {
        const recipeHTML = `
            <article class="recipe-card">
                <h2>${recipe.navn}</h2>
                <div class="recipe-meta">
                    <span>⏰ Tid: ${recipe.tid}</span>
                    <span>🌡️ Temp: ${recipe.temp}</span>
                    <span>🍽️ Serveringer: ${recipe.serveringer}</span>
                    <span>🔥 Kalorier: ${recipe.kalorier}</span>
                </div>
                <table>
                    <tr>
                        <th>
                            <h3 class="ingr">Ingredisenser</h3>
                        </th>
                        <th class="tb_column">
                            <h3>Instruksjoner</h3>
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

function displaySidebar(recipes) {
    const sidebar = document.getElementById('aside');
    
    let sidebarHTML = '<ul>';
    recipes.forEach(recipe => {
        sidebarHTML += `<li><a href="#recipe-${recipe.id}">${recipe.navn}</a></li>`;
    });
    sidebarHTML += '</ul>';
    sidebar.innerHTML = sidebarHTML;
}