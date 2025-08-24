import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addToCart,
  decrease,
  increase,
  removeFromCart,
} from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const { cart } = useSelector((state) => state.cart);

  const itemInCart = cart.find((item) => item.pizzaId === id);

  const handleAddToCart = function () {
    const pizzaItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };

    dispatch(addToCart(pizzaItem));
  };

  const handleIncrease = function () {
    dispatch(increase(id));
  };
  const handleDecrease = function () {
    dispatch(decrease(id));
  };

  const handleRemoveFromCart = function () {
    dispatch(removeFromCart(id));
  };

  return (
    <li className="flex gap-4 py-2" key={id}>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}

          {itemInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <div className="flex items-center gap-2">
                <Button type="small" onClick={handleDecrease}>
                  -
                </Button>

                <p className="text-sm font-medium">{itemInCart.quantity}</p>

                <Button type="small" onClick={handleIncrease}>
                  +
                </Button>
              </div>

              <Button onClick={handleRemoveFromCart} type="small">
                delete
              </Button>
            </div>
          )}

          {!itemInCart && !soldOut && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
