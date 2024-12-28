import { wrapper,skillPoints } from "../characterCreations.js";
import { player} from "../hashMaps.js"
import "../characterSkillsSheet.js"
import { checkMute } from "./settingsScript.js";
import { Modal } from "../Util/modalFunc.js";
import { createGrid,renderGrid,grid,enemyArr,spawnVar,gridDivArr } from "../createMapFunc.js";
import { maps} from "../mapArray.js";


const finishCreationButtons = document.querySelector('.finish');
const attack=document.querySelector('.attack');
const gameGrid = document.querySelector('.grid');
const turn=document.querySelector('.turn');
const move=document.querySelector('.move');
const userInterface=document.querySelector('.UI');
const mainGameDiv=document.querySelector('.game');
const rewards=document.querySelector('.level-rewards');
const turnModal=document.querySelector('.turn-modal');

turnModal.style.display='block';

let moved=false;
let clickedMove=false;



let playerLocX=0;
let playerLocY=0;


const rows = 6;
const cols = 7 ;

let lastRow=Math.round((rows*cols)-cols);



const sound=document.querySelector('.hit-sound');
    

finishCreationButtons.addEventListener('click', () => {
    if(skillPoints>0){ 
        errorWindow(wrapper,`You have ${skillPoints} more skill point(s) to distribute`)
    }else{
        checkMute();
        
        const ost=document.querySelector('.OST');
        ost.pause();

        
        const battleOST=document.querySelector('.Battle-OST');
        battleOST.play();
        battleOST.play();
        
        
        gameStartFunc();
        wrapper.remove();
        gameGrid.style.display=`grid`;
    }
    
});

