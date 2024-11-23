import {Enemy} from "../characters/enemies.js"
import { wrapper,skillPoints } from "../characterCreations.js";
import { player } from "../hashMaps.js"
import "../characterSkillsSheet.js"


const finishCreationButtons = document.querySelector('.finish');
const attack=document.querySelector('.attack');
const gameGrid = document.querySelector('.grid');
const turn=document.querySelector('.turn');
const move=document.querySelector('.move');
const userInterface=document.querySelector('.UI');
const actionsRadio=document.querySelector('.action-radio');
const movementRadio=document.querySelector('.movement-radio')
const mainGameDiv=document.querySelector('.game');

let toggle=true;
let turnEnded=true;
let moved=false;
let spawn=false;


let enemyLocX=0;
let enemyLocY=0;
let playerLocX=0;
let playerLocY=0;


const rows = 6;
const cols = 7 ;

let lastRow=Math.round((rows*cols)-cols);


let grid = Array.from({ length: rows }, () => Array(cols).fill('empty'));



const enemy1=new Enemy({
        health:30,
        x:0,
        y:0,
    });
const enemy2=new Enemy({
        health:30,
        x:1,
        y:3,
    });
    
    // const FirstMapArr=['enemy','','','','','chest','','','','enemy','','','','enemy']

finishCreationButtons.addEventListener('click', () => {
    if(skillPoints>0){ 
        errorWindow(wrapper,`You have ${skillPoints} more skill point(s) to distribute`)
    }else{
        console.log(
            `Health:${player.getHealth()} `,
            `Damage:${player.getDamage()} `,
            `Dex:${player.getDex()} `,
            `Str:${player.getStr()} `,
            `Int:${player.getInt()} `,
            `Const:${player.getConst()}`,
        )
        const ost=document.querySelector('.OST');
        ost.pause();

        const battleOST=document.querySelector('.Battle-OST');
        battleOST.play();
        battleOST.volume='0.1'
        battleOST.play();
        gameStartFunc();
        wrapper.remove();
        gameGrid.style.display=`grid`;
    }
    
});

