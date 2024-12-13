import { ApiCategory } from '../types/api';
import { ShoppingBag, Cloud, CreditCard, Users, FileCode } from 'lucide-react';

export const categoryConfig: Record<ApiCategory, {
  label: string;
  icon: typeof ShoppingBag;
}> = {
  ecommerce: {
    label: 'E-Commerce',
    icon: ShoppingBag,
  },
  cloud: {
    label: 'Cloud Services',
    icon: Cloud,
  },
  payment: {
    label: 'Payment',
    icon: CreditCard,
  },
  social: {
    label: 'Social',
    icon: Users,
  },
  other: {
    label: 'Other',
    icon: FileCode,
  }
};