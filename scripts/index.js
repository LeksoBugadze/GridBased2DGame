import "../scripts/menu/mainGame.js";
import "../scripts/characterCreations.js"




document.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click',()=>{
        const clickAudio=document.createElement('audio');
        clickAudio.src='/assets/Sound/Button-sound.mp3';
        clickAudio.volume='0.1'
        clickAudio.load();
        clickAudio.play();
    })
})