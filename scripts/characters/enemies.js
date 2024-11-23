export class Enemy{
    #health;
    #damage=10;
    #x;
    #y;

    constructor(enemy){
        this.#health=enemy.health;
        this.#damage=enemy.damage;
        this.#x=enemy.x;
        this.#y=enemy.y; 
    }

    takeDamage(damage,element){
        this.#health-=damage;
        // element.querySelector('.enemy').querySelector('.health').innerHTML=
        // `${this.#health}/10`;
        // if(this.#health<=0){
        //     element.querySelector('.enemy').remove();
        // }
        return this.#health;
    }

   

    moveToPlayer(playerX,playerY,grid){
        let saveY = this.#y;
        let saveX = this.#x;


        
        grid[this.#x][this.#y]='empty';

        if(playerX>this.#x){
            this.#x++;
            
        }else if(playerX<this.#x){
            this.#x--;
            
        }

        if(playerY>this.#y){
            this.#y++;
            
        }else if(playerY<this.#y){
            this.#y--;
            
        }

        if (grid[this.#x][this.#y] !== 'empty') {
      
            this.#x = saveX;
            this.#y = saveY;
            
            if(xOp){
                this.#y++;
            }
            if(yOp){
                this.#x++;
            }


            if (grid[this.#x][this.#y] !== 'empty') {
                this.#x = saveX; 

                if (playerY > this.#y) {
                    this.#y++;
                } else if (playerY < this.#y) {
                    this.#y--;
                }
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
    
    getDamage(){
        return this.#damage;
    }
    
    getRange(){
        return this.getRange;
    }

    getX(){return this.#x;}
    getY(){return this.#y;}
}