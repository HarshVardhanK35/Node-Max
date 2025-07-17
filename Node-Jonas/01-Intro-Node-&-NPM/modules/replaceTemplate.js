module.exports = (temp, product) => {
  let output = temp.replace(/{X-product-name-X}/g, product.productName);
  output = output.replace(/{X-product-image-X}/g, product.image);
  output = output.replace(/{X-product-price-X}/g, product.price);
  output = output.replace(/{X-location-X}/g, product.from);
  output = output.replace(/{X-product-nutrients-X}/g, product.nutrients);
  output = output.replace(/{X-product-quantity-X}/g, product.quantity);
  output = output.replace(/{X-product-description-X}/g, product.description);
  output = output.replace(/{X-product-ID-X}/g, product.id);

  if (!product.organic)
    output = output.replace(/{X-NOT_ORGANIC-X}/g, "not-organic");
  return output;
}
