/**
 * Recipe Data Module for QuickMeal PWA
 * Provides fallback recipe data when JSON fetch fails
 */

const RecipeData = {
    /**
     * Get fallback recipes when JSON fetch fails
     * @returns {Array} - Array of recipe objects
     */
    getFallbackRecipes: function() {
        return [
            {
                id: "quick-veggie-stir-fry",
                title: "Quick Veggie Stir Fry",
                prepTime: 10,
                cookTime: 8,
                totalTime: 18,
                servings: 2,
                cost: {
                    value: 8,
                    category: "low"
                },
                nutrition: {
                    calories: 320,
                    protein: 12,
                    carbs: 45,
                    fat: 10
                },
                ingredients: [
                    {
                        name: "Mixed vegetables (bell peppers, broccoli, carrots)",
                        amount: 3,
                        unit: "cups",
                        substitutes: ["frozen stir-fry mix"]
                    },
                    {
                        name: "Tofu or pre-cooked chicken",
                        amount: 8,
                        unit: "oz",
                        substitutes: ["chickpeas", "tempeh"]
                    },
                    {
                        name: "Garlic",
                        amount: 2,
                        unit: "cloves",
                        substitutes: ["1/2 tsp garlic powder"]
                    },
                    {
                        name: "Ginger",
                        amount: 1,
                        unit: "tsp",
                        substitutes: ["1/4 tsp ground ginger"]
                    },
                    {
                        name: "Soy sauce",
                        amount: 2,
                        unit: "tbsp",
                        substitutes: ["tamari", "coconut aminos"]
                    },
                    {
                        name: "Cooking oil",
                        amount: 1,
                        unit: "tbsp",
                        substitutes: ["olive oil", "avocado oil"]
                    },
                    {
                        name: "Pre-cooked rice or noodles",
                        amount: 2,
                        unit: "cups",
                        substitutes: ["quinoa", "cauliflower rice"]
                    }
                ],
                steps: [
                    "Heat oil in a large pan or wok over medium-high heat.",
                    "Add garlic and ginger, stir for 30 seconds until fragrant.",
                    "Add protein (tofu/chicken) and cook for 2-3 minutes.",
                    "Add vegetables and stir-fry for 4-5 minutes until crisp-tender.",
                    "Add soy sauce and stir to combine.",
                    "Serve immediately over pre-cooked rice or noodles."
                ],
                tags: ["quick", "healthy", "vegetarian-option", "dairy-free", "balanced"],
                image: "assets/images/veggie-stir-fry.jpg",
                thumbnailImage: "assets/images/veggie-stir-fry-thumb.jpg"
            },
            {
                id: "mediterranean-chickpea-salad",
                title: "Mediterranean Chickpea Salad",
                prepTime: 15,
                cookTime: 0,
                totalTime: 15,
                servings: 4,
                cost: {
                    value: 6,
                    category: "low"
                },
                nutrition: {
                    calories: 280,
                    protein: 10,
                    carbs: 35,
                    fat: 12
                },
                ingredients: [
                    {
                        name: "Canned chickpeas",
                        amount: 15,
                        unit: "oz",
                        substitutes: ["white beans", "lentils"]
                    },
                    {
                        name: "Cucumber",
                        amount: 1,
                        unit: "medium",
                        substitutes: ["zucchini"]
                    },
                    {
                        name: "Cherry tomatoes",
                        amount: 1,
                        unit: "cup",
                        substitutes: ["diced regular tomatoes"]
                    },
                    {
                        name: "Red onion",
                        amount: 1/4,
                        unit: "cup",
                        substitutes: ["green onions"]
                    },
                    {
                        name: "Feta cheese",
                        amount: 1/2,
                        unit: "cup",
                        substitutes: ["goat cheese", "skip for vegan"]
                    },
                    {
                        name: "Olive oil",
                        amount: 2,
                        unit: "tbsp",
                        substitutes: []
                    },
                    {
                        name: "Lemon juice",
                        amount: 2,
                        unit: "tbsp",
                        substitutes: ["lime juice", "red wine vinegar"]
                    },
                    {
                        name: "Dried oregano",
                        amount: 1,
                        unit: "tsp",
                        substitutes: ["Italian seasoning"]
                    },
                    {
                        name: "Salt and pepper",
                        amount: 0,
                        unit: "to taste",
                        substitutes: []
                    }
                ],
                steps: [
                    "Drain and rinse chickpeas, then add to a large bowl.",
                    "Dice cucumber, halve cherry tomatoes, and finely dice red onion. Add to bowl.",
                    "Crumble feta cheese over the salad.",
                    "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
                    "Pour dressing over salad and toss gently to combine.",
                    "Serve immediately or refrigerate for up to 3 days."
                ],
                tags: ["quick", "no-cook", "vegetarian", "healthy", "balanced", "meal-prep"],
                image: "assets/images/chickpea-salad.jpg",
                thumbnailImage: "assets/images/chickpea-salad-thumb.jpg"
            },
            {
                id: "15-minute-pasta",
                title: "15-Minute Creamy Tomato Pasta",
                prepTime: 5,
                cookTime: 10,
                totalTime: 15,
                servings: 4,
                cost: {
                    value: 7,
                    category: "low"
                },
                nutrition: {
                    calories: 420,
                    protein: 14,
                    carbs: 65,
                    fat: 12
                },
                ingredients: [
                    {
                        name: "Pasta (any shape)",
                        amount: 8,
                        unit: "oz",
                        substitutes: ["whole wheat pasta", "gluten-free pasta"]
                    },
                    {
                        name: "Canned tomato sauce",
                        amount: 15,
                        unit: "oz",
                        substitutes: ["marinara sauce"]
                    },
                    {
                        name: "Cream cheese",
                        amount: 4,
                        unit: "oz",
                        substitutes: ["Greek yogurt", "cashew cream"]
                    },
                    {
                        name: "Garlic powder",
                        amount: 1/2,
                        unit: "tsp",
                        substitutes: ["1 fresh garlic clove, minced"]
                    },
                    {
                        name: "Italian seasoning",
                        amount: 1,
                        unit: "tsp",
                        substitutes: ["dried basil and oregano"]
                    },
                    {
                        name: "Grated Parmesan",
                        amount: 1/4,
                        unit: "cup",
                        substitutes: ["nutritional yeast"]
                    },
                    {
                        name: "Salt and pepper",
                        amount: 0,
                        unit: "to taste",
                        substitutes: []
                    }
                ],
                steps: [
                    "Bring a large pot of salted water to boil and cook pasta according to package directions.",
                    "While pasta cooks, heat tomato sauce in a large skillet over medium heat.",
                    "Add cream cheese, garlic powder, and Italian seasoning to the sauce. Stir until cream cheese is melted and sauce is smooth.",
                    "Drain pasta, reserving 1/4 cup of pasta water.",
                    "Add pasta to the sauce, along with a splash of pasta water if needed to thin the sauce.",
                    "Stir in Parmesan cheese, salt, and pepper. Serve immediately."
                ],
                tags: ["quick", "kid-friendly", "vegetarian", "budget"],
                image: "assets/images/creamy-pasta.jpg",
                thumbnailImage: "assets/images/creamy-pasta-thumb.jpg"
            },
            {
                id: "sheet-pan-chicken-veggies",
                title: "Sheet Pan Chicken & Vegetables",
                prepTime: 10,
                cookTime: 20,
                totalTime: 30,
                servings: 4,
                cost: {
                    value: 12,
                    category: "medium"
                },
                nutrition: {
                    calories: 380,
                    protein: 28,
                    carbs: 25,
                    fat: 18
                },
                ingredients: [
                    {
                        name: "Boneless chicken thighs",
                        amount: 1.5,
                        unit: "lbs",
                        substitutes: ["chicken breast", "tofu"]
                    },
                    {
                        name: "Broccoli florets",
                        amount: 2,
                        unit: "cups",
                        substitutes: ["cauliflower", "brussels sprouts"]
                    },
                    {
                        name: "Bell peppers",
                        amount: 2,
                        unit: "medium",
                        substitutes: ["zucchini", "summer squash"]
                    },
                    {
                        name: "Red onion",
                        amount: 1,
                        unit: "medium",
                        substitutes: ["yellow onion"]
                    },
                    {
                        name: "Olive oil",
                        amount: 3,
                        unit: "tbsp",
                        substitutes: ["avocado oil"]
                    },
                    {
                        name: "Italian seasoning",
                        amount: 2,
                        unit: "tsp",
                        substitutes: ["herbs de provence"]
                    },
                    {
                        name: "Garlic powder",
                        amount: 1,
                        unit: "tsp",
                        substitutes: ["2 fresh garlic cloves, minced"]
                    },
                    {
                        name: "Paprika",
                        amount: 1,
                        unit: "tsp",
                        substitutes: ["smoked paprika"]
                    },
                    {
                        name: "Salt and pepper",
                        amount: 0,
                        unit: "to taste",
                        substitutes: []
                    }
                ],
                steps: [
                    "Preheat oven to 425°F (220°C) and line a large baking sheet with parchment paper.",
                    "Cut chicken into 1-inch pieces. Chop vegetables into similar-sized pieces.",
                    "In a large bowl, combine olive oil, Italian seasoning, garlic powder, paprika, salt, and pepper.",
                    "Add chicken and vegetables to the bowl and toss to coat evenly with the seasoning mixture.",
                    "Spread everything in a single layer on the prepared baking sheet.",
                    "Bake for 20-25 minutes, stirring halfway through, until chicken is cooked through and vegetables are tender.",
                    "Serve hot, optionally with a side of rice or quinoa."
                ],
                tags: ["one-pan", "high-protein", "gluten-free", "dairy-free", "balanced"],
                image: "assets/images/sheet-pan-chicken.jpg",
                thumbnailImage: "assets/images/sheet-pan-chicken-thumb.jpg"
            },
            {
                id: "black-bean-quesadillas",
                title: "Quick Black Bean Quesadillas",
                prepTime: 5,
                cookTime: 10,
                totalTime: 15,
                servings: 4,
                cost: {
                    value: 6,
                    category: "low"
                },
                nutrition: {
                    calories: 350,
                    protein: 15,
                    carbs: 40,
                    fat: 14
                },
                ingredients: [
                    {
                        name: "Flour tortillas",
                        amount: 8,
                        unit: "medium",
                        substitutes: ["corn tortillas", "whole wheat tortillas"]
                    },
                    {
                        name: "Canned black beans",
                        amount: 15,
                        unit: "oz",
                        substitutes: ["pinto beans", "refried beans"]
                    },
                    {
                        name: "Shredded cheese",
                        amount: 2,
                        unit: "cups",
                        substitutes: ["dairy-free cheese"]
                    },
                    {
                        name: "Taco seasoning",
                        amount: 2,
                        unit: "tbsp",
                        substitutes: ["chili powder + cumin"]
                    },
                    {
                        name: "Salsa",
                        amount: 1/2,
                        unit: "cup",
                        substitutes: ["diced tomatoes"]
                    },
                    {
                        name: "Cooking spray or oil",
                        amount: 0,
                        unit: "as needed",
                        substitutes: []
                    },
                    {
                        name: "Optional toppings: avocado, sour cream, cilantro",
                        amount: 0,
                        unit: "to taste",
                        substitutes: []
                    }
                ],
                steps: [
                    "Drain and rinse black beans, then place in a bowl and roughly mash with a fork.",
                    "Stir taco seasoning and 2 tablespoons of salsa into the beans.",
                    "Heat a large skillet over medium heat and lightly coat with cooking spray or oil.",
                    "Place one tortilla in the skillet, spread 1/4 of the bean mixture on half of the tortilla, and sprinkle with 1/4 cup of cheese.",
                    "Fold the tortilla in half and cook for 2-3 minutes per side until golden and crispy.",
                    "Repeat with remaining tortillas and filling.",
                    "Cut each quesadilla into wedges and serve with additional salsa and optional toppings."
                ],
                tags: ["quick", "kid-friendly", "vegetarian", "budget", "protein"],
                image: "assets/images/bean-quesadillas.jpg",
                thumbnailImage: "assets/images/bean-quesadillas-thumb.jpg"
            },
            {
                id: "tuna-white-bean-salad",
                title: "Mediterranean Tuna & White Bean Salad",
                prepTime: 10,
                cookTime: 0,
                totalTime: 10,
                servings: 2,
                cost: {
                    value: 7,
                    category: "low"
                },
                nutrition: {
                    calories: 310,
                    protein: 25,
                    carbs: 30,
                    fat: 10
                },
                ingredients: [
                    {
                        name: "Canned tuna in water",
                        amount: 5,
                        unit: "oz",
                        substitutes: ["canned salmon", "chickpeas for vegetarian"]
                    },
                    {
                        name: "Canned white beans",
                        amount: 15,
                        unit: "oz",
                        substitutes: ["cannellini beans", "navy beans"]
                    },
                    {
                        name: "Red onion",
                        amount: 1/4,
                        unit: "cup",
                        substitutes: ["shallot", "green onion"]
                    },
                    {
                        name: "Cherry tomatoes",
                        amount: 1/2,
                        unit: "cup",
                        substitutes: ["diced regular tomatoes"]
                    },
                    {
                        name: "Lemon juice",
                        amount: 2,
                        unit: "tbsp",
                        substitutes: ["red wine vinegar"]
                    },
                    {
                        name: "Olive oil",
                        amount: 1,
                        unit: "tbsp",
                        substitutes: []
                    },
                    {
                        name: "Dried oregano",
                        amount: 1/2,
                        unit: "tsp",
                        substitutes: ["Italian seasoning"]
                    },
                    {
                        name: "Salt and pepper",
                        amount: 0,
                        unit: "to taste",
                        substitutes: []
                    },
                    {
                        name: "Optional: fresh parsley, capers",
                        amount: 0,
                        unit: "to taste",
                        substitutes: []
                    }
                ],
                steps: [
                    "Drain and rinse white beans, place in a medium bowl.",
                    "Drain tuna and flake with a fork, then add to the bowl.",
                    "Finely dice red onion and halve cherry tomatoes, add to the bowl.",
                    "In a small bowl, whisk together lemon juice, olive oil, oregano, salt, and pepper.",
                    "Pour dressing over the salad and gently toss to combine.",
                    "Serve immediately or refrigerate for up to 2 days."
                ],
                tags: ["quick", "no-cook", "high-protein", "dairy-free", "gluten-free", "balanced"],
                image: "assets/images/tuna-bean-salad.jpg",
                thumbnailImage: "assets/images/tuna-bean-salad-thumb.jpg"
            }
        ];
    }
};
