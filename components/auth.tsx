"use client";
import { FunctionComponent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

interface AuthProps {}

const Auth: FunctionComponent<AuthProps> = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const { replace } = useRouter();

  const [value, setValue, removeValue] = useLocalStorage("userId", userId);
  useEffect(() => {
    setValue(userId);
    replace("/dashboard");
  }, [replace, setValue, userId]);

  return <div>Authenticating....</div>;
};

export default Auth;
