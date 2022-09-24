const users = require('../public/data.json');

module.exports.getRandomUser = (req, res) => {
  var randomUser = users[Math.floor(Math.random() * users.length)];
  res.json(randomUser);
};

module.exports.getAllUsers = (req, res) => {
  const { limit } = req.query;
  res.json(users.slice(0, limit));
};

module.exports.saveAUser = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send({
    message: 'New user added success',
    newUser
  });
};

module.exports.updateUser = (req, res) => {
  const newData = req.body;
  const { id } = req.params;
  const existData = users.find(user => user.id === Number(id));

  if (existData) {
    existData.id = newData.id;
    existData.name = newData.name;
    existData.contact = newData.contact;
    res.send({
      message: 'data update success',
      newData
    });
  } else {
    res.send('invalid id, Please give a valid id')
  }
};

module.exports.updateUsers = (req, res) => {
  const { ids, data } = req.body;
  let updatedata = [];

  for (let i = 0; i < ids.length; i++) {
    const existData = users.find(user => user.id === Number(ids[i]));
    updatedata.push(existData);
  };

  if (data) {
    updatedata.map(user => {
      user.id = data.id;
      user.name = data.name;
      user.contact = data.contact;
      res.send({
        message: 'data update success',
        data
      });
    });
  } else {
    res.send('invalid data, Please give a valid data');
  };
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const filter = users.find(user => user.id === Number(id));

  if (filter) {
    users.pop(filter);

    res.send({
      message: 'user delete success',
      filter
    });
  } else {
    res.send('this id is not exist, Please give a valid id');
  };
};