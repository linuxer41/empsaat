import { apiKeyCrud } from './crud/api-key';
import { debtDB } from './crud/debt';
import { generalDB } from './crud/general';
import { subscriberDB } from './crud/subscriber';
import { userCrud } from './crud/user';

  export const db = {
    user: userCrud,
    general: generalDB,
    debt: debtDB,
    subscriber: subscriberDB,
    apiKey: apiKeyCrud,
  };
  