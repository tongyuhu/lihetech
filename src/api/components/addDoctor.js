export const addDoctorApi = (obj) => {
  return {
    method: 'post',
    url: 'add',
    data: {
      'username': obj.username,
      'password': obj.password,
      'email': obj.email,
      'department': obj.department,
      'name': obj.name,
      'roleId': obj.roleId,
      'mobile': obj.mobile,
      'regionId': obj.regionId,
      'adminType': obj.adminType,
      'adminNote': obj.adminNote,
      'address': obj.address
    }
  }
}
