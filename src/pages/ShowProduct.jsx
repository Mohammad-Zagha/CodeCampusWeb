import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NavBar from "../Components/NavBar";
import Product from "../Components/Product";
import axios from "axios";
import Cookies from "js-cookie";

const fetchProductData = async (token) => {
  try {
    console.log("Fetching");
    const headers = {
      token: token,
    };

    const response = await axios.get(
      "http://localhost:3000/api/v1/Admin/getProducts",
      {
        headers,
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const deleteProduct = async (id, token) => {
  try {
    const headers = {
      token: token,
    };
    const response = await axios.delete(
      `http://localhost:3000/api/v1/Admin/deleteproducts/${id}`,
      {
        headers,
      }
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.log(response.data);
    }
  } catch (err) {
    console.log(err);
  }
};

function ShowProductPage() {
  const token = Cookies.get("_auth");
  const queryClient = useQueryClient();

  const {
    status: productStatus,
    data: productData,
    error: productError,
  } = useQuery({
    queryKey: ["productdata"],
    queryFn: () => fetchProductData(token),
  });

  const mutation = useMutation({
    mutationFn: (id) => deleteProduct(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["productdata"]);
    },
  });

  if (productStatus === "loading") {
    return <div>Loading...</div>;
  } else if (productStatus === "error") {
    return <div>Error: {productError.message}</div>;
  } else {
    return (
      <>
        <NavBar index={2} />
        <div className="p-6 h-screen w-screen flex justify-center">
          <div className="h-2/3 w-2/3 grid lg:grid-cols-4 md:grid-cols-2 gap-2 p-4">
            {productData?.map((product) => (
              <div key={product._id} className="cols-span-1">
                <Product
                  img={`data:image/jpeg;base64,${product.image.data}`} // Assuming the image data is base64
                  name={product.name}
                  price={product.price}
                  qnt={product.stockQuantity}
                />
                <button
                  onClick={() => mutation.mutate(product._id)}
                  className="mt-2 bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default ShowProductPage;
