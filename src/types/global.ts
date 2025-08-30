export type MultiLangText = {
  [langCode: string]: string;
};

export type LicenseType = {
  _id: string;
  DiscordID: string;
  LicenseKey: string;
  Product: string;
  MaxIPs: number;
  maxWHIDs: number;
  PlatformType: string;
  PlatformID: string;
  IPs: string[];
  createdBy: {
    id: string;
    tag: string;
  }
  createdAt: string;
}