import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
const DynamicAuth = dynamic(() => import("@/components/auth"), { ssr: false });
interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  return <DynamicAuth />;
};

export default Page;
