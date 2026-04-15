export const locationConfig = {
  name:              'Tarik Forex AI',
  address:           'Maputo, Moçambique',
  shortAddress:      'Maputo, MZ',
  country:           'Moçambique',
  city:              'Maputo',
  timezone:          'Africa/Maputo',
  locale:            'pt-MZ',
  email:             'tarik@tarikforex.com',
  phone:             '+258 84 000 0000',
  whatsapp:          '+258 84 000 0000',
  lat:               -25.9653,
  lng:                32.5892,
  supportHours:      'Segunda a Sexta: 08:00 – 20:00',
  supportHoursShort: 'Seg–Sex · 08:00–20:00',
  mapEmbedUrl:       '',
} as const;

export type LocationConfig = typeof locationConfig;
