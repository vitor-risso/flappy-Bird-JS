//console.log('[DevSoutinho] Flappy Bird');
//console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

let frames =0;

const sprites = new Image();
sprites.src = './sprites.png';

const HIT_sound = new Audio();
HIT_sound.src = './efeitos/hit.wav';

const JUMP_sound = new Audio();
JUMP_sound.src ='./efeitos/pulo.wav'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// chao

function createChao(){
    const chao ={

        spriteX : 0,
        spriteY : 610,
        largura : 224,
        altura : 113,
        x : 0,
        y : canvas.height - 113,

        atualiza(){
            const movimentoDoChao = 1;
            const repeteEm = chao.largura/2;          
            const movimento = chao.x - movimentoDoChao;
            chao.x = movimento % repeteEm;

        },
        
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
    return chao;
};

function fazColisao (flappyBird , chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y

    if(flappyBirdY >= chaoY){
        return true
    } return false

}

// passaro
function createFlappyBird (){
    const flappyBird = {
        spriteX : 0,
        spriteY : 0,
        largura : 35,
        altura : 25,
        x : 10,
        y : 50,
        gravidade:0.25,
        pulo: 4.6,
        velocidade: 0,
    
        atualiza () {
            if(fazColisao(flappyBird, globais.chao)){
                console.log('colidiu');
                HIT_sound.play();

                //Delay apra reiniciar a tela
                setTimeout(()=>{
                    mudaTela(Telas.Inicio)
                }, 500)
                return
            }
    
            flappyBird.velocidade += flappyBird.gravidade ;
           // console.log(flappyBird.velocidade) ;
            flappyBird.y += flappyBird.velocidade;
        },

        movimentos: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio 
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, // asa no meio 
          ],

        frameAtual:0,
        atualizaFrameAtual(){
            //console.log(frames)
            const base = 10;
            const implemento = frames % base === 0 //quando o resto da divisao for zero o valor passado será true o que ativará o if assim rodando os desenhos do passaro

            if(implemento){
            const BaseDoIncremento =1;
            const incremento = BaseDoIncremento + flappyBird.frameAtual;
            const repeticoes = flappyBird.movimentos.length;
            this.frameAtual = incremento % repeticoes; 
            }
           
        },
        desenha(){
            flappyBird.atualizaFrameAtual()
                
                const {spriteX , spriteY} = flappyBird.movimentos[this.frameAtual];

                contexto.drawImage(
                sprites, 
                spriteX , spriteY ,  //xSprite , ySprite
                flappyBird.largura , flappyBird.altura , // Tamanho do recorte na Sprite
                flappyBird.x , flappyBird.y , 
                flappyBird.largura , flappyBird.altura ,
    
            );
        },
    
        pula(){
            console.log('devo pular')
            flappyBird.velocidade = -flappyBird.pulo
            JUMP_sound.play ();
        }
    }

    return flappyBird;
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


const globais ={};
let TelaAtual ={};


function mudaTela(novaTela) {
    TelaAtual = novaTela;

    if(TelaAtual.inicializa){
        TelaAtual.inicializa();
    }
};



const Telas = {
   
    Inicio: {

        inicializa(){
            globais.flappyBird = createFlappyBird();
            globais.chao = createChao();
        },
      
        desenha(){

            fundo.desenhaFundo();
            globais.chao.desenhaChao();
            globais.flappyBird.desenha();
            start.desenha();
            

        },

        click(){
            mudaTela(Telas.Jogo)
        },

        atualiza(){

        }
    },
};

Telas.Jogo ={
    desenha(){
        fundo.desenhaFundo();
        globais.chao.desenhaChao();
        globais.flappyBird.desenha();
    },

    click(){
        globais.flappyBird.pula()
    },

    atualiza(){
        globais.flappyBird.atualiza();
        globais.chao.atualiza();

    }
};

// loop
function loop (){
    
    TelaAtual.desenha();
    TelaAtual.atualiza();
    

    //flappyBird.y += 1;  -> para fazer o flappy-Bird cair
    frames ++
    requestAnimationFrame(loop);
};

window.addEventListener('click', function(){
    if(TelaAtual.click){
        TelaAtual.click()
    }
});

mudaTela(Telas.Inicio);
loop();
