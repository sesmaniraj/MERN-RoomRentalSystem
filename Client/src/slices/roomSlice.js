import { apiSlice } from "../slices/apiSlice";
const ROOM_URL = "/api/v1";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOM_URL}/registerroom`,
        method: "POST",
        body: data,
      }),
    }),
    getRoom: builder.query({
      query: () => ({
        url: `${ROOM_URL}/getroom`,
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterRoomMutation, useGetRoomQuery } = roomApiSlice;
