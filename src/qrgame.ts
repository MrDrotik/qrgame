let jumpTicksRemain = 0;
let jumpCooldownTicksRemain = 0;
let isInJump = false;

let isHeroRunning = false;

let gameScore = 0;

const barrierPatterns = [ 7300, 7399, 5285, 1033, 1833 ];

const heroDomElement = document.getElementById('hero');
const boxDomElement = document.getElementById('box');
const scoreboardDomElement = document.getElementById('scoreboard');


const getRandomPatternMap = () => {
  const randomPattern = barrierPatterns[Math.floor(Math.random() * barrierPatterns.length)];
  return randomPattern.toString(2);
};

const getMillisecondsPerTick = (gameScore: number) => {
  // const scoreDecrement = Math.log10(gameScore + 11.445) * 460 - 486.958;
  const scoreDecrement = Math.log10(gameScore + 0.625) * 256 + 52.266;
  return scoreDecrement >= 900 ? 100 : 1000 - scoreDecrement;
};

const onJumpButton = () => {
  if ( !isHeroRunning ) {
    isHeroRunning = true;
    main();
    return
  }
  if ( jumpTicksRemain === 0 && jumpCooldownTicksRemain === 0 ) {
    processJump();
  }
};

const processJump = () => {
  heroDomElement.className = 'tile bouncing';
  isInJump = true;
  jumpTicksRemain = 3;
};

const processFall = () => {
  jumpCooldownTicksRemain = 1;
  heroDomElement.className = 'tile';
  isInJump = false;
  jumpTicksRemain = 0;
};

const loseGame = () => {
  alert(gameScore);
  location.reload()
};

const processTick = () => {

  if (jumpCooldownTicksRemain > 0)
    jumpCooldownTicksRemain--;
  if (isInJump && jumpTicksRemain === 0)
    processFall();
  if ( !isInJump && map[0] === '1' )
    loseGame();
  if (jumpTicksRemain > 0)
    jumpTicksRemain--;

  map = map.slice(1);
  if ( map.length < 8 ) {
    map += '0000' + getRandomPatternMap()
  }
  boxDomElement.firstElementChild.remove();
  const newTileDomElement = document.createElement('div');
  newTileDomElement.className = `tile ${map[7]=='1'?'barrier':''}`;
  boxDomElement.appendChild(newTileDomElement);

  gameScore += 1;
  scoreboardDomElement.textContent = String(gameScore);
  console.log(map);
};

let map = "00000000" + getRandomPatternMap();

document.addEventListener('click', onJumpButton);

const main = () => {
  processTick();
  setTimeout(main, getMillisecondsPerTick(gameScore));
};