function gameStartFunc() {
    
    gameGrid.innerHTML='';
    mainGameDiv.style.height=`100vh`
    userInterface.style.display='flex';

    

    
    
    // for (let i = 0; i <rows; i++) {
    //    for(let j=0;j<cols;j++){

    //     const gridDiv = document.createElement('div');

    //     gridDiv.className = `grid-div`;
    //     gridDiv.setAttribute('data-row', i);
    //     gridDiv.setAttribute('data-column', j);
    //     gameGrid.append(gridDiv);
    //     gridDiv.setAttribute('tabindex', '0');
        
           
    //    }
       
    // }
    createGrid(maps[Math.floor(Math.random()*maps.length)])
    

   
    
    gridDivArr.forEach((gridDiv,index) => {
        
        // mapFunction(FirstMapArr,index);

        

        gridDiv.addEventListener('click', () => {
            const x=parseInt(gridDiv.getAttribute('data-row'));
            const y=parseInt(gridDiv.getAttribute('data-column'));
           console.log(grid[x][y]);
            
            
            if(spawnVar.spawn===false){
                
                if(index>=lastRow){
                    spawnPlayer(gridDiv,index,player);
                    spawnPoints();
                    turnModal.style.display='none';
                    
                    spawnVar.spawn=true;
                }else errorWindow(userInterface,'Invalid spawn point');
            }  
        });
        
    });

    function spawnPoints(){
        for(let i=0;i<7;i++){
            if(grid[5][i]==='player'){
                grid[5][i]='player'
            }else  grid[5][i]='empty';
            document.querySelector(`[data-row="5"][data-column="${i}"]`).querySelector('img').remove();     
        }

        
    }
    
    

    turn.addEventListener('click',()=>{  
        renderGrid();
      if(spawnVar.spawn){
        const enemySprite=document.querySelector('.enemy');

        function turnFucntion(enemyArr,delay){
            Modal('Enemy Turn','red');
            
            new Promise((resolve)=>{
                turnModal.style.display='block';
                setTimeout(()=>{
                    enemyArr.forEach((enemy,index)=>{
                        setTimeout(()=>{
                            if(enemy.getType()==='melee')enemyTurnFunction(enemy)
                                else if(enemy.getType()==='range')rangeEnemyTurn(enemy);
                         },index*delay);
                        setTimeout(()=>resolve(),enemyArr.length*1500);         
                     })
                },2000) 
            }).then(()=>{
                if(player.getDeathCheck()===false){
                    Modal('Your turn','#F0A036');
                    player.turnStaminaRecovery();
                    turnModal.style.display='none'
                }
            })
        }
        if(enemySprite){
            turnFucntion(enemyArr,1500);      
        }else {
           Modal('Room cleared','#F0A036');
            
        }
      }else {
        errorWindow(userInterface,'Place your character');
      }
        
        
    });
    let clicked=false;
    attack.addEventListener('click',()=>{
       renderGrid();            
            
        if(spawnVar.spawn){
            if(player.getCurrentStamina()>=5){
                const playerX=parseInt(document.querySelector('.player').parentElement.getAttribute('data-row'));
                const playerY=parseInt(document.querySelector('.player').parentElement.getAttribute('data-column'));

                const obj=
                [
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: 0, y: -1 },
                    { x: 1, y: 1 },
                    { x: 1, y: -1 },
                    { x: -1, y: 1 },
                    { x: -1, y: -1 }
                ]
                    
                for (let i = 0; i < obj.length; i++) {
                    let newX = playerX + obj[i].x;
                    let newY = playerY + obj[i].y;
                    
                    if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
                        if (grid[newX][newY] === 'enemy'||grid[newX][newY] === 'rEnemy') {
                        const enemyDiv=document.querySelector(`[data-row="${newX}"][data-column="${newY}"]`);
                        createAndAppendImg('/assets/Art/EnemyOutline.png',enemyDiv);
                
                        }
                    }
                    }
                    if(!clicked){
                        clicked=true;  
                        dealDamage(enemyArr);
                    }
                }
                else errorWindow(userInterface,"You don't have enough stamina")
                clicked=false;
        }else{
            errorWindow(userInterface,'Place your character')
        }  
        
          
    });

    move.addEventListener('click', () =>{
        renderGrid();
       if(!clickedMove){
        
        if(spawnVar.spawn){
            if(player.getCurrentStamina()>=2){
                clickedMove=true;
                gridDivArr.forEach((element, index) => {

                    Movment(gridDivArr,element,index,'.player','yellow');
                    
                    element.addEventListener('click',()=>{
                        
                        if(element.getAttribute('canMove')==='1'){
                            
                            let newPX=element.getAttribute('data-row');
                            let newPY=element.getAttribute('data-column');
                            let {oldPX,oldPY}=updatePlayerLoc();
                            
                            player.movePlayer(oldPX,oldPY,newPX,newPY,grid)
                            player.staminaUse(2);
                            clickedMove=false;
                            
                            
                            gridDivArr.forEach((element)=>{
                                element.setAttribute('canMove','0')
                                // element.querySelector('img').setAttribute('src','assets/Art/high-ground-tile-2.png');
                                element.querySelector('img'); 

                                if(element.querySelector('.move-tile')){
                                    element.querySelector('.move-tile').remove();
                                }  
                            })
                        }
                                    
                    });   
                    
                });
            }else errorWindow(userInterface,"You don't have enough stamina")
            
            
        }else {
            errorWindow(userInterface,'Place your character');
        }
       } 
        
        
    });
    
    // function mapFunction(arr,index){
    //     renderGrid();
    //     const cellX=gridDivArr[index].getAttribute('data-row');
    //     const cellY=gridDivArr[index].getAttribute('data-column');
        
    //     if(arr[index]==='enemy'){
    //         const createEnemy=new Enemy({
    //             type:'melee',
    //             x:cellX,
    //             y:cellY
    //         });

    //         grid[cellX][cellY]='enemy';
    //         EnemyArr.push(createEnemy);
    //     }

    //     if(arr[index]==='rEnemy'){
    //         const createEnemy=new Enemy({
    //             type:'range',
    //             x:cellX,
    //             y:cellY
    //         })

    //         grid[cellX][cellY]='rEnemy'
    //         EnemyArr.push(createEnemy);
    //     }

    //     if(arr[index]==='chest'){
    //         grid[cellX][cellY]='chest'; 
    //     }

    //     if(index>=lastRow){
    //         // gridDiv.querySelector('img').setAttribute('src','assets/Art/SpawnPoint.png')
    //         grid[cellX][cellY]='spawn';
    //         grid[5][6]='spawn';
    //     }
    // }

    
    
    function enemyTurnFunction(enemy){
        
        let enemyDiv=enemy.getSprite();
        let {playerLocX, playerLocY}=updatePlayerLoc();
        
        if(checkRange(playerLocX,playerLocY,enemy))
            {
                const {frames,framePos}=animationFrames(playerLocX,playerLocY,enemy.getX(),enemy.getY());
                
                if(enemyDiv)animateSprite(enemyDiv, 128, frames,framePos);
                sound.load();
                setTimeout(function() {
                    player.takeDamage(enemy.getDamage());
                    sound.play();
                    
                }, 500);
                
            }else{
                const enemSprite=enemy.getSprite();
                enemSprite.remove();
                
                enemy.moveToPlayer(playerLocX,playerLocY,grid);
                renderGrid();
                if(checkRange(playerLocX,playerLocY,enemy))
                    {
                        const {frames,framePos}=animationFrames(playerLocX,playerLocY,enemy.getX(),enemy.getY());
                        
                        if(enemy.getSprite())animateSprite(enemy.getSprite(), 128, frames,framePos);
                        sound.load();
                        setTimeout(function() {
                            player.takeDamage(enemy.getDamage());
                            sound.play();                           
                        }, 500);
                    }    
                }          
                
            }
            
            
            
            
            function rangeEnemyTurn(enemy){
                let enemyDiv=enemy.getSprite();
                let {playerLocX, playerLocY}=updatePlayerLoc();
                
                const playerS=document.querySelector(`[data-row="${playerLocX}"][data-column="${playerLocY}"]`);
                
                
                if(enemy.charged){
                    const attackDiv=document.createElement('div');
                    attackDiv.style.backgroundImage='url("/assets/Art/playerPlaceholder-sheet.png")';
                    attackDiv.style.backgroundRepeat='no-repeat';
                    attackDiv.style.position='absolute';
                    attackDiv.style.zIndex=3;
                    attackDiv.style.width='128px'
                    attackDiv.style.height='128px'
                    
                    playerS.appendChild(attackDiv);
                    
                    new Promise((resolve=>{
                        setTimeout(()=>{
                            animateSprite(enemyDiv,128,8,1)},100)

                        animateSprite(attackDiv,128,9,0);
                        const spellSound=document.querySelector('.spell');
                           
                            
                        setTimeout(()=>{
                            spellSound.load();
                            spellSound.play()
                            sound.load();
                            sound.play();
                            player.takeDamage(enemy.getDamage());
                            resolve();
                        },900) 
                    })).then(()=>{
                        // playerS.querySelector('img').remove();
                        attackDiv.remove();
                    }) 
                    enemy.charged=false;
                }else{
                    enemy.charged=true;
                    const chargingSound=document.querySelector('.charging');
                    chargingSound.load();
                    chargingSound.play();
                    enemyDiv.style.backgroundPosition="-128px 0px"
                }
                
                
                
            }
            
        }
        
        function checkRange(playerLocX,playerLocY,enemy){
            if(
                (Math.abs(playerLocX - enemy.getX()) === 1 && playerLocY === enemy.getY()) || 
                (Math.abs(playerLocY - enemy.getY()) === 1 && playerLocX === enemy.getX()) || 
                (Math.abs(playerLocX - enemy.getX()) === 1 && Math.abs(playerLocY - enemy.getY()) === 1)){
                    return true;
                } else return false;
        }
        
    //     function renderGrid(){
    //     clickedMove=false;
    //     const enemy = document.createElement('div');
    //     enemy.classList.add('enemy');

    //     for(let i=0;i<rows;i++){
    //         for(let j=0;j<cols;j++){
    //             const cell = document.querySelector(`[data-row="${i}"][data-column="${j}"]`);
                
    //             if (grid[i][j] === 'enemy') {
    //                 cell.innerHTML='';
    //                 const enemy = document.createElement('div');
    //                 enemy.classList.add('enemy');
    //                 cell.appendChild(enemy);
    //             }

    //             if(grid[i][j]==='rEnemy'){
    //                 cell.innerHTML='';
    //                 const rangeEnemy=document.createElement('div');
    //                 if(charged)rangeEnemy.style.backgroundPosition="-128px 0px"
    //                 rangeEnemy.classList.add('enemy');
    //                 rangeEnemy.classList.add('range');

    //                 cell.appendChild(rangeEnemy);
    //             }

    //             if(grid[i][j]==='nextRoom'){
    //                 cell.innerHTML='';
    //                 createAndAppendImg('assets/Art/stairs-enemy.png',cell)

    //                 const stairs = document.querySelectorAll('img');
    //                 const stairsImages = Array.from(stairs).filter(img => img.src.includes('assets/Art/stairs.png'));

    //                 stairsImages.forEach(stairs=>{
    //                     stairs.addEventListener('click',()=>{
    //                         mapFunction(FirstMapArr,index);
    //                     })
    //                 })
    //             }

    //             if(grid[i][j]==='chest'){
    //                 cell.innerHTML='';
    //                 chest=true;
    //                 createAndAppendImg('assets/Art/chest.png',cell);
    //             }

    //             if(grid[i][j]==='spawn'){
    //                 cell.innerHTML='';
    //                 createAndAppendImg('assets/Art/SpawnPoint.png',cell);
    //             }

    //             if(grid[i][j]==='empty'){
    //                 cell.innerHTML=``;
    //             }
    //         }
              
    //     }
    // }




