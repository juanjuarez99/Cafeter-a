// Creamos una función que genera una cadena de texto en binario tipo: "0000" o
// "1001" a partir de el permiso que se le pase
const permABin = (permiso) =>
  `${permiso.borrar ? 1 : 0}${permiso.editar ? 1 : 0}${permiso.anadir ? 1 : 0}${
    permiso.ver ? 1 : 0
  }`;

// Creamos una función para crear un objeto que cuente con 4 campos, "ver",
// "anadir", "editar" y "borrar" basados en una cadena de binario tipo "1010"
const binAPerm = (bin) => ({
  ver: bin[3] == 1 ? true : false,
  anadir: bin[2] == 1 ? true : false,
  editar: bin[1] == 1 ? true : false,
  borrar: bin[0] == 1 ? true : false,
});

// Creamos una función que convierta una cadena de binario tipo: "1111" a
// hexadecimal, tipo "F"
const binAHex = (bin) =>
  parseInt(bin, 2)
    .toString(16)
    .toUpperCase();

// Creamos una función que convierta una cadena de hexadecimal tipo: "B" a
// "1011"
const hexABin = (hex) =>
  parseInt(hex, 16)
    .toString(2)
    .padStart(4, '0');

// Creamos una función que utiliza las funciones anteriores para tomar un objeto
// que tenga 6 campos, "cafes", "tamanos", "caja", "ventas", "proveedores" y
// "usuarios"    y lo convertimos en una cadena de texto en formato hexadecimal
const encode = (permisos) =>
  `${binAHex(permABin(permisos.cafes))}${binAHex(
    permABin(permisos.tamanos)
  )}${binAHex(permABin(permisos.caja))}${binAHex(
    permABin(permisos.ventas)
  )}${binAHex(permABin(permisos.proveedores))}${binAHex(
    permABin(permisos.usuarios)
  )}`;

// Creamos una función que utiliza las funciones anteriores a encode para tomar
// una cadena de texto en formato hexadecimal y convertirla en un objeto con
// campos "cafes", "tamanos", "caja", "ventas", "proveedores" y "usuarios"
// representando los permisos del usuario para cada sección
const decode = (hexperm) => ({
  cafes: binAPerm(hexABin(hexperm[0])),
  tamanos: binAPerm(hexABin(hexperm[1])),
  caja: binAPerm(hexABin(hexperm[2])),
  ventas: binAPerm(hexABin(hexperm[3])),
  proveedores: binAPerm(hexABin(hexperm[4])),
  usuarios: binAPerm(hexABin(hexperm[5])),
});

module.exports = {
  encode,
  decode,
};
