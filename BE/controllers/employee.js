const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res) => {
  const {id} = req.params;
  const index = employee.findIndex((emp) => emp.id == id)
  if(index === -1){
    return res.status(404).json({message: "Employee Not Found"})
  }
  employee.splice(index,1);

  res.status(200).json({message:"Employee Deleted Successfully"})
};

// TODO
exports.createEmployee = async (req, res) => {
    const {name,id} = req.body;
  if(!name || !id){
    return res.status(400).json({message:"please enter a correct name & id"})
  }
  const newEmployee = {name,id}
  employee.push(newEmployee)
    res.status(201).json({message:"Employee Created Successfully", data: newEmployee})
};
