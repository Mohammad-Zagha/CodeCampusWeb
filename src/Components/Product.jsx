function Product({ img, name, price, qnt }) {
  return (
    <div
      className="flex flex-col bg-white h-72 w-48 p-4 rounded-lg overflow-hidden"
      style={{
        boxShadow:
          "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      }}
    >
      <div className="flex-shrink-0">
        <img src={img} alt={name} className="w-full h-36 object-cover" />
      </div>
      <div className="flex-grow flex flex-col justify-between mt-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-500">${price.toFixed(2)}</p>
        </div>
        <div className="mt-2">
          <p className="text-gray-500">Quantity: {qnt}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
