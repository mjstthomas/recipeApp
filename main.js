console.log('connected')

const ingSearchString = str => {
    let arr = str.replace(/(,\s*)+/, ',');
    arr = arr.replace(/(and\s*)+/, "");
    console.log(arr)
    let newArr = arr.split(" ");
    let lastArr = newArr.join(',');
    console.log(lastArr)
    return lastArr;
}

function getRecipes(){
	let api_key = '849d4e84cfcd41858d9dda42ac775fb2';
	let cuisine = $('#cuisine').val();
	let diet = $('#diet').val();
	let enteredIngredients =  $('#ingredientsSelect').val();
	let ingredients = ingSearchString(enteredIngredients);
	fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&fillIngredients=true&cuisine=${cuisine}&diet=${diet}&instructionsRequired=true&addRecipeInformation=true&apiKey=${api_key}`)
	.then(response => response.json())
	.then(responseJson => {
		if (responseJson.totalResults === 0){
			noResults()
		} else {
			renderRecipe(responseJson)
		}
	})
	.catch(error => console.log(error))
	formReset()
}

function submit(){
	$('#recipeForm').submit(event => {
		event.preventDefault();
		emptyDisp()
		$('.navBar').toggleClass('shut')
		$('.navBar').toggleClass('open')
		$('#recipeForm').toggleClass('hidden')
		$('nav p').toggleClass('hidden')
		$('#title').removeClass('hidden')
		$('.topSec').removeClass('hidden')
		$('#instructions').removeClass('hidden')
		$('footer').removeClass('hidden')
	})
}

	$('#showcase').on('click', "#starter", event => {
		$('#showcase').empty()
		$(".navBar").removeClass('hidden')
		console.log('hello')
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
		$('#title').removeClass('hidden')
		$('.topSec').removeClass('hidden')
		$('#instructions').removeClass('hidden')
		$('footer').removeClass('hidden')
		$('.oops').toggleClass('hidden')
	})

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
	// print instruction
	// for (let i = 0; i < obj.results[rand].analyzedInstructions[0].steps.length; i++){
	// 	$('#instructions').find('ol').append(`<li>${obj.results[rand].analyzedInstructions[0].steps[i].step}</li>`)
	// }
	obj.results[rand].analyzedInstructions[0].steps.forEach(obj => {
		$('#instructions').append(`<li>${obj.step}</li>`)
	})
	// print url
	$('footer').append(`<a href=${obj.results[rand].sourceUrl}`)
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

function noResults(){
	$('.oops').toggleClass('hidden')
}
submit()

