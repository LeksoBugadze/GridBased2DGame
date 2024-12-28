export class Enemy{
    #health=20;
    #currentHealth=this.#health;
    #damage=50;
    #x;
    #y;
    #type;
    charged=false;

    constructor(enemy){
        this.#type=enemy.type;
        this.#x=enemy.x;
        this.#y=enemy.y;
    }

    takeDamage(damage){
        this.#currentHealth-=damage;
        const enemyHealth=document.querySelector('.enemy-heath-container');
        enemyHealth.innerHTML=`${this.#currentHealth}/${this.#health}`;
        return this.#currentHealth;
    }

   

    moveToPlayer(playerX,playerY,grid){
        let saveY = this.#y;
        let saveX = this.#x;

        let xInc;
        let xDec;
        let yInc;
        let yDec;
        
        grid[this.#x][this.#y]='empty';

        if(playerX>this.#x){
            this.#x++;
            xInc=true;
        }else if(playerX<this.#x){
            this.#x--;
            xDec=true;
        }

        if(playerY>this.#y){
            this.#y++;
            yInc=true;
        }else if(playerY<this.#y){
            this.#y--;
            yDec=true;
        }

        if (grid[this.#x][this.#y] !== 'empty') {
      
            this.#x = saveX;
            this.#y = saveY;
            
            if(xInc&&yInc){
                if(this.#x++>5){
                    this.#x--;
                }else this.#x++;
            }else if(xInc){
                this.#x++;
                this.#y++;
            }else if(yInc){
                this.#x--;
                this.#y++;
            }else if(yDec){
                this.#x--;
                this.#y--;
            }else if(xDec){
                this.x--;
                this.y++;
            }
        }
        
        grid[this.#x][this.#y] = 'enemy';

        return { x: this.#x, y: this.#y };
    }

    getSprite(){
        const sprite=document.querySelector(`[data-row="${this.#x}"][data-column="${this.#y}"]`).querySelector('.enemy');
        return sprite;
    }

    getHealth() {
        return this.#health; 
    }
    
    getCurrentHealth(){
        return this.#currentHealth;
    }
    
    getDamage(){
        return this.#damage;
    }
    

    getType(){
        return this.#type;
    }
    getX(){return this.#x;}
    getY(){return this.#y;}
}