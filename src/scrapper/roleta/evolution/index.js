async function analyze(frame){
  try{
    const values = await frame.$$eval('.recent-numbers--834df .value--877c6', elements => {
      return elements.map((e) => parseInt(e.textContent));
    });
    return values;
  }catch(err){
    console.error(err);
    return [];
  }
}

module.exports = analyze; 