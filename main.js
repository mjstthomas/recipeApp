
//create an object to store data from recipe for shopping api
const ingredientsObject = {
	id: ""
};
// function for string manipulation to allow the recipe call to function with different forms of typing out ingredients

const ingSearchString = str => {
    let arr = str.replace(/(,\s*)+/, ',');
    arr = arr.replace(/(and\s*)+/, "");
    let newArr = arr.split(" ");
    let lastArr = newArr.join(',');
    return lastArr;
}
//pulls recipes from the spoonacular api based on search values and runs renderRecipe()
function getRecipes(){
	let api_key = '849d4e84cfcd41858d9dda42ac775fb2';
	let cuisine = $('#cuisine').val();
	console.log(cuisine)
	let diet = $('#diet').val();
	console.log(diet)
	let enteredIngredients =  $('#ingredientsSelect').val();
	let ingredients = ingSearchString(enteredIngredients);
	fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&fillIngredients=true&cuisine=${cuisine}&diet=${diet}&instructionsRequired=true&addRecipeInformation=true&apiKey=${api_key}`)
	.then(response => response.json())
	.then(responseJson => {
		if (responseJson.results.length === 0){
			noResults()
			console.log(responseJson)
		} else {
			console.log(responseJson)
			renderRecipe(responseJson)
		}
	})
	.catch(error => console.log(error))
	formReset()
}

//listens for submit button to be pressed and empties each section and runs getRecipe function
function submit(){
	$('#recipeForm').submit(event => {
		event.preventDefault();
		nutritionInformation.id = "";
		emptyDisp()
		$('.navBar').toggleClass('shut')
		$('.navBar').toggleClass('open')
		$('#recipeForm').toggleClass('hidden')
		$('nav p').toggleClass('hidden')
		$('#title').removeClass('hidden')
		$('.topSec').removeClass('hidden')
		$('#instructions').removeClass('hidden')
		$('footer').removeClass('hidden')
		$('#shopping').removeClass('hidden')
	})
}
//Event listeners for the slider, start, and retry buttons


	$('#showcase').on('click', "#starter", event => {
		$('#showcase').empty()
		$(".navBar").removeClass('hidden')
	})

	$('.slider').on('click', event => {
		$('.navBar').toggleClass('open')
		$('.navBar').toggleClass('shut')
		$('#recipeForm').toggleClass('hidden')
		$('nav p').toggleClass('hidden')
	})

	$('#retry').on('click', event => {
		$('.navBar').toggleClass('shut')
		$('.navBar').toggleClass('open')
		$('#recipeForm').toggleClass('hidden')
		$('nav p').toggleClass('hidden')
		$('#title').toggleClass('hidden')
		$('.topSec').toggleClass('hidden')
		$('#instructions').toggleClass('hidden')
		$('footer').removeClass('hidden')
		$('.oops').toggleClass('hidden')
	})

//functions for rendering page

function renderRecipe(obj){
	let rand = Math.floor(Math.random()*obj.results.length);
	//print rcipe title
	$('#title').append(`<h2>${obj.results[rand].title}</h2>`);
	//print recipe image
	$('#image').append(`<img src="${obj.results[rand].image}" alt="recipe Image">`);
	//print used ingredients
	for (let i = 0; i < obj.results[rand].usedIngredients.length; i++){
		$('#ingredients').find('ol').append(`<li>${obj.results[rand].usedIngredients[i].original}</li>`)
	}
	for (let i = 0; i < obj.results[rand].missedIngredients.length; i++){
		$('#ingredients').find('ol').append(`<li>${obj.results[rand].missedIngredients[i].original}</li>`)
	}

	obj.results[rand].analyzedInstructions[0].steps.forEach(obj => {
		$('#instructions').append(`<li>${obj.step}</li>`)
	})
	// print url
	$('footer').append(`<a href=${obj.results[rand].sourceUrl}`)

	//fill array with missed ingredients
	return	ingredientsObject.id = obj.results[rand].id
}


function emptyDisp(){
	$('#title').replaceWith('<section class="" id="title"></section>')
	$('#image').replaceWith('<section class="" id="image"></section>')
	$('#ingredients').replaceWith('<section class="hidden" id="ingredients"><h3>Ingredients:</h3><ol class="ingredientList"></ol></section>')
	$('#instructions').replaceWith('<section class="hidden" id="instructions"><h3>Instructions:</h3><ol class="instructList"></ol></section>')
	getRecipes()
}

function formReset(){
	$('#ingredientsSelect').val('')
	$('#cuisine').val('')
	$('#diet').val('')
}

//renders the error message window

function noResults(){
	$('.oops').toggleClass('hidden')
}


//Shopping list Functions

//listen for click on shopping cart to grow shopping section and fix remove hidden class from ul
$('.cart').on('click', event=> {
	if ($('.shopping').hasClass('shoppingList')){
		let theId = event.currentTarget.id
		console.log(theId)
		$('.nutContainer').empty().toggleClass('hidden')
		$('.shopping').toggleClass('shoppingList').toggleClass('zeroBottom')
	} else {
		$('.shopping').toggleClass('shoppingList').toggleClass('zeroBottom')
		$('.nutContainer').toggleClass('hidden')
		nutritionInformation(ingredientsObject)
	}
})


//list nutriction Information
function nutritionInformation(obj){
	let api_key = '849d4e84cfcd41858d9dda42ac775fb2';
	fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${obj.id}/nutritionWidget?defaultCss=true`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "d253257eddmshc83c0e4eacc6000p1d5b98jsn5bb91cdbab01",
		"accept": "text/html"
		}
	})
	.then(response => response.text())
	.then(responseText => {
		console.log(responseText)
		$('.nutContainer').html(`${responseText}`)
	})
	.catch(err => {
		console.log(err);
	});
}
//print each missed ingredient to the list



$(submit)

