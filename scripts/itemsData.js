import { player } from "./hashMaps.js"

export const itemArr=[
    {
        id:1,
        img:'/assets/Art/sword.png',
        name:'Sword',
        description:'Increases damage by 10',
        func:()=>player.increaseDamage(10),   
       
    },
    {
        id:2,
        img:'/assets/Art/boots.png',
        name:'Boots',
        description:'Increases stamina by 5',
        func:()=>player.increaseStamina(5),
        
    },
    {
        id:3,
        img:'/assets/Art/chestPlate.png',
        name:'Chest Plate',
        description:'Increases life by 50',
        func:()=>player.increaseHealth(50),    
        
    },
    {
        id:4,
        img:'/assets/Art/shield.png',
        name:'Shield',
        description:'Blocks one instance of damage and breaks',
        func:()=>player.increaseDamage(4),    
       
    },{
        id:5,
        img:'/assets/Art/sword.png',
        name:'Sword',
        description:'Increases damage by 20',
        func:()=>player.increaseDamage(20),   
       
    },
    {
        id:6,
        img:'/assets/Art/boots.png',
        name:'Boots',
        description:'Increases stamina by 10',
        func:()=>player.increaseStamina(10),
        
    },
    {
        id:7,
        img:'/assets/Art/shield.png',
        name:'Shield',
        description:'Blocks two instances of damage and breaks',
        func:()=>player.increaseDamage(4),    
       
    }
]