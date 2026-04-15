import { brandConfig } from './brand';
import type { BrandConfig } from './brand';
import { contentConfig } from './content';
import type { ContentConfig } from './content';
import { locationConfig } from './location';
import type { LocationConfig } from './location';
import { clientNav, adminNav, categories, products } from './menu';
import type { NavItem, Category, Product } from './menu';

export const businessConfig = {
  brand:    brandConfig,
  content:  contentConfig,
  location: locationConfig,
  menu: {
    clientNav,
    adminNav,
    categories,
    products,
  },
} as const;

export type BusinessConfig = typeof businessConfig;
export type { BrandConfig, ContentConfig, LocationConfig, NavItem, Category, Product };
