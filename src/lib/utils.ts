type ShasumReturn = {
  [key: string]: string;
};

export const extractShasum = (shasumsContent: string) => {
  const shasums = shasumsContent.split('\n').filter((line) => !!line);

  const obj: ShasumReturn = {};
  shasums
      .map((s) => s.split('  '))
      .forEach((s) => {
          obj[s[1].trim()] = s[0].trim();
          return obj;
      });
  return obj;
};