function animationFrames(x1,y1,x2,y2){
    let framePos;
    let frames;

    if (x1 < x2) {
        if (y1 < y2) {
            frames = 10;
            framePos = 49;
        } else if (y1> y2) {
            frames = 10;
            framePos = 60;
        } else {
            frames = 9;
            framePos = 20;
        }
    } else if (x1 > x2) {
        if (y1 < y2) {
            frames = 10;
            framePos = 71;
        } else if (y1> y2) {
            frames = 10;
            framePos = 38;
        } else {
            frames = 7;
            framePos = 30;
        }
    } else {
        if (y1 < y2) {
            frames = 9;
            framePos = 10;
        } else if (y1> y2) {
            frames = 9;
            framePos = 0;
        }
    }

    return {frames,framePos};
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

function checkGridForEnemies(){
    const enemies=document.querySelectorAll('.enemy');
    let {playerX,playerY}=updatePlayerLoc();
    if(enemies.length===0){
        Modal('Room Cleared','#F0A036');
        setTimeout(()=>{
            rewardFunc(rewards);
            player.movePlayer(playerX,playerY,5,3,grid);
            grid.forEach((cell,index)=>grid[index].fill('empty'));
            // grid.fill('empty');
            grid[0][1]='nextRoom';
            grid[0][3]='nextRoom';
            grid[0][5]='nextRoom';
            renderGrid();
           },1100)
    }
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


export function createAndAppendImg(src,div){
    const img=document.createElement('img');
    img.src=`${src}`;
    div.appendChild(img);
}

function Movment(Arr,element,index,stringElement){
    const potentialMoves = [
        { row: 0, col: 1 },   
        { row: 0, col: -1 },  
        { row: 1, col: 0 },   
        { row: -1, col: 0 },  
        { row: 1, col: 1 },   
        { row: 1, col: -1 },  
        { row: -1, col: 1 },  
        { row: -1, col: -1 }, 
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

                const x=parseInt(Arr[newIndex].getAttribute('data-row'));
                const y=parseInt(Arr[newIndex].getAttribute('data-column'));

               

                if (newRow === currentRow + move.row&&grid[x][y]==='empty') {
                    Arr[newIndex].setAttribute('canMove','1');
                    Arr[newIndex].append(moveImg);
                }
            } 
        });  
    }
}

