function createBatches(data, batchSize = 100) {
  const batches = [];

  for (let i = 0; i < data.length; i += batchSize) {
    batches.push(data.slice(i, i + batchSize));
  }

  return batches;
}

module.exports = createBatches;