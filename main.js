
// VARIABLES

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var interval;
var frames = 0;
var multiplos = [];
var distractores = [];
var bullets = [];

var tablaInicial = Math.floor(Math.random()*(10)+1);

let numeroMultiplicador = document.getElementById('numeroMultiplicador')

numeroMultiplicador.innerHTML = 'tabla ' + tablaInicial;

// FUNCIONES PRINCIPALES

function empieza1(){
    tablaInicial = Math.floor(Math.random()*(10)+1);

    numeroMultiplicador.innerHTML = 'tabla ' + tablaInicial;

    clear();
    multiplos= [];
    distractores = [];

}

function empieza2(){
    tablaInicial = Math.floor(Math.random()*(10)+1);

    numeroMultiplicador.innerHTML = 'tabla ' + tablaInicial;

    clear();
    multiplos= [];
    distractores = [];

}



// CLASES

class Snake{
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.life = 5;
        this.puntos = 0;
        this.speedx = 0;
        this.speedy = 0;
    }
    
    draw(){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }

    newPos (){
        //antes de asignar la nueva posicion, 
        //verificar que este dentro de los limites del canvas
        // si sale, entonces la coordenada es igual al limite
        this.x = this.x + this.speedx;
        this.y = this.y + this.speedy;
    }

    crashWith(multiplos) {
        return (this.x < multiplos.x + multiplos.w) &&
               (this.x + this.w > multiplos.x) &&
               (this.y < multiplos.y + multiplos.w) &&
               (this.y + this.w > multiplos.y)
    }
    crashWith(distractores) {
        return (this.x < distractores.x + distractores.w) &&
               (this.x + this.w > distractores.x) &&
               (this.y < distractores.y + distractores.w) &&
               (this.y + this.w > distractores.y)
    }
}

class Multiplos {
    constructor(x, y, w, h,n) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.n = n;
        this.randomDistractor = this.checkMultiple( tablaInicial );
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = 'red';
        ctx.font = "18pt sans-serif";
        ctx.fillText(this.randomDistractor, this.x+15, this.y+30);
    }
    //azules

    checkMultiple(num){
        let multiNumber = 0; 
        for( let i = 1; i <= 10 ; i++ ){
            let x = Math.floor(Math.random()*(i)+1);
            multiNumber = x;
        }
        let numX = num*multiNumber;
        return numX;
    }
    
}




 
 
class Distractores {
    constructor(x, y, w, h,n) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.n = n;
        this.randomDistractor = this.checkDistractor( tablaInicial );
    }
    draw() {
        //this.y += 2;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = 'black';
        ctx.font = "18pt sans-serif";
        ctx.fillText(this.randomDistractor, this.x+15, this.y+30);
    
        
    }
    checkDistractor(num){

        let multiNumber = 0; 
        for( let i = 1; i <= 10 ; i++ ){
            let x = Math.floor(Math.random()*(i)+1);
            multiNumber = x;
        }
        let numX = num*multiNumber;
        return numX + 1;
       
    }
    
}

class Bullet {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        this.y -= 2;
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    crashWith(multiplos) {
        return (this.x < multiplos.x + multiplos.w) &&
               (this.x + this.w > multiplos.x) &&
               (this.y < multiplos.y + multiplos.w) &&
               (this.y + this.w > multiplos.y)
    }
}

function text() {
    // ctx.font = "30px Arial";
    // ctx.fillStyle = 'black'
    // ctx.fillText("Nivel 1", 5, 25);
    // ctx.fillText("Vidas", 205, 25);
    // ctx.fillText("Tiempo:", 405, 25);
    // ctx.fillText("Puntos:", 605, 25);
    // //ctx.strokeStyle = "#000";
    // ctx.moveTo(0,40);
    // ctx.lineTo(800,40);
    // ctx.stroke();
}


// INSTANCIAS

var snake= new Snake(20,100,50,50);

/*function randomDistractor(min,max)
{
    return Math.floor(Math.random()*(100))
}*/

function generateMultiplos() {

    let newMUltiplo = new Multiplos(Math.floor(Math.random() * 700),Math.floor(Math.random() * 400),50,50);

    let n = newMUltiplo;

    //Verificar que no se sobreponga con multiplos y distractores
    if( multiplos.length == 0 ){
        //if no choca push
        multiplos.push( newMUltiplo );
        //else genera nuevas coordenadas
    }

    multiplos.forEach( elem => {
        let { x,y,w,h } = elem;
        
        if( n.x >= x && n.x <= x+w && n.y >= y && n.y <= y+h  ){
            
        }else{
            if(frames % 240 === 0) {
                multiplos.push( newMUltiplo );
            }        
        }     
    })
}



