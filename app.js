const arrayRecetas = []
const modal = document.querySelector("#modal")
const imgEvento = document.querySelectorAll(".imgEvento")


window.addEventListener("load", async () => {
  const request = await fetch('recetas.json')
  const response = await request.json()
  
  for (const key in response) {
    arrayRecetas.push(response[key])
  }
  
  interfazCards(arrayRecetas)
  console.log(arrayRecetas);
})

const interfazCards = (param) => {
  const containerProducts = document.querySelector("#containerProducts")
  containerProducts.innerHTML = ""
  param.map( el => {
    const {receta, ingredeintes, procedimiento, img, id} = el;
    containerProducts.innerHTML += `
                                    <div class="cardRecetas">
                                      <div class="card " style="width: 18rem;">
                                        <img src=${img} class="card-img-top" alt="...">
                                        <div class="card-body">
                                          <h5 class="card-title">${receta}</h5>
                                          <p class="card-text">${ingredeintes}.</p>
                                          <a href="#" id=${id} class="btnItemDetail btn btn-primary">Ver más</a>
                                        </div>
                                      </div>
                                    </div>
    `

  })

  itemDetail()
}

const itemDetail = () => {
  const btn = document.querySelectorAll(".btnItemDetail")
  // const containerModal = document.querySelector("#modal")
  for (const iterator of btn) {
    iterator.addEventListener("click", (e) => {
      e.preventDefault()
      console.dir(iterator.id);
      const busqueda = arrayRecetas.find(item => item.id == iterator.id)
      let lista= "";
      for (let i = 0; i < busqueda.procedimiento.length; i++) {
        lista  += `<li>${ busqueda.procedimiento[i]} </li>`
        
      }
      modal.style.display = "grid"
      modal.innerHTML += `
                                      <div class="itemDetail">
                                      <h2>${busqueda.receta}</h2>
                                      <div class="itemDetailImg">
                                          <img src=${busqueda.img} alt="">
                                        </div>
                                          <div class=itemDetailText>
                                          <p>${busqueda.ingredeintes}</p>
                                          <ul>${lista}</ul>
                                    </div>
      
      `
    })
  }
}



modal.addEventListener("click", closeModal )

function closeModal () {
  modal.style.display = "none";
  modal.innerHTML = ""
}

const inputFilter = document.querySelector("#inputFilter")
inputFilter.addEventListener("input" , (e) => {
  
  let value = e.target.value
  interfazCards( arrayRecetas.filter( item => item.receta.toLowerCase().includes(value)))
  
})

imgEvento.forEach( el => {
  el.addEventListener("click", (e) => {
    console.log(e.target.id);
    const filter = arrayRecetas.filter( el => el.receta == e.target.id )
    filter.length <= 0 ?  interfazCards(arrayRecetas) : interfazCards(filter)
  })
})