const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();
// Save new employee added.
module.exports = async (req, res, next) => {
  const employee = new Employee({
    firstName: req.body.fname,
    lastName: req.body.lname
  });
  await employee.save();
  res.redirect('/employees');
};
