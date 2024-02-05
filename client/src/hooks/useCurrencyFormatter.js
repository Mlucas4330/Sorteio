const useCurrencyFormatter = value => {
  const floatvalue = parseFloat(value) || 0
  return floatvalue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export default useCurrencyFormatter;
