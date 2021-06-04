const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');
let limit = 100
let offset = 0
let idx = 1
let search = ""
let face = 1
let back = 1

async function getPokemon() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await res.json()
  console.log(data);
  return data.results


}
getPokemon()


async function showPokemons() {
  const post = await getPokemon()
  post.forEach((item) => {
    const el = document.createElement("div")
    el.classList.add("post")
    el.innerHTML = `
    <div class="number">${idx}</div>
    <div class="post-info">
    <h2 class="post-title">${item.name}</h2>
                    <p class="post-body">${item.url}</p>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${face}.png" alt="#">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${back}.png" alt="#">

                    </div>
                    `
    idx++
    face++
    back++



    postsContainer.append(el)
    el.addEventListener('click', function () {
      let arr = item.url.split('/')
      const id = (arr[arr.length - 2]);
      window.open(`details.html?id=${id}`)
    })

  });
  applayFilter(search)

}

showPokemons()
function loadPokemon() {
  loading.classList.add('show')

  setTimeout(() => {
    loading.classList.remove('show')
    setTimeout(() => {
      offset += 5
      showPokemons()
    }, 300)
  }, 1000)
}
window.addEventListener('scroll', function () {
  const { scrollTop, scrollHeight, clientHeight } = this.document.documentElement
  if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
    loadPokemon()
  }
})

filter.addEventListener('keyup', function () {
  search = this.value
  applayFilter(search)
})
function applayFilter(value) {
  const posts = document.querySelectorAll('.post')
  posts.forEach((item) => {
    if (item.querySelector(".post-title").innerHTML.indexOf(value) === 0) {
      item.style.display = "flex"
    } else {

      item.style.display = "none"
    }
  })
}