import api from "../index/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

const ITEMS_PER_PAGE = 4;

const fetchMoments = async ({ pageParam = 1 }) => {
  const res = await api(
    "GET",
    `/weddings?page=${pageParam}&limit=${ITEMS_PER_PAGE}`
  );
  return res;
};

export const useFetchMoments = (options = {}) => {
  return useInfiniteQuery({
    queryKey: ["moments"],
    queryFn: fetchMoments,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });
};

const uploadMomentsImage = async (formData) => {
  const res = await api("POST", "/weddings/upload-images", formData);
  return res;
};

export const useUploadMomentsImage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMomentsImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["moments"] });
      console.log("Image uploaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error uploading image:", error);
    },
    ...options,
  });
};
