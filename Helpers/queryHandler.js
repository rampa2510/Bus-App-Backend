module.exports.insertOne = async (query, collection, db) => {
  // const db = await connect();
  // console.log(db)
  return new Promise((resolve, reject) => {
    db.collection(collection).insertOne(query, (err, resp) => {
      if (err) return reject(err);
      resolve(resp.ops[0]);
      return resp.ops[0];
    });
  });
  // console.log(db)
};

module.exports.getId = async (collection, db) => {
  // const db = await connect();
  // console.log(db)
  return new Promise((resolve, reject) => {
    db.collection(collection).findAndModify(
      { name: collection },
      [],
      { $inc: { count: 1 } },
      { upsert: true, new: true },
      (err, resp) => {
        if (err) return reject(err);
        // console.log(resp);
        resolve(resp.value.count);
        return resp;
      }
    );
  });
};

module.exports.findOne = async (query, collection, db) => {
  // const db = await connect();
  // console.log(db)

  return new Promise((resolve, reject) => {
    db.collection(collection).findOne(query, (err, resp) => {
      if (err) return reject(err);
      resolve(resp);
      return resp;
    });
  });
  // console.log(db)
};

module.exports.findAll = async (collection, db, query = {}) => {
  // const db = await connect();
  // console.log(db)

  return new Promise((resolve, reject) => {
    db.collection(collection)
      .find(query)
      .toArray((err, resp) => {
        if (err) return reject(err);
        // console.log(query);
        resolve(resp);
        return resp;
      });
  });
  // console.log(db)
};

module.exports.updateOne = async (query, newData, collection, db) => {
  // const db = await connect();
  // console.log(db)
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-unused-vars
    db.collection(collection).updateOne(query, newData, (err, _resp) => {
      if (err) return reject(err);
      resolve(true);
      return true;
    });
  });
  // console.log(db)
};

module.exports.deleteOne = async (query, collection, db) => {
  // const db = await connect();
  // console.log(db)
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-unused-vars
    db.collection(collection).deleteOne(query, (err, _resp) => {
      if (err) return reject(err);
      resolve(true);
      return true;
    });
  });
  // console.log(db)
};
