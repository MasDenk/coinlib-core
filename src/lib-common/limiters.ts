import Bottleneck from 'bottleneck'

const RATE_LIMIT = 2500

const limiter = new Bottleneck({
  minTime: RATE_LIMIT,
  maxConcurrent: 1,
})

limiter.on('failed', async (error, jobInfo) => {
  console.log('Limiter failed: ', JSON.stringify(error))
  if (jobInfo.retryCount < 10) {
    return RATE_LIMIT + jobInfo.retryCount * 400
  }
})

export { limiter }
