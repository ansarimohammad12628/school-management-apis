const os = require("os");
const logger = require("./logger");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const CPU_USAGE_THRESHOLD = process.env.CPU_USAGE_THRESHOLD;
const CHECK_INTERVAL = process.env.CHECK_INTERVAL;

function cpuAverage() {
  const cpus = os.cpus();
  let totalIdle = 0;
  totalTick = 0;

  cpus.forEach((core) => {
    for (const type in core.times) {
      totalTick += core.times[type];
    }
    totalIdle += core.times.idle;
  });

  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

function getCPUUsage() {
  return new Promise((resolve) => {
    const startMeasure = cpuAverage();

    setTimeout(() => {
      const endMeasure = cpuAverage();

      const idleDifference = endMeasure.idle - startMeasure.idle;
      const totalDifference = endMeasure.total - startMeasure.total;

      const percentageCpu = 100 - ~~((100 * idleDifference) / totalDifference);

      resolve(percentageCpu);
    }, 1000);
  });
}

async function monitorCpu() {
  console.log("Starting CPU Monitor...");

  setInterval(async () => {
    const cpuUsage = await getCPUUsage();
    console.log(`Current CPU Usage: ${cpuUsage}%`);
    logger.info(`Current CPU Usage: ${cpuUsage}%`);

    if (cpuUsage > CPU_USAGE_THRESHOLD) {
      logger.warn(
        `⚡ High CPU detected (${cpuUsage}%)! Attempting to restart services...`,
      );
    }
  }, CHECK_INTERVAL);
}

module.exports = { monitorCpu };
