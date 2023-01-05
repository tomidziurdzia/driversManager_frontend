export const formatearCantidad = (cantidad = 0) => {
  return cantidad?.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
};
