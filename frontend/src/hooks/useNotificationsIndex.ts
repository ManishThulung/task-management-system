// import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
// import axios from "axios";

// const INDEX_KEY = ["user", "notifications", "index"];

// const PER_PAGE = 20;

// interface Notification {
//   id: number;
//   message: string;
//   // Add other properties as needed
// }

// const getNextPageParam = (
//   lastPage: Notification[],
//   allPages: Notification[][]
// ) => (lastPage.length === PER_PAGE ? allPages.length + 1 : undefined);

// export const useNotificationsIndex = () =>
//   useInfiniteQuery<Notification[], Error>({
//     queryKey: INDEX_KEY,
//     queryFn: async ({ pageParam = 1 }: QueryFunctionContext) => {
//       const response = await axios.get(
//         `/user/notifications.json?page=${pageParam}`
//       );
//       return response.data;
//     },
//     getNextPageParam,
//   });
