import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { ApiResponse, IFunding, IPayment, IUser, IBank } from "../types";

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // User APIs
    me: builder.query<ApiResponse<IUser>, void>({
      query: () => `/users/me`,
    }),
    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { email: string; password: string }
    >({
      query: (body) => ({ url: `/users/login`, method: "POST", body }),
    }),
    register: builder.mutation<
      ApiResponse<IUser>,
      Omit<IUser, "_id" | "active" | "role"> & { confirmPassword: string }
    >({
      query: (body) => ({ url: `/users/register`, method: "POST", body }),
    }),
    updateUser: builder.mutation<ApiResponse<IUser>, IUser>({
      query: (body) => ({ url: `/users/me/${body._id}`, method: "PUT", body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: `/users/logout`, method: "POST" }),
    }),
    // Fetch all users (Admin Only)
    getAllUsers: builder.query<ApiResponse<IUser[]>, void>({
      query: () => `/users`,
    }),

    //  Funding APIs
    getAllFunding: builder.query<ApiResponse<IFunding[]>, void>({
      query: () => `/fundings/all`,
    }),
    getFundingById: builder.query<ApiResponse<IFunding>, string>({
      query: (id) => `/fundings/${id}`,
    }),
    createFunding: builder.mutation<
      ApiResponse<IFunding>,
      { title: string; description: string; amountGoal: number }
    >({
      query: (body) => ({ url: `/fundings/create`, method: "POST", body }),
    }),

    // Bank Add APIs
    getAllBanks: builder.query<ApiResponse<IBank[]>, void>({
      query: () => `/bank`,
    }),
    getBankById: builder.query<ApiResponse<IBank>, string>({
      query: (id) => `/bank/${id}`,
    }),
    createBank: builder.mutation<
      ApiResponse<IBank>,
      {
        accountNumber: string;
        bankName: string;
        ifscCode: string;
        balance: number;
      }
    >({
      query: (body) => ({ url: `/bank/create`, method: "POST", body }),
    }),
    updateBank: builder.mutation<ApiResponse<IBank>, IBank>({
      query: ({ _id, ...body }) => ({
        url: `/bank/${_id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteBank: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({ url: `/bank/${id}`, method: "DELETE" }),
    }),

    // Payment APIs
    createPayment: builder.mutation<
      ApiResponse<IPayment>,
      { fundingId: string; amount: number }
    >({
      query: (body) => ({ url: `/payments/create`, method: "POST", body }),
    }),
    getAllPayments: builder.query<ApiResponse<IPayment[]>, void>({
      query: () => `/payments/all`,
    }),
    getPaymentById: builder.query<ApiResponse<IPayment>, string>({
      query: (id) => `/payments/${id}`,
    }),
    updatePaymentStatus: builder.mutation<
      ApiResponse<IPayment>,
      { id: string; status: "SUCCESS" | "FAILED" }
    >({
      query: ({ id, status }) => ({
        url: `/payments/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useLogoutMutation,
  useGetAllFundingQuery,
  useGetFundingByIdQuery,
  useCreateFundingMutation,
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentStatusMutation,
  useGetAllBanksQuery,
  useGetBankByIdQuery,
  useCreateBankMutation,
  useUpdateBankMutation,
  useDeleteBankMutation,
} = api;
