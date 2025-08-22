import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { decrease, increase, removeFromCart } from "./cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const { pizzaId, name, quantity, totalPrice } = item;

  const handleRemoveFromCart = function () {
    dispatch(removeFromCart(pizzaId));
  };

  const handleIncrease = function () {
    dispatch(increase(pizzaId));
  };
  const handleDecrease = function () {
    dispatch(decrease(pizzaId));
  };

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <div className="flex items-center gap-3 sm:gap-8">
          <div className="flex items-center gap-2">
            <Button type="small" onClick={handleDecrease}>
              -
            </Button>

            <p className="text-sm font-medium">{quantity}</p>

            <Button type="small" onClick={handleIncrease}>
              +
            </Button>
          </div>

          <Button onClick={handleRemoveFromCart} type="small">
            delete
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
