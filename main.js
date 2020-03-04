console.log('connected')


function getRecipes(){
	let api_key = '849d4e84cfcd41858d9dda42ac775fb2';
	let cuisine = $('#cuisine').val();
	let diet = $('#diet').val();
	let enteredIngredients =  $('#ingredientsSelect').val();
	let ingredientsArr = enteredIngredients.split(' ');
	let ingredients = ingredientsArr.join('');
	fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&fillIngredients=true&cuisine=${cuisine}&diet=${diet}&instructionsRequired=true&addRecipeInformation=true&apiKey=${api_key}`)
	.then(response => response.json())
	.then(responseJson => {
		console.log(responseJson)
		renderRecipe(responseJson)
	})
	.catch(error => console.log(error))
}

function submit(){
	$('#recipeForm').submit(event => {
		event.preventDefault();
		$('.navBar').toggleClass('shut')
		$('.navBar').toggleClass('open')
		$('#recipeForm').toggleClass('hidden')
		$('#title').removeClass('hidden')
		$('.topSec').removeClass('hidden')
		$('#instructions').removeClass('hidden')
		$('footer').removeClass('hidden')
		emptyDisp()
		// getRecipes()
		formReset()
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
	})


function renderRecipe(obj){
	let rand = Math.floor(Math.random()*obj.length);
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
	for (let i = 0; i < obj.results[rand].analyzedInstructions[0].steps.length; i++){
		$('#instructions').find('ol').append(`<li>${obj.results[rand].analyzedInstructions[0].steps[i].step}</li>`)
	}
	// print url
	$('footer').append(`<a href=${obj.results[rand].sourceUrl}`)
}


function emptyDisp(){
	$('#title').empty()
	$('#image').empty()
	$('#ingredients').empty()
	$('#instructions').empty()
}

function formReset(){
	$('#ingredientsSelect').val('')
	$('#cuisine').val('')
	$('#diet').val('')
}


submit()

