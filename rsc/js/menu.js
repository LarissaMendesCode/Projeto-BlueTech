
window.addEventListener("scroll", function(){
    let header = this.document.querySelector('#header-home')
    header.classList.toggle('rolagem', window.scrollY > 0)
})