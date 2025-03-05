# Technical Context: Quick & Healthy Recipe PWA

## Technology Stack

The Quick & Healthy Recipe PWA is built using a deliberately minimal technology stack to ensure simplicity, performance, and maintainability:

### Frontend
- **HTML5**: Semantic markup for structure
- **CSS3**: Styling with CSS variables, flexbox, and grid
- **JavaScript (ES6+)**: Vanilla JavaScript without frameworks
- **Service Workers**: For offline functionality and caching
- **Web App Manifest**: For PWA installability

### Backend
- **Node.js**: Simple HTTP server for local development
- **Static JSON**: Data storage using static JSON files

### Development Tools
- **Git**: Version control
- **VSCode**: Code editing and development
- **Chrome DevTools**: Testing and debugging

## Technical Constraints

### Performance Requirements
- **Initial Load**: Under 2 seconds on 3G connections
- **Time to Interactive**: Under 3 seconds on mobile devices
- **Offline Functionality**: Complete functionality without internet connection
- **Lighthouse Score**: Minimum 90+ in all categories

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Android Chrome
- **No IE Support**: Internet Explorer is not supported

### Device Support
- **Mobile First**: Optimized for mobile devices
- **Responsive**: Works on all screen sizes from 320px width and up
- **Touch Friendly**: Designed for touch interaction

## Development Environment

### Local Development
```
# Start local development server
node server.js

# Access the application
http://localhost:3000
```

### Project Structure
```
/
├── index.html              # Main entry point
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline functionality
├── server.js               # Simple HTTP server for development
├── assets/                 # Static assets
│   ├── images/             # Image files
│   ├── icons/              # App icons
│   └── data/               # JSON data files
├── css/                    # Stylesheets
│   ├── main.css            # Main stylesheet
│   ├── components/         # Component-specific styles
│   └── utilities.css       # Utility classes
└── js/                     # JavaScript files
    ├── app.js              # Main application logic
    ├── components/         # UI components
    ├── utils/              # Utility functions
    └── data/               # Data handling
```

## Dependencies

The project intentionally minimizes external dependencies to reduce complexity and improve performance:

### Runtime Dependencies
- None (Vanilla JavaScript)

### Development Dependencies
- **Node.js**: For running the development server

## Technical Decisions

### Why Vanilla JavaScript?
We chose vanilla JavaScript over frameworks like React, Vue, or Angular for several reasons:
1. **Performance**: Smaller bundle size and faster load times
2. **Simplicity**: Easier to understand and maintain
3. **Control**: More control over caching and offline strategies
4. **Learning Curve**: Lower barrier to entry for contributors

### Why Static JSON?
We chose static JSON files over a backend API for data storage:
1. **Offline First**: Complete offline functionality without complex syncing
2. **Simplicity**: No need for API endpoints or database
3. **Performance**: Faster data access without network requests
4. **Deployment**: Simpler deployment with static hosting

### Why PWA?
We implemented Progressive Web App features for:
1. **Offline Access**: Access recipes without internet connection
2. **Installability**: Add to home screen for app-like experience
3. **Performance**: Improved loading times with caching
4. **Engagement**: Better user experience and engagement

## Service Worker Strategy

The service worker implements a cache-first strategy for assets and data:

```javascript
// Example service worker caching strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Cache the response for future requests
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open('v1').then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            
            return response;
          });
      })
  );
});
```

## Data Model

The recipe data model is structured as follows:

```javascript
{
  "id": "veggie-stir-fry",
  "title": "Quick Veggie Stir Fry",
  "prepTime": 10,
  "cookTime": 8,
  "totalTime": 18,
  "servings": 2,
  "cost": 1, // 1 = $, 2 = $$, 3 = $$$
  "tags": ["quick", "healthy", "vegetarian-option", "dairy-free", "balanced"],
  "ingredients": [
    {
      "name": "Mixed vegetables",
      "amount": 3,
      "unit": "cups",
      "substitutes": ["frozen stir-fry mix"]
    },
    // More ingredients...
  ],
  "steps": [
    "Heat oil in a large pan or wok over medium-high heat.",
    // More steps...
  ],
  "nutrition": {
    "calories": 320,
    "protein": 15,
    "carbs": 42,
    "fat": 10,
    "fiber": 8
  }
}
```

## Performance Optimization

### Critical Rendering Path
- Inline critical CSS
- Defer non-critical JavaScript
- Preload key resources

### Asset Optimization
- Optimize images for different screen sizes
- Minify CSS and JavaScript
- Use appropriate image formats (WebP where supported)

### Caching Strategy
- Cache static assets aggressively
- Cache recipe data for offline use
- Update cache when new versions are available

## Accessibility Considerations

The application follows WCAG 2.1 AA guidelines:

- **Semantic HTML**: Proper use of HTML elements
- **ARIA Attributes**: Where necessary for complex interactions
- **Keyboard Navigation**: Full functionality without mouse
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Screen Reader Support**: Alt text for images, proper labels

## Security Considerations

Although the application is client-side only, we still implement security best practices:

- **Content Security Policy**: Restrict resource loading
- **HTTPS Only**: Enforce secure connections
- **Input Validation**: Validate all user inputs
- **Local Storage**: Only store non-sensitive data

This document will be updated as the technical context evolves during development.
