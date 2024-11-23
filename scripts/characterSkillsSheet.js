// import { mapInc,mapDec,mapGet,mapCreateHtml,player } from "../scripts/hashMaps.js"
import {renderCharacterCreation,renderStats,buttons,skillPoints} from "../scripts/characterCreations.js"

const characterStatsContainer = document.querySelector('.character-stats');


const finishCreationButtons = document.querySelector('.finish');

finishCreationButtons.addEventListener('click', () => {
    if(skillPoints===0){
        renderCharacterCreation(characterStatsContainer);
        renderStats();
        
        deleteBtns();
    }
        
});

function deleteBtns(){
    const characterStatsContainerBtns = characterStatsContainer.querySelectorAll('button');
    
    characterStatsContainerBtns.forEach((btn)=>{
        btn.style.display='none';
    })
}