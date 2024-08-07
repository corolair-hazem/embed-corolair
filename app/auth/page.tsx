"use client";
import { FunctionComponent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";

interface AuthProps {}

const Auth: FunctionComponent<AuthProps> = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { replace } = useRouter();

  const [value, setValue, removeValue] = useLocalStorage("token", token);
  useEffect(() => {
    setValue(token);
    replace("/dashboard");
  }, [replace, setValue, token]);

  return <div>Authenticating....</div>;
};

export default Auth;
