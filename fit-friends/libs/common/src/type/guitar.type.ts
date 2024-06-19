const GuitarTypeValue = {
  Electro: 'electro',
  Acoustics: 'acoustics',
  Ukukule: 'ukukule',
} as const;

export type TGuitarType = typeof GuitarTypeValue[keyof typeof GuitarTypeValue]
