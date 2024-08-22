import React from 'react'
import { RiLineChartLine, RiHashtag } from "react-icons/ri";

export default function Home() {
  return (
    <div className="grid xl:grid-cols-4 min-h-screen">

      <main className="lg:col-span-3 xl:col-span-5 bg-red-100 p-8 h-full overflow-y-auto">
        {/* Section 1 */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
          {/* Card 1 */}
          <div className="bg-red-700 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            <RiLineChartLine className="text-5xl" />
            <h4 className="text-2xl">Earnings</h4>
            <span className="text-5xl text-white">&euro; 8,350</span>
            <span className="py-1 px-3 bg-red-600/80 rounded-full">
              + 10% since last month
            </span>
          </div>
          {/* Card 2 */}
          <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl">
            <div className="flex items-center gap-4 bg-red-700/10 rounded-xl p-4">
              <span className="bg-red-700 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                98
              </span>
              <div>
                <h3 className="font-bold">Rank</h3>
                <p className="text-gray-500">In top 30%</p>
              </div>
            </div>
            <div className="bg-red-700/10 rounded-xl p-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-red-700 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                  32
                </span>
                <div>
                  <h3 className="font-bold">Projects</h3>
                  <p className="text-gray-500">8 this month</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="bg-red-700/20 py-1 px-4 rounded-full">
                  Mobile app
                </span>
                <span className="bg-red-700/20 py-1 px-4 rounded-full">
                  Branding
                </span>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
            <h1 className="text-2xl font-bold mb-8">Your projects</h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <img
                  src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-bold">Logo design for Bakery</h3>
                  <p className="text-gray-500">1 day remaining</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-bold">Logo design for Bakery</h3>
                  <p className="text-gray-500">1 day remaining</p>
                </div>
              </div>
              <div className="flex justify-end">
                <a
                  href="#"
                  className="hover:text-red-700 transition-colors hover:underline"
                >
                  See all projects
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-8">Recent invoices</h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              {/* Card 1 */}
              <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src="https://img.freepik.com/foto-gratis/hombre-joven-hermoso-contento-camiseta-azul-que-senala-lado_1262-17845.jpg"
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-bold">Alexander Williams</h3>
                    <p className="text-gray-500">JQ Holdings</p>
                  </div>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                    Paid
                  </span>
                </div>
                <div>
                  <span className="font-bold">&euro; 1,200.87</span>
                </div>
              </div>
              {/* Card 2 */}
              <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src="https://img.freepik.com/foto-gratis/alegre-joven-deportista-posando-mostrando-pulgares-arriba-gesto_171337-8194.jpg"
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-bold">Jhon Philips</h3>
                    <p className="text-gray-500">Inchor Techs</p>
                  </div>
                </div>
                <div>
                  <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full font-medium">
                    Late
                  </span>
                </div>
                <div>
                  <span className="font-bold">&euro; 12,998.88</span>
                </div>
              </div>
            </div>
            <div className="bg-red-800 text-gray-300 p-8 rounded-xl shadow-2xl flex items-center justify-between flex-wrap xl:flex-nowrap gap-8">
              <div>
                <RiHashtag className="text-4xl -rotate-12" />
              </div>
             
              <div className="w-full xl:w-auto">
                
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-8">Recommended project</h1>
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Thomas Martin</h3>
                    <p className="text-gray-500">Updated 10m ago</p>
                  </div>
                </div>
                <div>
                  <span className="bg-red-700 py-2 px-4 rounded-full text-white">
                    Design
                  </span>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
