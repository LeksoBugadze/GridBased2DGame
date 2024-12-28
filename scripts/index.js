import "../scripts/menu/mainGame.js";
import "../scripts/characterCreations.js"
import "../scripts/menu/settingsScript.js"
import { checkMute } from "../scripts/menu/settingsScript.js";
import "./playerReward.js"

document.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click',()=>{
        checkMute()
        const clickAudio=document.querySelector('.menu-sound');
        clickAudio.load();
        clickAudio.play();
    })
})

