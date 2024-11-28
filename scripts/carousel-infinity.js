const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

// Declarado variável para arrastar os compoenentes
let isDragging = false, startX, startScrollLeft;

//Declarando uma variável para calcular para saber o tamanho da tela em realação a um card
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//QUando chegar no 1 card ou no ultimo era injetar um classe html

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
});

carouselChildrens.slice(0,cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML)
});
//Botões do carrossel

arrowBtns.forEach(btn => {
    btn.addEventListener("click",() => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
    })
});

//Função para arrastar os componentes 

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
        // lembra o inicio do cursor e scrola a posição inicial do carrossel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

//arrow function da função de "arrastar".
const dragging = (e) => {
    if(!isDragging) return;

    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

}

// Remover a classe draggin, que coloca alguns etilos em css quando não se tem mais o click ativado
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging")
    
}

// adiciona class css quando o scroll chega ao fim, dando assim a impressão de scroll infnito,

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } 
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

//Lista de comandos 

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

