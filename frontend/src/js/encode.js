const permABin = (permiso) =>
  `${permiso.borrar ? 1 : 0}${permiso.editar ? 1 : 0}${permiso.anadir ? 1 : 0}${
    permiso.ver ? 1 : 0
  }`;

const binAPerm = (bin) => (
  console.log(bin),
  {
    ver: bin[3] == 1 ? true : false,
    anadir: bin[2] == 1 ? true : false,
    editar: bin[1] == 1 ? true : false,
    borrar: bin[0] == 1 ? true : false,
  }
);

const binAHex = (bin) =>
  parseInt(bin, 2)
    .toString(16)
    .toUpperCase();

const hexABin = (hex) =>
  parseInt(hex, 16)
    .toString(2)
    .padStart(4, '0');

const encode = (permisos) =>
  `${binAHex(permABin(permisos.cafe))}${binAHex(
    permABin(permisos.tamanos)
  )}${binAHex(permABin(permisos.caja))}${binAHex(
    permABin(permisos.ventas)
  )}${binAHex(permABin(permisos.proveedores))}${binAHex(
    permABin(permisos.usuarios)
  )}`;

const decode = (hexperm) => ({
  cafe: binAPerm(hexABin(hexperm[0])),
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
