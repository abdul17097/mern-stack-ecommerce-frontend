const displayCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  });

  return formatter.format(num);
};

export default displayCurrency;
