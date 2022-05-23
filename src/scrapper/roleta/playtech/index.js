async function analyze(frame){
  try{
    const values = await frame.$$eval('.roulette-game-area__history-line .roulette-history-item__value-textsiwxWvFlm3ohr_UMS23f', elements => {
      return elements.map((e) => parseInt(e.textContent));
    });
    return values;
  }catch(err){
    console.error(err);
    return [];
  }
}

module.exports = analyze; 