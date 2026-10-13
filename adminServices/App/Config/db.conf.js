module.exports = {
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "school_management_system",
    port: process.env.MYSQL_PORT || 3306,
    connectionLimit: 50,
    waitForConnections: true,
    queueLimit: 0,
    debug: false,
  },
};

