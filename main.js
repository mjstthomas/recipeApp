console.log('connected')

function getRecipes(){
	let api_id = '846a99b2';
	let api_key = '75102f60b6053ece0d305d66405f78ec	—';
	let cuisine = $('#cuisine').val();
	let diet = $('#diet').val();
	fetch(`https://api.edamam.com/search?app_id=${api_id}&app_key=${api_key}&q=chicken&cuisineType=${cuisine}&diet=${diet}`)
	.then(response => response.Json())
	.then(responseJson => console.log(responseJson))
	.catch(error => console.log(error))
}

function submit(){
	$('#recipeForm').submit(event => {
		event.preventDefault();
		getRecipes()
	})
}

$(submit)