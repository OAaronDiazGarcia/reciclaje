import React, { createContext, useState } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const contextValue = {
    language,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
