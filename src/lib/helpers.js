var bcryptjs = require('bcryptjs');
var helpers = {};

helpers.encriptado_contraseña = async(contraseña) =>{
  var salt = await bcryptjs.genSalt(10);
  var hash = await bcryptjs.hash(contraseña,salt);
  return hash;
};

helpers.compara_contraseña = async(contraseña,savePassword) =>{
  try {
      return await bcryptjs.compare(contraseña,savePassword);
  } catch (e) {
    console.log(e);
  }
};
module.exports = helpers;
