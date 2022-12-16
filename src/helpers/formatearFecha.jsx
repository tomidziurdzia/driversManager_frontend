export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha);

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return nuevaFecha.toLocaleDateString("en-EN", opciones);
};

export const fechaCorta = (fecha) => {
  const nuevaFecha = new Date(fecha);

  const opciones = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  return nuevaFecha.toLocaleDateString("es-ES", opciones);
};
