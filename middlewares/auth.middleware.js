const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

/**
 * Middleware para verificar si el usuario está autenticado.
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Comprobar si el token de autorización está presente
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing'
      });
    }
    
    // Extraer el token del encabezado
    const token = authHeader.split(' ')[1];
    
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret_key');
    console.log(typeof decoded.id);
    
    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token: User not found'
      });
    }
    
    // Adicionar el usuario al objeto de solicitud para que esté disponible en las siguientes rutas
    req.usuario = usuario;
    req.params.id = usuario.id;
    
    // Continuar con la siguiente función de middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};

module.exports = authMiddleware;
