import React, { Component } from "react";

function capitalise(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypeColor(string){

    return typeColors[string]

}

let pokemonStyle = {
    display: "inline-block",
    padding: "20px"
};

let typeColors = {
    bug: "#A8B820",
    dark: "#705848",
    dragon: "#7038F8",
    electric: "#F8D030",
    fight: "#C03028",
    fire: "#F08030",
    flying: "#A890F0",
    ghost: "#705898",
    grass: "#78C850",
    ground: "#E0C068",
    ice: "#98D8D8",
    normal: "#A8A878",
    poison: "#A040A0",
    psychic: "#F85888",
    rock: "#B8A038",
    steel: "#B8B8D0",
    water: "#6890F0"
}

let typeStyle = {
    display: "inline-block",
    padding: "5px",
    borderRadius: "5px",
    margin: "0 5px 0 5px",
};

let urlForPokemon = pokedexNo => `https://pokeapi.co/api/v2/pokemon/${pokedexNo}`


class SearchBar extends Component {

    render(){
        
        return (
                
            <div>

                <input type="search" onKeyUp={
                    
                    event => this.props.onTextChange(event.target.value)
                    
                }/>

            </div>
        
        );

        
    }

}

class Pokemon extends Component {


        render(){
   
            let thisPokemon = this.props.pokemon
  
            return(            
    
                        
                    <div style={pokemonStyle} name={thisPokemon.name}>
        
                        <img src={"./assets/pokemon/" + thisPokemon.id +  ".png"}/>
                        <h3> {capitalise(thisPokemon.name)} </h3>
                        <h4> #{thisPokemon.id} </h4>
        
                    </div>
                
            );
                
        }
    
    }

class App extends Component {

    constructor(props){

        super(props)
        this.state = {data : {}}
    }

    componentDidMount(){

        let allNames = []

        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(apiCall => apiCall.json())
        .then(apiCall => {

            apiCall.results.map((names, index) => 
            
                allNames[index + 1] = {"id": index + 1, "name": names.name}

            )

            setTimeout(() => {

                this.setState({

                    data: {pokemonData: apiCall, pokemonInfo: allNames},
                    filterString : ''
                    
                    

                })
            }, 1000);

          

        })

    }

    render(){

        return (
            <div id="app">
                <h1> Pokédex </h1>
                <SearchBar onTextChange={text => this.setState({filterString: text})} />

                {this.state.data.pokemonData ?

                <div>

                    
                    {/* {this.state.data.pokemonInfo.filter(pokemon =>

                        pokemon.name.includes("")


                    ).map((pokemon) =>

                        <Pokemon pokemon={pokemon}/>
                   
                    )} */}

                    {this.state.data.pokemonInfo.filter(pokemon =>

                        pokemon.name.includes(
                            this.state.filterString.toLowerCase()
                        )
                    
                    ).map((pokemon) =>

                        <Pokemon pokemon={pokemon}/>
                   
                    )}

                </div>

                : <p> Loading </p>}

            </div>

        );


    }

}

export default App;