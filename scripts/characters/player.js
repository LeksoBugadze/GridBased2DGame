export class Player{
    #health;
    #currentHealth;
    #stamina;
    #currentStamina;
    #mana;
    #currentMana;
    #damage;
    // #dexterity=10;
    // #strength=10;
    // #intelligence=10;
    #constitution=10;
    #might=10;
    #endurance=100;
    #magic=10;
    #deathCheck=false;

    constructor(){
        this.calcLife();
        this.calcDmg();
        this.calcEndur();
        this.calcMana();
    }

    getDeathCheck(){ return this.#deathCheck }
    getDamage(){ return this.#damage }
    getHealth(){ return this.#health }
    getStamina(){ return this.#stamina }
    getMana(){ return this.#mana }

    calcLife(){
        this.calcDmg();
        this.#health=this.#constitution*10;
        this.#currentHealth=this.#health;
        document.querySelector('.health-player').innerHTML=`
            ${this.#currentHealth} / ${this.#health}
        `
        return this.#health;
    }

    calcEndur(){
       this.#stamina=this.#endurance;
       this.#currentStamina=this.#stamina;
       document.querySelector('.stamina').innerHTML=`
        ${this.#currentStamina} / ${this.#stamina}
       `
       return this.#stamina;
    }

    calcMana(){
        this.#mana=this.#magic*10;
        this.#currentMana=this.#mana;
        document.querySelector('.mana').innerHTML=`
            ${this.#currentMana} / ${this.#mana}
        `
         return this.#mana;
    }

    calcDmg(){return this.#damage=this.#might}
    
  
    getMight(){return this.#might}
    getEndur(){return this.#endurance}
    getMagic(){return this.#magic}
    getConst(){return this.#constitution}
    getCurrentStamina(){return this.#currentStamina}
   
    increaseMight(){return this.#might+=1}
    increaseEndur(){
        this.#endurance+=1;
        this.calcEndur();
        return this.#endurance;
    }
    increaseMagic(){
        this.#magic+=1
        this.calcMana();
        return this.#magic;
    }
    increaseConst(){
        this.#constitution+=1;
        this.calcLife();
        return this.#constitution;
    }


    decreaseMight(){return this.#might-=1}
    decreaseEndur(){
        this.#endurance-=1;
        this.calcEndur();
        return this.#endurance; 
    }
    decreaseMagic(){
        this.#magic-=1;
        this.#mana();
        return this.#magic; 
    }
    decreaseConst(){
        this.#constitution-=1;
        this.calcLife();
        return this.#constitution; 
    }
    
    staminaUse(param){
        this.#currentStamina-=param;
        document.querySelector('.stamina').innerHTML=`
            ${this.#currentStamina} / ${this.#stamina}
        `
        return this.#currentStamina;
    }

    increaseDamage(param){
        this.#damage+=param;
        return this.#damage;
    }

    increaseStamina(param){
        this.#stamina+=param;
        document.querySelector('.stamina').innerHTML=`
            ${this.#currentStamina} / ${this.#stamina}
        `
        return this.#stamina;
    }

    increaseHealth(param){
        this.#health+=param;
        document.querySelector('.health-player').innerHTML=`
            ${this.#currentHealth} / ${this.#health}
        `
        return this.#health;
    }

    turnStaminaRecovery(){
        this.#currentStamina+=Math.round((this.#stamina*25)/100);
        if(this.#currentStamina>this.#stamina){
            this.#currentStamina=this.#stamina;
        }
        document.querySelector('.stamina').innerHTML=`
            ${this.#currentStamina} / ${this.#stamina}
        `
        return this.#currentStamina;
    }

    roundHealthRecovery(){
        this.#currentHealth+=Math.round((this.#health*25)/100);
        if(this.#currentHealth>this.#health){
            this.#currentHealth=this.#health;
        }
        document.querySelector('.health-player').innerHTML=`
            ${this.#currentHealth} / ${this.#health}
        `
        return this.#currentHealth;
    }

    roundStaminaRecovery(){
        this.#currentStamina=this.#stamina;
        document.querySelector('.stamina').innerHTML=`
            ${this.#currentStamina} / ${this.#stamina}
        `
        return this.#currentStamina;
    }

    takeDamage(damage){
        this.#currentHealth-=damage;
        
        document.body.style.boxShadow = '10px 10px 200px red inset';
        setTimeout(()=>{
            document.body.style.boxShadow=`none`
        },"300");
        document.querySelector('.health-player').innerHTML=`${this.#currentHealth} / ${this.#health}`;
        if(this.#currentHealth<=0){
            this.#deathCheck=true;
            
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
        

    }


   
}