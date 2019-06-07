
// VARIABLES

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var interval;
var frames = 0;
var multiplos = [];
var distractores = [];
var bullets = [];

// FUNCIONES PRINCIPALES


// CLASES

class Snake{
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.life = 5;
        this.speedx = 0;
        this.speedy = 0;
    }
    
    draw(){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x,this.y,this.w,this.h);

    }

    newPos (){
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
    }
    draw() {
        //this.y += 2;
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    
}

class Distractores {
    constructor(x, y, w, h,n) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.n = n;
    }
    draw() {
        //this.y += 2;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.w, this.h);
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



function generateMultiplos() {
    if(frames % 180 === 0) {
        multiplos.push(new Multiplos(Math.floor(Math.random() * 700),Math.floor(Math.random() * 400),50,50));
    }
}

function drawMultiplos() {
    multiplos.forEach(function(multiplo, i) {
        multiplo.draw();
    })
}

function generateDistractores() {
    if(frames % 180 === 0) {
        distractores.push(new Distractores(Math.floor(Math.random() * 700),Math.floor(Math.random() * 400),50,50));
    }
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
    nivel.innerHTML = 'Multiplos ' + multiplos.length; 
    clear();
    generateMultiplos();
    drawMultiplos();
    snake.draw();
    snake.newPos();
    generateDistractores();
    drawDistractores();
    drawBullets();
    checkCollition();
    
    frames += 1
}

function clear(){
    ctx.clearRect(0, 0, 800,500);
}

interval= setInterval(start,1000/60);

// listeners

window.addEventListener('keydown',function(e){
    if(e.keyCode ===37){
        snake.speedx = -1;
    }
    if(e.keyCode ===38){
        snake.speedy = -1;
    }
    if(e.keyCode ===39){
        snake.speedx = 1;
    }
    if (e.keyCode ===40){
        snake.speedy = 1;
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














