const pool = require("../../../Config/db.polloing.Connection");
const { FaqMessages } = require("../../../Utils/ResponseMessagesCollection");
const utils = require("../../../Utils/Utils");
/////////////--------------------------------//////////////////////////////
// Get All FAQs Service
///////////////------------------------------//////////////////////////////
const getAllFaq = async () => {
  let result = {
    status: 0,
    message: "",
    data: "",
  };

  const conn = await pool.getConnection();
  try {
    let query = `SELECT id,question,answer,status,type FROM faqs`;
    let [res] = await conn.query(query);

    console.log("inside query", res);
    if (res && res.length > 0) {
      result.data = res;
      result.message = "success";
      result.status = 1;
    } else {
      result.data = [];
      result.message = "No data found";
      result.status = 0;
    }
  } catch (error) {
    result.message = error;
    result.status = 0;
  } finally {
    conn.release();
  }
  return result;
};
/////////////--------------------------------//////////////////////////////
// Get ActiveFAQS Service
///////////////------------------------------//////////////////////////////
const getActiveFaq = async () => {
  let result = {
    status: 0,
    message: "",
    data: "",
  };
  console.log("in getFAQS");
  const conn = await pool.getConnection();
  try {
    let query = `SELECT id,question,answer,status,type FROM faqs WHERE status=1`;
    let [res] = await conn.query(query);

    console.log("inside query", res);
    if (res && res.length > 0) {
      result.data = res;
      result.message = "success";
      result.status = 1;
    } else {
      result.message = "No data found";
      result.status = 0;
    }
  } catch (error) {
    result.message = error;
    result.status = 0;
  } finally {
    conn.release();
  }
  return result;
};

/////////////--------------------------------//////////////////////////////
// Add FAQ Service
///////////////------------------------------//////////////////////////////
const addFaq = async ({ question, answer, status, type }) => {
  let result = {
    status: 0,
    message: "",
    data: "",
  };

  const conn = await pool.getConnection();
  try {
    let currentTime = utils.commonFormateDate(new Date());

    let query = `INSERT INTO faqs (question,answer,status,type,created_at,updated_at) values (?,?,?,?,?,?)`;
    let [res] = await conn.query(query, [
      question,
      answer,
      status,
      type,
      currentTime,
      currentTime,
    ]);

    console.log("inside query", res);
    if (res && res.insertId) {
      result.data = { id: res.insertId };
      result.message = FaqMessages.FAQ_ADDED_SUCCESS;
      result.status = 1;
    } else {
      result.message = "Something Went Wrong";
      result.status = 0;
    }
  } catch (error) {
    result.message = error;
  } finally {
    conn.release();
  }
  return result;
};

/////////////--------------------------------//////////////////////////////
// Update FAQ Service
///////////////------------------------------//////////////////////////////
const updateFaqById = async ({ fid, question, answer, status, type }) => {
  let result = {
    status: 0,
    message: "",
    data: "",
  };

  const conn = await pool.getConnection();
  try {
    let currentTime = utils.commonFormateDate(new Date());

    let query = `UPDATE faqs SET question=?,answer=?,status=?,type=?,updated_at=? WHERE id=?`;
    let [res] = await conn.query(query, [
      question,
      answer,
      status,
      type,
      currentTime,
      fid,
    ]);

    console.log("inside query", res);
    if (res && res.affectedRows) {
      result.data = { id: fid };
      result.message = FaqMessages.FAQ_UPDATED_SUCCESS;
      result.status = 1;
    } else if (res.affectedRows === 0) {
      result.message = `FAQ ID ${fid} does not exist`;
      result.status = 0;
    } else {
      result.message = "Something Went Wrong";
      result.status = 0;
    }
  } catch (error) {
    result.message = error;
  } finally {
    conn.release();
  }
  return result;
};
/////////////--------------------------------//////////////////////////////
// Update FAQ status Service
///////////////------------------------------//////////////////////////////
const updateFaqStatusById = async ({ fid, statusBoolean }) => {
  let result = {
    status: 0,
    message: "",
  };

  console.log("in update status service=>", fid, statusBoolean);

  const conn = await pool.getConnection();
  try {
    let currentTime = utils.commonFormateDate(new Date());

    let query = `UPDATE faqs SET status=?,updated_at=? WHERE id=?`;
    let [res] = await conn.query(query, [statusBoolean, currentTime, fid]);

    console.log("inside query", res);
    if (res && res.affectedRows) {
      result.data = { id: fid };
      result.message = FaqMessages.FAQ_ACTIVE_STATUS_SUCCESS;
      result.status = 1;
    } else if (res.affectedRows === 0) {
      result.message = `FAQ ID ${fid} does not exist`;
      result.status = 0;
    } else {
      result.message = "Something Went Wrong";
      result.status = 0;
    }
  } catch (error) {
    result.message = error;
  } finally {
    conn.release();
  }
  return result;
};

/////////////--------------------------------//////////////////////////////
// Delete City Manager ById Service
///////////////------------------------------//////////////////////////////
const deleteFaqById = async ({ fid }) => {
  let result = {
    status: 0,
    message: "",
    data: "",
  };

  const conn = await pool.getConnection();
  try {
    let query = `DELETE FROM faqs WHERE id=?`;
    let [res] = await conn.execute(query, [fid]);

    // console.log("inside query delete city manager", res);
    if (res && res.affectedRows === 1) {
      result.data = { id: fid };
      result.message = FaqMessages.FAQ_DELETE_SUCCESS;
      result.status = 1;
    } else if (res.affectedRows === 0) {
      result.message = `FAQ ID ${fid} does not exist`;
      result.status = 0;
    } else {
      result.message = "Something Went Wrong";
      result.status = 0;
    }
  } catch (error) {
    result.message = error;
  } finally {
    conn.release();
  }
  return result;
};

module.exports = {
  addFaq,
  getAllFaq,
  getActiveFaq,
  updateFaqById,
  updateFaqStatusById,
  deleteFaqById,
};
