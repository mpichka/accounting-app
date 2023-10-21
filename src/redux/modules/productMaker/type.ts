export type Bead = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  price?: string;
};

export const BeadsQuality = {
  low: 'low',
  medium: 'medium',
  high: 'high',
} as const;

export type BeadsQuality = keyof typeof BeadsQuality;

export const ThreadLengthType = {
  meter: 'meter',
  reel: 'reel',
} as const;

export type ThreadLengthType = keyof typeof ThreadLengthType;

export type Thread = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  length?: string;
  lengthType?: ThreadLengthType;
};

export const AccessoryPriceType = {
  one_unit: 'one_unit',
  fifty_units: 'fifty_units',
} as const;

export type AccessoryPriceType = keyof typeof AccessoryPriceType;

export type Accessory = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  price?: string;
  priceType?: AccessoryPriceType;
  amount?: string;
};

export type Package = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  price?: string;
};

export const GerdanType = {
  no_type: 'no_type',
  type_one: 'type_one',
  type_two: 'type_two',
  type_three: 'type_three',
  type_four: 'type_four',
  type_five: 'type_five',
} as const;

export type GerdanType = keyof typeof GerdanType;

export type ImageFile = {
  image?: string,
  preview?: string,
};

export type Amortization = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  price?: string;
  periodInMonths?: string;
};

export type Product = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  image: string | null;
  preview: string | null;
  name?: string;
  gerdanType?: GerdanType;
  schemaPrice?: string;
  schemaAuthor?: string;
  category?: string;
  weight?: string;
  length?: string;
  width?: string;
  estimate?: string;
  surcharge?: string;
  marge?: string;
  beadsQuality?: BeadsQuality;
  beadsTotalWeight?: string;
  threadsTotalPrice?: string;
  beads: Bead[];
  accessories: Accessory[];
  threads: Thread[];
  packages: Package[];
  amortizations: Amortization[];
};
