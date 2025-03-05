/**
 * Filter System Component for QuickMeal PWA
 * Handles the 3-button filter system for finding recipes
 */

const FilterSystem = {
    // Store active filters
    activeFilters: [],
    
    /**
     * Initialize the filter system
     */
    init: function() {
        this.cacheDOM();
        this.bindEvents();
        console.log('Filter System initialized');
    },
    
    /**
     * Cache DOM elements
     */
    cacheDOM: function() {
        this.filterButtons = document.querySelectorAll('.filter-button');
        this.activeFiltersContainer = document.getElementById('activeFilters');
    },
    
    /**
     * Bind event listeners
     */
    bindEvents: function() {
        // Add click event to each filter button
        this.filterButtons.forEach(button => {
            button.addEventListener('click', this.handleFilterClick.bind(this));
        });
    },
    
    /**
     * Handle filter button clicks
     * @param {Event} event - Click event
     */
    handleFilterClick: function(event) {
        const button = event.currentTarget;
        const filterType = button.dataset.filter;
        
        // Toggle active state
        if (button.classList.contains('active')) {
            // Remove filter if already active
            this.removeFilter(filterType);
            button.classList.remove('active');
        } else {
            // Add filter if not active
            this.addFilter(filterType);
            button.classList.add('active');
        }
        
        // Update active filters display
        this.updateActiveFiltersDisplay();
        
        // Dispatch filter change event
        this.dispatchFilterChangeEvent();
    },
    
    /**
     * Add a filter to active filters
     * @param {string} filterType - Type of filter to add
     */
    addFilter: function(filterType) {
        // Check if filter already exists
        if (!this.activeFilters.some(filter => filter.type === filterType)) {
            // Add filter with display name
            this.activeFilters.push({
                type: filterType,
                displayName: this.getFilterDisplayName(filterType)
            });
        }
    },
    
    /**
     * Remove a filter from active filters
     * @param {string} filterType - Type of filter to remove
     */
    removeFilter: function(filterType) {
        this.activeFilters = this.activeFilters.filter(filter => filter.type !== filterType);
    },
    
    /**
     * Get display name for a filter type
     * @param {string} filterType - Type of filter
     * @returns {string} - Display name
     */
    getFilterDisplayName: function(filterType) {
        switch (filterType) {
            case 'time':
                return 'Quick (under 20 min)';
            case 'nutrition':
                return 'Nutritious';
            case 'budget':
                return 'Budget-Friendly';
            default:
                return filterType;
        }
    },
    
    /**
     * Update the active filters display
     */
    updateActiveFiltersDisplay: function() {
        // Clear current display
        this.activeFiltersContainer.innerHTML = '';
        
        // If no active filters, return
        if (this.activeFilters.length === 0) {
            return;
        }
        
        // Create and append filter tags
        this.activeFilters.forEach(filter => {
            const filterTag = document.createElement('div');
            filterTag.className = 'active-filter-tag';
            filterTag.dataset.filterType = filter.type;
            
            // Add filter name
            filterTag.textContent = filter.displayName;
            
            // Add remove button
            const removeButton = document.createElement('span');
            removeButton.className = 'active-filter-tag__remove';
            removeButton.textContent = '×';
            removeButton.addEventListener('click', () => this.handleRemoveFilter(filter.type));
            
            filterTag.appendChild(removeButton);
            this.activeFiltersContainer.appendChild(filterTag);
        });
    },
    
    /**
     * Handle removing a filter from the active filters display
     * @param {string} filterType - Type of filter to remove
     */
    handleRemoveFilter: function(filterType) {
        // Remove filter
        this.removeFilter(filterType);
        
        // Update button state
        const button = document.querySelector(`.filter-button[data-filter="${filterType}"]`);
        if (button) {
            button.classList.remove('active');
        }
        
        // Update display
        this.updateActiveFiltersDisplay();
        
        // Dispatch event
        this.dispatchFilterChangeEvent();
    },
    
    /**
     * Dispatch custom event when filters change
     */
    dispatchFilterChangeEvent: function() {
        const event = new CustomEvent('filter:changed', {
            detail: {
                filters: this.activeFilters
            }
        });
        
        document.dispatchEvent(event);
    },
    
    /**
     * Activate a filter programmatically (e.g., from URL parameters)
     * @param {string} filterType - Type of filter to activate
     */
    activateFilter: function(filterType) {
        const button = document.querySelector(`.filter-button[data-filter="${filterType}"]`);
        
        if (button && !button.classList.contains('active')) {
            // Add filter
            this.addFilter(filterType);
            
            // Update button state
            button.classList.add('active');
            
            // Update display
            this.updateActiveFiltersDisplay();
            
            // Dispatch event
            this.dispatchFilterChangeEvent();
        }
    },
    
    /**
     * Clear all active filters
     */
    clearAllFilters: function() {
        // Reset active filters array
        this.activeFilters = [];
        
        // Remove active class from all buttons
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Clear display
        this.updateActiveFiltersDisplay();
        
        // Dispatch event
        this.dispatchFilterChangeEvent();
    },
    
    /**
     * Get current active filters
     * @returns {Array} - Array of active filter objects
     */
    getActiveFilters: function() {
        return [...this.activeFilters];
    }
};
