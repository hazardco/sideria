import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Dynamic = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const endPoints = useSelector((state) => state.automator.endPoints)
  const apiServerUrl = useSelector((state) => state.automator.apiServerUrl)

  const endPoint = endPoints.find(
    (endpoint) =>
      endpoint.method === "GET" &&
      endpoint.url.split("/").length === 2 &&
      endpoint.url === pathname
  )

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (endPoint) {
        setLoading(true);
        try {
          const response = await fetch(`${apiServerUrl}${endPoint.url}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setTableData(data["results"]);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [endPoint]);

  const handleClick = () => {
    navigate(`${endPoint.url}/new`)
  }

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        Dynamic - {pathname}
      </h1>

      <button
        type="button"
        onClick={handleClick}
        className="my-5 py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        New
      </button>

      <div className="flex flex-col items-center w-full my-6 space-y-4 md:space-x-4 md:space-y-0 md:flex-row">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {endPoint && tableData.length > 0 &&
                  Object.keys(tableData[0]).map((propiedad) => (
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      {propiedad}
                    </th>
                  ))}
                <th
                  scope="col"
                  className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                >
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((fila, indexFila) => (
                <tr key={indexFila}>
                  {endPoint && tableData.length > 0 &&
                    Object.keys(fila).map((propiedad, indexPropiedad) => (
                      <td
                        key={indexPropiedad}
                        className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                      >
                        {
                          typeof fila[propiedad] == 'string' && fila[propiedad].includes("http") ?
                            <img src={fila[propiedad]} width={70}></img>
                            :
                            fila[propiedad]
                        }
                      </td>
                    ))}
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>


          </table>
        )}
      </div>
    </>
  );
};

export default Dynamic;
