const REG_EXP_FILE_WITHOUT_EXTENSION = /\.[^/.]+$/;

const dropExtensionFromFileName = (value: string): string => value.replace(REG_EXP_FILE_WITHOUT_EXTENSION, '');

export { dropExtensionFromFileName }
