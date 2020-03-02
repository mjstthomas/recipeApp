console.log('connected')

function getRecipes(){
	let api_key = '849d4e84cfcd41858d9dda42ac775fb2';
	let cuisine = $('#cuisine').val();
	let diet = $('#diet').val();
	let enteredIngredients =  $('#ingredients').val();
	let ingredientsArr = enteredIngredients.split(' ');
	let ingredients = ingredientsArr.join('')
	fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&fillIngredients=true&cuisine=${cuisine}&diet=${diet}&instructionsRequired=true&addRecipeInformation=true&apiKey=${api_key}`)
	.then(response => response.json())
	.then(responseJson => console.log(responseJson))
	.catch(error => console.log(error))
}

function submit(){
	$('#recipeForm').submit(event => {
		event.preventDefault();
		getRecipes()
		$('.navBar').addClass('shut')
		$('#recipeForm').toggleClass('hidden')
	})
}

	$('#showcase').on('click', "#starter", event => {
		$('#showcase').empty()
		$(".navBar").removeClass('hidden')
		console.log('hello')
	})

submit()