function drawMultiplos() {
    multiplos.forEach(function(multiplo, i) {
        multiplo.draw();
    })
}

/*function generateDistractores() {
    if(frames % 240 === 0) {
        distractores.push(new Distractores(Math.floor(Math.random() * 700),Math.floor(Math.random() * 400),50,50));
    }
}*/

function generateDistractores() {

    let newDistractor = new Distractores(Math.floor(Math.random() * 700),Math.floor(Math.random() * 400),50,50);

   
    let n = newDistractor;

   

    if( distractores.length == 0 ){
        distractores.push( newDistractor );
    }

    distractores.forEach( elem => {
        let { x,y,w,h } = elem;
        
        if( n.x >= x && n.x <= x+w && n.y >= y && n.y <= y+h  ){
            
        }else{
            if(frames % 240 === 0) {
                distractores.push( newDistractor );
            }        
        }     
    })
}



function drawDistractores() {
    distractores.forEach(function(distractor, i) {
        distractor.draw();
    })
}

function generateBullets() {
    bullets.push(new Bullet(snake.x+5,snake.y-10,5,5));
}

function drawBullets() {
    bullets.forEach(function(bullet, i) {
        bullet.draw();
    })
}


function checkCollition() {
    multiplos.forEach((multiplo, mi) => {
        if(snake.crashWith(multiplo)) {
            multiplos.splice(mi,1);
            snake.puntos++
            //player.life--;
            //console.log(player.life)
            console.log("Colisiones")
        }
        bullets.forEach((bullet, bi) => {
            if(bullet.crashWith(multiplo)) {
                bullets.splice(bi,1);
                multiplos.splice(mi,1);
                console.log("desaparecio")
            }
        })

    });

    distractores.forEach((distractor, di) => {
        if(snake.crashWith(distractor)) {
            distractores.splice(di,1);
            snake.life--;
            console.log(snake.life)
        }
        bullets.forEach((bullet, bi) => {
            if(bullet.crashWith(distractor)) {
                bullets.splice(bi,1);
                distractores.splice(di,1);
                console.log("desaparecio")
            }
        })
        
    });
}


function start (){
    let nivel = document.getElementById('nivel');
    nivel.innerHTML = 'NIVEL 1 '  
    let vidas = document.getElementById('vidas');
    vidas.innerHTML = 'vidas ' + snake.life;
    let tiempo = document.getElementById('tiempo');
    tiempo.innerHTML = 'tiempo' + multiplos.length;
    let puntos = document.getElementById('puntos');
    puntos.innerHTML = 'puntos' + snake.puntos;
    clear();
    generateMultiplos();
    drawMultiplos();
    snake.draw();
    snake.newPos();
    generateDistractores();
    drawDistractores();
    drawBullets();
    checkCollition();
    checkGame();
    
    
    frames += 1
}

function clear(){
    ctx.clearRect(0, 0, 800,500);
}

function gameOver() {
    clearInterval(interval);
    ctx.font = "60px Avenir";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 190, 220);
    ctx.font = "40px Avenir";
    ctx.fillText("presiona la letra 'B' para reinicar", 140, 260);
    gameOver = true;
  }

  function checkGame() {
    if (snake.life===0) {
        return gameOver();
      }
    }
  

interval= setInterval(start,1000/60);

// start();
// start();

// listeners

window.addEventListener('keydown',function(e){
    if(e.keyCode ===37){
        snake.speedx = -2;
    }
    if(e.keyCode ===38){
        snake.speedy = -2;
    }
    if(e.keyCode ===39){
        snake.speedx = 2;
    }
    if (e.keyCode ===40){
        snake.speedy = 2;
    }
    if(gameOver && e.keyCode === 66) {
        location.reload();
      }
    
});

window.addEventListener('keyup',function(e){
    if(e.keyCode ===37){
        snake.speedx = 0;
    }
    if(e.keyCode ===38){
        snake.speedy = 0;
    }
    if(e.keyCode ===39){
        snake.speedx = 0;
    }
    if (e.keyCode ===40){
        snake.speedy = 0;
    }
})

window.addEventListener('keypress', function(e) {
    if(e.keyCode === 32) {
        generateBullets();
    }
    
})

// //Elementos














