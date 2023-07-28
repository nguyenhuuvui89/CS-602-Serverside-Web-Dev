const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();
// Display edit employee view with employee's information
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    res.render('404');
  } else {
    res.render('editEmployeeView', {
      title: 'Edit Course',
      data: { id: employee._id, firstName: employee.firstName, lastName: employee.lastName },
    });
  }
};
