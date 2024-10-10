import { useEffect, useState } from "react"

// Função assíncrona que busca dados da API de Pokémon
async function fetchPokemon() {
  // Faz uma requisição à API
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
  // Converte a resposta para JSON
  const data = await response.json()
  // Retorna os resultados dos Pokémon
  return data.results
}

function App() {
  // useState cria um estado para armazenar a lista de Pokémon
  const [pokemon, setPokemon] = useState([])
  // Estado para armazenar os detalhes do Pokémon selecionado
  const [pokemonShown, setPokemonShown] = useState(null)

  // useEffect executa a função fetchPokemon quando o componente é montado
  useEffect(() => {
    fetchPokemon().then(resuls => {
      console.log("state change") // Exibe no console que o estado mudou
      console.log(resuls) // Exibe os resultados no console
      setPokemon(resuls) // Atualiza o estado com a lista de Pokémon
    })
  }, []) // A lista vazia [] indica que o efeito só será executado uma vez

  // Função que mostra detalhes de um Pokémon específico
  const showDetails = async (url) => {
    // Busca os detalhes do Pokémon
    const data = await fetch(url).then(res => res.json())
    console.log(data) // Exibe os detalhes no console
    // Atualiza o estado com os detalhes do Pokémon selecionado
    setPokemonShown(data)
  }

  return (
    <div className="app">
      <div>
        <h2>Pokémon</h2>
        <ul className="pokemon">
          {/* Mapeia a lista de Pokémon para exibir os nomes */}
          {pokemon.map(mon => (
            <li key={mon.name}>
              <span>{mon.name}</span>
              <button onClick={() => showDetails(mon.url)}>
                Ver detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Exibe os detalhes do Pokémon selecionado */}
      {pokemonShown && (
        <div>
          <h2>{pokemonShown.name}</h2>
          <img
            src={pokemonShown.sprites.front_default}
            alt=""
          />
          <div className="stat">
            <b>Tipo: </b>
            {/* Exibe os tipos do Pokémon */}
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </div>
          <div className="stat">
            <b>Altura: </b>{pokemonShown.height / 10} m
          </div>
          <div className="stat">
            <b>Peso: </b>{pokemonShown.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Atributos</b>
            <ul>
              {/* Exibe os atributos do Pokémon */}
              {pokemonShown.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  {stat.name}: {base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Habilidades</b>
            <ul>
              {/* Exibe as habilidades do Pokémon */}
              {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name}
                  {is_hidden && " (secreta)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
