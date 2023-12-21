"use client";

import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

function SignIn() {
    const callbackUrl = "/";

    useEffect(()=>{
        signIn("github", { callbackUrl });
    },[])

  return (
    <h1>Redirecting to GitHub</h1>
  );
}

export default SignIn;