function gameStartFunc() {
    
    gameGrid.innerHTML='';
    mainGameDiv.style.height=`100vh`
    mainGameDiv.style.padding=`0px 100px 0px 100px`
    userInterface.style.display='flex';

    let gridDivArr=[];

    
    
    for (let i = 0; i <rows; i++) {
       for(let j=0;j<cols;j++){

        const gridDiv = document.createElement('div');

        gridDiv.className = `grid-div`;
        gridDiv.setAttribute('data-row', i);
        gridDiv.setAttribute('data-column', j);
        gameGrid.append(gridDiv);
        gridDiv.setAttribute('tabindex', '0');
        
        grid[enemy1.getX()][enemy1.getY()]='enemy';
        grid[enemy2.getX()][enemy2.getY()]='enemy';
        
        
        createAndAppendImg('assets/Art/high-ground-tile-2.png',gridDiv);
       }
       
    }
    
    

    gridDivArr=document.querySelectorAll('.grid-div');
    
    gridDivArr.forEach((gridDiv,index) => {
        renderGrid();
        // const chest = document.createElement('img');
        // chest.className='chest';
        // chest.setAttribute('src','assets/Art/chest.png')

        // if(FirstMapArr[index]==='enemy'){
        //     createEnemy(gridDivArr[index],enemy)
        // }
        // if(FirstMapArr[index]==='chest'){
        //     createAndAppendImg('assets/Art/chest.png',gridDivArr[index]);   
        // }


        if(index>=lastRow){
            
            gridDiv.querySelector('img').setAttribute('src','assets/Art/SpawnPoint.png')
        }
        gridDiv.addEventListener('click', () => {     
            if(spawn===false){
                if(index>=lastRow){
                    checkForElements(gridDiv,()=>{
                        spawnPlayer(gridDiv,index,player);
                        spawnPoints();
                    });
                    spawn=true;
                }else errorWindow(userInterface,'Invalid spawn point');
            }  
        });
        
    });

    function spawnPoints(){
        gridDivArr.forEach((gridElement)=>{
            if(gridElement.querySelector('img'))gridElement.querySelector('img').remove(); 
        })
    }
    
    const sound=document.createElement('audio');
        sound.src='assets/Sound/Hit-Sound.wav';
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.volume='0.2'
        sound.style.display = "none";

    turn.addEventListener('click',()=>{
        moved=true;
        actionsRadio.removeAttribute('checked','');
        movementRadio.removeAttribute('checked','');

        const enemySprite=document.querySelector('.enemy');
        
        if(enemySprite){
            let {playerLocX, playerLocY}=updatePlayerLoc();
            // let {enemyLocX, enemyLocY}=updateEnemyLoc()
            
            // let { nextEnemyLocX, nextEnemyLocY } = moveEnemyTowardsPlayer(enemyLocX, enemyLocY, playerLocX, playerLocY);
            
            enemyTurnFunction(enemy1);
            enemyTurnFunction(enemy2);
            
            function enemyTurnFunction(enemy){
                let framePos;
                let frames;
                let enemyDiv=enemy.getSprite();

                if(
                    (Math.abs(playerLocX - enemy.getX()) === 1 && playerLocY === enemy.getY()) || 
                    (Math.abs(playerLocY - enemy.getY()) === 1 && playerLocX === enemy.getX()) || 
                    (Math.abs(playerLocX - enemy.getX()) === 1 && Math.abs(playerLocY - enemy.getY()) === 1))
                {
                    if(playerLocX<enemy.getX()){
                        frames=9;
                        framePos=20;
                    }
                    if(playerLocX>enemy.getX()){
                        frames=7;
                        framePos=30;
                    }
                    if(playerLocY<enemy.getY()){
                        frames=9;
                        framePos=10;
                    }
                    if(playerLocY>enemy.getY()){
                        frames=9;
                        framePos=0;
                    }

                    if(enemyDiv)animateSprite(enemyDiv, 128, frames,framePos);
                    sound.load();
                    setTimeout(function() {
                        player.takeDamage(enemy.damage);
                        sound.play();
                        moved=false;
                        turnEnded=true;
                        actionsRadio.setAttribute('checked','');
                        movementRadio.setAttribute('checked','');
                    }, 500);
                    
                }else{
                    console.log('go');
                    const enemSprite=enemy.getSprite();
                    enemSprite.remove();
                    enemy.moveToPlayer(playerLocX,playerLocY,grid);
                    renderGrid();
                }          
                
            }
        }else {
            const victory=document.querySelector('.victory-modal');
            const p=document.createElement('p');
            p.innerHTML=`Room Cleared`;
            victory.append(p);
            victory.style.display='flex';
        }
        
    });
    
    attack.addEventListener('click',()=>{

        const playerLocation = updatePlayerLoc();
        const enemyLocation = updateEnemyLoc();

        if (!playerLocation || !enemyLocation) {
            console.error('Player or/and enemy not found')
            return;
        }

        const { playerLocX: PX, playerLocY: PY } = playerLocation;
        const { enemyLocX: EX, enemyLocY: EY } = enemyLocation;

        
        if (
            (Math.abs(PX - EX) === 1 && PY === EY) || 
            (Math.abs(PY - EY) === 1 && PX === EX) || 
            (Math.abs(PX - EX) === 1 && Math.abs(PY - EY) === 1)
        ){
            const enemyDiv=document.querySelector(`[data-row="${EX}"][data-column="${EY}"]`);

            enemyDiv.querySelector('img').setAttribute('src','assets/Art/EnemyOutline.png');
            
            if(turnEnded===true){
                toggle=true;
                    dealDamage(enemy,player,sound,enemyDiv);  
                    updateEnemyLoc();
                turnEnded=false;
                
            }
        
        }else {
            errorWindow(userInterface,`Enemy is out of reach`);   
        }
        
        
    });
    
    move.addEventListener('click', () =>{
       

        gridDivArr.forEach((element, index) => {

            Movment(gridDivArr,element,index,'.player','yellow');

            element.addEventListener('click',()=>{
                if(moved===false){
                    console.log(moved);
                    if(element.getAttribute('canMove')==='1'){
                        checkForElements(element,()=>{
                            let newPX=element.getAttribute('data-row');
                            let newPY=element.getAttribute('data-column');
                            let {oldPX,oldPY}=updatePlayerLoc();
                            player.movePlayer(oldPX,oldPY,newPX,newPY,grid)
                            moved=true;
                        });
                        
                        gridDivArr.forEach((element)=>{
                            element.setAttribute('canMove','0')
                            // element.querySelector('img').setAttribute('src','assets/Art/high-ground-tile-2.png');
                            element.querySelector('img'); 
                            if(element.querySelector('.move-tile')){
                                element.querySelector('.move-tile').remove();
                            }  
                        })
                    }
                }                
            });   
           
        });
         
    });

    function renderGrid(){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                const cell = document.querySelector(`[data-row="${i}"][data-column="${j}"]`);

                if (grid[i][j] === 'enemy') {
                    cell.innerHTML='';
                    const enemy = document.createElement('div');
                    enemy.classList.add('enemy');
                    cell.appendChild(enemy);
                }
            }
        }
    }
}


