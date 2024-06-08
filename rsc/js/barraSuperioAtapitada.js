window.addEventListener('resize', function (){
    let janelaLogin = this.document.getElementById('html-login')
    let header = this.document.getElementById('header-login')
    let navMenu = this.document.getElementById('nav-menu-navegacao')
    let nav = this.document.getElementById('nav')

    if (window.innerWidth < 636) {
        navMenu.style.width = '150px';
        header.style.height = '90px';
        nav.style.flexDirection = 'column';
    }else{
        navMenu.style.width = '400px';
        header.style.height = '80px';
        nav.style.flexDirection = 'row';}
})

window.addEventListener('resize' || 'pageshow', function () {

    let card = this.document.getElementById('card');

 if ((window.innerHeight < 550))
    {
     card.style.height = '95%';
    }
});

window.addEventListener('resize', function () {

    let card = this.document.getElementById('card');

 if ((window.innerHeight > 940))
    {
     card.style.height = '265px';
    }
});