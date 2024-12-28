export function createAndAppendImg(src,className,div){
    const img=document.createElement('img');
    img.src=`${src}`;
    img.className=`${className}`;
    div.appendChild(img);
}