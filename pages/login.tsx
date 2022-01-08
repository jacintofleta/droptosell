// pages/login.js

import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { ProcessEnv } from "../types/env";

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { elements } = event.target;

    // the Magic code
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY as ProcessEnv
    ).auth.loginWithMagicLink({ email: elements.email.value });

    // Once we have the did from magic, login with our own API
    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });
    console.log(authRequest);

    if (authRequest.ok) {
      // We successfully logged in, our API
      router.push("/products");
    } else {
      /* handle errors */
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input name="email" type="email" />
      <button>Log in</button>
    </form>
  );
}
