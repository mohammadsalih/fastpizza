import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { createUser } from "./userSlice";

import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const storedUsername = useSelector((state) => state.user.username);

  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = username.trim();
    if (!trimmed) return;

    dispatch(createUser({ username: trimmed }));
    setUsername("");

    navigate("/menu");
  }

  // Case 1: user already set → no form, just the continue button
  if (storedUsername) {
    return (
      <Button to={"/menu"} type="primary">
        contenu ordering , {storedUsername}
      </Button>
    );
  }

  // Case 2: no user yet → show form + submit button
  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username.trim() && (
        <div>
          <Button type="primary">Start ordering, {username.trim()}</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