function dealDamage(enemyArr) {
    const enemyHtml = document.querySelectorAll('.enemy');
    const playerSprite=document.querySelector('.player');
    const playerX=playerSprite.parentElement.getAttribute('data-row');
    const playerY=playerSprite.parentElement.getAttribute('data-column');
    enemyHtml.forEach(enemy => {
        enemy.addEventListener('click', () => {
            const targetEnemyX = parseInt(enemy.parentElement.getAttribute('data-row'));
            const targetEnemyY =parseInt(enemy.parentElement.getAttribute('data-column'));
            
            if(inRange(targetEnemyX,targetEnemyY,'player',grid)){
                const {frames,framePos}=animationFrames(targetEnemyX,targetEnemyY,playerX,playerY)
                enemyArr.forEach((enemy, index) => {
                    
                    if (targetEnemyX == enemy.getX() && targetEnemyY == enemy.getY()) { 
                        
                        turnModal.style.display='block';
                        animateSprite(playerSprite,128,frames,framePos);
                        
                        
                        player.staminaUse(5);
                        
                        enemy.takeDamage(player.getDamage());
                        renderGrid();  
                        
                        setTimeout(()=>{
                            sound.load();
                            sound.play();
                            turnModal.style.display='none';
                        },500)
                        
                        
                        if (enemy.getCurrentHealth() <= 0) {
                            const sprite=enemy.getSprite();
                            
                            setTimeout(()=>{animateSprite(sprite,128,8,82)},500);
                            
                            setTimeout(function() {
                                enemyArr.splice(index, 1);
                                grid[targetEnemyX][targetEnemyY] = 'empty';
                                renderGrid();
                                checkGridForEnemies();
                            }, 1200);
                        }
                    }
                
                           
                });
            }else errorWindow(userInterface,'Invalid target');
            
        });
    });
}

function inRange(targetX, targetY, searchingWord,grid) {
    const obj = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 }
    ];

    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let i = 0; i < obj.length; i++) {
        const newX = targetX + obj[i].x;
        const newY = targetY + obj[i].y;

        if (newX >= 0 && newY >= 0 && newX < numRows && newY < numCols) {
            if (grid[newX][newY] === searchingWord) {
                return true;
            }
        }
    }

    return false;
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
            
            renderGrid();
            
        }
    }
   
    
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