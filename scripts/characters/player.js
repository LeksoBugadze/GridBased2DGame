export class Player{
    #health;
    #currentHealth;
    #damage;
    #range=1;
    #dexterity=10;
    #strength=10;
    #intelligence=10;
    #constitution=10;

    constructor(){
        this.calcLife();
        this.calcDmg();
    }

    getDamage(){
        return this.#damage;
    }
    
    getHealth(){
        return this.#health;
    }

    getRange(){
        return this.#range;
    }

    calcLife(){
        this.calcDmg();
        this.#health=this.#constitution*10;
        this.#currentHealth=this.#health;
        document.querySelector('.health-player').innerHTML=`
            ${this.#currentHealth}/${this.#health}
        `
        return this.#health;
    }
    calcDmg(){return this.#damage=this.#strength}
    
    getDex(){return this.#dexterity}
    getStr(){return this.#strength}
    getInt(){return this.#intelligence}
    getConst(){return this.#constitution}

    increaseDex(){return this.#dexterity+=1;}
    increaseStr(){return this.#strength+=1;}
    increaseInt(){return this.#intelligence+=1;}
    increaseConst(){
        this.#constitution+=1;
        this.calcLife();
        return this.#constitution;
    }

    decreaseDex(){return this.#dexterity-=1;}
    decreaseStr(){return this.#strength-=1;}
    decreaseInt(){return this.#intelligence-=1;}
    decreaseConst(){
        this.#constitution-=1;
        this.calcLife();
        return this.#constitution; 
    }
    
    takeDamage(damage){
        this.#currentHealth-=damage;
        
        document.body.style.boxShadow = '10px 10px 200px red inset';
        setTimeout(()=>{
            document.body.style.boxShadow=`none`
        },"300");
        document.querySelector('.health-player').innerHTML=`${this.#currentHealth}/${this.#health}`;
        if(this.#currentHealth<=0){
            document.querySelector('.death-screen').style.display='flex';
            setTimeout(()=>{
                location.reload();
            },2000);
        }
        return this.#currentHealth;
    }

    movePlayer(oldPlayerX,oldPlayerY,newPlayerX,newPlayerY,grid){
        const player=document.querySelector('.player');
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === 'player' || grid[i][j] === 'EnemyPlayer') {
                    oldPlayerX = i;
                    oldPlayerY = j;
                }
            }
        }

        let playerDivOld = document.querySelector(`[data-row="${oldPlayerX}"][data-column="${oldPlayerY}"]`);
    
       playerDivOld.querySelector('.player').remove();
        
        
        grid[oldPlayerX][oldPlayerY] = 'empty';
        

        let playerDivNew = document.querySelector(`[data-row="${newPlayerX}"][data-column="${newPlayerY}"]`);
        
        playerDivNew.appendChild(player);

        
        grid[newPlayerX][newPlayerY] = 'player';
        

        document.querySelector('.movement-radio').removeAttribute('checked');
    }


   
}