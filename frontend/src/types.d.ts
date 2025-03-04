declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

import { type BaseSchema } from "../common/dto/base.dto";
import { PaymentStatus } from "../common/dto/payment.dto";

export interface IUser extends BaseSchema {
  _id: string;
  name: string;
  email: string;
  active?: boolean;
  role: "USER" | "ADMIN";
  password: string;
  paymentIds?: string[];
  fundingIds?: string[];
}

export interface IPayment extends BaseSchema {
  userId: string;
  fundingId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentId?: string;
  orderId?: string;
  method?: string;
}

export interface IFunding {
  _id: string;
  title: string;
  description: string;
  amountGoal: number;
  amountRaised: number;
  duration: number; // in days
  status: "ACTIVE" | "CLOSED";
  createdAt: string;
  updatedAt: string;
}

export interface IBank {
  _id: string;
  accountNumber: string;
  balance: number;
  bankName: string;
  ifscCode: string;
  createdAt: string;
}

interface StatsCardProps {
  title: string;
  value: number | string;
}

interface Funding {
  _id: string;
  title: string;
  amountGoal: number;
  amountRaised: number;
  status: string;
}

interface FundingTableProps {
  fundings: Funding[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
