import { ILanguage } from '../interfaces/language';

const dataLanguages: ILanguage[] = [
  {
    locale: 'en',
    code: 'EN',
    name: 'English',
    icon: '/images/languages/language-1.png',
    direction: 'ltr',
    messages: require('../locales/en.json')
  },
  {
    locale: 'pt-BR',
    code: 'PT',
    name: 'Português',
    icon: '/images/languages/language-4.png',
    direction: 'ltr',
    messages: require('../locales/pt-BR.json')
  }
];

export const defaultLocale = 'pt-BR';


export default dataLanguages;
