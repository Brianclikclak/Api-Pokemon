const pokemon_count = 150;
const colors = {
  fire: '#FD4217',
  grass: '#228F41',
  electric: '#eed535',
  water: '#2F72FF',
  ground: '#ab9842',
  rock: '#a38c21',
  fairy: '#fdb9e9',
  poison: '#8F49FF',
  bug: '#729F3F',
  dragon: '#53a4cf',
  psychic: '#f366b9',
  flying: '#3dc7ef',
  fighting: '#d56723',
  normal: '#A4ACAF',
  ghost : '#7b62a3 ',
  ice : '#51c4e7'

};

const getPokemons = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/", {
      params: { limit: pokemon_count }
    });

    if (response.status === 200) {
      const pokemonList = response.data.results;

      for (let i = 0; i < pokemonList.length; i++) {
        const pokemonUrl = pokemonList[i].url;

        await axios.get(pokemonUrl)
          .then((response) => {
            const pokemonData = response.data;
            console.log(pokemonData);
            createCard(pokemonData);
            
            
          });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getPokemons();

function createCard(pokemonData){
  const poke_container = document.getElementById('poke-container');

  const pokeTypes = pokemonData.types.map(type => type.type.name);
  const type = pokeTypes[0];
  const color = colors[type];

  let containerPokemon = document.createElement("div")
  containerPokemon.classList.add('pokemon');
  poke_container.appendChild(containerPokemon);

  let pokeImg = document.createElement("img");
  pokeImg.src = pokemonData.sprites.front_default;
  containerPokemon.appendChild(pokeImg);

  let info = document.createElement("div");
  info.classList.add('info')
  containerPokemon.appendChild(info);

  let order = document.createElement("p");
  order.classList.add ('number');
  order.textContent = `# ${pokemonData.id.toString().padStart(3, '0')}`;
  info.appendChild(order)

  let pokeName = document.createElement("p");
  pokeName.classList.add('name');
  pokeName.textContent = `${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1).toLowerCase()}`;
  info.appendChild(pokeName);

  let pokeType = document.createElement("p");
  pokeType.classList.add('type');
  pokeType.textContent = `${type} `;
  pokeType.style.backgroundColor = color;
  info.appendChild(pokeType);


}


