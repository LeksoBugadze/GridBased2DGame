import { mapInc,mapDec,mapGet,mapCreateHtml,player} from "../scripts/hashMaps.js"
import { arr, renderStats } from "./characterCreations.js";
import { chest } from "./createMapFunc.js";
import { itemArr } from "./itemsData.js";

const rewards=document.querySelector('.level-rewards')
const itemRewardDiv=document.querySelector('.item-rewards')

export function rewardFunc(container){
    container.style.display='flex';
    arr.forEach((stat)=>{
        container.innerHTML+=`
        <div class="reward-container">
            <label for="${mapCreateHtml.get(stat)}">${mapCreateHtml.get(stat)}</label>
            <div class="reward-inner-div">
                <button class="${stat} reward-btn" data-stat="${stat}">
                    + 1 ${mapCreateHtml.get(stat)}
                </button>
            </div>   
        </div>
        `       
    })

    const btnArr=document.querySelectorAll('.reward-btn');

    btnArr.forEach(btn=>{
        btn.addEventListener('click',()=>{
            const stat=btn.getAttribute('data-stat');
            mapInc.get(stat)();

            document.querySelectorAll('.reward-container').forEach(reward=>reward.remove())
            rewards.style.display='none';

            if(chest){
                itemRewardsFucn(itemArr,itemRewardDiv);
            }

            renderStats();
        })
    })

    
    
}

function itemRewardsFucn(arr,container){
    container.style.display='flex';
    const itemsObj=[];

    for(let i=0;i<3;i++){
        const random=Math.floor(Math.random()*arr.length);

        itemsObj.push(arr[random]);
        arr.splice(random,1);
        
        console.log(random);
        console.log(itemsObj);
        
        container.innerHTML+=`
        <div class="item-reward-container">
            <label class="item-name" for="${itemsObj[i].name}">${itemsObj[i].name}</label>
            <div>
                <img class="item-img" src="${itemsObj[i].img}">
            </div>
            <p class="item-description">${itemsObj[i].description}</p>
            <button class="item-reward-btn" id=${itemsObj[i].id}>Get item</button>      
        </div>
        `   
        
    }

    const buttons=document.querySelectorAll('.item-reward-btn');
        buttons.forEach(btn=>{
        btn.addEventListener('click',()=>{
            const id=parseInt(btn.getAttribute('id'));

            itemsObj.forEach(items=>{
                const itemId=items.id;

                if(itemId===id){
                    items.func();

                    document.querySelectorAll('.item-reward-container').forEach(reward=>reward.remove())

                    container.style.display='none';
                }
            })
        })
    })       



}



export {itemRewardsFucn};