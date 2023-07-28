const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();
// Delete employee after click confirm
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    res.render('404');
  } else {
    await employee.remove();
    res.redirect('/employees');
  }
};
