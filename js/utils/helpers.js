/**
 * Helper Utilities for QuickMeal PWA
 */

const Helpers = {
    /**
     * Format time in minutes to a readable format
     * @param {number} minutes - Time in minutes
     * @returns {string} - Formatted time string
     */
    formatTime: function(minutes) {
        if (typeof minutes !== 'number' || minutes < 0) {
            return 'N/A';
        }
        
        if (minutes < 60) {
            return `${minutes} min`;
        }
        
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        if (remainingMinutes === 0) {
            return `${hours} hr`;
        }
        
        return `${hours} hr ${remainingMinutes} min`;
    },
    
    /**
     * Format cost category to a readable format with symbols
     * @param {Object} cost - Cost object with category
     * @returns {string} - Formatted cost string
     */
    formatCost: function(cost) {
        if (!cost || !cost.category) {
            return 'N/A';
        }
        
        switch (cost.category.toLowerCase()) {
            case 'low':
                return '$ (Budget)';
            case 'medium':
                return '$$ (Moderate)';
            case 'high':
                return '$$$ (Premium)';
            default:
                return cost.category;
        }
    },
    
    /**
     * Create an element with attributes and content
     * @param {string} tag - HTML tag name
     * @param {Object} attributes - Element attributes
     * @param {string|Node|Array} content - Element content
     * @returns {HTMLElement} - Created element
     */
    createElement: function(tag, attributes = {}, content = null) {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Add content
        if (content !== null) {
            if (Array.isArray(content)) {
                content.forEach(item => {
                    if (typeof item === 'string') {
                        element.appendChild(document.createTextNode(item));
                    } else if (item instanceof Node) {
                        element.appendChild(item);
                    }
                });
            } else if (typeof content === 'string') {
                element.textContent = content;
            } else if (content instanceof Node) {
                element.appendChild(content);
            }
        }
        
        return element;
    },
    
    /**
     * Debounce function to limit how often a function is called
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    debounce: function(func, wait = 300) {
        let timeout;
        
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Check if the device is in offline mode
     * @returns {boolean} - True if device is offline
     */
    isOffline: function() {
        return !navigator.onLine;
    },
    
    /**
     * Save data to localStorage
     * @param {string} key - Storage key
     * @param {*} data - Data to store
     * @returns {boolean} - Success status
     */
    saveToStorage: function(key, data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    /**
     * Load data from localStorage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*} - Retrieved data or default value
     */
    loadFromStorage: function(key, defaultValue = null) {
        try {
            const serializedData = localStorage.getItem(key);
            if (serializedData === null) {
                return defaultValue;
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return defaultValue;
        }
    },
    
    /**
     * Generate a unique ID
     * @returns {string} - Unique ID
     */
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    },
    
    /**
     * Truncate text to a specific length with ellipsis
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} - Truncated text
     */
    truncateText: function(text, maxLength = 100) {
        if (!text || text.length <= maxLength) {
            return text;
        }
        
        return text.slice(0, maxLength) + '...';
    },
    
    /**
     * Check if an element is in the viewport
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} - True if element is in viewport
     */
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {string} type - Notification type (success, error, warning, info)
     * @param {number} duration - Duration in milliseconds
     */
    showToast: function(message, type = 'info', duration = 3000) {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('toast--visible');
        }, 10);
        
        // Remove toast after duration
        setTimeout(() => {
            toast.classList.remove('toast--visible');
            
            // Remove from DOM after animation
            setTimeout(() => {
                toastContainer.removeChild(toast);
                
                // Remove container if empty
                if (toastContainer.children.length === 0) {
                    document.body.removeChild(toastContainer);
                }
            }, 300);
        }, duration);
    }
};
