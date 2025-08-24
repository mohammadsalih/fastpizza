import { updateOrder } from "../../services/apiRestaurant";

export async function action({ params }) {
  await updateOrder(params.orderId, { priority: true });

  return null;
}
