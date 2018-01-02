import React, { Component } from "react";

function capitalise(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypeColor(string){

    return typeColors[string];

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

const urlForPokemon = pokedexNo => `https://pokeapi.co/api/v2/pokemon/${pokedexNo}`


class SearchBar extends Component {

    render(){
        
        return (
                
            <div>

                <input type="search" />

            </div>
        
        );

        
    }

}

class Pokemon extends Component {

    constructor(props){

        super(props)
        this.state = {}
    }

    componentDidMount(){

        fetch(urlForPokemon(this.props.pokedexNo))
        .then(d => d.json())
        .then(d => {

            this.setState({

                pokemonData: d,               

            })

        })

    }
    
        render(){

            if(!this.state.pokemonData) return <p style={pokemonStyle}> Loading... </p>

            if(!this.state.pokemonData.types[1]) return (

                    
                <div style={pokemonStyle}>
    
                    <img src={this.state.pokemonData.sprites.front_default}/>
                    <h3> {capitalise(this.state.pokemonData.name)} </h3>
                    <div style={{...typeStyle, backgroundColor:  getTypeColor(this.state.pokemonData.types[0].type.name)}}  className="type"> {capitalise(this.state.pokemonData.types[0].type.name)} </div>
    
                </div>
            
            );

            
            return (

                    
                <div style={pokemonStyle}>
    
                    <img src={this.state.pokemonData.sprites.front_default}/>
                    <h3> {capitalise(this.state.pokemonData.name)} </h3>
                    <div style={{...typeStyle, backgroundColor:  getTypeColor(this.state.pokemonData.types[1].type.name)}}  className="type"> {capitalise(this.state.pokemonData.types[1].type.name)} </div>
                    <div style={{...typeStyle, backgroundColor:  getTypeColor(this.state.pokemonData.types[0].type.name)}}  className="type"> {capitalise(this.state.pokemonData.types[0].type.name)} </div>
    
                </div>
            
            );
    
            
        }
    
    }

class App extends Component {

    render(){

        return (
            <div id="app">
                <h1> Pokédex </h1>
                <SearchBar />
                <Pokemon pokedexNo={"1"} />
                <Pokemon pokedexNo={"2"} />
                <Pokemon pokedexNo={"3"} />
                <Pokemon pokedexNo={"4"} />
                <Pokemon pokedexNo={"5"} />
                <Pokemon pokedexNo={"6"} />
                <Pokemon pokedexNo={"7"} />
                <Pokemon pokedexNo={"8"} />
                <Pokemon pokedexNo={"9"} />
            </div>

        );


    }

}

export default App;