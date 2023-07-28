const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();
// Display Delete Employee Information
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    res.render('404');
  } else {
    res.render('deleteEmployeeView', {
      title: 'Delete Employee',
      data: { id: employee._id, firstName: employee.firstName, lastName: employee.lastName },
    });
  }
};
