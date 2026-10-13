const { PoolConnection } = require("mysql2");
const pool = require("../../../Config/db.polloing.Connection");
const utils = require("../../../Utils/Utils");

/////////////--------------------------------//////////////////////////////
// Get All Users Service
/////////////--------------------------------//////////////////////////////

const getAllUsers = async () => {
  let result = {
    status: 0,
    messages: "",
    data: "",
  };

  const conn = await pool.getConnection();

  try {
    let query = `
        SELECT
        id,
        username,
        password,
        role,
        status,
        last_login,
        created_at,
        updated_at
        FROM users
        WHERE deleted_at IS NULL        
        `;

    let [res] = await conn.query(query);
    console.log("inside query", res);

    if (res && res.length > 0) {
      result.data = res;
      result.messages = "success";
      result.status = 1;
    } else {
      result.data = [];
      result.messages = "No data found";
      result.status = 0;
    }
  } catch (error) {
    result.messages = error;
    result.status = 0;
  } finally {
    conn.release();
  }
  return result;
};

/////////////--------------------------------//////////////////////////////
// Get User ById Service
/////////////--------------------------------//////////////////////////////
const getUserById = async ({ uid }) => {
  let result = {
    status: 0,
    message: "",
    data: "",
  };
  const conn = await pool.getConnection();

  try {
    let query = `
        SELECT
        id,
        username,
        password,
        role,
        status,
        last_login,
        created_at,
        updated_at
        FROM users
        WHERE id=?
        AND deleted_at IS NULL        
        `;

    let [res] = await conn.query(query, [uid]);
    if (res && res.length > 0) {
      result.data = res[0];
      result.message = "Success";
      result.status = 1;
    } else {
      result.message = `User ID ${uid} does not exist`;
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
// Get User Status ById Service
///////////////------------------------------//////////////////////////////

const getUserStatusById = async ({ uid }) => {
  let result = {
    status: 0,
    message: "",
    data: "",
  };

  const conn = await pool.getConnection();
  try {
    let query = `
      SELECT 
        id,
        username,
        status
      FROM users
      WHERE id=?
      AND deleted_at IS NULL
    `;

    let [res] = await conn.query(query, [uid]);
    if (res && res.length > 0) {
      result.data = [0];
      result.message = "success";
      result.status = 1;
    } else {
      result.message = `User ID ${uid} does not exist`;
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
// Add User Service
///////////////------------------------------//////////////////////////////

const addUser = async ({ username, password, role, status }) => {
  let result = {
    status: 0,
    message: "",
    data: "",
  };

  const conn = await pool.getConnection();

  try {
    let currentTime = utils.commonFormateDate(new Date());

    const hashedPassword = await bcrypt.hash(password, 10);

    let query = `
      INSERT INTO users
      (
        username,
        password,
        role,
        status,
        created_at,
        updated_at
      )
      VALUES (?,?,?,?,?,?,?)
    `;

    let [res] = await conn.query(query, [
      username,
      email,
      hashedPassword,
      role,
      status,
      currentTime,
      currentTime,
    ]);

    console.log("inside query", res);
    if (res && res.insertId) {
      result.data = {
        id: res.insertId,
      };

      result.message = "User added successfully";
      result.status = 1;
    } else {
      result.message = "Something Went Wrong";
      result.status = 0;
    }
  } catch (error) {
    result.message = error;
    result.status = 0;
  } finally {
    conn.release();
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserStatusById,
};
