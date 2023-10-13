export default function Collections() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold dark:text-white">Categorias</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
                  alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm">
                <a href="#">
                  <p className="text-base font-semibold ">Consoles</p>
                </a>
              </h3>
            </div>
            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg"
                  alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm">
                <a href="#">
                  <p className="text-base font-semibold ">Livros</p>
                </a>
              </h3>
            </div>
            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg"
                  alt="Collection of four insulated travel bottles on wooden shelf."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm ">
                <a href="#">
                  <p className="text-base font-semibold ">Acessorios</p>
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
