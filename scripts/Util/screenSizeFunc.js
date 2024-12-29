// let spriteSize;

// document.addEventListener('load',()=>{
//     const screenSize=window.innerWidth;
//     spriteSizeChanger(screenSize);
//     spriteSize=spriteSizeChanger(screenSize);

//     console.log(spriteSize);
// })



function spriteSizeChanger(screenSize){
    console.log(screenSize);
    if(screenSize<=541){
        return 40;
    }else if(screenSize<=1800){
        return 64;
    }else return 128;
}

export {spriteSizeChanger};