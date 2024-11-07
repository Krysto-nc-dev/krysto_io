import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../slices/productsApiSlice";
import Loader from "../../components/shared/Loader";
import Message from "../../components/Message";
import Rating from "../../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    console.log("Ajouté au panier");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Avis créé avec succès");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-green-700 hover:text-green-500 font-semibold mb-6 inline-block"
      >
        &larr; Retour
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/3">
              <h3 className="text-3xl font-bold mb-4">{product.name}</h3>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Avis`}
              />
              <p className="text-xl font-semibold my-4">
                Prix: XPF {product.price}
              </p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="mb-4">
                <span className="font-semibold">Status:</span>{" "}
                {product.countInStock > 0
                  ? "En stock"
                  : "Ce produit n'est pas en stock"}
              </div>
              {product.countInStock > 0 && (
                <div className="flex items-center mb-4">
                  <label htmlFor="qty" className="mr-2 font-semibold">
                    Quantité:
                  </label>
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="p-2 border rounded-md"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="w-full bg-green-700 text-white py-2 rounded-lg shadow hover:bg-green-600 transition duration-200"
              >
                Ajouter au panier
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Avis</h2>
            {product.reviews.length === 0 && (
              <Message>Aucun avis pour ce produit</Message>
            )}
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-100 p-4 rounded-lg shadow"
                >
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p className="text-gray-500 text-sm">
                    {review.createdAt.substring(0, 10)}
                  </p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">
                Donner votre avis sur ce produit
              </h3>
              {loadingProductReview && <Loader />}
              {userInfo ? (
                <form onSubmit={submitHandler} className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="rating" className="font-semibold">
                      Note
                    </label>
                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="p-2 border rounded-md w-full"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="1">1 - Médiocre</option>
                      <option value="2">2 - Passable</option>
                      <option value="3">3 - Bien</option>
                      <option value="4">4 - Très bien</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment" className="font-semibold">
                      Commentaire
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-400 transition duration-200"
                  >
                    Soumettre
                  </button>
                </form>
              ) : (
                <Message>
                  Veuillez{" "}
                  <Link to="/connexion" className="text-blue-500">
                    vous connecter
                  </Link>{" "}
                  pour laisser un avis
                </Message>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
