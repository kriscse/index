var db = window.openDatabase("fgw_shop", "1.0", "FGW Shop", 200000);
 //notification
 function table_transaction_success(table_name) {
    log("INFO", `Create table "${table_name}" successfully.`);
  }
  
  function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
  }
  
  function transaction_error(tx, error) {
    log("ERROR", `SQL Error ${error.code}: ${error.message}.`);
  }
  
    
  function fetch_transaction_success(name){
    log ("INFO", 'Insert "${name}", successfully');
  }
  

//Database
function initialize_database() {
    db.transaction(function (tx) {
      //table city
      var query = `CREATE TABLE IF NOT EXISTS city (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL)`;
  
      tx.executeSql(
        query,
        [],
        table_transaction_success("city") ,
        transaction_error
      );
  
      // table district
      var query = `CREATE TABLE IF NOT EXISTS district (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        city_id INTEGER NOT NULL,
        FOREIGN KEY (city_id) REFERENCES city(id))`;
  
      tx.executeSql(
        query,
        [],
        table_transaction_success("district") ,
        transaction_error
      );
  
    // table ward
    var query = `CREATE TABLE IF NOT EXISTS ward (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      district_id INTEGER NOT NULL,
      FOREIGN KEY (district_id) REFERENCES district(id))`;
  
    tx.executeSql(
      query,
      [],
      table_transaction_success("ward") ,
      transaction_error
    );
  
   // table account
   query = `CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    firstname TEXT NULL,
    lastname TEXT NULL,
    birthday REAL NULL,
    phone TEXT NULL,
    street TEXT NULL,
    ward_id INTEGER NULL,
    district_id INTEGER NULL,
    city_id INTEGER NULL,
    status INTEGER NOT NULL,
    FOREIGN KEY (ward_id) REFERENCES ward(id),
    FOREIGN KEY (district_id) REFERENCES district(id),
    FOREIGN KEY (city_id) REFERENCES city(id))`;
  
  tx.executeSql(
    query,
    [],
    table_transaction_success("account"),
    transaction_error
  );
  
      // table category
    var query = `CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT UNIQUE NOT NULL,
      parent_id INTEGER NULL,
      FOREIGN KEY (parent_id) REFERENCES category(id))`;
  
    tx.executeSql(
      query,
      [],
      table_transaction_success("category") ,
      transaction_error
    );
  
  
    // table product
    var query = `CREATE TABLE IF NOT EXISTS product (
      id INTEGER PRIMARY KEY AUTOINCREMENT ,
      name TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      category_id INTEGER NOT NULL,
      FOREIGN KEY (category_id) REFERENCES category(id))`;
  
    tx.executeSql(
      query,
      [],
      table_transaction_success("product") ,
      transaction_error
    );
  
  
    
    // table cart
    var query = `CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (account_id) REFERENCES account(id)
      FOREIGN KEY (product_id) REFERENCES product(id))`;
  
    tx.executeSql(
      query,
      [],
      table_transaction_success('cart') ,
      transaction_error
    );
  
    // table cart_item
    var query = `CREATE TABLE IF NOT EXISTS cart_item (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cart_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (cart_id) REFERENCES cart(id),
      FOREIGN KEY (product_id) REFERENCES product(id))`;
  
    tx.executeSql(
      query,
      [],
      table_transaction_success('cart_item') ,
      transaction_error
    );
  
  
   
    });
  }
  
  
  
  
  //DATA
  function fetch_database(){
    db.transaction(function(tx){
  
        
      //category
      var query ="INSERT INTO category (name,description) VALUES (?,?)";
      tx.executeSql(query, ["Luxury", "Perfect pro"], fetch_transaction_success("Luxury"), transaction_error);
      tx.executeSql(query, ["Fashion", "Trend"], fetch_transaction_success("Fashion"), transaction_error);
      tx.executeSql(query, ["Sport", "Like u Love Sport"], fetch_transaction_success("Sport"), transaction_error);
      tx.executeSql(query, ["Limited", "Expensive"], fetch_transaction_success("Limited"), transaction_error);
  
      //Account
      query =`INSERT INTO account (username, password, status) VALUES (?,?, 1)`;
      tx.executeSql(query, ["nhienthse@gmail.com", "123"], fetch_transaction_success("nhienthse@gmail.com"), transaction_error);
      tx.executeSql(query, ["nhienthtcs20048@greenwich.edu.vn", "123"], fetch_transaction_success("nhienthtcs20048@greenwich.edu.vn"), transaction_error);
      tx.executeSql(query, ["admin@gmail.com", "123"], fetch_transaction_success("admin@gmail.com"), transaction_error);
        });
    }
  
   