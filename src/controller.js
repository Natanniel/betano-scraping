async function run(brownserInstance, scraperInstance) {
  try {
    return await scraperInstance.init(brownserInstance);
  } catch (error) {
    throw error;
  }
}

module.exports = (brownserInstance, scraperInstance) => run(brownserInstance, scraperInstance);