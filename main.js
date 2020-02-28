console.log('connected')

let api_id = '846a99b2';
let api_key = '75102f60b6053ece0d305d66405f78ec';

function getRecipes(){
	fetch(`https://api.edamam.com/search?q=chicken&app_id=${api_id}&app_key=${api_key}`)
	.then(response => response.Json())
	.then(responseJson => console.log(responseJson))
	.catch(error => console.log(error))
}