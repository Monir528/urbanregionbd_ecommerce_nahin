const product={
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://fabrilife.com/products/642edbcbb2bcb-square.jpg?v=20',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  }
const ProductLayout1 = () => {
    return (
      <div key={product.id} className="group relative border-gray-200 border-2">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none  lg:h-60">
        <picture>
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:opacity-75"
        />
        </picture>
      </div>
      <div className="pt-4 bg-white flex justify-between px-4 py-2">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
      <p className="text-center bg-indigo-500 font-semibold text-white p-2">View Details</p>
    </div>
    );
};

export default ProductLayout1;