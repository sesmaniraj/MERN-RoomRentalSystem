import { apiSlice } from "../slices/apiSlice";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerRoom: builder.mutation({
      query: (data) => ({
        url: "/registerroom",
        method: "POST",
        body: data,
      }),
    }),
    getRoom: builder.query({
      query: () => "/getroom",
    }),
  }),
});

export const { useRegisterRoomMutation, useGetRoomQuery } = roomApiSlice;
