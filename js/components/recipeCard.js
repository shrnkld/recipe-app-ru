/**
 * Recipe Card Component for QuickMeal PWA
 * Creates and manages recipe card elements
 */

const RecipeCard = {
    /**
     * Initialize the recipe card component
     */
    init: function() {
        console.log('Recipe Card component initialized');
    },
    
    /**
     * Create a recipe card element
     * @param {Object} recipe - Recipe data object
     * @returns {HTMLElement} - Recipe card element
     */
    create: function(recipe) {
        if (!recipe) {
            console.error('Cannot create recipe card: No recipe data provided');
            return null;
        }
        
        // Create card container
        const card = document.createElement('article');
        card.className = 'recipe-card';
        card.dataset.recipeId = recipe.id;
        
        // Add content container
        const content = document.createElement('div');
        content.className = 'recipe-card__content';
        
        // Add title
        const title = document.createElement('h3');
        title.className = 'recipe-card__title';
        title.textContent = recipe.title;
        content.appendChild(title);
        
        // Add meta information
        const meta = document.createElement('div');
        meta.className = 'recipe-card__meta';
        
        // Add time
        const time = document.createElement('span');
        time.className = 'recipe-card__time';
        time.innerHTML = `<span aria-hidden="true">⏱️</span> ${Helpers.formatTime(recipe.totalTime)}`;
        time.setAttribute('aria-label', `Total time: ${Helpers.formatTime(recipe.totalTime)}`);
        meta.appendChild(time);
        
        // Add cost
        const cost = document.createElement('span');
        cost.className = 'recipe-card__cost';
        cost.innerHTML = `<span aria-hidden="true">💰</span> ${Helpers.formatCost(recipe.cost)}`;
        cost.setAttribute('aria-label', `Cost: ${Helpers.formatCost(recipe.cost)}`);
        meta.appendChild(cost);
        
        content.appendChild(meta);
        
        // Add tags
        if (recipe.tags && recipe.tags.length > 0) {
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'recipe-card__tags';
            
            // Add up to 3 tags
            recipe.tags.slice(0, 3).forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'recipe-card__tag';
                tagElement.textContent = this.formatTag(tag);
                tagsContainer.appendChild(tagElement);
            });
            
            content.appendChild(tagsContainer);
        }
        
        // Add short description (first step as preview)
        if (recipe.steps && recipe.steps.length > 0) {
            const description = document.createElement('p');
            description.className = 'recipe-card__description';
            description.textContent = Helpers.truncateText(recipe.steps[0], 80);
            content.appendChild(description);
        }
        
        // Add view button
        const button = document.createElement('button');
        button.className = 'recipe-card__button';
        button.textContent = 'View Recipe';
        button.style.marginTop = '10px';
        button.style.padding = '8px 16px';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.fontWeight = 'bold';
        button.style.width = '100%';
        button.addEventListener('click', () => this.handleRecipeClick(recipe.id));
        content.appendChild(button);
        
        // Add content to card
        card.appendChild(content);
        
        // Make the entire card clickable
        card.addEventListener('click', (event) => {
            // Prevent click event if the button was clicked
            if (event.target !== button) {
                this.handleRecipeClick(recipe.id);
            }
        });
        
        return card;
    },
    
    /**
     * Format a tag for display
     * @param {string} tag - Raw tag
     * @returns {string} - Formatted tag
     */
    formatTag: function(tag) {
        // Replace hyphens with spaces
        let formattedTag = tag.replace(/-/g, ' ');
        
        // Capitalize first letter of each word
        formattedTag = formattedTag.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        return formattedTag;
    },
    
    /**
     * Handle recipe card click
     * @param {string} recipeId - ID of clicked recipe
     */
    handleRecipeClick: function(recipeId) {
        // Dispatch custom event for recipe selection
        const event = new CustomEvent('recipe:selected', {
            detail: {
                recipeId: recipeId
            }
        });
        
        document.dispatchEvent(event);
    }
};
