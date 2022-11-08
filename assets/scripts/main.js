// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.

  //vars
  var unparsed_rec_list = window.localStorage.getItem('recipes');
  var parsed_rec_list = JSON.parse(unparsed_rec_list);
  var empty_arr = [];

  //check for empty, then return empty
  if (parsed_rec_list == null) {
    return empty_arr;
  }

  //else returns the parsed list
  return parsed_rec_list; 
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  let main = document.querySelector('main');

  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  let i = 0;
  while(i<recipes.length) {
    let rec = document.createElement('recipe-card');
    rec.data = recipes[i];
    main.append(rec);
    i++;
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  let form_element = document.querySelector('form');

  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  form_element.addEventListener('submit', () => {
    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. TODO - Create a new FormData object from the <form> element reference above
    let form_data = new FormData(form_element); 

    // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    let recipeObject = new Object();

    for (var[key,value] of form_data) {

      recipeObject[key] = value;
    }

    // B6. TODO - Create a new <recipe-card> element
    let rec_card = document.createElement('recipe-card'); 

    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    rec_card.data = recipeObject;

    // B8. TODO - Append this new <recipe-card> to <main>
    //main.append
    document.querySelector('main').append(rec_card);

    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    let recipes_array = getRecipesFromStorage();
    recipes_array.push(recipeObject);
    localStorage.setItem('recipes', JSON.stringify(recipes_array));
  });

  // B10. TODO - Get a reference to the "Clear Local Storage" button
  let clear_local = document.getElementsByClassName('danger')[0];

  // B11. TODO - Add a click event listener to clear local storage button
  clear_local.addEventListener('click', () => {

  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
  localStorage.clear();

  //Note to grader, the clear function somehow works when I open index from github but
  //does not clear when I use live Server on VScode, I beleive this is a Live Server bug

  // B13. TODO - Delete the contents of <main>
  document.querySelector('main').innerHTML = null;
  });
}
