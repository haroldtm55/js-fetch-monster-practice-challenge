// Create a form with name, age, description textbox and button

document.getElementById('create-monster').appendChild(document.createElement('form')).setAttribute('id','monsterForm')
const monsterForm = document.getElementById('monsterForm')
monsterForm.appendChild(document.createElement('input')).setAttribute('id', 'name')
document.getElementById('name').setAttribute('placeholder','name...')
monsterForm.appendChild(document.createElement('input')).setAttribute('id', 'age')
document.getElementById('age').setAttribute('placeholder','age...')
monsterForm.appendChild(document.createElement('input')).setAttribute('id', 'description')
document.getElementById('description').setAttribute('placeholder','description...')
monsterForm.appendChild(document.createElement('button')).innerText = 'Create'

let pageNumber = 1

// Create a submit addEventListener to the form

monsterForm.addEventListener('submit', (e)=> {
  const formData = {
    name: document.getElementById('name').value,
    age: parseInt(document.getElementById('age').value),
    description: document.getElementById('description').value
  }
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }
  // Send the fetch request attaching name, age and description in a submit data function
  renderMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`,configObj)
})
  
  


// Render the monster json
renderMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)



    

// Create a click addEventListener to the bottom buttons. It will take a variable that increases or decreases by 1 per click, updating the GET request.

const fwdButton = document.getElementById('forward')
const backButton = document.getElementById('back')

fwdButton.addEventListener('click', () => {
  document.getElementById('monster-container').innerHTML = ''
  renderMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber+=1}`)
})

backButton.addEventListener('click', () => {
  document.getElementById('monster-container').innerHTML = ''
  if (pageNumber<1) {
    pageNumber = 1
  }
  renderMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber+-1}`)
})

function renderMonsters(url,configObj = null) {
  
  fetch(url,configObj)
  .then(response => response.json())
  .then(monsters => {
  //Create a Div container for each monster. Each Div container will have <h2>, <h4>, and <p> tags. <h2> name, <h4> age, <p> description. GET the info needed on each tag.
  const monsterContainer = document.getElementById('monster-container')
  console.log(monsters)
  monsters.forEach(() => monsterContainer.appendChild(document.createElement('div')))
  const divMonsters = document.querySelectorAll('div#monster-container div')
  let monstersIndex = 0
  divMonsters.forEach(element => {
    element.appendChild(document.createElement('h2')).textContent = monsters[monstersIndex].name
    element.appendChild(document.createElement('h4')).textContent = `Age: ${monsters[monstersIndex].age}`
    element.appendChild(document.createElement('p')).textContent = `Bio: ${monsters[monstersIndex].description}`
    monstersIndex+=1
  })
})
}