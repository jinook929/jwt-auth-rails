console.log("JWT Test!")

const BASE_URL = "http://localhost:3000/api/v1"

fetch(`${BASE_URL}/users`).then(res => res.json()).then(data => {
  console.log("Users Data:", data)
  data.forEach(user => {
    
  })
  //// to show existing usernames, uncomment the 2 lines below
  // const users = data.map(user => user.username).join(" / ")
  // document.body.prepend(users)
})

document.querySelector("#signupform").addEventListener("submit", (e) => {
  e.preventDefault()
  auth("users", e)
})

document.querySelector("#loginform").addEventListener("submit", (e) => {
  e.preventDefault()
  auth("login", e)
})

function auth(route, e) {
  fetch(`${BASE_URL}/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
    },
    body: JSON.stringify({
      user: {
        username: e.target.children[2].value.trim(), 
        password: e.target.children[4].value.trim(),
        avatar: "https://robohash.org/Marcel.png?size=50x50&set=set1",
        bio: `Hi, I am ${e.target.children[2].value}.`
      }
    })
  }).then(res => res.json())
  .then(data => {
    console.log("fetch data", data)

    if(data.message) {
      createCard(data.message)
      return
    }

    if(document.querySelector("#card")) document.querySelector("#card").remove()

    sessionStorage.setItem("jwt", data.jwt)
    
    const innertext = `
    <a href="http://www.google.com/search?q=${data.user.username}" target="_blank"><img src="${data.user.avatar}"></a>
    <h1>Logged in as [ <span id="profile" style="cursor: pointer;">${data.user.username}</span> ]</h1>
    <p>(Click username to see bio.)</p>
    <button id="logoutbtn">Log Out</button>
    `
    createCard(innertext)

    document.querySelector("#logoutbtn").addEventListener("click", e => {
      if(document.querySelector("#card")) {
        sessionStorage.clear()
        document.querySelector("#card").remove()
        console.log("logged out... jwt:", sessionStorage.getItem("jwt"))
      }
    })

    e.target.children[2].value = ""
    e.target.children[4].value = ""
    console.log("logged in with jwt:", sessionStorage.getItem("jwt"))

    document.querySelector("#profile").addEventListener("click", e => {
      alertProfile()
    })
  })
}

function alertProfile() {
  fetch(`http://localhost:3000/api/v1/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`
    }
  }).then(res => res.json()).then(obj => {
    console.log("Profile:", obj)
    alert(`${obj.user.username}'s Bio:\n${obj.user.bio}`)
  })
}

function createCard(text) {
  const card = document.createElement("h2")
  card.id = "card"
  card.style.textAlign = "center"
  card.innerHTML = text
  document.body.append(card)
}