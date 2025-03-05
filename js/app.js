/**
 * Main Application JavaScript for QuickMeal PWA
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('QuickMeal PWA initialized');
    
    // Initialize application
    App.init();
});

/**
 * Main App Object
 */
const App = {
    // Application state
    state: {
        activeFilters: [],
        recipes: [],
        currentRecipe: null,
    },
    
    /**
     * Initialize the application
     */
    init: async function() {
        try {
            // Load recipes data
            await this.loadRecipes();
            
            // Initialize components
            FilterSystem.init();
            RecipeCard.init();
            RecipeDetail.init();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Check for URL parameters
            this.handleURLParameters();
            
            console.log('App initialized with', this.state.recipes.length, 'recipes');
        } catch (error) {
            console.error('Error initializing app:', error);
            // Show error message to user
            this.showErrorMessage('Failed to initialize the application. Please try refreshing the page.');
        }
    },
    
    /**
     * Load recipe data from JSON file
     */
    loadRecipes: async function() {
        try {
            const response = await fetch('assets/data/recipes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.state.recipes = data.recipes || [];
            
            // If no recipes loaded, use fallback data
            if (this.state.recipes.length === 0) {
                console.warn('No recipes found in JSON, using fallback data');
                this.state.recipes = RecipeData.getFallbackRecipes();
            }
            
            return this.state.recipes;
        } catch (error) {
            console.error('Error loading recipes:', error);
            // Use fallback data in case of error
            this.state.recipes = RecipeData.getFallbackRecipes();
            return this.state.recipes;
        }
    },
    
    /**
     * Set up application event listeners
     */
    setupEventListeners: function() {
        // Listen for filter changes
        document.addEventListener('filter:changed', this.handleFilterChange.bind(this));
        
        // Listen for recipe selection
        document.addEventListener('recipe:selected', this.handleRecipeSelection.bind(this));
        
        // Listen for recipe detail close
        document.addEventListener('recipe:close', this.handleRecipeClose.bind(this));
    },
    
    /**
     * Handle URL parameters for direct access to filtered views
     */
    handleURLParameters: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        
        if (filterParam) {
            // Activate the filter from URL parameter
            FilterSystem.activateFilter(filterParam);
        }
    },
    
    /**
     * Handle filter change events
     * @param {CustomEvent} event - The filter change event
     */
    handleFilterChange: function(event) {
        const { filters } = event.detail;
        this.state.activeFilters = filters;
        
        // Apply filters and update recipe display
        const filteredRecipes = this.filterRecipes(filters);
        this.updateRecipeDisplay(filteredRecipes);
        
        // Update URL to reflect current filters
        this.updateURL(filters);
    },
    
    /**
     * Filter recipes based on active filters
     * @param {Array} filters - Array of active filter objects
     * @returns {Array} - Filtered recipes
     */
    filterRecipes: function(filters) {
        // If no filters active, return all recipes
        if (filters.length === 0) {
            return this.state.recipes;
        }
        
        return this.state.recipes.filter(recipe => {
            // Check each filter
            return filters.every(filter => {
                switch (filter.type) {
                    case 'time':
                        // Filter for recipes under 20 minutes
                        return recipe.totalTime <= 20;
                    
                    case 'nutrition':
                        // Filter for nutritionally balanced recipes
                        return recipe.tags.some(tag => 
                            ['balanced', 'healthy', 'nutritious'].includes(tag)
                        );
                    
                    case 'budget':
                        // Filter for budget-friendly recipes
                        return recipe.cost.category === 'low' || recipe.cost.category === 'medium';
                    
                    default:
                        return true;
                }
            });
        });
    },
    
    /**
     * Update the recipe display with filtered recipes
     * @param {Array} recipes - Recipes to display
     */
    updateRecipeDisplay: function(recipes) {
        const recipesContainer = document.getElementById('recipesContainer');
        
        // Clear current recipes
        while (recipesContainer.firstChild) {
            if (recipesContainer.firstChild.classList && 
                recipesContainer.firstChild.classList.contains('recipes-placeholder')) {
                break;
            }
            recipesContainer.removeChild(recipesContainer.firstChild);
        }
        
        // Show placeholder if no recipes match filters
        const placeholder = document.querySelector('.recipes-placeholder');
        if (recipes.length === 0) {
            placeholder.textContent = 'No recipes match your selected filters. Try different options!';
            placeholder.style.display = 'block';
            return;
        }
        
        // Hide placeholder if we have recipes
        placeholder.style.display = 'none';
        
        // Add recipe cards
        recipes.forEach(recipe => {
            const recipeCard = RecipeCard.create(recipe);
            recipesContainer.appendChild(recipeCard);
        });
    },
    
    /**
     * Update URL to reflect current filters
     * @param {Array} filters - Active filters
     */
    updateURL: function(filters) {
        // Create URL parameters based on filters
        const params = new URLSearchParams();
        
        if (filters.length > 0) {
            // Add each filter type to URL
            filters.forEach(filter => {
                params.append('filter', filter.type);
            });
            
            // Update URL without reloading page
            const newURL = `${window.location.pathname}?${params.toString()}`;
            window.history.pushState({ filters }, '', newURL);
        } else {
            // If no filters, remove parameters
            window.history.pushState({ filters: [] }, '', window.location.pathname);
        }
    },
    
    /**
     * Handle recipe selection
     * @param {CustomEvent} event - Recipe selection event
     */
    handleRecipeSelection: function(event) {
        const { recipeId } = event.detail;
        const recipe = this.state.recipes.find(r => r.id === recipeId);
        
        if (recipe) {
            this.state.currentRecipe = recipe;
            RecipeDetail.show(recipe);
        }
    },
    
    /**
     * Handle recipe detail close
     */
    handleRecipeClose: function() {
        this.state.currentRecipe = null;
    },
    
    /**
     * Show error message to user
     * @param {string} message - Error message to display
     */
    showErrorMessage: function(message) {
        const recipesContainer = document.getElementById('recipesContainer');
        const errorElement = document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Clear container and show error
        recipesContainer.innerHTML = '';
        recipesContainer.appendChild(errorElement);
    }
};
