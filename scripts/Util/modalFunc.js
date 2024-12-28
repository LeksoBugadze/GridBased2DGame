export function Modal(text,color){
    const victory=document.querySelector('.victory-modal');
    const p=document.createElement('p');
    p.innerHTML=`${text}`;
    victory.append(p);
    victory.style.display='flex';
    p.style.color=`${color}`;
    p.style.border=`10px solid ${color}`;

    setTimeout(()=>{
        p.remove();
        victory.style.display='none';
    },1000)
}