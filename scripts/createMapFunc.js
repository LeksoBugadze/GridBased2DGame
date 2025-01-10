import { createAndAppendImg } from "./Util/createAndAppendImgFunc.js";
import { Enemy } from "./characters/enemies.js";
import { maps } from "./mapArray.js";
import { Modal } from "./Util/modalFunc.js";
import { spriteSizeValue } from "./menu/mainGame.js";


const rows=6;
const cols=7;
let chest=false;
let clicked=false;
export let room=0;
let spawnVar={
    spawn:false
}

let gridDivArr=[];

const container=document.querySelector('.grid');
const enemyHealth=document.querySelector('.enemy-heath-container');
const enemyArr=[];

let grid=[
    ['empty','empty','empty','empty','empty','empty','empty'],
    ['empty','empty','empty','empty','empty','empty','empty'],
    ['empty','empty','empty','empty','empty','empty','empty'],
    ['empty','empty','empty','empty','empty','empty','empty'],
    ['empty','empty','empty','empty','empty','empty','empty'],
    ['spawn','spawn','spawn','spawn','spawn','spawn','spawn'],
]


function createGrid(arr){
    
    container.innerHTML='';
    for(let i=0;i<rows;i++){
        for (let j=0;j<cols;j++){
            const gridDiv = document.createElement('div');

            gridDiv.className = `grid-div`;
            gridDiv.setAttribute('data-row', i);
            gridDiv.setAttribute('data-column', j);
            container.append(gridDiv);
            gridDiv.setAttribute('tabindex', '0');
        }
    }
    gridDivArr=document.querySelectorAll('.grid-div');
    generateMapOnGrid(arr);
}


function generateMapOnGrid(arr){
    clicked=false;
    chest=false;
    room++;
    Modal(`Room ${room}`,'#8eb29a');

    for(let i=0;i<rows;i++){
        for (let j=0;j<cols;j++){
            grid[i][j]==='empty';


            if(arr[i][j]==='enemy'){
                const createEnemy=new Enemy({
                    type:'melee',
                    x:i,
                    y:j
                });
    
                grid[i][i]='enemy';
                enemyArr.push(createEnemy);
            }
            
            if(arr[i][j]==='rEnemy'){
                const createEnemy=new Enemy({
                    type:'range',
                    x:i,
                    y:j
                })
    
                grid[i][j]='rEnemy'
                enemyArr.push(createEnemy);
            }

            if (arr[i][j] === 'enemy'){ 
                grid[i][j] = 'enemy'
            }
            
            if(arr[i][j]==='rEnemy'){
               grid[i][j]='rEnemy' 
            }

            if(arr[i][j]==='nextRoom'){
                grid[i][j]='nextRoom' 
            }

            if(arr[i][j]==='chest'){
                chest=true;
                grid[i][j]='chest';
            }

            if(arr[i][j]==='spawn'){
                grid[i][j]='spawn'
            }

            if(arr[i][j]==='empty'){
                grid[i][j]==='empty'
            }
        }
    }
    
    renderGrid();
}

function renderGrid(){
    const enemyHealth=document.querySelector('.enemy-heath-container');
    enemyHealth.style.display='none';
    for(let i=0;i<rows;i++){
        for (let j=0;j<cols;j++){
            const cell = document.querySelector(`[data-row="${i}"][data-column="${j}"]`);
            
            if (grid[i][j] === 'enemy') 
            {
                cell.innerHTML='';
                const enemy = document.createElement('div');
                enemy.classList.add('enemy');
                
                
                cell.appendChild(enemy);
            }

            if(grid[i][j]==='rEnemy'){
                cell.innerHTML='';
                const rangeEnemy=document.createElement('div');
                rangeEnemy.classList.add('enemy');
                rangeEnemy.classList.add('range');
                cell.appendChild(rangeEnemy);
                
                enemyArr.forEach(enemy=>{
                    if(enemy.getType()==='range'&&enemy.charged){
                        const sprite=enemy.getSprite();
                        
                        sprite.style.backgroundPosition=`-${spriteSizeValue}px 0px`;
                        
                    }
                })
                

            }


            if (grid[i][j] === 'nextRoom') {
                cell.innerHTML = '';
                createAndAppendImg('assets/Art/stairs-enemy.png','stairs', cell);
                
                const img=cell.querySelectorAll('.stairs');

                img.forEach(img => {
                    img.addEventListener('click', () => {
                        if (clicked === false) {
                            grid[0][1] = 'empty';
                            grid[0][3] = 'empty';
                            grid[0][5] = 'empty';
                            spawnVar.spawn = false;
                            generateMapOnGrid(maps[Math.floor(Math.random() * maps.length)]);
                        }
                    });
                });
            
                
            }
            
            

            if(grid[i][j]==='chest'){
                cell.innerHTML='';
                
                createAndAppendImg('assets/Art/chest.png','chest',cell);
                
            }

            if(grid[i][j]==='spawn'){
                cell.innerHTML='';
                createAndAppendImg('assets/Art/SpawnPoint.png','spawn',cell);
                
            }

            if(grid[i][j]==='empty'){
                cell.innerHTML=``;
            }

            
        }
    }
    
    enemyArr.forEach(enemy=>{
        const enemySprite=enemy.getSprite();
        
        enemySprite.addEventListener('mouseover',()=>{
            enemyHealth.style.display='block';
            enemyHealth.innerHTML=`${enemy.getCurrentHealth()}/${enemy.getHealth()}`
        })
        enemySprite.addEventListener('mouseout',()=>{
            enemyHealth.style.display='none';
        })
    })
}

export{renderGrid,generateMapOnGrid,createGrid,grid,enemyArr,chest,spawnVar,gridDivArr};