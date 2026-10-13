const moment = require("moment");

//This function is used to remove the extra spaces from string
function normalzeString(StringContent) {
  // Replace all extra spaces with a single space
  StringContent = StringContent.replace(/\s+/g, " ");

  // Remove leading and trailing spaces
  StringContent = StringContent.trim();

  return StringContent;
}

// function to convert milliseconds to hrs an minutes in format (2 h 3 m)
function formatMilliSecToHrsMinutes(milliseconds) {
  // console.log("type of time", typeof milliseconds);
  const hours = Math.floor(milliseconds / 3600000); // 3600000 milliseconds in an hour
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  // console.log("inside hrs and minutes formatter", minutes, hours);
  return `${hours}h ${minutes}m`;
}

// function sumBreakTimes(breakTimings) {
//   // console.log("vre", breakTimings);

//   let totalMilliseconds = 0;

//   for (const breakTiming of breakTimings) {
//     const timeParts = breakTiming.break_time.split(":");
//     const hours = parseInt(timeParts[0]);
//     const minutes = parseInt(timeParts[1]);
//     const seconds = parseInt(timeParts[2]);
//     const milliseconds = parseInt(timeParts[3]) || 0;

//     totalMilliseconds +=
//       hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
//   }

//   // Convert the total milliseconds to a time duration
//   const totalHours = Math.floor(totalMilliseconds / 3600000);
//   totalMilliseconds %= 3600000;
//   const totalMinutes = Math.floor(totalMilliseconds / 60000);
//   totalMilliseconds %= 60000;
//   const totalSeconds = Math.floor(totalMilliseconds / 1000);
//   const totalMillis = totalMilliseconds % 1000;

//   return `${totalHours}:${totalMinutes}:${totalSeconds}.${totalMillis}`;
// }

function sumBreakTimes(breakTimings) {
  let totalMilliseconds = 0;

  for (const breakTiming of breakTimings) {
    if (!breakTiming.break_time) continue; // Skip if break_time is null or undefined

    const timeParts = breakTiming.break_time.split(":");
    const hours = parseInt(timeParts[0]) || 0;
    const minutes = parseInt(timeParts[1]) || 0;
    const seconds = parseInt(timeParts[2]) || 0;
    const milliseconds = parseInt(timeParts[3]) || 0;

    totalMilliseconds +=
      hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
  }

  // Convert the total milliseconds to a time duration
  const totalHours = Math.floor(totalMilliseconds / 3600000);
  totalMilliseconds %= 3600000;
  const totalMinutes = Math.floor(totalMilliseconds / 60000);
  totalMilliseconds %= 60000;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const totalMillis = totalMilliseconds % 1000;

  return `${totalHours}:${String(totalMinutes).padStart(2, "0")}:${String(
    totalSeconds,
  ).padStart(2, "0")}.${String(totalMillis).padStart(3, "0")}`;
}

function commonFormateDate(dateData) {
  return moment(dateData).format("YYYY-MM-DD HH:mm:ss");
}
function commonFormateDateOnly(dateData) {
  return moment(dateData).format("YYYY-MM-DD");
}
function commonFormateTimeOnly(dateData) {
  return moment(dateData).format("HH:mm:ss");
}
function parseBreakTime(breakTime) {
  // Parse the time using moment.duration
  const timeDifference = moment.duration(breakTime);

  // Format the output as "Xd Xh Xm Xs"
  return `${Math.floor(
    timeDifference.asDays(),
  )}d ${timeDifference.hours()}h ${timeDifference.minutes()}m ${timeDifference.seconds()}s`;
  // return {
  //   days: Math.floor(timeDifference.asDays()),
  //   hours: timeDifference.hours(),
  //   minutes: timeDifference.minutes(),
  //   seconds: timeDifference.seconds(),
  // };
}

const slugify = (str) => {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
};

const generateUniqueSlug = (name) => {
  const uniqueId = Date.now().toString(16); // Similar to PHP's uniqid()
  return `${slugify(name)}-${uniqueId}`;
};

// Function to check if a URL contains a domain name
function hasDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol && urlObj.host;
  } catch (error) {
    return false;
  }
}
// Function to get the correct image URL
function formateAwsImageUrl(image_url) {
  if (!image_url || image_url.trim() === "") return image_url;
  return hasDomain(image_url)
    ? image_url
    : `${process.env.APP_IMAGE_URL}/${image_url}`;
}
module.exports = {
  normalzeString,
  formatMilliSecToHrsMinutes,
  sumBreakTimes,
  commonFormateDate,
  commonFormateDateOnly,
  commonFormateTimeOnly,
  parseBreakTime,
  slugify,
  generateUniqueSlug,
  formateAwsImageUrl,
};
