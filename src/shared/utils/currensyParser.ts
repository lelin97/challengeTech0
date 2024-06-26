function currencyParser(value: number) {
  let valor = 0;
  if (Number(value) > 0) {
    valor = Number(value);
  }

  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export { currencyParser };
