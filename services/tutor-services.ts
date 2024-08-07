import { API_ROUTES } from "@/config/app-config";
import axios from "axios";

export const getListOfUserTutors = async ({ userId }: { userId: string }) => {
  try {
    const { data } = await axios.get(API_ROUTES.tutor.getUserTutors(userId));
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
