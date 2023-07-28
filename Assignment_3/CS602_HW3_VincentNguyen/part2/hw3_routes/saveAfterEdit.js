const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();
// Save new employee's information after edit
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    res.render('404');
  } else {
    // eslint-disable-next-line no-unused-expressions
    employee.firstName = req.body.fname,
    employee.lastName = req.body.lname;
    await employee.save();
    res.redirect('/employees');
  }
};
