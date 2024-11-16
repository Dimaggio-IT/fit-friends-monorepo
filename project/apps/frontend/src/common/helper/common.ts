const REG_EXP_FILE_WITHOUT_EXTENSION = /\.[^/.]+$/;

const dropExtensionFromFileName = (value: string): string => value.replace(REG_EXP_FILE_WITHOUT_EXTENSION, '');

const fillPropertyValues = <T extends Record<string, any>>(template: T, source: T) => {
  const filledTemplate = Object.keys(template).reduce<Record<string, any>>((acc, cur) => {
    acc[cur] = source[cur];
    return acc;
  }, {})

  return filledTemplate;
};

export { dropExtensionFromFileName, fillPropertyValues }
