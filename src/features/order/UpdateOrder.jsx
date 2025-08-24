import { Form, fetcher } from "react-router-dom";

import Button from "../../ui/Button";

function UpdateOrder() {
  //   const fetcher = useFetcher();

  return (
    <Form method="PATCH" className="text-right">
      <Button
        type="primary"
        // disabled={fetcher.state === "loading" || fetcher.state === "submitting"}
      >
        Make priority
      </Button>
    </Form>
  );
}

export default UpdateOrder;
