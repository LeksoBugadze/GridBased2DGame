import {Player} from"../scripts/characters/player.js"

const player=new Player();

const mapInc=new Map();
const mapDec=new Map();
const mapGet=new Map();
const mapCreateHtml=new Map();


mapInc.set('dex', () => player.increaseDex());
mapInc.set('str', () => player.increaseStr());
mapInc.set('int', () => player.increaseInt());
mapInc.set('const', () => player.increaseConst());

mapDec.set('dex', () => player.decreaseDex());
mapDec.set('str', () => player.decreaseStr());
mapDec.set('int', () => player.decreaseInt());
mapDec.set('const', () => player.decreaseConst());

mapGet.set('dex', () => player.getDex());
mapGet.set('str', () => player.getStr());
mapGet.set('int', () => player.getInt());
mapGet.set('const', () => player.getConst());

mapCreateHtml.set('dex','Dexterity');
mapCreateHtml.set('str','Strength');
mapCreateHtml.set('int','Intelligence');
mapCreateHtml.set('const','Constitution');

export {mapInc,mapDec,mapGet,mapCreateHtml,player};