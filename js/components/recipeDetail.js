/**
 * Recipe Detail Component for QuickMeal PWA
 * Handles the detailed view of a recipe
 */

const RecipeDetail = {
    // Store the current recipe
    currentRecipe: null,
    
    /**
     * Initialize the recipe detail component
     */
    init: function() {
        this.cacheDOM();
        this.bindEvents();
        console.log('Recipe Detail component initialized');
    },
    
    /**
     * Cache DOM elements
     */
    cacheDOM: function() {
        this.detailContainer = document.getElementById('recipeDetail');
    },
    
    /**
     * Bind event listeners
     */
    bindEvents: function() {
        // Event delegation for close button (will be added dynamically)
        this.detailContainer.addEventListener('click', (event) => {
            if (event.target.matches('.recipe-detail__close') || 
                event.target === this.detailContainer) {
                this.hide();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isVisible()) {
                this.hide();
            }
        });
    },
    
    /**
     * Show recipe detail view
     * @param {Object} recipe - Recipe data object
     */
    show: function(recipe) {
        if (!recipe) {
            console.error('Cannot show recipe detail: No recipe data provided');
            return;
        }
        
        this.currentRecipe = recipe;
        
        // Create detail content
        const content = this.createDetailContent(recipe);
        
        // Clear container and add new content
        this.detailContainer.innerHTML = '';
        this.detailContainer.appendChild(content);
        
        // Show the container
        this.detailContainer.classList.add('active');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Save to recent views in localStorage
        this.saveToRecentViews(recipe.id);
    },
    
    /**
     * Hide recipe detail view
     */
    hide: function() {
        this.detailContainer.classList.remove('active');
        this.currentRecipe = null;
        
        // Restore body scrolling
        document.body.style.overflow = '';
        
        // Dispatch close event
        const event = new CustomEvent('recipe:close');
        document.dispatchEvent(event);
    },
    
    /**
     * Check if detail view is visible
     * @returns {boolean} - True if detail view is visible
     */
    isVisible: function() {
        return this.detailContainer.classList.contains('active');
    },
    
    /**
     * Create recipe detail content
     * @param {Object} recipe - Recipe data object
     * @returns {HTMLElement} - Detail content element
     */
    createDetailContent: function(recipe) {
        // Create content container
        const content = document.createElement('div');
        content.className = 'recipe-detail__content';
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'recipe-detail__close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Close recipe');
        content.appendChild(closeButton);
        
        // Add header section
        const header = document.createElement('header');
        header.className = 'recipe-detail__header';
        
        // Add title
        const title = document.createElement('h2');
        title.className = 'recipe-detail__title';
        title.textContent = recipe.title;
        header.appendChild(title);
        
        // Add meta information
        const meta = document.createElement('div');
        meta.className = 'recipe-detail__meta';
        
        // Add time
        const timeItem = document.createElement('div');
        timeItem.className = 'recipe-detail__meta-item';
        timeItem.innerHTML = `<span aria-hidden="true">⏱️</span> <span>Total: ${Helpers.formatTime(recipe.totalTime)}</span>`;
        meta.appendChild(timeItem);
        
        // Add prep time
        const prepTimeItem = document.createElement('div');
        prepTimeItem.className = 'recipe-detail__meta-item';
        prepTimeItem.innerHTML = `<span>Prep: ${Helpers.formatTime(recipe.prepTime)}</span>`;
        meta.appendChild(prepTimeItem);
        
        // Add cook time
        const cookTimeItem = document.createElement('div');
        cookTimeItem.className = 'recipe-detail__meta-item';
        cookTimeItem.innerHTML = `<span>Cook: ${Helpers.formatTime(recipe.cookTime)}</span>`;
        meta.appendChild(cookTimeItem);
        
        // Add servings
        const servingsItem = document.createElement('div');
        servingsItem.className = 'recipe-detail__meta-item';
        servingsItem.innerHTML = `<span aria-hidden="true">👥</span> <span>Serves: ${recipe.servings}</span>`;
        meta.appendChild(servingsItem);
        
        // Add cost
        const costItem = document.createElement('div');
        costItem.className = 'recipe-detail__meta-item';
        costItem.innerHTML = `<span aria-hidden="true">💰</span> <span>${Helpers.formatCost(recipe.cost)}</span>`;
        meta.appendChild(costItem);
        
        header.appendChild(meta);
        
        // Add tags
        if (recipe.tags && recipe.tags.length > 0) {
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'recipe-card__tags';
            
            recipe.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'recipe-card__tag';
                tagElement.textContent = RecipeCard.formatTag(tag);
                tagsContainer.appendChild(tagElement);
            });
            
            header.appendChild(tagsContainer);
        }
        
        content.appendChild(header);
        
        // Add body section
        const body = document.createElement('div');
        body.className = 'recipe-detail__body';
        
        // Add ingredients section
        const ingredientsSection = document.createElement('section');
        ingredientsSection.className = 'recipe-detail__section';
        
        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.className = 'recipe-detail__section-title';
        ingredientsTitle.textContent = 'Ingredients';
        ingredientsSection.appendChild(ingredientsTitle);
        
        const ingredientsList = document.createElement('ul');
        ingredientsList.className = 'recipe-detail__ingredients';
        
        recipe.ingredients.forEach(ingredient => {
            const item = document.createElement('li');
            item.className = 'recipe-detail__ingredient';
            
            // Format ingredient text
            let ingredientText = '';
            if (ingredient.amount && ingredient.unit !== 'to taste' && ingredient.unit !== 'as needed') {
                ingredientText += `${ingredient.amount} ${ingredient.unit} `;
            }
            ingredientText += ingredient.name;
            
            // Add substitutes if available
            if (ingredient.substitutes && ingredient.substitutes.length > 0) {
                ingredientText += ` (or ${ingredient.substitutes.join(', ')})`;
            }
            
            item.textContent = ingredientText;
            ingredientsList.appendChild(item);
        });
        
        ingredientsSection.appendChild(ingredientsList);
        body.appendChild(ingredientsSection);
        
        // Add steps section
        const stepsSection = document.createElement('section');
        stepsSection.className = 'recipe-detail__section';
        
        const stepsTitle = document.createElement('h3');
        stepsTitle.className = 'recipe-detail__section-title';
        stepsTitle.textContent = 'Instructions';
        stepsSection.appendChild(stepsTitle);
        
        const stepsList = document.createElement('ol');
        stepsList.className = 'recipe-detail__steps';
        
        recipe.steps.forEach(step => {
            const item = document.createElement('li');
            item.className = 'recipe-detail__step';
            item.textContent = step;
            stepsList.appendChild(item);
        });
        
        stepsSection.appendChild(stepsList);
        body.appendChild(stepsSection);
        
        // Add nutrition section if available
        if (recipe.nutrition) {
            const nutritionSection = document.createElement('section');
            nutritionSection.className = 'recipe-detail__section';
            
            const nutritionTitle = document.createElement('h3');
            nutritionTitle.className = 'recipe-detail__section-title';
            nutritionTitle.textContent = 'Nutrition (per serving)';
            nutritionSection.appendChild(nutritionTitle);
            
            const nutritionInfo = document.createElement('div');
            nutritionInfo.className = 'recipe-detail__nutrition';
            
            // Add each nutrition value
            for (const [key, value] of Object.entries(recipe.nutrition)) {
                const item = document.createElement('div');
                item.className = 'recipe-detail__nutrition-item';
                
                // Format the key (capitalize first letter)
                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
                
                // Format the value (add units)
                let formattedValue = value;
                if (key === 'calories') {
                    formattedValue += ' kcal';
                } else {
                    formattedValue += 'g';
                }
                
                item.textContent = `${formattedKey}: ${formattedValue}`;
                nutritionInfo.appendChild(item);
            }
            
            nutritionSection.appendChild(nutritionInfo);
            body.appendChild(nutritionSection);
        }
        
        content.appendChild(body);
        
        return content;
    },
    
    /**
     * Save recipe ID to recent views in localStorage
     * @param {string} recipeId - Recipe ID to save
     */
    saveToRecentViews: function(recipeId) {
        // Get current recent views
        let recentViews = Helpers.loadFromStorage('recentViews', []);
        
        // Remove if already exists
        recentViews = recentViews.filter(id => id !== recipeId);
        
        // Add to beginning of array
        recentViews.unshift(recipeId);
        
        // Limit to 10 recent views
        recentViews = recentViews.slice(0, 10);
        
        // Save back to localStorage
        Helpers.saveToStorage('recentViews', recentViews);
    }
};
