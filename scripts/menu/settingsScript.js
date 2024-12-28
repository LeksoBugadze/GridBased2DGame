const wrapperDiv=document.querySelector('.settings-div');

const inputOST=document.getElementById('audio-range-input-OST');
const inputOSTOutput=document.querySelector('.input1-value');
const inputSFX=document.getElementById('audio-range-input-sfx');
const inputSFXOutput=document.querySelector('.input2-value');
const inputMenu=document.getElementById('audio-range-input-menu');
const inputMenuOutput=document.querySelector('.input3-value');

const closeBtn=document.querySelector('.close-settings');
const settingsBtn=document.querySelector('.settings');
const audioBtn=document.querySelector('.audio');

const OST=document.querySelector('.OST');
const battleOst=document.querySelector('.Battle-OST')

const sfx=document.querySelector('.hit-sound');
const sfx1=document.querySelector('.spell');
const sfx2=document.querySelector('.charging');

const btnSound=document.querySelector('.menu-sound');

export function checkMute(){
    if(audioBtn.getAttribute('src')==='/assets/Art/Audio-OFF.png'){
        OST.volume=0;
        battleOst.volume=0;
        sfx.volume=0;
        sfx1.volume=0;
        sfx2.volume=0;
        btnSound.volume=0;
    }else if(audioBtn.getAttribute('src')==='/assets/Art/Audio-ON.png'){
        OST.volume=inputOST.value/100;
        battleOst.volume=inputOST.value/100;
        sfx.volume=inputSFX.value/100;
        sfx1.volume=inputSFX.value/100;
        sfx2.volume=inputSFX.value/100;
        btnSound.volume=inputMenu.value/100;
    }
}

audioBtn.addEventListener('click',()=>{
    if(audioBtn.getAttribute('src')==='/assets/Art/Audio-ON.png'){
        audioBtn.setAttribute('src','/assets/Art/Audio-OFF.png');
    }else{
        audioBtn.setAttribute('src','/assets/Art/Audio-ON.png');
    }
    checkMute();
})


const ostArr=[OST,battleOst];
const sfxArr=[sfx,sfx1,sfx2];
const menuSound=[btnSound]


const Soundmap=new Map();

Soundmap.set(inputOSTOutput,ostArr);
Soundmap.set(inputSFXOutput,sfxArr);
Soundmap.set(inputMenuOutput,menuSound);


function soundControl(input,output){
    output.innerHTML=`${input.value}%`
    const out=Soundmap.get(output);

    out.forEach(sound => {        
        sound.volume=input.value/100;
    });

}

inputOST.oninput=()=>soundControl(inputOST,inputOSTOutput);

inputSFX.oninput=()=>soundControl(inputSFX,inputSFXOutput);

inputMenu.oninput=()=>soundControl(inputMenu,inputMenuOutput);

settingsBtn.addEventListener('click',()=>{
    wrapperDiv.style.display='flex';
})

closeBtn.addEventListener('click',()=>{
    wrapperDiv.style.display='none';
});