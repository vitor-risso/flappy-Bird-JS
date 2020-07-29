//console.log('[DevSoutinho] Flappy Bird');
//console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// passaro
const flappyBird = {
    spriteX : 0,
    spriteY : 0,
    largura : 35,
    altura : 25,
    x : 10,
    y : 50,
    gravidade:0.25,
    velocidade: 0,

    atualiza () {
        flappyBird.velocidade += flappyBird.gravidade ;
        console.log(flappyBird.velocidade) ;
        flappyBird.y += flappyBird.velocidade;
    },

    desenha(){
            contexto.drawImage(
            sprites, 
            flappyBird.spriteX , flappyBird.spriteY ,  //xSprite , ySprite
            flappyBird.largura , flappyBird.altura , // Tamanho do recorte na Sprite
            flappyBird.x , flappyBird.y , 
            flappyBird.largura , flappyBird.altura ,

        );
    }
}

// chao
const chao ={

    spriteX : 0,
    spriteY : 610,
    largura : 224,
    altura : 113,
    x : 0,
    y : canvas.height - 113,
    
    desenhaChao(){
        contexto.drawImage (
            
            sprites, 
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            chao.x, chao.y, 
            chao.largura, chao.altura,
        );
       
        contexto.drawImage (
            
            sprites, 
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            (chao.x+chao.largura), chao.y, 
            chao.largura, chao.altura,
        );
       
    },

}


// Plano de Fundo

const fundo ={

    spriteX : 390,
    spriteY : 0,
    largura : 275,
    altura : 204,
    x : 0,
    y : canvas.height - 204,

    desenhaFundo(){

        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0,canvas.width, canvas.height)

        contexto.drawImage (
            sprites, 
            fundo.spriteX, fundo.spriteY, 
            fundo.largura, fundo.altura, 
            fundo.x, fundo.y, 
            fundo.largura, fundo.altura
        );

        contexto.drawImage (
            sprites, 
            fundo.spriteX, fundo.spriteY, 
            fundo.largura, fundo.altura, 
            (fundo.x + fundo.largura), fundo.y, 
            fundo.largura, fundo.altura
        );
    },
}

//Tela de inicio

const start = {
    spriteX : 134,
    spriteY : 0,
    largura : 174,
    altura : 152,
    x : (canvas.width/2 - 174 /2),
    y : 50,

    desenha(){
        contexto.drawImage(
            sprites, 
            start.spriteX, start.spriteY, 
            start.largura, start.altura, 
            start.x, start.y, 
            start.largura, start.altura
        );
    },
}

//

// TELAS

//

let TelaAtual ={}

function mudaTela(novaTela) {
    TelaAtual = novaTela;
}

const Telas = {
    Inicio: {
        desenha(){

            fundo.desenhaFundo();
            chao.desenhaChao();
            flappyBird.desenha();
            start.desenha();
            

        },

        click(){
            mudaTela(Telas.Jogo)
        },

        atualiza(){

        }
    },
}

Telas.Jogo ={
    desenha(){
        fundo.desenhaFundo();
        chao.desenhaChao();
        flappyBird.desenha();
    },

    atualiza(){
        flappyBird.atualiza();

    }
}

// loop
function loop (){
    
    TelaAtual.desenha();
    TelaAtual.atualiza();
    

    //flappyBird.y += 1;  -> para fazer o flappy-Bird cair
 
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(TelaAtual.click){
        TelaAtual.click()
    }
})

mudaTela(Telas.Inicio);
loop();
