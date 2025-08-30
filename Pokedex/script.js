const nome_pokemon = document.querySelector("#nome");
const numero_pokemon = document.querySelector("#numero");
const imagem_pokemon = document.querySelector("#img");
const tipo1 = document.querySelector("#tipo_elemento");
const tipo2 = document.querySelector("#tipo_elemento2");

const form = document.querySelector("#form");
const input = document.querySelector("#barra");

const fat_pokemon = async (pokemon) => {
  nome_pokemon.innerHTML = "Carregando...";
  tipo1.innerHTML = "Carregando...";
  tipo2.innerHTML = "";
  

  const API_response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (API_response.status == 200) {
    const data = await API_response.json();
    return data;
  }
};

const reder_pokemon = async (pokemon) => {
  const data = await fat_pokemon(pokemon);
  if (data) {
    nome_pokemon.innerHTML = data.name;
    numero_pokemon.innerHTML = data.id;
    imagem_pokemon.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    tipo1.innerHTML = data.types[0].type.name;
    tipo2.innerHTML = data.types[1].type.name;
  } else {
    nome_pokemon.innerHTML = "Pokémon não encontrado...";
    numero_pokemon.innerHTML = "000";
    imagem_pokemon.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/MissingNo.svg/1200px-MissingNo.svg.png";
    tipo1.innerHTML = "Null";
    tipo2.innerHTML = "";
  }
};

reder_pokemon("charizard");

form.addEventListener("submit", (Event) => {
  Event.preventDefault();

  reder_pokemon(input.value.toLowerCase());
  input.value = "";
});
