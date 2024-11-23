import { mapInc,mapDec,mapGet,mapCreateHtml,player} from "../scripts/hashMaps.js"

const startGameButton = document.querySelector('.start');
const charCreation=document.querySelector('.character-creation');
export const wrapper=document.querySelector('.wrapper-character-creation')

console.log('test');

let skillPoints=3;


const arr=['dex','str','int','const'];


startGameButton.addEventListener('click', () => {
    const ost=document.querySelector('.OST');
    ost.volume='0.2'
    ost.play();
    startGameButton.remove();
    renderCharacterCreation(charCreation);
    wrapper.style.display='flex';
    renderStats();
    buttons(charCreation);

    document.querySelectorAll('button').forEach(btn=>{
        btn.addEventListener('click',()=>{
            const clickAudio=document.createElement('audio');
            clickAudio.src='/assets/Sound/Button-sound.mp3';
            clickAudio.volume='0.1'
            clickAudio.load();
            clickAudio.play();
        })
    })
});

function renderCharacterCreation(container){
    arr.forEach((stat)=>{
        container.innerHTML+=`
        <div class="container">
            <label for="${mapCreateHtml.get(stat)}">${mapCreateHtml.get(stat)}</label>
            <div class="inner-div">
                <button class="${stat}" data="dec">-</button>
                <input type="number" id="${mapCreateHtml.get(stat)}" readonly>
                <button class="${stat}" data="inc">+</button>
            </div>   
        </div>
        `       
    })
}

function checkStat(btnArr){
    btnArr.forEach((btn)=>{
        if(mapGet.get(btn.getAttribute('class'))()===10){
            btn.style.opacity='0.5';
            btn.style.cursor='default';
        }else{
            btn.style.opacity='1';
            btn.style.cursor='pointer';
        }
    })
}

function checkSkillPoints(btnArr){
    btnArr.forEach((btn)=>{
        if(skillPoints===0){
            btn.style.opacity='0.5';
            btn.style.cursor='default';
        }else{
            btn.style.opacity='1';
            btn.style.cursor='pointer';
        }
    })
    
}




function renderStats(){
    const dexInput=document.getElementById('Dexterity');
    const strInput=document.getElementById('Strength');
    const intInput=document.getElementById('Intelligence');
    const consInput=document.getElementById('Constitution');
    const skill=charCreation.querySelector('.skill-points');
    
    skill.innerHTML=skillPoints;
    dexInput.value=player.getDex();
    strInput.value=player.getStr();
    intInput.value=player.getInt();
    consInput.value=player.getConst();

}

function buttons(container){
    const skills=container.querySelector('.skill-points');
    const buttonsInc=container.querySelectorAll('[data="inc"]');
    const buttonsDec=container.querySelectorAll('[data="dec"]');

    
    buttonsDec.forEach((button) => {
        checkStat(buttonsDec);
        
        button.addEventListener('click', () => {
            
            const statType = button.getAttribute("class"); 
            const decreaseStat = mapDec.get(statType);
            const statGetter=mapGet.get(statType);
            
            
            if (decreaseStat) {
                if(statGetter()>10){
                    decreaseStat();
                    checkStat(buttonsDec);
                    skillPoints++;
                    checkSkillPoints(buttonsInc);
                }
                renderStats();    
            } else {
                console.log('Unknown stat type');
            }
            
        });
    });


    buttonsInc.forEach((button) => {
        button.addEventListener('click', () => {
            
            if(skillPoints>0){
                const statType = button.getAttribute("class"); 
                const increaseStat = mapInc.get(statType);
    
                if (increaseStat) {
                    increaseStat();
                    checkStat(buttonsDec);
                    skillPoints--;
                    checkSkillPoints(buttonsInc);
                    
                    renderStats();     
                } else {
                    console.log('Unknown stat type');
                }
            }else{
                skills.style.color='red';
                skills.style.fontSize='55px';
                setTimeout(()=>{
                    skills.style.color='white';
                    skills.style.fontSize='50px';
                },300)
                
            }
            
            
        });
    });
}



export {renderCharacterCreation,checkStat,checkSkillPoints,renderStats,buttons,arr,skillPoints}