function animateSprite(sprite, spriteSize, totalFrames,framePos) {
    let currentPos=framePos*128;
    let frame = 0;

    
    let interval = setInterval(function() {
        
        sprite.style.backgroundPosition = `-${currentPos}px 0px`;
        currentPos += spriteSize;
        frame++;

        
        if (frame >= totalFrames) {
            clearInterval(interval);
        }
    }, 100);
}


function updatePlayerLoc() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 'player') {
                return { playerLocX: i, playerLocY: j };
            }
        }
    }
    return null; 
}

function updateEnemyLoc() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 'enemy') {
                return { enemyLocX: i, enemyLocY: j };
            }
        }
    }
    return null; 
}

function createAndAppendImg(src,div){
    const img=document.createElement('img');
    img.src=`${src}`;
    div.appendChild(img);
}

function Movment(Arr,element,index,stringElement,color){
    const potentialMoves = [
        { row: 0, col: 1 },   
        { row: 0, col: -1 },  
        { row: 1, col: 0 },   
        { row: -1, col: 0 },  
        { row: 1, col: 1 },   
        { row: 1, col: -1 },  
        { row: -1, col: 1 },  
        { row: -1, col: -1 }   
    ];
    if (moved===false&&element.querySelector(`${stringElement}`)) {


        potentialMoves.forEach((move) => {
            const newIndex = index + move.row * cols + move.col;

            if (newIndex >= 0 && newIndex < Arr.length) {
                const newRow = Math.floor(newIndex / cols);
                const currentRow = Math.floor(index / cols);
                const newCol = newIndex % cols;

                const moveImg=document.createElement('img');
                moveImg.classList.add('move-tile');
                moveImg.setAttribute('src','assets/Art/Moves.png');
                if (newRow === currentRow + move.row&&!Arr[newIndex].querySelector('.enemy')) {
                    Arr[newIndex].setAttribute('canMove','1');
                    Arr[newIndex].append(moveImg);
                }
            } 
        });  
    }
}




function dealDamage(enemy,player,sound,enemyDiv){
    const Ehtml=document.querySelectorAll('.enemy');
    const enemy1=new Enemy(enemy);
    
    const enemyLoc=updateEnemyLoc()
     Ehtml.forEach((enem)=>{
        enem.addEventListener('click',()=>{
           
            const { enemyLocX: x, enemyLocY: y } = enemyLoc;

           if(toggle===true){ 
                enemy1.takeDamage(player.getDamage());
                actionsRadio.removeAttribute('checked');
                sound.load();
                sound.play();
                if(enemy1.getHealth()<=0){
                    enem.remove();
                    grid[x][y]='empty';
                    updateEnemyLoc();
                    enemyDiv.querySelector('img').setAttribute('src','assets/Art/high-ground-tile-2.png');
                }else {
                    enem.querySelector('.health').innerHTML=`
                        ${enemy1.getHealth()}/10
                    `
                    enemyDiv.querySelector('img').setAttribute('src','assets/Art/high-ground-tile-2.png');
                }
            }
            toggle=false;
        });
    });
    
}

function spawnPlayer(element,index) {
    if(index>=lastRow){
        if(element.querySelector('.player')){
            return;
        }else {
            
            const check=document.querySelector('.player');
            if(check){
                check.remove();
            }
    
            playerLocX=parseInt(element.getAttribute('data-row'),10);
            playerLocY=parseInt(element.getAttribute('data-column'),10);
    
            grid[playerLocX][playerLocY]='player';
            
            const player = document.createElement('div');
            player.className = 'player';
            element.appendChild(player);

            createAndAppendImg("assets/Art/PlayerPlaceholder.png",player);
            
        }
    }
   
    
}

function checkForElements(div,func){
    div.setAttribute('numberOfCharacters','');
    let number=div.getAttribute('numberOfCharacters');
    div.querySelectorAll('div').forEach((element) => {
        number++;
    });
    if(number>=1){
        console.log('Max amount of characters');
        
    }else func();
}

function errorWindow(container,message){
    const errorContainer=container.querySelector('.error');
    errorContainer.innerHTML=`${message}`
    errorContainer.style.display='block';
            setTimeout(()=>{
                errorContainer.style.display='none';
                errorContainer.innerHTML='';
            },1000)
}