const urlParams = new URLSearchParams(location.search)
const id = urlParams.get('id');
console.log(id);
const namePokemon = urlParams.get('id')
console.log(namePokemon);
async function loadPokemons() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const pokemon = await res.json()
    return pokemon
}
loadPokemons()

const cards = document.querySelector('.cards')
const container = document.querySelector('.container')
const frontimg = document.querySelector('.frontimg')
const back = document.querySelector('.back')

let img = id
let count = 0
let dis = false;
let time;
container.addEventListener('click', function () {
    // cards.classList.toggle('active')
    clearTimeout(time)
    if (!dis) {
        dis = true;
        count++
        if (count === 2) {
            cards.style.transform = `rotateY(${count * 180}deg)`
            time = setTimeout(() => {
                cards.style.transition = "unset"
                cards.style.transform = `rotateY(0deg)`
                setTimeout(() => {
                    cards.style.transition = "0.5s all ease-in-out"
                }, 100);
                count = 0
            }, 500);
        } else {
            cards.style.transform = `rotateY(${count * 180}deg)`
        }
        setTimeout(() => {
            dis = false
        }, 500);
    }
})


async function imgPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const pokemon = await res.json()
    const div = document.createElement('div')
    const h2 = document.createElement('h2')

    h2.innerHTML = pokemon.name
    div.innerHTML = `
    
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${img}.png" alt="#">
<div class="height"><h2>Height${pokemon.height}</h2></div>
<div class="height"><h2>Weight${pokemon.weight}</h2></div>
<div class="height"><h2>Order${pokemon.order}</h2></div>
<div class="height"><h2>Base experience${pokemon.base_experience}</h2></div>
<div class="height"><h2>${pokemon.types[0].type.name}</h2></div>
    `
    // div.style.display = 'flex'
    // div.style.justifyContent = 'center'
    // div.style.flexDirection = 'column'
    div.style.cssText = `
        width:120px;
        cursor:pointer
    `
    frontimg.append(h2)
    frontimg.append(div)
    console.log(pokemon);
    return pokemon
}
imgPokemon()



async function backImg() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const pokemon = await res.json()
    const div = document.createElement('div')
    div.classList.add('backimg')
    div.innerHTML = `
    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="#">
 
                     `
    back.append(div)
    return pokemon

}
backImg()