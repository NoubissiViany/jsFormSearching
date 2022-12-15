const person = [
  { name: 'Noubissi loic', age: 21 },
  { name: 'Noubi Viany', age: 19 },
  { name: 'Evance Royce', age: 25 },
  { name: 'Kadji Junior', age: 15 },
  { name: 'Homfree Beta', age: 18 },
  { name: 'Vianney Leo', age: 30 },
  { name: 'Flore Elvira', age: 40 },
  { name: 'Cabrel Cratos', age: 50 },
  { name: 'Vance Diezel', age: 60 },
  { name: 'Gaetan Noubi', age: 35 },
  { name: 'Carel Makou', age: 23 }
]

const form = document.querySelector('form')
const userContainer = document.querySelector('.person')

function getInitial (name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('.')
}

function displayUser ({ age, name }) {
  return `
  <div class="user">
    <div class='person'>
     <div class="bg">
      <div class='avatar'>${getInitial(name)}</div>
        <div>
          <h2>${name}</h2>
          <p class="para">${age} year${age > 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  </div>
`
}

function displayUsers (persons) {
  return persons.length
    ? persons.map(displayUser).join('')
    : renderMessage('Sorry! No User Found')
}

function compareNames (name, searchTerm) {
  return name.toLowerCase().includes(searchTerm.toLowerCase())
}

function shouldResolve () {
  return Math.random() < 0.85
}

function searchUsers (name, age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve()) {
        resolve(
          person.filter(
            (user) =>
              !name | compareNames(user.name, name) &&
              (!age || user.age === age)
          )
        )
      } else {
        reject([new Error])
      }
    }, 2000)
  })
}

function loader () {
  return `<div class="load"></div>`
}
function renderMessage (message) {
  return `<div class="message">${message}</div>`
}

userContainer.innerHTML = displayUsers(person)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  userContainer.innerHTML = loader()
  searchUsers(e.target.name.value, +e.target.age.value)
    .then((result) => {
      userContainer.innerHTML = displayUsers(result)
    })
    .catch((e) => {
      userContainer.innerHTML = renderMessage(
        'Error loading users! Please try again'
      )
    })
})
