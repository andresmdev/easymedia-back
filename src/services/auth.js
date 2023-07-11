const auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

exports.registerUser = async (data) => {
  const { name, email, password } = data;

  if(!name) {
    throw "NAME_REQUIRED";
  }

  if(!email) {
    throw "EMAIL_REQUIRED";
  }

  if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    throw "EMAIL_INVALID";
  }
  
  if(!password) {
    throw "PASSWORD_REQUIRED";
  }

  const checkEmail = await auth.checkEmailData(email);

  if(checkEmail === 1) {
    throw "EMAIL_ALREADY_EXISTS";
  }
  else {
    const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));

    const id = uuid.v4();

    const register = await auth.registerUserData(id, name, email, hashPassword);

    if(!register) {
      throw "SYSTEM_ERROR";
    }
    else {
      return "USER_REGISTERED"
    }
  }
}

exports.userLogin = async (data) => {
  const { email, password } = data;

  if(!email) {
    throw "EMAIL_REQUIRED";
  }

  if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    throw "EMAIL_INVALID";
  }

  if(!password) {
    throw "PASSWORD_REQUIRED";
  }

  const checkEmail = await auth.checkEmailData(email);

  if(checkEmail === 0) {
    throw "EMAIL_NOT_FOUND";
  }
  else {
    const result = await auth.userLoginData(email);

    const match = bcrypt.compareSync(password, result.password);

    console.log(result);

    if(!match) {
      throw "WRONG_PASSWORD";
    }
    else {
      const payLoad = {
        "id": result.id,
        "name": result.name,
        "email": result.email
      }

      const _sign = jwt.sign(payLoad, process.env.SIGNTOKEN);
      
      console.log("TOKEN ===> ", _sign);

      return _sign;
    }

  }


}


/*
exports.getInvoice = async (data) => {
  const id = data.params.id;
  
  const result = await invoice.getInvoiceData(id);
  console.log("DATA ===>", result);

  if(!result) {
    throw "SYSTEM_ERROR";
  }
  else {
    return result[0];
  }
}

exports.setInvoice = async (data) => {
  const file = data.file;
  const id = uuid.v4();

  const fileStorage = await storage.fileStorage(file, file.mimetype);
  console.log(fileStorage);

  const lastSlash = String(fileStorage).lastIndexOf("/");
  const lastDot = String(fileStorage).lastIndexOf(".");
  const fileName = String(fileStorage).substring(lastSlash + 1, lastDot);
  const fileType = String(fileStorage).substring(lastDot + 1);
  

  const invoiceData = {
    "id": id,
    "file_path": fileStorage,
    "path": `${fileName}.${fileType}`,
    "metadata": {
      "name": file.originalname,
      "size": file.size,
      "encoding": file.encoding,
      "type": file.mimetype
    },
    "executed": false,
    "processed": false,
    "error": false,
    "sync": false,
    "file_extracted_data": null,
    "created_at": new Date().toLocaleString('en-GB', {hour12: false})
  }
  console.log(invoiceData);

  const insert_data = await invoice.insertData(invoiceData);
  console.log("INSERT DATA ===>", insert_data);

  const logicAppData = await request.sendToLogicApp(id, invoiceData.path);
  console.log("LOGIC APP ===>", logicAppData);

  const update_executed = await invoice.updateData(id, logicAppData.result);
  console.log("UPDATE DATA ===>", update_executed);

  if(!update_executed) {
    throw "SYSTEM_ERROR";
  }
  else {
    return true;
  }
}

exports.updateInvoice = async (data) => {
  const { id, result } = data;

  const update_data = await invoice.updateByIdProcessed(id, result);

  if(!update_data) {
    throw "SYSTEM_ERROR";
  }
  else {
    return true;
  }
}

exports.updateSyncInvoice = async (data) => {
  const { id } = data;

  const update_data = await invoice.updateByIdSync(id);
  
  if(!update_data) {
    throw "SYSTEM_ERROR";
  }
  else {
    return true;
  }
}

exports.getInvoiceSync = async () => {
  const result = await invoice.getInvoiceSyncData();

  delete result[0]._id;
  const data = result[0];

  if(!result) {
    throw "SYSTEM_ERROR";
  }
  else {
    return data;
  }
}
*/